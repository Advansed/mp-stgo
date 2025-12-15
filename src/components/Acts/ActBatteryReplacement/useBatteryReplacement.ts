import { useState, useCallback } from 'react';
import { useToast } from '../../Toast/useToast';
import { actsActions, useActsStore } from '../../../Store/actStore';
import { getData } from '../../../Store/api';
import { BatteryReplacementData } from '../../../Store/types';

export type BatteryReplacementErrors = Partial<Record<keyof BatteryReplacementData, string>>;

export const useBatteryReplacement = (actId?: string) => {
  const { batteryReplacement, loading, saving } = useActsStore();
  const data = batteryReplacement;

  const [errors, setErrors] = useState<BatteryReplacementErrors>({});
  const toast = useToast();

  const updateField = useCallback((field: keyof BatteryReplacementData, value: string) => {
    actsActions.setField(4, field, value);
    
    setErrors(prev => {
      if (prev[field]) {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
      return prev;
    });
  }, []);

  const handleFieldChange = useCallback((field: keyof BatteryReplacementData, value: string) => {
    actsActions.setField(4, field, value);
  }, []);

  const clearFieldError = useCallback((field: keyof BatteryReplacementData) => {
    setErrors(prev => {
      if (prev[field]) {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
      return prev;
    });
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: BatteryReplacementErrors = {};
    
    const requiredFields: (keyof BatteryReplacementData)[] = [
      'act_date',
      'technician_name',
      'owner_name',
      'object_type',
      'object_street',
      'object_house',
      'removal_date',
      'removed_meter_model',
      'removed_meter_number',
      'removed_meter_reading',
      'removed_seal_number',
      'installation_date',
      'installed_meter_model',
      'installed_meter_number',
      'installed_meter_reading',
      'installed_seal_number'
    ];

    requiredFields.forEach(field => {
      if (!data[field] || data[field]!.toString().trim() === '') {
        newErrors[field] = 'Поле обязательно для заполнения';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [data]);

  const loadActByInvoice = useCallback(async (invoiceId: string) => {
    actsActions.setLoading(true);
    try {
      const params = { invoice_id: invoiceId };
      
      const result = await getData('BATTERY_REPLACEMENT_GET', params);
      
      if (result.success) {
        const actData = result.data;
        actsActions.setData(4, actData);
      }
    } catch (error) {
      console.error('Ошибка загрузки акта по заявке:', error);
      actsActions.setData(4, { ...data, invoice_id: invoiceId });
      toast.error('Ошибка загрузки данных акта');
    } finally {
      actsActions.setLoading(false);
    }
  }, [data, toast]);

  const saveAct = useCallback(async (): Promise<BatteryReplacementData | null> => {
    if (!validateForm()) {
      toast.error('Пожалуйста, исправьте ошибки в форме');
      return null;
    }

    actsActions.setLoading(true);

    try {
      const method = 'BATTERY_REPLACEMENT_CREATE';
      const params = data;
      
      const result = await getData(method, params);

      if (result.success) {
        toast.success("Данные сохранены");
        actsActions.setData(4, result.data);
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

  const getPDF = useCallback(async (): Promise<string | ''> => {
    try {
      actsActions.setLoading(true);

      const response = await getData('PDF_ACT_BATTERY_REPLACEMENT', data);

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

  const resetForm = useCallback((keepInvoiceId = false) => {
    const invoiceId = keepInvoiceId ? data.invoice_id : undefined;
    actsActions.setData(4, { 
      ...data, 
      ...(invoiceId ? { invoice_id: invoiceId } : {}) 
    });
    setErrors({});
  }, [data]);

  const getFieldValue = useCallback((field: keyof BatteryReplacementData): string => {
    return data[field] || '';
  }, [data]);

  const getFieldError = useCallback((field: keyof BatteryReplacementData): string => {
    return errors[field] || '';
  }, [errors]);

  return {
    data,
    errors,
    loading,
    saving,
    handleFieldChange,
    updateField,
    clearFieldError,
    validateForm,
    loadActByInvoice,
    saveAct,
    getPDF,
    resetForm,
    getFieldValue,
    getFieldError,
    setData: (newData: BatteryReplacementData) => actsActions.setData(4, newData),
    setErrors
  };
};