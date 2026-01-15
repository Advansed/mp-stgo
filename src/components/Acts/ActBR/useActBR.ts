// hooks/useActBR.ts
import { useState, useCallback } from 'react';
import { BatteryReplacementData } from '../../../Store/ActTypes';
import { useToken } from '../../../Store/loginStore';
import { useToast } from '../../Toast';
import { post } from '../../../Store/api';
import { USD_LOGO_BASE64 } from '../../../constants/logo';

const usdLogo = USD_LOGO_BASE64;

interface UseActBRResult {
  isLoading: boolean;
  get_pdf: (html: string, actData: BatteryReplacementData) => Promise<any>;
}

export const useActBR = (): UseActBRResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useToken();
  const toast = useToast();

  const fillTemplate = useCallback((actData: BatteryReplacementData, html: string): string => {
    const {
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

    const formatDate = (value?: string): string => {
      if (!value) return '';
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return '';
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}.${month}.${year}`;
    };

    const getYear = (value?: string): string => {
      if (!value) return '';
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return '';
      return String(d.getFullYear());
    };

    const removalDateFormatted = formatDate(removal_date);
    const removalYear = getYear(removal_date);

    const installationDateFormatted = formatDate(installation_date);
    const installationYear = getYear(installation_date);

    const logoSrc = usdLogo || '';

    let result = html;

    const replacements: Record<string, string> = {
      '{{LOGO_SRC}}': logoSrc,
      '{{TECHNICIAN_NAME}}': technician_name || '',
      '{{OWNER_NAME}}': owner_name || '',
      '{{OBJECT_TYPE}}': object_type || '',
      '{{OBJECT_ADDRESS}}':
        typeof object_address === 'string'
          ? object_address
          : (object_address as any)?.address || '',

      '{{REMOVAL_DATE}}': removalDateFormatted,
      '{{REMOVAL_YEAR}}': removalYear,
      '{{REMOVED_METER_MODEL}}': removed_meter_model || '',
      '{{REMOVED_METER_NUMBER}}': removed_meter_number || '',
      '{{REMOVED_METER_READING}}': removed_meter_reading || '',
      '{{REMOVED_SEAL_NUMBER}}': removed_seal_number || '',

      '{{INSTALLATION_DATE}}': installationDateFormatted,
      '{{INSTALLATION_YEAR}}': installationYear,
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
  }, []);

  const get_pdf = useCallback(async (html: string, actData: BatteryReplacementData) => {
    try {
      setIsLoading(true);
      const template = fillTemplate(actData, html);
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