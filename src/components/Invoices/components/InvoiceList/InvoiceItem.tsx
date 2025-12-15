// InvoiceItem.tsx
import React from 'react';
import {
  IonCard,
<<<<<<< HEAD
  IonIcon,
} from '@ionic/react';
import {
  locationOutline,
  calendarOutline,
} from 'ionicons/icons';
import './InvoiceItem.css';
import { Invoice } from '../../types';

=======
  IonChip,
  IonIcon,
  IonButton
} from '@ionic/react';
import {
  callOutline,
  locationOutline,
  calendarOutline,
  personOutline,
  documentTextOutline
} from 'ionicons/icons';
import styles from './InvoiceItem.module.css';

interface Invoice {
  Ссылка: string;
  Номер: string;
  Дата: string;
  ЛицевойСчет: string;
  ТекстЗаявки: string | null;
  Телефон: string | null;
  ВремяУдобноеДляЗаказчика: string;
  ВремяФактическогоВыполнения: string;
  ФлагВыполнения: number;
  КомментарийПоВыполнению: string | null;
  Просрочена: number;
  ХарактерЗаявки: string | null;
  Заявитель: string | null;
  Адрес: string;
  Дом: string;
  Квартира: string | null;
  Участок: string;
}
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19

interface InvoiceStatus {
  color: 'primary' | 'success' | 'warning' | 'danger' | 'medium';
  text: string;
}

interface InvoiceItemProps {
<<<<<<< HEAD
  invoice:                      Invoice;
  status:                       InvoiceStatus;
  onSelect:                     ( invoice: any ) => void;
  onCall:                       ( phone: any, event: any ) => void;
  formatDate:                   ( dateString: string ) => string;
  formatPhone?:                 ( phone: string ) => string;
=======
  invoice: Invoice;
  status: InvoiceStatus;
  onSelect: (invoice: any) => void;
  onCall: (phone: any, event: any) => void;
  formatDate: (dateString: string) => string;
  formatPhone?: (phone: string) => string;
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
}

export const InvoiceItem: React.FC<InvoiceItemProps> = ({
  invoice,
  status,
  onSelect,
  onCall,
  formatDate
}) => {
  const handleCardClick = () => {
    onSelect( invoice );
  };

  const handleCallClick = (event: React.MouseEvent) => {
    event.stopPropagation();
<<<<<<< HEAD
    onCall(invoice.phone, event);
  };

  const getFullAddress = () => {
    let address = invoice.address.address;
    return address;
  };

  const getStatusClass = () => {
    const baseClass = 'status-badge';
    
    if( invoice.status === 'Принята')
      return `${baseClass} status-new`;
    if( invoice.status === 'Передана')
      return `${baseClass} status-in-progress`;
    if( invoice.status === 'Выполнена')
      return `${baseClass} status-completed`;
    if( invoice.status === 'Отложена')
      return `${baseClass} status-on-hold`;
    if( invoice.status === 'Отклонена')
      return `${baseClass} status-rejected`;
    
    return baseClass;
=======
    onCall(invoice.Телефон, event);
  };

  const getStatusText = () => {
    if (invoice.ФлагВыполнения === 1) return 'Выполнена';
    if (invoice.Просрочена === 1) return 'Просрочена';
    return 'В работе';
  };

  const getFullAddress = () => {

    let address = (typeof invoice.Адрес) === 'string' ? invoice.Адрес : (invoice.Адрес as any).address;
    return address;
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
  };

  return (
    <IonCard 
<<<<<<< HEAD
      className="invoice-card"
=======
      className={styles.invoiceCard}
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
      data-status={status.color}
      onClick={handleCardClick}
      button
    >
<<<<<<< HEAD
      <div className="card-content-wrapper">
        {/* Заголовок - номер и статус в одной строке */}
        <div className="card-header">
          <div className="header-left">
            <h3 className="invoice-number">
              #{invoice.number.trim()}
            </h3>
            <p className="invoice-date">
              {formatDate(invoice.date)}
            </p>
          </div>
          <div className={getStatusClass()}>
            {invoice.status}
          </div>
        </div>

        {/* Основной контент - компактные строки */}
        <div className="card-content">
          {/* Адрес */}
          <div className="info-row">
            <div className="label-with-icon info-label">
              <IonIcon icon={locationOutline} className="label-icon" />
              Адрес:
            </div>
            <p className="info-value address-value">
              <b className='ml-1'> {getFullAddress()} </b>
            </p>
          </div>

          {/* Удобное время */}
          <div className="info-row">
            <div className="label-with-icon info-label">
              <IonIcon icon={calendarOutline} className="label-icon" />
              Удобное время:
            </div>
            <p className="info-value">
              <b className='ml-1'>{formatDate(invoice.plan_date)}</b>
            </p>
          </div>

        </div>

        {/* Футер с дополнительной информацией */}
        {(invoice.lic || invoice.plot) && (
          <div className="w-100">
            <div className="flex fl-space">
              {invoice.lic && (
                <span className="account-item">
                  Л/с: {invoice.lic}
                </span>
              )}
              {invoice.plot && (
                <div className="plot-info">
                  <span className="plot-badge">
                    Уч. {invoice.plot}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
=======
      <div className={styles.cardContentWrapper}>
        {/* Заголовок */}
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <h3 className={styles.invoiceNumber}>
              #{invoice.Номер.trim()}
            </h3>
            <p className={styles.invoiceDate}>
              {formatDate(invoice.Дата)}
            </p>
          </div>
          <IonChip 
            color={status.color} 
            className={styles.statusBadge}
          >
            {getStatusText()}
          </IonChip>
        </div>

        {/* Основной контент */}
        <div className={styles.cardContent}>
          {/* Адрес */}
          <div className={styles.infoSection}>
            <div className={styles.infoLabel}>
              <IonIcon icon={locationOutline} className={styles.labelIcon} />
              Адрес
            </div>
            <p className={`${styles.infoValue} ${styles.addressValue}`}>
              {getFullAddress()}
            </p>
          </div>

          {/* Даты */}
          <div className={styles.datesRow}>
            <div className={styles.infoSection}>
              <div className={styles.infoLabel}>
                <IonIcon icon={calendarOutline} className={styles.labelIcon} />
                Удобное время
              </div>
              <p className={styles.infoValue}>
                {formatDate(invoice.ВремяУдобноеДляЗаказчика)}
              </p>
            </div>

            <div className={styles.infoSection}>
              <div className={styles.infoLabel}>
                <IonIcon icon={calendarOutline} className={styles.labelIcon} />
                Факт. выполнение
              </div>
              <p className={styles.infoValue}>
                {formatDate(invoice.ВремяФактическогоВыполнения)}
              </p>
            </div>
          </div>

          {/* Дополнительная информация */}
          {(invoice.Заявитель || invoice.ХарактерЗаявки) && (
            <div className={styles.additionalInfo}>
              {invoice.Заявитель && (
                <div className={styles.infoSection}>
                  <div className={styles.infoLabel}>
                    <IonIcon icon={personOutline} className={styles.labelIcon} />
                    Заявитель
                  </div>
                  <p className={styles.infoValue}>
                    {invoice.Заявитель}
                  </p>
                </div>
              )}

              {invoice.ХарактерЗаявки && (
                <div className={styles.infoSection}>
                  <div className={styles.infoLabel}>
                    <IonIcon icon={documentTextOutline} className={styles.labelIcon} />
                    Характер заявки
                  </div>
                  <p className={styles.infoValue}>
                    {invoice.ХарактерЗаявки}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Футер */}
        <div className={styles.cardFooter}>
          <div className={styles.accountInfo}>
            <span className={styles.accountItem}>
              ЛС: {invoice.ЛицевойСчет}
            </span>
            <div className={styles.plotInfo}>
              <span className={styles.accountItem}>
                Участок: 
              </span>
              <span className={styles.plotBadge}>
                {invoice.Участок}
              </span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            {invoice.Телефон && (
              <IonButton
                fill="solid"
                size="small"
                className={`${styles.actionButton} ${styles.callButton}`}
                onClick={handleCallClick}
              >
                <IonIcon icon={callOutline} slot="start" />
                Позвонить
              </IonButton>
            )}
            
            <IonButton
              fill="outline"
              size="small"
              className={styles.actionButton}
            >
              Подробнее
            </IonButton>
          </div>
        </div>
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
      </div>
    </IonCard>
  );
};

<<<<<<< HEAD
export default React.memo(InvoiceItem);
=======
export default React.memo(InvoiceItem);
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
