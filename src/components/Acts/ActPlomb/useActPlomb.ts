// hooks/useActPlomb.ts
import { useState, useCallback } from 'react';
import { MeterSealingData } from '../../../Store/types';
import { useToken } from '../../../Store/loginStore';
import { useToast } from '../../Toast';
import { post } from '../../../Store/api';
import { USD_LOGO_BASE64 } from '../../../constants/logo';

const usdLogo = USD_LOGO_BASE64


interface UseActPlombResult {
  actData: MeterSealingData | null;
  isLoading: boolean;
  loadData: (invoiceId?: string) => Promise<void>;
  saveData: (data: MeterSealingData) => Promise<void>;
  get_pdf: (html: string) => Promise<any>;
}


export const useActPlomb = (): UseActPlombResult => {
  const [actData, setActData] = useState<MeterSealingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useToken();
  const toast = useToast();

  const loadData = useCallback(async (invoiceId?: string) => {
    setIsLoading(true);
    try {
      const res = await post('mp_get_actplomb', { token, invoice_id: invoiceId });
      if (res.success) {
        setActData(res.data);
      } else toast.error(res.message);
    } catch (e: any) {
      toast.error("Ошибка получения данных:" + e.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const saveData = useCallback(async (data: MeterSealingData) => {
    setIsLoading(true);
    try {
      const payload = { ...data, token };
      const res = await post('mp_set_actplomb', payload);
      console.log('mp_set_actplomb', res);
      if (res.success) {
        setActData(res.data);
      } else toast.error(res.message);
    } catch (e: any) {
      toast.error('saveData ActPlomb error', e.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const get_pdf = async (html: string) => {
    try {
      setIsLoading(true);
      const template = fillTemplate(html);
      return await post("mp_get_pdf", { template });
    } catch (e: any) {
      return { success: false, message: e.message };
    } finally {
      setIsLoading(false);
    }
  };

  const fillTemplate = (html: string): string => {
    if (!actData) return '';
    
    const {
      act_number,
      act_date,
      technician_name,
      owner_name,
      object_address,
      meter_model,
      meter_number,
      seal_number,
      note,
      technician_signature,
      owner_signature,
    } = actData;

    const actDateFormatted = formatDate(act_date);
    const actYear = getYear(act_date);

    const [numberPart, yearPart] = (act_number || '').split('/');
    const numberOnly = numberPart || '';
    const actNumberYear = yearPart || actYear || '';

    let result = html;
    const replacements: Record<string, string> = {
      '{{LOGO_SRC}}': usdLogo,
      '{{NUMBER}}': numberOnly,
      '{{YEAR}}': actNumberYear,
      '{{ACT_DATE}}': actDateFormatted,
      '{{ACT_YEAR}}': actYear,
      '{{TECHNICIAN_NAME}}': technician_name || '',
      '{{OWNER_NAME}}': owner_name || '',
      '{{OBJECT_ADDRESS}}': typeof object_address === 'string'
        ? object_address
        : (object_address as any)?.address || '',
      '{{METER_MODEL}}': meter_model || '',
      '{{METER_NUMBER}}': meter_number || '',
      '{{SEAL_NUMBER}}': seal_number || '',
      '{{NOTE}}': note || '',
      '{{TECHNICIAN_SIGNATURE}}': technician_signature || '',
      '{{OWNER_SIGNATURE}}': owner_signature || '',
    };

    Object.entries(replacements).forEach(([placeholder, value]) => {
      const re = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      result = result.replace(re, value);
    });

    return result;
  };

  const formatDate = (value?: string | null): string => {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const getYear = (value?: string | null): string => {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return String(d.getFullYear());
  };

  return {
    actData,
    isLoading,
    loadData,
    saveData,
    get_pdf,
  };
};