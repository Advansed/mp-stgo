// Acts/ActSGE/ActSGEForm.tsx
import React from 'react';
import { IonLoading } from '@ionic/react';
import styles from './ActSGEForm.module.css';
import { useLoginStore } from '../../../Store/loginStore';
import { PageData } from '../../DataEditor/types';
import DataEditor from '../../DataEditor';
import { ActData, DisconnectionActData, Signature } from '../../../Store/ActTypes';

interface ActSGEFormProps {
  act:      ActData | null;
  onClose:  () => void;
  onSave:   (act: ActData) => void;
}

export const ActSGEForm: React.FC<ActSGEFormProps> = ({ act, onClose, onSave }) => {
  const user = useLoginStore(state => state.user);

  const getFormData = (actData?: DisconnectionActData): PageData => [
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
        { 
          label: 'Лицевой счет', 
          type: 'string', 
          data: actData?.personal_account || '', 
          validate: true 
        },
      ],
    },
    {
      title: 'Наряд-задание',
      data: [
          { 
              label: 'Номер наряда', 
              type: 'string', 
              data: actData?.work_order_number || '', 
              validate: true 
          },
          { 
              label: 'Дата наряда', 
              type: 'date', 
              data: actData?.work_order_date || '', 
              validate: true 
          },
          { 
              label: 'Причина отключения', 
              type: 'string', 
              data: actData?.debt_reason || '', 
              validate: true 
          },
      ],
    },
    {
      title: 'Адрес объекта',
      data: [
          { 
              label: 'Квартира №', 
              type: 'string', 
              data: actData?.apartment_number || '', 
              validate: true 
          },
          { 
              label: 'Дом №', 
              type: 'string', 
              data: actData?.house_number || '', 
              validate: true 
          },
          { 
              label: 'Корпус', 
              type: 'string', 
              data: actData?.building_number || '', 
              validate: true 
          },
          { 
              label: 'Улица', 
              type: 'string', 
              data: actData?.street_name || '', 
              validate: true 
          },
          { 
              label: 'Район города', 
              type: 'string', 
              data: actData?.city_district || '', 
              validate: true 
          },
      ],
    },
    {
      title: 'Заказчик',
      data: [
          { 
              label: 'ФИО заказчика', 
              type: 'string', 
              data: actData?.customer_name || '', 
              validate: true 
          },
      ],
    },
    {
      title: 'Представитель УГРС',
      data: [
          { 
              label: 'Должность', 
              type: 'string', 
              data: actData?.representative_position || '', 
              validate: true 
          },
          { 
              label: 'ФИО', 
              type: 'string', 
              data: actData?.representative_name || user?.full_name || '', 
              validate: true 
          },
      ],
    },
    {
      title: 'Отключение оборудования',
      data: [
        { 
          label: 'Время отключения (часы)', 
          type: 'string', 
          data: actData?.disconnection_time_hours || '', 
          validate: true 
        },
        { 
          label: 'Время отключения (минуты)', 
          type: 'string', 
          data: actData?.disconnection_time_minutes || '', 
          validate: true 
        },
        { 
          label: 'Описание оборудования', 
          type: 'string', 
          data: actData?.equipment_description || '', 
          validate: true 
        },
        { 
          label: 'Количество', 
          type: 'string', 
          data: actData?.equipment_count || '', 
          validate: true 
        },
        { 
          label: 'Способ отключения', 
          type: 'string', 
          data: actData?.disconnection_method || '', 
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
      title: 'Подключение оборудования',
      data: [
        { 
          label: 'Дата подключения', 
          type: 'date', 
          data: actData?.reconnection_date || '', 
          validate: false 
        },
        { 
          label: 'Представитель при подключении', 
          type: 'string', 
          data: actData?.reconnection_representative || '', 
          validate: false 
        },
        { 
          label: 'Основание для подключения', 
          type: 'string', 
          data: actData?.reconnection_basis || '', 
          validate: false 
        },
      ],
    },
    {
      title: 'Подписи и статус',
      data: [
        { 
          label: 'Подпись представителя', 
          type: 'sign', 
          data: actData?.representative_signature || { dataUrl : '', format: '' }, 
          validate: true 
        },
        { 
          label: 'Подпись заказчика', 
          type: 'sign', 
          data: actData?.customer_signature || { dataUrl : '', format: '' }, 
          validate: true 
        },
        { 
          label: 'Подпись при подключении', 
          type: 'sign', 
          data: actData?.reconnection_representative_signature || { dataUrl : '', format: '' }, 
          validate: false 
        },
      ],
    },
  ];

  const handleSave = (data: PageData) => {
    if (!act) return;

    const details: DisconnectionActData = {
      customer_name:                    data[3].data[0].data as string,
      personal_account:                 data[0].data[2].data as string,
      work_order_number:                data[1].data[0].data as string,
      work_order_date:                  data[1].data[1].data as string,
      debt_reason:                      data[1].data[2].data as string,
      apartment_number:                 data[2].data[0].data as string,
      house_number:                     data[2].data[1].data as string,
      building_number:                  data[2].data[2].data as string,
      street_name:                       data[2].data[3].data as string,
      city_district:                     data[2].data[4].data as string,
      representative_position:          data[4].data[0].data as string,
      representative_name:              data[4].data[1].data as string,
      disconnection_time_hours:         data[5].data[0].data as string,
      disconnection_time_minutes:       data[5].data[1].data as string,
      equipment_description:            data[5].data[2].data as string,
      equipment_count:                  data[5].data[3].data as string,
      disconnection_method:             data[5].data[4].data as string,
      seal_number:                      data[5].data[5].data as string,
      reconnection_date:                data[6].data[0].data as string || null,
      reconnection_representative:       data[6].data[1].data as string,
      reconnection_basis:                data[6].data[2].data as string,
      representative_signature:         (typeof data[7].data[0].data === 'object' && data[7].data[0].data !== null)
        ? (data[7].data[0].data as Signature)
        : { dataUrl: (data[7].data[0].data as string) || '', format: 'image/png' },
      customer_signature:                (typeof data[7].data[1].data === 'object' && data[7].data[1].data !== null)
        ? (data[7].data[1].data as Signature)
        : { dataUrl: (data[7].data[1].data as string) || '', format: 'image/png' },
      reconnection_representative_signature: (typeof data[7].data[2].data === 'object' && data[7].data[2].data !== null)
        ? (data[7].data[2].data as Signature)
        : { dataUrl: (data[7].data[2].data as string) || '', format: 'image/png' },
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

  if (act.type !== 'actsge') {
    return (
      <div className={styles.noAct}>
        <p>Неверный тип акта. Ожидается акт отключения бытового газоиспользующего газового оборудования (actsge).</p>
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
