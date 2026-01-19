// hooks/useActSGE.ts
import { useState, useCallback } from 'react';
import { DisconnectionActData, Signature } from '../../../Store/ActTypes';
import { useToken } from '../../../Store/loginStore';
import { useToast } from '../../Toast';
import { post } from '../../../Store/api';
import { USD_LOGO_BASE64 } from '../../../constants/logo';

const usdLogo = USD_LOGO_BASE64;

interface UseActSGEResult {
  isLoading: boolean;
  get_pdf: (html: string, actData: DisconnectionActData, actNumber?: string, actDate?: string) => Promise<any>;
}

export const useActSGE = (): UseActSGEResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useToken();
  const toast = useToast();

  const fillTemplate = useCallback((actData: DisconnectionActData, html: string, actNumber?: string, actDate?: string): string => {
    const {
      customer_name,
      personal_account,
      work_order_number,
      work_order_date,
      debt_reason,
      apartment_number,
      house_number,
      building_number,
      street_name,
      city_district,
      representative_position,
      representative_name,
      disconnection_time_hours,
      disconnection_time_minutes,
      equipment_description,
      equipment_count,
      disconnection_method,
      seal_number,
      reconnection_date,
      reconnection_representative,
      reconnection_basis,
      representative_signature,
      customer_signature,
      reconnection_representative_signature,
    } = actData;

    const formatDate = (value?: string | null): string => {
      if (!value) return '';
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return '';
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}.${month}.${year}`;
    };

    const getMonthName = (value?: string | null): string => {
      if (!value) return '';
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return '';
      const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
      ];
      return months[d.getMonth()];
    };

    const getDay = (value?: string | null): string => {
      if (!value) return '';
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return '';
      return String(d.getDate());
    };

    const getYear = (value?: string | null): string => {
      if (!value) return '';
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return '';
      return String(d.getFullYear());
    };

    const actDay = getDay(actDate);
    const actMonth = getMonthName(actDate);
    const actYear = getYear(actDate);
    const workOrderDateFormatted = formatDate(work_order_date);
    const reconnectionDate = getDay(reconnection_date || null);
    const reconnectionMonth = getMonthName(reconnection_date || null);
    const reconnectionYear = getYear(reconnection_date || null);

    // Парсинг номера акта (формат: "123/2024" или просто "123")
    const [numberPart, yearPart] = (actNumber || '').split('/');
    const numberOnly = numberPart || '';
    const actNumberYear = yearPart || actYear || '';

    const logoSrc = usdLogo || '';

    let result = html;

    const replacements: Record<string, string> = {
      '{{LOGO_SRC}}': logoSrc,
      '{{NUMBER}}': numberOnly,
      '{{YEAR}}': actNumberYear,
      '{{ACT_DAY}}': actDay,
      '{{ACT_MONTH}}': actMonth,
      '{{ACT_YEAR}}': actYear,
      '{{PERSONAL_ACCOUNT}}': personal_account || '',
      '{{WORK_ORDER_NUMBER}}': work_order_number || '',
      '{{WORK_ORDER_DATE}}': workOrderDateFormatted,
      '{{DEBT_REASON}}': debt_reason || '',
      '{{APARTMENT_NUMBER}}': apartment_number || '',
      '{{HOUSE_NUMBER}}': house_number || '',
      '{{BUILDING_NUMBER}}': building_number || '',
      '{{STREET_NAME}}': street_name || '',
      '{{CITY_DISTRICT}}': city_district || '',
      '{{CUSTOMER_NAME}}': customer_name || '',
      '{{REPRESENTATIVE_POSITION}}': representative_position || '',
      '{{REPRESENTATIVE_NAME}}': representative_name || '',
      '{{DISCONNECTION_TIME_HOURS}}': disconnection_time_hours || '',
      '{{DISCONNECTION_TIME_MINUTES}}': disconnection_time_minutes || '',
      '{{EQUIPMENT_DESCRIPTION}}': equipment_description || '',
      '{{EQUIPMENT_COUNT}}': equipment_count || '',
      '{{DISCONNECTION_METHOD}}': disconnection_method || '',
      '{{SEAL_NUMBER}}': seal_number || '',
      '{{RECONNECTION_DATE}}': reconnectionDate,
      '{{RECONNECTION_MONTH}}': reconnectionMonth,
      '{{RECONNECTION_YEAR}}': reconnectionYear,
      '{{RECONNECTION_REPRESENTATIVE}}': reconnection_representative || '',
      '{{RECONNECTION_BASIS}}': reconnection_basis || '',
      '{{REPRESENTATIVE_SIGNATURE}}': (representative_signature && typeof representative_signature === 'object' && representative_signature.dataUrl) 
        ? `<img src="${representative_signature.dataUrl}" style="max-width: 200px; max-height: 80px;" />` 
        : '',
      '{{CUSTOMER_SIGNATURE}}': (customer_signature && typeof customer_signature === 'object' && customer_signature.dataUrl)
        ? `<img src="${customer_signature.dataUrl}" style="max-width: 200px; max-height: 80px;" />`
        : '',
      '{{RECONNECTION_REPRESENTATIVE_SIGNATURE}}': (reconnection_representative_signature && typeof reconnection_representative_signature === 'object' && reconnection_representative_signature.dataUrl)
        ? `<img src="${reconnection_representative_signature.dataUrl}" style="max-width: 200px; max-height: 80px;" />`
        : '',
    };

    Object.entries(replacements).forEach(([placeholder, value]) => {
      const re = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      result = result.replace(re, value);
    });

    return result;
  }, []);

  const get_pdf = useCallback(async (html: string, actData: DisconnectionActData, actNumber?: string, actDate?: string) => {
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
