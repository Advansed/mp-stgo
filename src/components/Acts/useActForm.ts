// src/hooks/useActForms.ts
import { useState, useCallback, useMemo } from 'react';
import { useToast } from '../Toast/useToast';
import { ActConfig, ActDataType, actsActions, ActType, getActConfig, getRequiredFieldsForActType } from '../../Store/actStore';
import { getData } from '../../Store/api';

export interface UseActFormResult<T extends ActDataType> {
  // Данные и состояние
  data:                   T;
  errors:                 Record<string, string>;
  loading:                boolean;
  saving:                 boolean;
  
  // Методы работы с полями
  updateField:            (field: keyof T, value: any) => void;
  getFieldValue:          (field: keyof T) => string;
  getFieldError:          (field: keyof T) => string;
  clearFieldError:        (field: keyof T) => void;
  
  // Валидация
  validateForm:           () => boolean;
  
  // API методы
  loadActByInvoice:       (invoiceId: string) => Promise<void>;
  saveAct: (onSuccess?:   (data: T) => void) => Promise<T | null>;
  getPDF:                 () => Promise<string | null>;
  resetForm:              (keepInvoiceId?: boolean) => void;
  
  // Утилиты
  config:                 ActConfig<T>;
  requiredFields:         (keyof T)[];
}

export const useActForm   = <T extends ActDataType>(
  actType: ActType
): UseActFormResult<T> => {
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const [loading, setLoading]   = useState(false);
  const [saving, setSaving]     = useState(false);
  const toast                   = useToast();

  // Получаем конфигурацию для типа акта
  const config                  = useMemo(() => getActConfig(actType), [actType]) as ActConfig<T>;
  
  // Получаем обязательные поля из конфигурации
  const requiredFields          = useMemo(() => {
    return getRequiredFieldsForActType(actType) as (keyof T)[];
  }, [actType]);

  // Получаем текущие данные акта из store
  const getActData              = useCallback((): T => {
    return actsActions.getActByType(actType) as T;
  }, [actType]);

  // Текущие данные
  const data                    = useMemo(() => getActData(), [getActData]);

  // ========================
  // МЕТОДЫ РАБОТЫ С ПОЛЯМИ
  // ========================

  const updateField             = useCallback((field: keyof T, value: any) => {
    actsActions.setActField(actType, field as string, value);
    
    // Очищаем ошибку при изменении
    setErrors(prev => {
      if (prev[field as string]) {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      }
      return prev;
    });
  }, [actType]);

  const getFieldValue           = useCallback((field: keyof T): string => {
    const value = data[field];
    if (value === undefined || value === null) return '';
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'string') return value;
    return String(value);
  }, [data]);

  const getFieldError           = useCallback((field: keyof T): string => {
    return errors[field as string] || '';
  }, [errors]);

  const clearFieldError         = useCallback((field: keyof T) => {
    setErrors(prev => {
      if (prev[field as string]) {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      }
      return prev;
    });
  }, []);

  // ========================
  // ВАЛИДАЦИЯ
  // ========================

  const validateForm            = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Проверка обязательных полей
    requiredFields.forEach(field => {
      const value = data[field];
      if (value === undefined || value === null) {
        newErrors[field as string] = 'Поле обязательно для заполнения';
        return;
      }
      
      // Проверка на пустую строку
      if (typeof value === 'string' && value.trim() === '') {
        newErrors[field as string] = 'Поле обязательно для заполнения';
        return;
      }
      
      // Проверка на пустой массив
      if (Array.isArray(value) && value.length === 0) {
        newErrors[field as string] = 'Должен быть хотя бы один элемент';
        return;
      }
    });

    // Специфическая валидация для BatteryReplacement
    if (actType === 5) {
      const batteryData = data as any;
      
      // Проверка, что дата установки не раньше даты снятия
      if (batteryData.removal_date && batteryData.installation_date) {
        const removalDate = new Date(batteryData.removal_date);
        const installationDate = new Date(batteryData.installation_date);
        
        if (installationDate < removalDate) {
          newErrors['installation_date'] = 'Дата установки не может быть раньше даты снятия';
        }
      }
      
      // Проверка числовых полей для показаний
      const checkReading = (field: string, value: string) => {
        if (value) {
          const reading = parseFloat(value);
          if (isNaN(reading) || reading < 0) {
            newErrors[field] = 'Показания должны быть положительным числом';
          }
        }
      };
      
      checkReading('removed_meter_reading', batteryData.removed_meter_reading);
      checkReading('installed_meter_reading', batteryData.installed_meter_reading);
    }

    // Специфическая валидация для Prescript
    if (actType === 4) {
      const prescriptData = data as any;
      
      // Проверка даты дедлайна
      if (prescriptData.prescription_date && prescriptData.deadline_date) {
        const prescriptionDate = new Date(prescriptData.prescription_date);
        const deadlineDate = new Date(prescriptData.deadline_date);
        
        if (deadlineDate <= prescriptionDate) {
          newErrors['deadline_date'] = 'Дата исполнения должна быть позже даты предписания';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [data, requiredFields, actType]);

  // ========================
  // API МЕТОДЫ
  // ========================

  const loadActByInvoice        = useCallback(async (invoiceId: string): Promise<void> => {
    setLoading(true);
    try {
      const params = { invoice_id: invoiceId };
      const result = await getData(config.apiMethods.getByInvoice, params);
      
      if (result.success) {
        actsActions.setActByType(actType, result.data);
      } else {
        // Если акта нет, создаем новый с invoice_id
        const currentData = getActData();
        actsActions.setActByType(actType, { 
          ...currentData, 
          invoice_id: invoiceId 
        });
      }
    } catch (error) {
      console.error(`Ошибка загрузки акта ${actType}:`, error);
      toast.error('Ошибка загрузки данных акта');
    } finally {
      setLoading(false);
    }
  }, [actType, config.apiMethods.getByInvoice, toast, getActData]);

  const saveAct                 = useCallback(async (
    onSuccess?: (data: T) => void
  ): Promise<T | null> => {
    if (!validateForm()) {
      toast.error('Пожалуйста, исправьте ошибки в форме');
      return null;
    }

    setSaving(true);
    try {
      const result = await getData(config.apiMethods.save, data);

      if (result.success) {
        toast.success("Данные сохранены");
        actsActions.setActByType(actType, result.data);
        
        if (onSuccess) {
          onSuccess(result.data as T);
        }
        return result.data as T;
      } else {
        toast.error(result.message || "Ошибка сохранения данных");
        return null;
      }
    } catch (error: any) {
      console.error('Ошибка сохранения акта:', error);
      toast.error(`Ошибка сохранения: ${error.message}`);
      return null;
    } finally {
      setSaving(false);
    }
  }, [actType, config.apiMethods.save, data, validateForm, toast]);

  const getPDF                  = useCallback(async (): Promise<string | null> => {
    if (!config.apiMethods.getPDF) {
      toast.error('Генерация PDF не поддерживается для этого типа акта');
      return null;
    }

    setLoading(true);
    try {
      const result = await getData(config.apiMethods.getPDF, data);

      if (result.success) {
        toast.success("PDF сгенерирован");
        return result.data;
      } else {
        throw new Error(result.message || 'Ошибка генерации PDF');
      }
    } catch (error: any) {
      console.error('Ошибка создания PDF:', error);
      toast.error(`Ошибка создания PDF: ${error.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [actType, config.apiMethods.getPDF, data, toast]);

  const resetForm               = useCallback((keepInvoiceId = false) => {
    const currentData = getActData();
    const invoiceId = keepInvoiceId ? (currentData as any).invoice_id : undefined;
    
    actsActions.resetAct(actType);
    
    // Восстанавливаем invoice_id если нужно
    if (invoiceId) {
      actsActions.setActField(actType, 'invoice_id', invoiceId);
    }
    
    setErrors({});
  }, [actType, getActData]);

  // ========================
  // СПЕЦИАЛИЗИРОВАННЫЕ МЕТОДЫ ДЛЯ ОПРЕДЕЛЕННЫХ ТИПОВ
  // ========================

  // Для актов с массивами
  const updateArrayField      = useCallback((
    arrayName: keyof T,
    index: number,
    field: string,
    value: any
  ) => {
    const currentArray = data[arrayName];
    if (!Array.isArray(currentArray)) return;
    
    const updatedArray = [...currentArray];
    if (updatedArray[index]) {
      updatedArray[index] = { ...updatedArray[index], [field]: value };
      updateField(arrayName, updatedArray as any);
    }
  }, [data, updateField]);

  const addArrayItem          = useCallback((
    arrayName: keyof T,
    templateItem: any
  ) => {
    const currentArray = data[arrayName];
    if (!Array.isArray(currentArray)) return;
    
    const updatedArray = [...currentArray, templateItem];
    updateField(arrayName, updatedArray as any);
  }, [data, updateField]);

  const removeArrayItem       = useCallback((
    arrayName: keyof T,
    index: number
  ) => {
    const currentArray = data[arrayName];
    if (!Array.isArray(currentArray)) return;
    
    const updatedArray = currentArray.filter((_, i) => i !== index);
    updateField(arrayName, updatedArray as any);
  }, [data, updateField]);

  return {
    // Данные и состояние
    data,
    errors,
    loading,
    saving,
    
    // Методы работы с полями
    updateField,
    getFieldValue,
    getFieldError,
    clearFieldError,
    
    // Валидация
    validateForm,
    
    // API методы
    loadActByInvoice,
    saveAct,
    getPDF,
    resetForm,
    
    // Утилиты
    config,
    requiredFields,
    
    // Специализированные методы (добавляем только для актов с массивами)
    ...(['actHouseInspect', 'actPlomb'].includes(config.storeKey) ? {
      updateArrayField,
      addArrayItem,
      removeArrayItem
    } : {})
  };
};

// ========================
// СПЕЦИАЛИЗИРОВАННЫЕ ХУКИ ДЛЯ КАЖДОГО ТИПА АКТА
// ========================


// Хук для получения всех типов актов
export const useAllActForms = () => {
  return {
    useActForm
  };
};