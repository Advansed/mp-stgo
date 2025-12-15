// src/components/Acts/ActPrescript/useActPrescript.ts

import { useState, useCallback, useMemo } from 'react';
import { useToast } from '../../Toast/useToast';
import { actsActions, useActsStore } from '../../../Store/actStore';
import { getData } from '../../../Store/api';
import { IPrescriptionForm, prescriptionValidationSchema, initialPrescriptionData } from './types';

export const useActPrescript = () => {
  // === СОСТОЯНИЯ ИЗ STORE ===
  const { prescript, loading, saving } = useActsStore();
  const data = prescript;

  const [errors, setErrors] = useState<Partial<Record<keyof IPrescriptionForm, string>>>({});
  const toast = useToast();

  // === HELPER ФУНКЦИИ ===
  const getFieldValue = useCallback((field: keyof IPrescriptionForm) => {
    return data[field] || '';
  }, [data]);

  const getFieldError = useCallback((field: keyof IPrescriptionForm) => {
    return errors[field] || '';
  }, [errors]);

  // === ОБНОВЛЕНИЕ ПОЛЯ С ОЧИСТКОЙ ОШИБКИ ===
  const updateField = useCallback((field: keyof IPrescriptionForm, value: string) => {
    actsActions.setField(4, field, value);
    
    // Очистка ошибки для поля
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  // === ВАЛИДАЦИЯ ФОРМЫ ===
  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof IPrescriptionForm, string>> = {};

    Object.entries(prescriptionValidationSchema).forEach(([field, rule]) => {
      const fieldValue = data[field as keyof IPrescriptionForm];
      
      if (rule.required && (!fieldValue || fieldValue.toString().trim() === '')) {
        newErrors[field as keyof IPrescriptionForm] = rule.message;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [data]);

  // === ЗАГРУЗКА ПРЕДПИСАНИЯ ПО ID ЗАЯВКИ ===
  const loadActByInvoice = useCallback(async (invoiceId: string) => {
    if (!invoiceId) return;

    try {
      actsActions.setLoading(true);
      
      const response = await getData('prescription_get', { 
        invoice_id: invoiceId
      });

      if (response?.success && response?.data) {
        actsActions.setData(4, {
          ...initialPrescriptionData,
          ...response.data,
          prescription_date: response.data.prescription_date || new Date().toISOString().split('T')[0],
          deadline_date: response.data.deadline_date || ''
        });
      } else {
        actsActions.setData(4, {
          ...initialPrescriptionData,
          invoice_id: invoiceId,
          prescription_date: new Date().toISOString().split('T')[0]
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки предписания:', error);
      toast.error('Ошибка загрузки данных предписания');
    } finally {
      actsActions.setLoading(false);
    }
  }, [toast]);

  // === СОХРАНЕНИЕ ПРЕДПИСАНИЯ ===
  const saveAct = useCallback(async (): Promise<IPrescriptionForm | null> => {
    if (!validateForm()) {
      toast.error('Пожалуйста, исправьте ошибки в форме');
      return null;
    }

    try {
      actsActions.setLoading(true);

      const response = await getData('prescription_create', data);

      if (response?.success && response?.data) {
        const savedData = {
          ...data,
          ...response.data
        };
        
        actsActions.setData(4, savedData);
        toast.success('Предписание успешно сохранено');
        return savedData;
      } else {
        throw new Error(response?.message || 'Ошибка сохранения предписания');
      }
    } catch (error: any) {
      console.error('Ошибка сохранения:', error);
      toast.error(error instanceof Error ? error.message : 'Ошибка сохранения предписания');
      return null;
    } finally {
      actsActions.setLoading(false);
    }
  }, [data, validateForm, toast]);

  // === ГЕНЕРАЦИЯ PDF ===
  const getPDF = useCallback(async (): Promise<string | ''> => {
    try {
      actsActions.setLoading(true);

      const response = await getData('PDF_ACT_PRESCRIPT', data);

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

  // === СБРОС ДАННЫХ ===
  const resetData = useCallback(() => {
    actsActions.reset(4);
    setErrors({});
  }, []);

  // === ВЫЧИСЛЯЕМЫЕ ЗНАЧЕНИЯ ===
  const isFormValid = useMemo(() => {
    return validateForm();
  }, [validateForm]);

  return {
    // Данные и состояния
    data,
    errors,
    loading,
    saving,
    
    // Вычисляемые значения
    isFormValid,
    
    // Основные методы
    getFieldValue,
    getFieldError,
    updateField,
    
    // API операции
    loadActByInvoice,
    saveAct,
    getPDF,
    
    // Утилиты
    resetData,
    setData: (newData: IPrescriptionForm) => actsActions.setData(4, newData),
    setErrors
  };
};