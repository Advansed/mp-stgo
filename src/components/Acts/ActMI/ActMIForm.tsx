// Acts/ActMI/ActMIForm.tsx
import React from 'react';
import { IonLoading } from '@ionic/react';
import styles from './ActMIForm.module.css';
import { useLoginStore } from '../../../Store/loginStore';
import { PageData } from '../../DataEditor/types';
import DataEditor from '../../DataEditor';
import { ActData, MeterInstallationData, Signature } from '../../../Store/ActTypes';

interface ActMIFormProps {
  act:      ActData | null;
  onClose:  () => void;
  onSave:   (act: ActData) => void;
}

export const ActMIForm: React.FC<ActMIFormProps> = ({ act, onClose, onSave }) => {
  const user = useLoginStore(state => state.user);

  const getFormData = (actData?: MeterInstallationData): PageData => [
    {
      title: 'Основная информация',
      data: [
        { 
          label: 'Номер акта', 
          type: 'string', 
          data: act?.act_number || '', 
          validate: true 
        },
        { 
          label: 'Дата акта', 
          type: 'date', 
          data: act?.act_date || new Date().toISOString().split('T')[0], 
          validate: true 
        },
      ],
    },
    {
      title: 'Исполнитель',
      data: [
          { 
              label: 'ФИО техника', 
              type: 'string', 
              data: actData?.technician_name || user?.full_name || '', 
              validate: true 
          },
      ],
    },
    {
      title: 'Абонент',
      data: [
          { 
              label: 'ФИО абонента', 
              type: 'string', 
              data: actData?.owner_name || '', 
              validate: true 
          },
          { 
              label: 'Телефон абонента', 
              type: 'string', 
              data: actData?.owner_phone || '', 
              validate: true 
          },
      ],
    },
    {
      title: 'Объект',
      data: [
        { 
          label: 'Адрес объекта', 
          type: 'address', 
          data: actData?.object_address || '', 
          validate: true 
        },
      ],
    },
    {
      title: 'Счетчик',
      data: [
        { 
          label: 'Дата установки', 
          type: 'date', 
          data: actData?.installation_date || '', 
          validate: true 
        },
        { 
          label: 'Модель счетчика', 
          type: 'string', 
          data: actData?.meter_model || '', 
          validate: true 
        },
        { 
          label: 'Заводской номер', 
          type: 'string', 
          data: actData?.meter_number || '', 
          validate: true 
        },
        { 
          label: 'Первичные показания', 
          type: 'string', 
          data: actData?.meter_reading || '', 
          validate: true 
        },
        { 
          label: 'Номер пломбы', 
          type: 'string', 
          data: actData?.seal_number || '', 
          validate: true 
        },
      ],
    },
    {
      title: 'Подписи и статус',
      data: [
        { 
          label: 'Подпись техника', 
          type: 'sign', 
          data: actData?.technician_signature || { dataUrl : '', format: '' }, 
          validate: true 
        },
        { 
          label: 'Подпись абонента', 
          type: 'sign', 
          data: actData?.owner_signature || { dataUrl : '', format: '' }, 
          validate: true 
        },
      ],
    },
  ];

  const handleSave = (data: PageData) => {
    if (!act) return;

    const details: MeterInstallationData = {
      technician_name:            data[1].data[0].data as string,
      owner_name:                data[2].data[0].data as string,
      owner_phone:               data[2].data[1].data as string,
      object_address:            data[3].data[0].data as string,
      installation_date:         data[4].data[0].data as string,
      meter_model:               data[4].data[1].data as string,
      meter_number:              data[4].data[2].data as string,
      meter_reading:             data[4].data[3].data as string,
      seal_number:               data[4].data[4].data as string,
      technician_signature:       (typeof data[5].data[0].data === 'object' && data[5].data[0].data !== null)
        ? (data[5].data[0].data as Signature)
        : { dataUrl: (data[5].data[0].data as string) || '', format: 'image/png' },
      owner_signature:            (typeof data[5].data[1].data === 'object' && data[5].data[1].data !== null)
        ? (data[5].data[1].data as Signature)
        : { dataUrl: (data[5].data[1].data as string) || '', format: 'image/png' },
    };

    const updatedAct: any = {
      ...act,
      act_number:                 data[0].data[0].data as string,
      act_date:                   data[0].data[1].data as string,
      status:                     'draft',
      document_scan_path:         '',
      details:                    details,
      updated_at:                 new Date().toISOString(),
    };

    onSave(updatedAct);
  };

  if (!act) {
    return (
      <div className={styles.noAct}>
        <p>Акт не найден</p>
      </div>
    );
  }

  if (act.type !== 'actmi') {
    return (
      <div className={styles.noAct}>
        <p>Неверный тип акта. Ожидается акт установки газового счетчика (actmi).</p>
      </div>
    );
  }

  return (
    <>
      <IonLoading isOpen={false} message="Подождите..." />
      <DataEditor
        data    ={getFormData(act.details)}
        onSave  ={handleSave}
        onBack  ={ onClose } // Этот проп будет обработан в родительском компоненте
      />
    </>
  );
};
