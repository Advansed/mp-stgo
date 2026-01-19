// Acts/ActSGE/ActSGEView.tsx
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
import styles from './ActSGEForm.module.css';
import { useToast } from '../../Toast';
import { ActData, Signature } from '../../../Store/ActTypes';
import { PDFDoc } from '../../Files';
import { t_actsge } from '../../../constants/templates';
import { useActSGE } from './useActSGE';

interface ActSGEViewProps {
  act: ActData | null;
  onBack?: () => void;
  onEdit: () => void;
}

export const ActSGEView: React.FC<ActSGEViewProps> = ({ act, onBack, onEdit }) => {
  const toast = useToast();
  const [modal, setModal] = useState<string | undefined>(undefined);
  const { isLoading, get_pdf } = useActSGE();

  const handlePrint = async () => {
    if (!act || act.type !== 'actsge') return;

    const res = await get_pdf(t_actsge, act.details, act.act_number, act.act_date);
    if (res.success) {
      setModal(res.data);
      toast.success("PDF сгенерирован");
    } else {
      toast.error("Не удалось сгенерировать PDF");
    }
  };

  // Форматирование даты
  const formatDate = (date: string | undefined | null): string => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('ru-RU');
  };

  // Форматирование подписи
  const formatSignature = (signature: Signature | undefined): string => {
    if (!signature || !signature.dataUrl) return '—';
    return signature.dataUrl ? 'Подпись присутствует' : '—';
  };

  // Создание секций для отображения
  const previewSections = useMemo(() => {
    if (!act || act.type !== 'actsge') return [];
    
    const actData = act.details;
    return [
      {
        title: 'Основная информация',
        data: [
          { label: 'Номер акта', value: act.act_number || '—' },
          { label: 'Дата акта', value: formatDate(act.act_date) },
          { label: 'Лицевой счет', value: actData?.personal_account || '—' },
        ],
      },
      {
        title: 'Наряд-задание',
        data: [
          { label: 'Номер наряда', value: actData?.work_order_number || '—' },
          { label: 'Дата наряда', value: formatDate(actData?.work_order_date) },
          { label: 'Причина отключения', value: actData?.debt_reason || '—' },
        ],
      },
      {
        title: 'Адрес объекта',
        data: [
          { label: 'Квартира №', value: actData?.apartment_number || '—' },
          { label: 'Дом №', value: actData?.house_number || '—' },
          { label: 'Корпус', value: actData?.building_number || '—' },
          { label: 'Улица', value: actData?.street_name || '—' },
          { label: 'Район города', value: actData?.city_district || '—' },
        ],
      },
      {
        title: 'Заказчик',
        data: [
          { label: 'ФИО заказчика', value: actData?.customer_name || '—' },
        ],
      },
      {
        title: 'Представитель УГРС',
        data: [
          { label: 'Должность', value: actData?.representative_position || '—' },
          { label: 'ФИО', value: actData?.representative_name || '—' },
        ],
      },
      {
        title: 'Отключение оборудования',
        data: [
          { label: 'Время отключения (часы)', value: actData?.disconnection_time_hours || '—' },
          { label: 'Время отключения (минуты)', value: actData?.disconnection_time_minutes || '—' },
          { label: 'Описание оборудования', value: actData?.equipment_description || '—' },
          { label: 'Количество', value: actData?.equipment_count || '—' },
          { label: 'Способ отключения', value: actData?.disconnection_method || '—' },
          { label: 'Номер пломбы', value: actData?.seal_number || '—' },
        ],
      },
      {
        title: 'Подключение оборудования',
        data: [
          { label: 'Дата подключения', value: formatDate(actData?.reconnection_date) },
          { label: 'Представитель при подключении', value: actData?.reconnection_representative || '—' },
          { label: 'Основание для подключения', value: actData?.reconnection_basis || '—' },
        ],
      },
      {
        title: 'Подписи и статус',
        data: [
          { label: 'Подпись представителя', value: formatSignature(actData?.representative_signature) },
          { label: 'Подпись заказчика', value: formatSignature(actData?.customer_signature) },
          { label: 'Подпись при подключении', value: formatSignature(actData?.reconnection_representative_signature) },
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

  if (act.type !== 'actsge') {
    return (
      <div className={styles.noAct}>
        <p>Неверный тип акта. Ожидается акт отключения бытового газоиспользующего газового оборудования (actsge).</p>
      </div>
    );
  }

  return (
    <>
      <IonLoading isOpen={isLoading} message="Подождите..." />
      <div className={styles.disconnectionActForm}>
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
          <h2 className={styles.formTitle}><b>Акт отключения бытового газоиспользующего газового оборудования</b></h2>
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
          <div className={styles.disconnectionActFormCard}>
            <div className={styles.disconnectionActFormContent}>
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
