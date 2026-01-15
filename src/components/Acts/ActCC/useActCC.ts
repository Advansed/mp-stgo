// hooks/useActCC.ts
import { useState, useCallback } from 'react';
import { MeterReplacementData } from '../../../Store/types';
import { useToken } from '../../../Store/loginStore';
import { useToast } from '../../Toast';
import { post } from '../../../Store/api';
import { USD_LOGO_BASE64 } from '../../../constants/logo';

const usdLogo = USD_LOGO_BASE64

interface UseActCCResult {
  actData: MeterReplacementData | null;
  isLoading: boolean;
  loadData: (invoiceId?: string) => Promise<void>;
  saveData: (data: MeterReplacementData) => Promise<void>;
  get_pdf: (html: string) => Promise<any>;
}



export const useActCC = (): UseActCCResult => {
  const [actData, setActData]       = useState<MeterReplacementData | null>(null);
  const [isLoading, setIsLoading]   = useState(false);
  const { token }                   = useToken();
  const toast                       = useToast();
  



  const loadData                    = useCallback(async (invoiceId?: string) => {
    setIsLoading(true);
    try {
      const res = await post('mp_get_actcc', { token, invoice_id: invoiceId });
      if (res.success) {
        setActData(res.data);
      } else toast.error(res.message);
    } catch (e: any) {
      toast.error("Ошибка получения данных:" + e.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const saveData                    = useCallback(async (data: MeterReplacementData) => {
    setIsLoading(true);
    try {
      const payload = { ...data, token };
      const res = await post('mp_set_actcc', payload);
      console.log('mp_set_actcc', res);
      if (res.success) {
        setActData(res.data);
      } else toast.error(res.message);
    } catch (e: any) {
      toast.error('saveData ActCC error', e.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const get_pdf                     = async (html: string) => {
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

  const fillTemplate                = (html: string): string => {
    if (!actData) return '';
    
    const {
      act_number,
      act_date,
      technician_name,
      owner_name,
      object_type,
      object_address,
      removal_date,
      removed_meter_model,
      removed_meter_number,
      removed_meter_reading,
      removed_seal_number,
      installation_date,
      installed_meter_model,
      installed_meter_number,
      installed_meter_reading,
      installed_seal_number,
      technician_signature,
      owner_signature,
    } = actData;

    const actDateFormatted = formatDate(act_date);
    const actYear = getYear(act_date);
    const removalDateFormatted = formatDate(removal_date);
    const installationDateFormatted = formatDate(installation_date);

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
      '{{OBJECT_TYPE}}': object_type || '',
      '{{OBJECT_ADDRESS}}': typeof object_address === 'string'
        ? object_address
        : (object_address as any)?.address || '',
      '{{REMOVAL_DATE}}': removalDateFormatted,
      '{{INSTALLATION_DATE}}': installationDateFormatted,
      '{{REMOVED_METER_MODEL}}': removed_meter_model || '',
      '{{REMOVED_METER_NUMBER}}': removed_meter_number || '',
      '{{REMOVED_METER_READING}}': removed_meter_reading || '',
      '{{REMOVED_SEAL_NUMBER}}': removed_seal_number || '',
      '{{INSTALLED_METER_MODEL}}': installed_meter_model || '',
      '{{INSTALLED_METER_NUMBER}}': installed_meter_number || '',
      '{{INSTALLED_METER_READING}}': installed_meter_reading || '',
      '{{INSTALLED_SEAL_NUMBER}}': installed_seal_number || '',
      '{{TECHNICIAN_SIGNATURE}}': technician_signature || '',
      '{{OWNER_SIGNATURE}}': owner_signature || '',
    };

    Object.entries(replacements).forEach(([placeholder, value]) => {
      const re = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      result = result.replace(re, value);
    });

    return result;
  };

  const formatDate                  = (value?: string | null): string => {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const getYear                     = (value?: string | null): string => {
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