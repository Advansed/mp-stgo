// hooks/useActMI.ts
import { useState, useCallback } from 'react';
import { MeterInstallationData, Signature } from '../../../Store/ActTypes';
import { useToken } from '../../../Store/loginStore';
import { useToast } from '../../Toast';
import { post } from '../../../Store/api';
import { USD_LOGO_BASE64 } from '../../../constants/logo';

const usdLogo = USD_LOGO_BASE64;

interface UseActMIResult {
  isLoading: boolean;
  get_pdf: (html: string, actData: MeterInstallationData, actNumber?: string, actDate?: string) => Promise<any>;
}

export const useActMI = (): UseActMIResult => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useToken();
  const toast = useToast();

  const fillTemplate = useCallback((actData: MeterInstallationData, html: string, actNumber?: string, actDate?: string): string => {
    const {
      technician_name,
      owner_name,
      owner_phone,
      object_address,
      installation_date,
      meter_model,
      meter_number,
      meter_reading,
      seal_number,
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

    const installationDateFormatted = formatDate(installation_date);

    const logoSrc = usdLogo || '';

    let result = html;

    const replacements: Record<string, string> = {
      '{{LOGO_SRC}}': logoSrc,
      '{{TECHNICIAN_NAME}}': technician_name || '',
      '{{OWNER_NAME}}': owner_name || '',
      '{{OWNER_PHONE}}': owner_phone || '',
      '{{OBJECT_ADDRESS}}':
        typeof object_address === 'string'
          ? object_address
          : (object_address as any)?.address || '',
      '{{INSTALLATION_DATE}}': installationDateFormatted,
      '{{METER_MODEL}}': meter_model || '',
      '{{METER_NUMBER}}': meter_number || '',
      '{{METER_READING}}': meter_reading || '',
      '{{SEAL_NUMBER}}': seal_number || '',
      '{{TECHNICIAN_SIGNATURE}}': (technician_signature && typeof technician_signature === 'object' && technician_signature.dataUrl) 
        ? `<img src="${technician_signature.dataUrl}" style="max-width: 200px; max-height: 80px;" />` 
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

  const get_pdf = useCallback(async (html: string, actData: MeterInstallationData, actNumber?: string, actDate?: string) => {
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
