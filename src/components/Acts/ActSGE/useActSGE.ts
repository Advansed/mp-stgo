// hooks/useActSGE.ts
import { useState, useCallback } from 'react';
import { useToken } from '../../../Store/loginStore';
import { useToast } from '../../Toast';
import { post } from '../../../Store/api';
import { USD_LOGO_BASE64 } from '../../../constants/logo';

const usdLogo = USD_LOGO_BASE64

interface DisconnectionActData {
  invoice_id?: string;
  act_number?: string;
  act_date?: string;
  personal_account?: string;
  work_order_number?: string;
  work_order_date?: string;
  debt_reason?: string;
  apartment_number?: string;
  house_number?: string;
  building_number?: string;
  street_name?: string;
  city_district?: string;
  customer_name?: string;
  representative_position?: string;
  representative_name?: string;
  disconnection_time_hours?: string;
  disconnection_time_minutes?: string;
  equipment_description?: string;
  equipment_count?: string;
  disconnection_method?: string;
  seal_number?: string;
  reconnection_date?: string;
  reconnection_representative?: string;
  reconnection_basis?: string;
  representative_signature?: string;
  customer_signature?: string;
  reconnection_representative_signature?: string;
  status?: string;
  document_scan_path?: string;
}

interface UseActSGEResult {
  actData: DisconnectionActData | null;
  isLoading: boolean;
  loadData: (invoiceId?: string) => Promise<void>;
  saveData: (data: DisconnectionActData) => Promise<void>;
  get_pdf: (html: string) => Promise<any>;
}


export const useActSGE = (): UseActSGEResult => {
  const [actData, setActData]       = useState<DisconnectionActData | null>(null);
  const [isLoading, setIsLoading]   = useState(false);
  const { token }                   = useToken();
  const toast                       = useToast();

  const loadData                    = useCallback(async (invoiceId?: string) => {
    setIsLoading(true);
    try {
      const res = await post('mp_get_actsge', { token, invoice_id: invoiceId });
      if (res.success) {
        setActData(res.data);
      } else toast.error(res.message);
    } catch (e: any) {
      toast.error("Ошибка получения данных:" + e.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const saveData                    = useCallback(async (data: DisconnectionActData) => {
    setIsLoading(true);
    try {
      const payload = { ...data, token };
      const res = await post('mp_set_actsge', payload);
      console.log('mp_set_actsge', res);
      if (res.success) {
        setActData(res.data);
      } else toast.error(res.message);
    } catch (e: any) {
      toast.error('saveData ActSGE error', e.message);
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
    
    // Извлекаем данные из actData и форматируем даты
    const {
      act_number,
      act_date,
      personal_account,
      work_order_number,
      work_order_date,
      debt_reason,
      apartment_number,
      house_number,
      building_number,
      street_name,
      city_district,
      customer_name,
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

    // Функции форматирования дат
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

    // Форматируем даты
    const actDay = getDay(act_date);
    const actMonth = getMonthName(act_date);
    const actYear = getYear(act_date);
    const workOrderDateFormatted = formatDate(work_order_date);
    const reconnectionDate = getDay(reconnection_date);
    const reconnectionMonth = getMonthName(reconnection_date);
    const reconnectionYear = getYear(reconnection_date);

    // Разбираем номер акта на номер и год
    const [numberPart, yearPart] = (act_number || '').split('/');
    const numberOnly = numberPart || '';
    const actNumberYear = yearPart || actYear || '';

    let result = html;
    const replacements: Record<string, string> = {
      '{{LOGO_SRC}}': usdLogo,
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
      '{{REPRESENTATIVE_SIGNATURE}}': representative_signature || '',
      '{{CUSTOMER_SIGNATURE}}': customer_signature || '',
      '{{RECONNECTION_REPRESENTATIVE_SIGNATURE}}': reconnection_representative_signature || '',
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