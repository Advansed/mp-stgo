import { useState, useCallback } from 'react';
import { useToast } from '../../Toast/useToast';
import { actsActions, useActsStore } from '../../../Store/actStore';
import { getData } from '../../../Store/api';
import { ActShutdownData } from '../../../Store/types';



export type ShutdownFormErrors = Partial<Record<keyof ActShutdownData, string>>;
export type AddressCopyDirection = 'to_execution' | 'to_reconnection';

export const useShutdownAct = (actId?: string) => {
  // === СОСТОЯНИЯ ИЗ STORE ===
  const { actShutdown, loading, saving } = useActsStore();
  const data = actShutdown;

  const [errors, setErrors] = useState<ShutdownFormErrors>({});
  const toast = useToast();

  // ============================================
  // ОПТИМИЗИРОВАННЫЕ ОБРАБОТЧИКИ
  // ============================================

  // Комбинированная функция - изменение поля + очистка ошибки
  const updateField           = useCallback((field: keyof ActShutdownData, value: string) => {
    // Обновляем данные в store
    actsActions.setField(3, field, value);
    
    // Очищаем ошибку если она была
    setErrors(prev => {
      if (prev[field]) {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
      return prev;
    });
  }, []);

  // Главный обработчик изменения полей
  const handleFieldChange     = useCallback((field: keyof ActShutdownData, value: string) => {
    actsActions.setField(3, field, value);
  }, []);

  // Отдельная функция для очистки ошибок
  const clearFieldError       = useCallback((field: keyof ActShutdownData) => {
    setErrors(prev => {
      if (prev[field]) {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
      return prev;
    });
  }, []);

  // ============================================
  // КОПИРОВАНИЕ АДРЕСНЫХ ДАННЫХ
  // ============================================

  const copyAddressData       = useCallback((direction: AddressCopyDirection) => {
    if (direction === 'to_execution') {
      // Копируем адресные данные в секцию выполнения
      actsActions.setField(3, 'execution_apartment', data.apartment);
      actsActions.setField(3, 'execution_house', data.house);
      actsActions.setField(3, 'execution_street', data.street);
    } else if (direction === 'to_reconnection') {
      // Копируем адресные данные в секцию подключения
      actsActions.setField(3, 'reconnection_apartment', data.apartment);
      actsActions.setField(3, 'reconnection_house', data.house);
      actsActions.setField(3, 'reconnection_street', data.street);
      actsActions.setField(3, 'reconnection_subscriber', data.subscriber_name);
    }
  }, [data.apartment, data.house, data.street, data.subscriber_name]);

  // ============================================
  // МАССОВОЕ ОБНОВЛЕНИЕ ПОЛЕЙ
  // ============================================

  const updateMultipleFields  = useCallback((updates: Partial<ActShutdownData>) => {
    Object.entries(updates).forEach(([field, value]) => {
      actsActions.setField(3, field, value);
    });
  }, []);

  // ============================================
  // ВАЛИДАЦИЯ
  // ============================================

  const validateForm = useCallback((): boolean => {
    const newErrors: ShutdownFormErrors = {};
    
    // Обязательные поля
    const requiredFields: (keyof ActShutdownData)[] = [
      'act_date',
      'representative_name',
      'reason',
      'equipment',
      'apartment',
      'house',
      'street',
      'subscriber_name'
    ];

    requiredFields.forEach(field => {
      if (!data[field] || data[field]!.toString().trim() === '') {
        newErrors[field] = 'Поле обязательно для заполнения';
      }
    });

    // Валидация дат
    if (data.execution_date && new Date(data.execution_date) > new Date()) {
      newErrors.execution_date = 'Дата выполнения не может быть в будущем';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [data]);

  // ============================================
  // ЗАГРУЗКА ДАННЫХ
  // ============================================

  const loadActByInvoice = useCallback(async (invoiceId: string) => {
    actsActions.setLoading(true);
    try {
      const params = { invoice_id: invoiceId };
      
      const result = await getData('SHUTDOWN_ORDER_GET', params);
      
      if (result.success) {
        const actData = result.data;
        // Устанавливаем загруженные данные в store
        actsActions.setData(3, actData);
      }
    } catch (error) {
      console.error('Ошибка загрузки акта по заявке:', error);
      // При ошибке создаем новый акт с invoice_id
      actsActions.setData(3, { ...data, invoice_id: invoiceId });
      toast.error('Ошибка загрузки данных акта');
    } finally {
      actsActions.setLoading(false);
    }
  }, [data, toast]);

  // ============================================
  // СОХРАНЕНИЕ
  // ============================================

  const saveAct = useCallback(async (): Promise<ActShutdownData | null> => {
    if (!validateForm()) {
      toast.error('Пожалуйста, исправьте ошибки в форме');
      return null;
    }

    actsActions.setLoading(true);

    try {
      const method = 'SHUTDOWN_ORDER_CREATE';
      const params = data;
      
      const result = await getData(method, params);

      if (result.success) {
        toast.success("Данные сохранены");
        
        // Обновляем данные результатом с сервера
        actsActions.setData(3, result.data);
        return result.data;
      } else {
        toast.error("Ошибка сохранения данных");
        return null;
      }

    } catch (error: any) {
      console.error('Ошибка сохранения акта:', error);
      toast.error(`Ошибка сохранения: ${error.message}`);
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

      const response = await getData('PDF_ACT_SHUTDOWN', data);

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
  // ДОПОЛНИТЕЛЬНЫЕ УТИЛИТЫ
  // ============================================

  // Сброс формы
  const resetForm = useCallback((keepInvoiceId = false) => {
    const invoiceId = keepInvoiceId ? data.invoice_id : undefined;
    actsActions.setData(3, { 
      ...data, 
      ...(invoiceId ? { invoice_id: invoiceId } : {}) 
    });
    setErrors({});
  }, [data]);

  // Получение значения поля
  const getFieldValue = useCallback((field: keyof ActShutdownData): string => {
    return data[field] || '';
  }, [data]);

  // Получение ошибки поля
  const getFieldError = useCallback((field: keyof ActShutdownData): string => {
    return errors[field] || '';
  }, [errors]);

  // ============================================
  // ВОЗВРАТ ХУКА
  // ============================================

  return {
    // Состояние
    data,
    errors,
    loading,
    saving,
    
    // Основные методы (оптимизированные)
    handleFieldChange,    // Стабильная ссылка!
    updateField,          // Изменение + очистка ошибки
    clearFieldError,      // Отдельная очистка ошибок
    
    // Групповые операции
    copyAddressData,      // Копирование адреса
    updateMultipleFields, // Массовое обновление
    
    // API операции
    validateForm,
    loadActByInvoice,
    saveAct,
    getPDF,
    
    // Утилиты
    resetForm,
    getFieldValue,       // Вместо getValue
    getFieldError,       // Вместо getError
    setData: (newData: ActShutdownData) => actsActions.setData(3, newData),
    setErrors            // Для прямого доступа если нужно
  };
};