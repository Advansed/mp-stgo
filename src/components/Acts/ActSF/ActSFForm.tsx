// Acts/ActSF/ActSFForm.tsx
import React from 'react';
import { IonLoading } from '@ionic/react';
import styles from './ActSFForm.module.css';
import { useLoginStore } from '../../../Store/loginStore';
import { PageData } from '../../DataEditor/types';
import DataEditor from '../../DataEditor';
import { ActData, SealBreakData, Signature } from '../../../Store/ActTypes';

interface ActSFFormProps {
  act:      ActData | null;
  onClose:  () => void;
  onSave:   (act: ActData) => void;
}

export const ActSFForm: React.FC<ActSFFormProps> = ({ act, onClose, onSave }) => {
  const user = useLoginStore(state => state.user);

  const getFormData = (actData?: SealBreakData): PageData => [
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
      title: 'Исполнители',
      data: [
          { 
              label: 'ФИО слесаря 1', 
              type: 'string', 
              data: actData?.technician1_name || user?.full_name || '', 
              validate: true 
          },
          { 
              label: 'ФИО слесаря 2', 
              type: 'string', 
              data: actData?.technician2_name || '', 
              validate: false 
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
          label: 'Улица', 
          type: 'string', 
          data: actData?.street || '', 
          validate: true 
        },
        { 
          label: 'Дом', 
          type: 'string', 
          data: actData?.house || '', 
          validate: true 
        },
        { 
          label: 'Квартира', 
          type: 'string', 
          data: actData?.apartment || '', 
          validate: false 
        },
      ],
    },
    {
      title: 'Сорванная пломба',
      data: [
        { 
          label: 'Дата срыва', 
          type: 'date', 
          data: actData?.break_date || '', 
          validate: true 
        },
        { 
          label: 'Номер пломбы', 
          type: 'string', 
          data: actData?.break_seal_number || '', 
          validate: true 
        },
        { 
          label: 'Цвет пломбы', 
          type: 'string', 
          data: actData?.break_seal_color || '', 
          validate: false 
        },
        { 
          label: 'Модель счетчика', 
          type: 'string', 
          data: actData?.break_meter_model || '', 
          validate: true 
        },
        { 
          label: 'Номер счетчика', 
          type: 'string', 
          data: actData?.break_meter_number || '', 
          validate: true 
        },
        { 
          label: 'Показания', 
          type: 'string', 
          data: actData?.break_meter_reading || '', 
          validate: true 
        },
        { 
          label: 'Причина срыва', 
          type: 'string', 
          data: actData?.reason || '', 
          validate: true 
        },
      ],
    },
    {
      title: 'Установленная пломба',
      data: [
        { 
          label: 'Дата установки', 
          type: 'date', 
          data: actData?.install_date || '', 
          validate: true 
        },
        { 
          label: 'Номер пломбы', 
          type: 'string', 
          data: actData?.install_seal_number || '', 
          validate: true 
        },
        { 
          label: 'Цвет пломбы', 
          type: 'string', 
          data: actData?.install_seal_color || '', 
          validate: false 
        },
        { 
          label: 'Модель счетчика', 
          type: 'string', 
          data: actData?.install_meter_model || '', 
          validate: true 
        },
        { 
          label: 'Номер счетчика', 
          type: 'string', 
          data: actData?.install_meter_number || '', 
          validate: true 
        },
        { 
          label: 'Показания', 
          type: 'string', 
          data: actData?.install_meter_reading || '', 
          validate: true 
        },
      ],
    },
    {
      title: 'Подписи и статус',
      data: [
        { 
          label: 'Подпись слесаря 1', 
          type: 'sign', 
          data: actData?.technician1_signature || { dataUrl : '', format: '' }, 
          validate: true 
        },
        { 
          label: 'Подпись слесаря 2', 
          type: 'sign', 
          data: actData?.technician2_signature || { dataUrl : '', format: '' }, 
          validate: false 
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

    const details: SealBreakData = {
      technician1_name:           data[1].data[0].data as string,
      technician2_name:            data[1].data[1].data as string,
      technician_position:        data[1].data[2].data as string,
      owner_name:                  data[2].data[0].data as string,
      owner_phone:                 data[2].data[1].data as string,
      object_type:                 data[3].data[0].data as string,
      street:                      data[3].data[1].data as string,
      house:                       data[3].data[2].data as string,
      apartment:                   data[3].data[3].data as string,
      break_date:                  data[4].data[0].data as string,
      break_seal_number:           data[4].data[1].data as string,
      break_seal_color:            data[4].data[2].data as string,
      break_meter_model:           data[4].data[3].data as string,
      break_meter_number:          data[4].data[4].data as string,
      break_meter_reading:         data[4].data[5].data as string,
      reason:                      data[4].data[6].data as string,
      install_date:                data[5].data[0].data as string,
      install_seal_number:         data[5].data[1].data as string,
      install_seal_color:          data[5].data[2].data as string,
      install_meter_model:         data[5].data[3].data as string,
      install_meter_number:        data[5].data[4].data as string,
      install_meter_reading:       data[5].data[5].data as string,
      technician1_signature:       (typeof data[6].data[0].data === 'object' && data[6].data[0].data !== null)
        ? (data[6].data[0].data as Signature)
        : { dataUrl: (data[6].data[0].data as string) || '', format: 'image/png' },
      technician2_signature:       (typeof data[6].data[1].data === 'object' && data[6].data[1].data !== null)
        ? (data[6].data[1].data as Signature)
        : { dataUrl: (data[6].data[1].data as string) || '', format: 'image/png' },
      owner_signature:              (typeof data[6].data[2].data === 'object' && data[6].data[2].data !== null)
        ? (data[6].data[2].data as Signature)
        : { dataUrl: (data[6].data[2].data as string) || '', format: 'image/png' },
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

  if (act.type !== 'actsf') {
    return (
      <div className={styles.noAct}>
        <p>Неверный тип акта. Ожидается акт срыва пломбы (actsf).</p>
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
