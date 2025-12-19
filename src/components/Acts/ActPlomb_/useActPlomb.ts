import { useState, useCallback, useMemo } from 'react';
import { useToast } from '../../Toast/useToast';
import { actsActions, useActsStore } from '../../../Store/actStore';
import { getData } from '../../../Store/api';

// === ТИПЫ ===
export interface PlombMeter {
  meter_number: string;
  seal_number: string;
  current_reading?: string;
  meter_type?: string;
  notes?: string;
  sequence_order?: number;
}

export interface ActPlombData {
  id?: string;
  act_number?: string;
  act_date: string;
  subscriber_name: string;
  address?: string;
  street: string;
  house: string;
  apartment: string;
  usd_representative: string;
  notes?: string;
  invoice_id?: string;
  meters: PlombMeter[];
  recipient_signature?: string;
  receipt_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PlombFormErrors {
  act_date?: string;
  subscriber_name?: string;
  street?: string;
  house?: string;
  apartment?: string;
  usd_representative?: string;
  meters?: Record<number, Partial<Record<keyof PlombMeter, string>>>;
}

// === ФУНКЦИЯ СОЗДАНИЯ НОВОГО СЧЕТЧИКА ===
const createNewMeter = (sequenceOrder: number = 1): PlombMeter => ({
  meter_number: '',
  seal_number: '',
  current_reading: '',
  meter_type: '',
  notes: '',
  sequence_order: sequenceOrder
});

// === ГЛАВНЫЙ ХУК ===
export const useActPlomb = () => {
  // === СОСТОЯНИЯ ИЗ STORE ===
  const { actPlomb, loading, saving } = useActsStore();
  const data = actPlomb;

  const [pdf, setPDF] = useState("");
  const [errors, setErrors] = useState<PlombFormErrors>({});
  const [pdfLoading, setPdfLoading] = useState(false);

  const toast = useToast();

  // === УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ОБНОВЛЕНИЯ ПОЛЯ ===
  const updateField = useCallback((field: string, value: any) => {
    actsActions.setField(2, field, value);
    
    // Очищаем ошибку для этого поля
    setErrors(prev => {
      if (prev[field as keyof PlombFormErrors]) {
        const newErrors = { ...prev };
        delete newErrors[field as keyof PlombFormErrors];
        return newErrors;
      }
      return prev;
    });
  }, []);

  // === СТАБИЛЬНАЯ ФУНКЦИЯ ДЛЯ ОБРАБОТКИ ИЗМЕНЕНИЙ ===
  const handleFieldChange = useCallback((field: string) => {
    return (value: string) => updateField(field, value);
  }, [updateField]);

  // === РАБОТА СО СЧЕТЧИКАМИ ===
  const handleMeterChange = useCallback((index: number, field: keyof PlombMeter, value: string) => {
    const updatedMeters = [...data.meters];
    updatedMeters[index] = { ...updatedMeters[index], [field]: value };
    
    actsActions.setField(2, 'meters', updatedMeters);

    // Очищаем ошибку для этого поля счетчика
    setErrors(prev => {
      if (prev.meters?.[index]?.[field]) {
        const newErrors = { ...prev };
        if (newErrors.meters && newErrors.meters[index]) {
          delete newErrors.meters[index][field];
          if (Object.keys(newErrors.meters[index]).length === 0) {
            delete newErrors.meters[index];
          }
        }
        return newErrors;
      }
      return prev;
    });
  }, [data.meters]);

  const addMeter = useCallback(() => {
    const newMeters = [...data.meters, createNewMeter(data.meters.length + 1)];
    actsActions.setField(2, 'meters', newMeters);
  }, [data.meters]);

  const removeMeter = useCallback((index: number) => {
    const newMeters = data.meters.filter((_, i) => i !== index);
    actsActions.setField(2, 'meters', newMeters);

    // Очищаем ошибки для удаленного счетчика
    setErrors(prev => {
      if (prev.meters?.[index]) {
        const newErrors = { ...prev };
        if (newErrors.meters) {
          delete newErrors.meters[index];
        }
        return newErrors;
      }
      return prev;
    });
  }, [data.meters]);

  // === ЗАГРУЗКА ДАННЫХ ===
  const loadActByInvoice = useCallback(async (invoiceId: string) => {
    if (!invoiceId) return;

    try {
      actsActions.setLoading(true);
      const response = await getData('PLOMB_ACT_GET', { invoice_id: invoiceId });

      if (response.success && response.data) {
        const loadedData = {
          ...response.data,
          meters: response.data.meters?.length > 0 ? response.data.meters : [createNewMeter(1)]
        };
        actsActions.setData(2, loadedData);
      }
    } catch (error) {
      console.error('Ошибка загрузки акта:', error);
      toast.error('Ошибка загрузки данных акта');
    } finally {
      actsActions.setLoading(false);
    }
  }, []);

  // === ВАЛИДАЦИЯ ДАННЫХ ===
  const validateData = useCallback((): boolean => {
    const newErrors: PlombFormErrors = { meters: {} };
    let hasErrors = false;

    // Проверка основных полей
    if (!data.act_date) {
      newErrors.act_date = 'Дата акта обязательна';
      hasErrors = true;
    }

    if (!data.street.trim()) {
      newErrors.street = 'Улица обязательна';
      hasErrors = true;
    }

    if (!data.house.trim()) {
      newErrors.house = 'Номер дома обязателен';
      hasErrors = true;
    }

    if (!data.apartment.trim()) {
      newErrors.apartment = 'Номер квартиры обязателен';
      hasErrors = true;
    }

    if (!data.subscriber_name.trim()) {
      newErrors.subscriber_name = 'ФИО абонента обязательно';
      hasErrors = true;
    }

    if (!data.usd_representative.trim()) {
      newErrors.usd_representative = 'ФИО представителя обязательно';
      hasErrors = true;
    }

    // Проверка счетчиков
    data.meters.forEach((meter, index) => {
      const meterErrors: Partial<Record<keyof PlombMeter, string>> = {};
      
      if (!meter.meter_number.trim()) {
        meterErrors.meter_number = 'Номер счетчика обязателен';
        hasErrors = true;
      }

      if (!meter.seal_number.trim()) {
        meterErrors.seal_number = 'Номер пломбы обязателен';
        hasErrors = true;
      }

      if (Object.keys(meterErrors).length > 0) {
        newErrors.meters![index] = meterErrors;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  }, [data]);

  // === СОХРАНЕНИЕ АКТА ===
  const saveAct = useCallback(async (): Promise<ActPlombData | null> => {
    if (!validateData()) {
      toast.error('Пожалуйста, исправьте ошибки в форме');
      return null;
    }

    try {
      actsActions.setLoading(true);

      const saveData = {
        ...data,
        address: `${data.street}, ${data.house}, кв. ${data.apartment}`.trim()
      };

      const response = await getData('PLOMB_ACT_CREATE', saveData);

      if (response.success) {
        const savedData = response.data;
        actsActions.setData(2, savedData);
        toast.success(`Акт пломбирования ${data.id ? 'обновлен' : 'создан'} успешно`);
        return savedData;
      } else {
        throw new Error(response.message || 'Неизвестная ошибка при сохранении');
      }
    } catch (error: any) {
      console.error('Ошибка сохранения:', error);
      toast.error(`Ошибка сохранения: ${error.message}`);
      return null;
    } finally {
      actsActions.setLoading(false);
    }
  }, [data, validateData ]);

  const getPDF = useCallback(async (): Promise<string | ''> => {
    try {
      actsActions.setLoading(true);

      const saveData = {
        ...data,
        address: `${data.street}, ${data.house}, кв. ${data.apartment}`.trim()
      };

      const response = await getData('PDF_ACT_PLOMB', saveData);

      if (response.success) {
        setPDF(response.data);
        toast.success(`PDF получен`);
        return response.data;
      } else {
        throw new Error(response.message || 'PDF не создан');
      }
    } catch (error: any) {
      console.error('Ошибка сохранения:', error);
      toast.error(`Ошибка создания PDF: ${error.message}`);
      return '';
    } finally {
      actsActions.setLoading(false);
    }
  }, [data ]);

  // === МЕМОИЗИРОВАННЫЕ ЗНАЧЕНИЯ ===
  const formattedAddress = useMemo(() => {
    return data.address || `${data.street || ''}, ${data.house || ''}, кв. ${data.apartment || ''}`.trim();
  }, [data.address, data.street, data.house, data.apartment]);

  const isFormValid = useMemo(() => {
    return data.act_date && 
           data.subscriber_name.trim() && 
           data.street.trim() && 
           data.house.trim() && 
           data.apartment.trim() && 
           data.usd_representative.trim() &&
           data.meters.every(meter => meter.meter_number.trim() && meter.seal_number.trim());
  }, [data]);

  // === СБРОС ДАННЫХ ===
  const resetData = useCallback(() => {
    actsActions.reset(2);
    setErrors({});
  }, []);

  // === УСТАНОВКА ДАННЫХ ===
  const setData = useCallback((newData: any) => {
    actsActions.setData(2, newData);
  }, []);

  // === ВОЗВРАЩАЕМЫЕ ЗНАЧЕНИЯ ===
  return {
    // Данные и состояния
    data,
    errors,
    loading,
    saving,
    pdfLoading,
    pdf,
    
    // Вычисляемые значения
    formattedAddress,
    isFormValid,
    
    // Функции обновления данных
    updateField,
    handleFieldChange,
    handleMeterChange,
    addMeter,
    removeMeter,
    
    // Функции работы с данными
    setLoading: actsActions.setLoading,
    loadActByInvoice,
    validateData,
    saveAct,
    getPDF,
    resetData,

    // Утилиты
    setData,
    setErrors
  };
};