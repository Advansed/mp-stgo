// InvoiceItem.tsx
import React from 'react';
import {
  IonCard,
  IonIcon,
} from '@ionic/react';
import {
  locationOutline,
  calendarOutline,
} from 'ionicons/icons';
import './InvoiceItem.css';
import { Invoice } from '../../types';

interface InvoiceStatus {
  color: 'primary' | 'success' | 'warning' | 'danger' | 'medium';
  text: string;
}

interface InvoiceItemProps {
  invoice:                      Invoice;
  status:                       InvoiceStatus;
  onSelect:                     ( invoice: any ) => void;
  onCall:                       ( phone: any, event: any ) => void;
  formatDate:                   ( dateString: string ) => string;
  formatPhone?:                 ( phone: string ) => string;
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
  };

  return (
    <IonCard 
      className="invoice-card"
      data-status={status.color}
      onClick={handleCardClick}
      button
    >
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
      </div>
    </IonCard>
  );
};

export default React.memo(InvoiceItem);