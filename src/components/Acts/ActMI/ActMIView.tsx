// Acts/ActMI/ActMIView.tsx
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
import styles from './ActMIForm.module.css';
import { useToast } from '../../Toast';
import { ActData, Signature } from '../../../Store/ActTypes';
import { PDFDoc } from '../../Files';
import { t_actmi } from '../../../constants/templates';
import { useActMI } from './useActMI';

interface ActMIViewProps {
  act: ActData | null;
  onBack?: () => void;
  onEdit: () => void;
}

export const ActMIView: React.FC<ActMIViewProps> = ({ act, onBack, onEdit }) => {
  const toast = useToast();
  const [modal, setModal] = useState<string | undefined>(undefined);
  const { isLoading, get_pdf } = useActMI();

  const handlePrint = async () => {
    if (!act || act.type !== 'actmi') return;

    const res = await get_pdf(t_actmi, act.details, act.act_number, act.act_date);
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
    if (!act || act.type !== 'actmi') return [];
    
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
          { label: 'ФИО техника', value: actData?.technician_name || '—' },
        ],
      },
      {
        title: 'Абонент',
        data: [
          { label: 'ФИО абонента', value: actData?.owner_name || '—' },
          { label: 'Телефон абонента', value: actData?.owner_phone || '—' },
        ],
      },
      {
        title: 'Объект',
        data: [
          { label: 'Адрес объекта', value: formatAddress(actData?.object_address) },
        ],
      },
      {
        title: 'Счетчик',
        data: [
          { label: 'Дата установки', value: formatDate(actData?.installation_date) },
          { label: 'Модель счетчика', value: actData?.meter_model || '—' },
          { label: 'Заводской номер', value: actData?.meter_number || '—' },
          { label: 'Первичные показания', value: actData?.meter_reading || '—' },
          { label: 'Номер пломбы', value: actData?.seal_number || '—' },
        ],
      },
      {
        title: 'Подписи и статус',
        data: [
          { label: 'Подпись техника', value: formatSignature(actData?.technician_signature) },
          { label: 'Подпись абонента', value: formatSignature(actData?.owner_signature) },
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

  if (act.type !== 'actmi') {
    return (
      <div className={styles.noAct}>
        <p>Неверный тип акта. Ожидается акт установки газового счетчика (actmi).</p>
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
          <h2 className={styles.formTitle}><b>Акт установки газового счетчика</b></h2>
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
