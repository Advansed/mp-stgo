// hooks/useActSF.ts
import { useState, useCallback } from 'react';
import { SealBreakData, Signature } from '../../../Store/ActTypes';
import { useToken } from '../../../Store/loginStore';
import { useToast } from '../../Toast';
import { post } from '../../../Store/api';
import { USD_LOGO_BASE64 } from '../../../constants/logo';

const usdLogo = USD_LOGO_BASE64;

interface UseActSFResult {
  isLoading: boolean;
  get_pdf: (html: string, actData: SealBreakData, actNumber?: string, actDate?: string) => Promise<any>;
}

export const useActSF = (): UseActSFResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useToken();
  const toast = useToast();

  const fillTemplate = useCallback((actData: SealBreakData, html: string, actNumber?: string, actDate?: string): string => {
    const {
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

    const formatDate = (value?: string): string => {
      if (!value) return '';
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return '';
      return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
    };

    const getDateParts = (value?: string) => {
      if (!value) return { day: '', month: '', year: '' };
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return { day: '', month: '', year: '' };
      const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
      ];
      return {
        day: String(d.getDate()).padStart(2, '0'),
        month: months[d.getMonth()],
        year: String(d.getFullYear())
      };
    };

    const actDateParts = getDateParts(actDate);
    const breakDateParts = getDateParts(break_date);
    const installDateParts = getDateParts(install_date);
    
    // Парсинг номера акта (формат: "123/2024" или просто "123")
    const [numberPart, yearPart] = (actNumber || '').split('/');
    const numberOnly = numberPart || '';
    const actYear = yearPart || actDateParts.year || '';

    const logoSrc = usdLogo || '';

    let result = html;

    const replacements: Record<string, string> = {
      '{{LOGO_SRC}}': logoSrc,
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
      '{{TECHNICIAN1_SIGNATURE}}': (technician1_signature && typeof technician1_signature === 'object' && technician1_signature.dataUrl) 
        ? `<img src="${technician1_signature.dataUrl}" style="max-width: 200px; max-height: 80px;" />` 
        : '',
      '{{TECHNICIAN2_SIGNATURE}}': (technician2_signature && typeof technician2_signature === 'object' && technician2_signature.dataUrl)
        ? `<img src="${technician2_signature.dataUrl}" style="max-width: 200px; max-height: 80px;" />`
        : '',
      '{{OWNER_SIGNATURE}}': (owner_signature && typeof owner_signature === 'object' && owner_signature.dataUrl)
        ? `<img src="${owner_signature.dataUrl}" style="max-width: 200px; max-height: 80px;" />`
        : '',
    };

    Object.entries(replacements).forEach(([placeholder, value]) => {
      const re = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      result = result.replace(re, value);
    });

    return result;
  }, []);

  const get_pdf = useCallback(async (html: string, actData: SealBreakData, actNumber?: string, actDate?: string) => {
    try {
      setIsLoading(true);
      const template = fillTemplate(actData, html, actNumber, actDate);
      return await post("mp_get_pdf", { template, token });
    } catch (e: any) {
      toast.error("Ошибка генерации PDF: " + e.message);
      return { success: false, message: e.message };
    } finally {
      setIsLoading(false);
    }
  }, [fillTemplate, token, toast]);

  return {
    isLoading,
    get_pdf,
  };
};
