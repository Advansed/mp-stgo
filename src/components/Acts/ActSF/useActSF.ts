// hooks/useActSF.ts
import { useState, useCallback }  from 'react';
import { SealBreakData }          from '../../../Store/types';
import { useToken }               from '../../../Store/loginStore';
import { useToast }               from '../../Toast';
import { post }                   from '../../../Store/api';
import { USD_LOGO_BASE64 } from '../../../constants/logo';

const usdLogo = USD_LOGO_BASE64


interface UseActSFResult {
  actData: SealBreakData | null;
  isLoading: boolean;
  loadData: (invoiceId?: string) => Promise<void>;
  saveData: (data: SealBreakData) => Promise<void>;
  get_pdf: (html: string) => Promise<any>;
}

export const useActSF = (): UseActSFResult => {
  const [actData, setActData] = useState<SealBreakData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useToken();
  const toast = useToast();

  const loadData = useCallback(async (invoiceId?: string) => {
    setIsLoading(true);
    try {
      const res = await post('mp_get_actsf', { token, invoice_id: invoiceId });
      if (res.success) {
        setActData(res.data);
      } else toast.error(res.message);
    } catch (e: any) {
      toast.error("Ошибка получения данных:" + e.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const saveData = useCallback(async (data: SealBreakData) => {
    setIsLoading(true);
    try {
      const payload = { ...data, token };
      const res = await post('mp_set_actsf', payload);
      console.log('mp_set_actsf', res);
      if (res.success) {
        setActData(res.data);
      } else toast.error(res.message);
    } catch (e: any) {
      toast.error('saveData ActSF error', e.message);
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
      technician1_name,
      technician2_name,
      owner_name,
      object_type,
      street,
      house,
      apartment,
      break_date,
      break_seal_number,
      break_seal_color,
      break_meter_model,
      break_meter_number,
      break_meter_reading,
      reason,
      install_date,
      install_seal_number,
      install_seal_color,
      install_meter_model,
      install_meter_number,
      install_meter_reading,
      technician1_signature,
      technician2_signature,
      owner_signature,
    } = actData;

    const formatDate = (value?: string | null): string => {
      if (!value) return '';
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return '';
      return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
    };

    const getDateParts = (value?: string | null) => {
      if (!value) return { day: '', month: '', year: '' };
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return { day: '', month: '', year: '' };
      return {
        day: String(d.getDate()).padStart(2, '0'),
        month: d.toLocaleString('ru-RU', { month: 'long' }),
        year: String(d.getFullYear())
      };
    };

    const actDateParts = getDateParts(act_date);
    const breakDateParts = getDateParts(break_date);
    const installDateParts = getDateParts(install_date);
    
    const [numberPart, yearPart] = (act_number || '').split('/');
    const numberOnly = numberPart || '';
    const actYear = yearPart || actDateParts.year || '';

    let result = html;
    const replacements: Record<string, string> = {
      '{{LOGO_SRC}}': usdLogo,
      '{{NUMBER}}': numberOnly,
      '{{YEAR}}': actYear,
      '{{ACT_DAY}}': actDateParts.day,
      '{{ACT_MONTH}}': actDateParts.month,
      '{{ACT_YEAR}}': actDateParts.year,
      '{{TECHNICIAN1_NAME}}': technician1_name || '',
      '{{TECHNICIAN2_NAME}}': technician2_name || '',
      '{{OWNER_NAME}}': owner_name || '',
      '{{OBJECT_TYPE}}': object_type || '',
      '{{STREET}}': street || '',
      '{{HOUSE}}': house || '',
      '{{APARTMENT}}': apartment || '',
      '{{BREAK_DAY}}': breakDateParts.day,
      '{{BREAK_MONTH}}': breakDateParts.month,
      '{{BREAK_YEAR}}': breakDateParts.year,
      '{{BREAK_SEAL_NUMBER}}': break_seal_number || '',
      '{{BREAK_SEAL_COLOR}}': break_seal_color || '',
      '{{BREAK_METER_MODEL}}': break_meter_model || '',
      '{{BREAK_METER_NUMBER}}': break_meter_number || '',
      '{{BREAK_METER_READING}}': break_meter_reading || '',
      '{{REASON}}': reason || '',
      '{{INSTALL_DAY}}': installDateParts.day,
      '{{INSTALL_MONTH}}': installDateParts.month,
      '{{INSTALL_YEAR}}': installDateParts.year,
      '{{INSTALL_SEAL_NUMBER}}': install_seal_number || '',
      '{{INSTALL_SEAL_COLOR}}': install_seal_color || '',
      '{{INSTALL_METER_MODEL}}': install_meter_model || '',
      '{{INSTALL_METER_NUMBER}}': install_meter_number || '',
      '{{INSTALL_METER_READING}}': install_meter_reading || '',
      '{{TECHNICIAN1_SIGNATURE}}': technician1_signature || '',
      '{{TECHNICIAN2_SIGNATURE}}': technician2_signature || '',
      '{{OWNER_SIGNATURE}}': owner_signature || '',
    };

    Object.entries(replacements).forEach(([placeholder, value]) => {
      const re = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      result = result.replace(re, value);
    });

    return result;
  };

  return {
    actData,
    isLoading,
    loadData,
    saveData,
    get_pdf,
  };
};