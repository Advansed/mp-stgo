// Acts/ActBR/ActBRView.tsx
import React, { useState, useMemo } from 'react';
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
  arrowBackOutline,
} from 'ionicons/icons';
import styles from './ActBRForm.module.css';
import { useToast } from '../../Toast';
import { ActData, Signature } from '../../../Store/ActTypes';
import { PDFDoc } from '../../Files';
import { t_actbr } from '../../../constants/templates';
import { useActBR } from './useActBR';

interface ActBRViewProps {
  act: ActData | null;
  onBack?: () => void;
  onEdit: () => void;
}

export const ActBRView: React.FC<ActBRViewProps> = ({ act, onBack, onEdit }) => {
  const toast = useToast();
  const [modal, setModal] = useState<string | undefined>(undefined);
  const { isLoading, get_pdf } = useActBR();

  const handlePrint = async () => {
    if (!act || act.type !== 'actbr') return;

    const res = await get_pdf(t_actbr, act.details);
    if (res.success) {
      setModal(res.data);
      toast.success("PDF сгенерирован");
    } else {
      toast.error("Не удалось сгенерировать PDF");
    }
  };

  // Форматирование адреса
  const formatAddress = (address: string | { address?: string } | undefined): string => {
    if (!address) return '—';
    return typeof address === 'string' ? address : address.address || '—';
  };

  // Форматирование даты
  const formatDate = (date: string | undefined): string => {
    return date ? new Date(date).toLocaleDateString('ru-RU') : '—';
  };

  // Форматирование подписи
  const formatSignature = (signature: Signature | undefined): string => {
    if (!signature || !signature.dataUrl) return '—';
    return signature.dataUrl ? 'Подпись присутствует' : '—';
  };

  // Создание секций для отображения
  const previewSections = useMemo(() => {
    if (!act || act.type !== 'actbr') return [];
    
    const actData = act.details;
    return [
      {
        title: 'Основная информация',
        data: [
          { label: 'Номер акта', value: act.act_number || '—' },
          { label: 'Дата акта', value: formatDate(act.act_date) },
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
          { label: 'Адрес', value: formatAddress(actData?.object_address) },
        ],
      },
      {
        title: 'Снятый счетчик',
        data: [
          { label: 'Дата снятия', value: formatDate(actData?.removal_date) },
          { label: 'Модель', value: actData?.removed_meter_model || '—' },
          { label: 'Номер', value: actData?.removed_meter_number || '—' },
          { label: 'Показания', value: actData?.removed_meter_reading || '—' },
          { label: 'Номер пломбы', value: actData?.removed_seal_number || '—' },
        ],
      },
      {
        title: 'Установленный счетчик',
        data: [
          { label: 'Дата установки', value: formatDate(actData?.installation_date) },
          { label: 'Модель', value: actData?.installed_meter_model || '—' },
          { label: 'Номер', value: actData?.installed_meter_number || '—' },
          { label: 'Показания', value: actData?.installed_meter_reading || '—' },
          { label: 'Номер пломбы', value: actData?.installed_seal_number || '—' },
        ],
      },
      {
        title: 'Подписи и статус',
        data: [
          { label: 'Подпись техника', value: formatSignature(actData?.technician_signature) },
          { label: 'Подпись владельца', value: formatSignature(actData?.owner_signature) },
          { label: 'Статус', value: act?.status || '—' },
          { label: 'Путь к скану', value: act?.document_scan_path || '—' },
        ],
      },
    ];
  }, [act]);

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
        {/* Заголовок с кнопкой назад */}
        <div className={styles.formHeaderLeft}>
          {onBack && (
            <IonButton 
              fill="clear" 
              onClick={onBack}
              className="back-button"
              style={{ marginRight: '8px' }}
            >
              <IonIcon icon={arrowBackOutline} slot="start" />
              Назад
            </IonButton>
          )}
          <h2 className={styles.formTitle}><b>Акт замены батареи</b></h2>
        </div>

        {/* Кнопки действий */}
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

        {/* Контент */}
        <div className={styles.formScrollContainer}>
          <div className={styles.batteryActFormCard}>
            <div className={styles.batteryActFormContent}>
              {previewSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className={styles.previewModeFormSection}>
                  <h3 className={styles.previewModeSectionTitle}>{section.title}</h3>
                  <div className={styles.previewModeSectionContent}>
                    {section.data.map((field, fieldIndex) => (
                      <div key={fieldIndex} className={styles.previewField}>
                        <span className={styles.previewLabel}>{field.label}:</span>
                        <span className={styles.previewValue}>{field.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно для PDF */}
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
