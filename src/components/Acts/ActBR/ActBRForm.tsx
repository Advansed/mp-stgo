// Acts/ActBR/ActBRForm.tsx
import React, { useEffect, useState } from 'react';
import { IonLoading } from '@ionic/react';
import styles from './ActBRForm.module.css';
import { useLoginStore } from '../../../Store/loginStore';
import { PageData } from '../../DataEditor/types';
import DataEditor from '../../DataEditor';
import { ActData, BatteryReplacementData, ActStatus, Signature } from '../../../Store/ActTypes';

interface ActBRFormProps {
  act:      ActData | null;
  onClose:  () => void;
  onSave:   (act: ActData) => void;
}

export const ActBRForm: React.FC<ActBRFormProps> = ({ act, onClose, onSave }) => {
  const user = useLoginStore(state => state.user);

  const getFormData = (actData?: BatteryReplacementData): PageData => [
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
              label: 'ФИО', 
              type: 'string', 
              data: actData?.technician_name || user?.full_name || '', 
              validate: true 
          },
          { 
              label: 'Должность', 
              type: 'string', 
              data: actData?.technician_position || '', 
              validate: true 
          },
      ],
    },
    {
      title: 'Владелец',
      data: [
          { 
              label: 'ФИО владельца', 
              type: 'string', 
              data: actData?.owner_name || '', 
              validate: true 
          },
          { 
              label: 'Телефон', 
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
          label:  'Тип объекта', 
          type:   'select', 
          values: ['Жилой дом', 'Гараж', 'Баня', 'Другое'],
          data: actData?.object_type || '', 
          validate: true 
        },
        { 
          label: 'Адрес', 
          type: 'address', 
          data: actData?.object_address || '', 
          validate: true 
        },
      ],
    },
    {
      title: 'Снятый счетчик',
      data: [
        { 
          label: 'Дата снятия', 
          type: 'date', 
          data: actData?.removal_date || '', 
          validate: true 
        },
        { 
          label: 'Модель', 
          type: 'string', 
          data: actData?.removed_meter_model || '', 
          validate: true 
        },
        { 
          label: 'Номер', 
          type: 'string', 
          data: actData?.removed_meter_number || '', 
          validate: true 
        },
        { 
          label: 'Показания', 
          type: 'string', 
          data: actData?.removed_meter_reading || '', 
          validate: true 
        },
        { 
          label: 'Номер пломбы', 
          type: 'string', 
          data: actData?.removed_seal_number || '', 
          validate: false 
        },
      ],
    },
    {
      title: 'Установленный счетчик',
      data: [
        { 
          label: 'Дата установки', 
          type: 'date', 
          data: actData?.installation_date || '', 
          validate: true 
        },
        { 
          label: 'Модель', 
          type: 'string', 
          data: actData?.installed_meter_model || '', 
          validate: true 
        },
        { 
          label: 'Номер', 
          type: 'string', 
          data: actData?.installed_meter_number || '', 
          validate: true 
        },
        { 
          label: 'Показания', 
          type: 'string', 
          data: actData?.installed_meter_reading || '', 
          validate: true 
        },
        { 
          label: 'Номер пломбы', 
          type: 'string', 
          data: actData?.installed_seal_number || '', 
          validate: false 
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
          label: 'Подпись владельца', 
          type: 'sign', 
          data: actData?.owner_signature || { dataUrl : '', format: '' }, 
          validate: true 
        },
      ],
    },
  ];

  const handleSave = (data: PageData) => {
    if (!act) return;

    const details: BatteryReplacementData = {
      technician_position:        data[1].data[1].data as string,
      technician_name:            data[1].data[0].data as string,
      owner_name:                 data[2].data[0].data as string,
      owner_phone:                data[2].data[1].data as string,
      object_type:                data[3].data[0].data as string,
      object_address:             data[3].data[1].data as string,
      removal_date:               data[4].data[0].data as string,
      removed_meter_model:        data[4].data[1].data as string,
      removed_meter_number:       data[4].data[2].data as string,
      removed_meter_reading:      data[4].data[3].data as string,
      removed_seal_number:        data[4].data[4].data as string,
      installation_date:          data[5].data[0].data as string,
      installed_meter_model:      data[5].data[1].data as string,
      installed_meter_number:     data[5].data[2].data as string,
      installed_meter_reading:    data[5].data[3].data as string,
      installed_seal_number:      data[5].data[4].data as string,
      technician_signature:       (typeof data[6].data[0].data === 'object' && data[6].data[0].data !== null)
        ? (data[6].data[0].data as Signature)
        : { dataUrl: (data[6].data[0].data as string) || '', format: 'image/png' },
      owner_signature:            (typeof data[6].data[1].data === 'object' && data[6].data[1].data !== null)
        ? (data[6].data[1].data as Signature)
        : { dataUrl: (data[6].data[1].data as string) || '', format: 'image/png' },
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

  if (act.type !== 'actbr') {
    return (
      <div className={styles.noAct}>
        <p>Неверный тип акта. Ожидается акт замены батареи (actbr).</p>
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
