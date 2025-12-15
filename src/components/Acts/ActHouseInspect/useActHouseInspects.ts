import { useState, useCallback } from 'react';
import { useToast } from '../../Toast/useToast';
import { actsActions, useActsStore } from '../../../Store/actStore';
import { getData } from '../../../Store/api';
import { HouseInspectData, HouseMeterData } from '../../../Store/types';

// ============================================
// ТИПЫ И ИНТЕРФЕЙСЫ
// ============================================

export type HouseInspectErrors = Partial<Record<Exclude<keyof HouseInspectData, 'meters'>, string>> & {
  meters?: { [index: number]: Partial<Record<keyof HouseMeterData, string>> };
};

// ============================================
// УТИЛИТЫ
// ============================================

const formatDateForInput = (dateString?: string): string => {
  if (!dateString) return new Date().toISOString().split('T')[0];
  
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  
  return new Date().toISOString().split('T')[0];
};

const formatTimeForInput = (timeString?: string): string => {
  if (!timeString) return new Date().toTimeString().slice(0, 5);
  
  if (/^\d{2}:\d{2}$/.test(timeString)) {
    return timeString;
  }
  
  if (/^\d{2}:\d{2}:\d{2}/.test(timeString)) {
    return timeString.slice(0, 5);
  }
  
  return new Date().toTimeString().slice(0, 5);
};

const createNewMeter = (sequence: number): HouseMeterData => ({
  meter_number: '',
  current_reading: undefined,
  meter_type: '',
  seal_number: '',
  seal_color: '',
  gas_equipment: '',
  living_area: undefined,
  non_living_area: undefined,
  residents_count: undefined,
  notes: '',
  sequence_order: sequence
});

// ============================================
// ОСНОВНОЙ ХУК
// ============================================

export const useActHouseInspects = () => {
  // === СОСТОЯНИЕ ИЗ STORE ===
  const { actHouseInspect, loading, saving } = useActsStore();
  const data = actHouseInspect;

  const [errors, setErrors] = useState<HouseInspectErrors>({});
  const toast = useToast();

  // ============================================
  // МЕТОДЫ ОБНОВЛЕНИЯ ДАННЫХ
  // ============================================

  // Функция обновления простых полей с очисткой ошибки
  const updateField = useCallback((fieldName: string, value: any) => {
    actsActions.setField(1, fieldName, value);
    
    if (errors[fieldName as keyof HouseInspectErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName as keyof HouseInspectErrors];
        return newErrors;
      });
    }
  }, [errors]);

  // Основная функция обновления полей (поддерживает вложенные пути)
  const handleFieldChange = useCallback((fieldPath: string, value: any) => {
    if (fieldPath.startsWith('meters.')) {
      const pathParts = fieldPath.split('.');
      if (pathParts.length === 3) {
        const meterIndex = parseInt(pathParts[1]);
        const fieldName = pathParts[2];
        
        const updatedMeters = [...data.meters];
        if (updatedMeters[meterIndex]) {
          updatedMeters[meterIndex] = { 
            ...updatedMeters[meterIndex], 
            [fieldName]: value 
          };
          actsActions.setField(1, 'meters', updatedMeters);
        }
      }
    } else {
      actsActions.setField(1, fieldPath, value);
    }
  }, [data.meters]);

  // Функция обновления полей счетчиков
  const handleMeterChange = useCallback((index: number, field: keyof HouseMeterData, value: any) => {
    const updatedMeters = data.meters.map((meter, i) =>
      i === index ? { ...meter, [field]: value } : meter
    );
    actsActions.setField(1, 'meters', updatedMeters);
  }, [data.meters]);

  // ============================================
  // МЕТОДЫ РАБОТЫ СО СЧЕТЧИКАМИ
  // ============================================

  const addMeter = useCallback(() => {
    const newMeters = [...data.meters, createNewMeter(data.meters.length + 1)];
    actsActions.setField(1, 'meters', newMeters);
  }, [data.meters]);

  const removeMeter = useCallback((index: number) => {
    const newMeters = data.meters.filter((_, i) => i !== index);
    actsActions.setField(1, 'meters', newMeters);
  }, [data.meters]);

  // ============================================
  // ВАЛИДАЦИЯ
  // ============================================

  const validateForm = useCallback((): boolean => {
    const newErrors: HouseInspectErrors = {};

    // Основные поля
    if (!data.act_number?.trim()) {
      newErrors.act_number = 'Номер акта обязателен';
    }

    if (!data.act_date) {
      newErrors.act_date = 'Дата акта обязательна';
    }

    if (!data.account_number?.trim()) {
      newErrors.account_number = 'Лицевой счет обязателен';
    }

    if (!data.address?.trim()) {
      newErrors.address = 'Адрес обязателен';
    }

    if (!data.organization_representative?.trim()) {
      newErrors.organization_representative = 'Представитель организации обязателен';
    }

    if (!data.subscriber_name?.trim()) {
      newErrors.subscriber_name = 'Имя абонента обязательно';
    }

    // Валидация счетчиков
    const meterErrors: { [index: number]: Partial<Record<keyof HouseMeterData, string>> } = {};
    
    data.meters.forEach((meter, index) => {
      const meterError: Partial<Record<keyof HouseMeterData, string>> = {};
      
      if (meter.meter_number && !meter.meter_type) {
        meterError.meter_type = 'Тип счетчика обязателен';
      }
      if (meter.meter_type && !meter.meter_number) {
        meterError.meter_number = 'Номер счетчика обязателен';
      }
      
      if (Object.keys(meterError).length > 0) {
        meterErrors[index] = meterError;
      }
    });

    if (Object.keys(meterErrors).length > 0) {
      newErrors.meters = meterErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [data]);

  // ============================================
  // API МЕТОДЫ
  // ============================================

  const loadActByInvoice = useCallback(async (invoiceId: string) => {
    actsActions.setLoading(true);
    try {
      const params = { 
        invoice_id: invoiceId
      };
      
      const result = await getData('HOUSE_INSPECT_GET', params);
      
      if (result.success && result.data) {
        const actData = result.data;
        actsActions.setData(1, {
          ...actData,
          act_date: formatDateForInput(actData.act_date),
          act_time: formatTimeForInput(actData.act_time),
          meters: actData.meters || []
        });
        toast.success('Данные акта загружены');
      } else {
        // Создаем новый акт с invoice_id
        actsActions.setData(1, { 
          ...data, 
          invoice_id: invoiceId,
          meters: []
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки акта по заявке:', error);
      toast.error('Ошибка загрузки данных акта');
      actsActions.setData(1, { ...data, invoice_id: invoiceId, meters: [] });
    } finally {
      actsActions.setLoading(false);
    }
  }, [data, toast]);

  const saveAct = useCallback(async (): Promise<HouseInspectData | null> => {
    if (!validateForm()) {
      toast.error('Исправьте ошибки в форме');
      return null;
    }

    actsActions.setLoading(true);
    try {
      // Подготовка данных для API
      const apiData = {
        ...data,
        act_time: data.act_time ? (
          data.act_time.length === 5 ? `${data.act_time}:00` : data.act_time
        ) : null
      };

      const result = await getData('HOUSE_INSPECT_CREATE', apiData);

      if (result.success) {
        const savedData = result.data;
        actsActions.setData(1, savedData);
        toast.success(`Акт проверки №${savedData.act_number || 'б/н'} успешно сохранен`);
        return savedData;
      } else {
        toast.error(result.message || 'Ошибка сохранения акта');
        return null;
      }
    } catch (error) {
      console.error('Ошибка сохранения акта:', error);
      toast.error('Ошибка сохранения данных');
      return null;
    } finally {
      actsActions.setLoading(false);
    }
  }, [data, validateForm, toast]);

  // ============================================
  // ГЕНЕРАЦИЯ PDF
  // ============================================

  const getPDF = useCallback(async (): Promise<string | ''> => {
    try {
      actsActions.setLoading(true);

      const response = await getData('PDF_ACT_HOUSE_INSPECT', data);

      if (response.success) {
        toast.success(`PDF получен`);
        return response.data;
      } else {
        throw new Error(response.message || 'PDF не создан');
      }
    } catch (error: any) {
      console.error('Ошибка создания PDF:', error);
      toast.error(`Ошибка создания PDF: ${error.message}`);
      return '';
    } finally {
      actsActions.setLoading(false);
    }
  }, [data, toast]);

  // ============================================
  // СБРОС ДАННЫХ
  // ============================================

  const resetData = useCallback(() => {
    actsActions.reset(1);
    setErrors({});
  }, []);

  // ============================================
  // ВОЗВРАТ ХУКА
  // ============================================

  return {
    // Состояние
    data,
    errors,
    loading,
    saving,
    
    // Методы обновления данных
    updateField,
    handleFieldChange,
    handleMeterChange,
    addMeter,
    removeMeter,
    
    // API методы
    validateForm,
    loadActByInvoice,
    saveAct,
    getPDF,
    
    // Утилиты
    resetData,
    setData: (newData: HouseInspectData) => actsActions.setData(1, newData),
    setErrors
  };
};