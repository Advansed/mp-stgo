// Acts/ActBR/ActBRView.tsx
import React, { useState } from 'react';
import {
  IonLoading,
  IonButton,
  IonIcon,
  IonModal,
} from '@ionic/react';
import {
  printOutline,
  createOutline,
  documentOutline,
} from 'ionicons/icons';
import styles from './ActBRForm.module.css';
import { useToast } from '../../Toast';
import { ActData } from '../../../Store/ActTypes';
import { PDFDoc } from '../../Files';
import { t_actbr } from '../../../constants/templates';
import { useActBR } from './useActBR';

interface ActBRViewProps {
  act: ActData | null;
  onEdit: () => void;
}

export const ActBRView: React.FC<ActBRViewProps> = ({ act, onEdit }) => {
  const toast = useToast();
  const [modal, setModal] = useState<string | undefined>(undefined);

  const { isLoading, get_pdf } = useActBR();

  const handlePrint = async () => {
    if (!act || act.type !== 'actbr') return;

    const res = await get_pdf(t_actbr, act.details);
    console.log('get_pdf', res);
    
    if (res.success) {
      setModal(res.data);
      toast.success("PDF сгенерирован");
    } else {
      toast.error("Не удалось сгенерировать PDF");
    }
  };

  // Функция для рендеринга данных в режиме предпросмотра
  const renderPreviewData = () => {
    if (!act || act.type !== 'actbr') return [];

    const actData = act.details;
    const previewSections = [
      {
        title: 'Основная информация',
        data: [
          { label: 'Номер акта', value: act.act_number || '—' },
          { label: 'Дата акта', value: act.act_date ? new Date(act.act_date).toLocaleDateString('ru-RU') : '—' },
        ],
      },
      {
        title: 'Исполнитель',
        data: [
          { label: 'ФИО', value: actData?.technician_name || '—' },
          { label: 'Должность', value: actData?.technician_position || '—' },
        ],
      },
      {
        title: 'Владелец',
        data: [
          { label: 'ФИО владельца', value: actData?.owner_name || '—' },
          { label: 'Телефон', value: actData?.owner_phone || '—' },
        ],
      },
      {
        title: 'Объект',
        data: [
          { label: 'Тип объекта', value: actData?.object_type || '—' },
          { 
            label: 'Адрес', 
            value: actData?.object_address 
              ? (typeof actData.object_address === 'string' 
                  ? actData.object_address 
                  : (actData.object_address as any)?.address || '—')
              : '—' 
          },
        ],
      },
      {
        title: 'Снятый счетчик',
        data: [
          { label: 'Дата снятия', value: actData?.removal_date ? new Date(actData.removal_date).toLocaleDateString('ru-RU') : '—' },
          { label: 'Модель', value: actData?.removed_meter_model || '—' },
          { label: 'Номер', value: actData?.removed_meter_number || '—' },
          { label: 'Показания', value: actData?.removed_meter_reading || '—' },
          { label: 'Номер пломбы', value: actData?.removed_seal_number || '—' },
        ],
      },
      {
        title: 'Установленный счетчик',
        data: [
          { label: 'Дата установки', value: actData?.installation_date ? new Date(actData.installation_date).toLocaleDateString('ru-RU') : '—' },
          { label: 'Модель', value: actData?.installed_meter_model || '—' },
          { label: 'Номер', value: actData?.installed_meter_number || '—' },
          { label: 'Показания', value: actData?.installed_meter_reading || '—' },
          { label: 'Номер пломбы', value: actData?.installed_seal_number || '—' },
        ],
      },
      {
        title: 'Подписи и статус',
        data: [
          { label: 'Подпись техника', value: actData?.technician_signature || '—' },
          { label: 'Подпись владельца', value: actData?.owner_signature || '—' },
          { label: 'Статус', value: act?.status || '—' },
          { label: 'Путь к скану', value: act?.document_scan_path || '—' },
        ],
      },
    ];

    return previewSections;
  };

  const previewSections = renderPreviewData();

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
      <IonLoading isOpen={isLoading} message="Подождите..." />
      <div className={styles.batteryActForm}>
        <div className={styles.formHeaderLeft}>
          <h2 className={styles.formTitle}><b>Акт замены батареи</b></h2>
        </div>
        <div className={styles.formHeader}>
          <div className={`${styles.formActions} ${styles.formActionsButtons}`}>
            <div className='w-50'>
              <IonButton onClick={handlePrint} fill="solid" expand='block' color="primary">
                <IonIcon slot="start" icon={printOutline} />
                Предпросмотр PDF
              </IonButton>
            </div>
            <div className='w-50'>
              <IonButton onClick={onEdit} fill="solid" expand="block" color="secondary">
                <IonIcon slot="start" icon={createOutline} />
                Изменить
              </IonButton>
            </div>
          </div>
        </div>

        <div className={styles.formScrollContainer}>
          <div className={styles.batteryActFormCard}>
            <div className={styles.batteryActFormContent}>
              {previewSections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className={styles.previewModeFormSection}
                >
                  <h3 className={styles.previewModeSectionTitle}>
                    {section.title}
                  </h3>
                  <div className={styles.previewModeSectionContent}>
                    {section.data.map((field, fieldIndex) => (
                      <div key={fieldIndex} className={styles.previewField}>
                        <span className={styles.previewLabel}>
                          {field.label}:
                        </span>
                        <span className={styles.previewValue}>
                          {field.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <IonModal
        className={styles.modal}
        isOpen={modal !== undefined}
        onDidDismiss={() => setModal(undefined)}
      >
        <div className={styles.modalContent}>
          <div className="w-auto h-auto">
            {modal ? (
              <PDFDoc url={modal} onClose={() => setModal(undefined)} />
            ) : (
              <div className={styles.noPdf}>
                <IonIcon icon={documentOutline} className={styles.noPdfIcon} />
                <p>PDF документ не загружен</p>
              </div>
            )}
          </div>
        </div>
      </IonModal>
    </>
  );
};
