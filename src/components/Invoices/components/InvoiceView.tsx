// InvoiceView.tsx
import React, { useCallback, useState } from 'react';
import { 
  IonButton, 
  IonCard, 
  IonChip, 
  IonIcon, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonModal, 
  IonSpinner,
  IonText 
} from '@ionic/react';
import { 
  callOutline, 
  locationOutline, 
  timeOutline, 
  personCircleOutline, 
  searchOutline, 
  checkmarkCircleOutline, 
  warningOutline, 
  alertCircleOutline, 
  documentTextOutline,
  calendarOutline, 
  codeWorkingOutline, 
  ellipsisHorizontalOutline,
  printOutline,
  documentsOutline
} from 'ionicons/icons';
import styles from './InvoiceView.module.css';
import { AddressForm } from '../../Lics/components/FindAddress/FindAddress';
import { FindLics } from '../../Lics';
import { Invoice } from '../types';


interface InvoiceStatus {
  color: 'primary' | 'success' | 'warning' | 'danger' | 'medium';
  text: string;
}

interface InvoiceViewProps {
  invoice: Invoice;
  invoiceStatus: InvoiceStatus;
  formatDate: (dateString: string) => string;
  formatPhone?: (phone: string) => string;
  onNavigateToActs: () => void;
  onNavigateToPrint: () => void;
  onUpdateAddress?: (invoiceId: string, newAddress: string) => Promise<{success: boolean, message?: string}>;
}

export const InvoiceView: React.FC<InvoiceViewProps> = ({
  invoice,
  invoiceStatus,
  formatDate,
  formatPhone,
  onNavigateToActs,
  onNavigateToPrint,
  onUpdateAddress
}) => {
  const [currentAddress, setCurrentAddress] = useState(invoice.address);
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const [isAddressSearchModalOpen, setIsAddressSearchModalOpen] = useState(false);
  const [isAccountSearchModalOpen, setIsAccountSearchModalOpen] = useState(false);

  console.log("view")


  const handleCall              = useCallback(() => {
    if (!invoice.phone) return;
    
    try {
      window.open(`tel:${invoice.phone}`);
    } catch (error) {
      console.error('Ошибка при попытке звонка:', error);
    }
  }, [invoice.phone]);

  const handleAddressSearch     = useCallback(() => {
    setIsAddressSearchModalOpen(true);
  }, []);

  const handleAccountSearch     = useCallback(() => {
    setIsAccountSearchModalOpen(true);
  }, []);

  const handleAddressUpdate     = useCallback(async (newAddress: any) => {
    if (!onUpdateAddress) return;
    
    setIsUpdatingAddress(true);
    try {
      const result = await onUpdateAddress(invoice.id, newAddress);
      if (result.success) {
        setCurrentAddress(newAddress);
        setIsAddressSearchModalOpen(false);
      }
    } catch (error) {
      console.error('Ошибка обновления адреса:', error);
    } finally {
      setIsUpdatingAddress(false);
    }
  }, [onUpdateAddress, invoice.id]);

  const getStatusIcon           = () => {
    switch (invoiceStatus?.color) {
      case 'success': return checkmarkCircleOutline;
      case 'warning': return warningOutline;
      case 'danger': return alertCircleOutline;
      default: return alertCircleOutline;
    }
  };

  const getStatusColor          = () => {
    return invoiceStatus?.color || 'medium';
  };

  const getStatusClass          = () => {
    return `status${invoiceStatus?.color.charAt(0).toUpperCase() + invoiceStatus?.color.slice(1)}`;
  };

  const getFullAddress          = () => {
    let address = invoice.address.address;
    // if (invoice.Дом) address += `, д. ${invoice.Дом}`;
    // if (invoice.Квартира) address += `, кв. ${invoice.Квартира}`;
    return address;
  };

  const getStatusText           = () => {
    return 'В работе';
  };

  return (
    <IonCard className={styles.invoiceCard}>
      {/* Заголовок */}
      <div className={styles.invoiceHeader}>
        <div className={styles.invoiceTitle}>
          <div style={{ flex: 1 }}>
            <h2>Заявка #{invoice.number.trim()}</h2>
            <p className={styles.invoiceSubtitle}>
              {formatDate(invoice.date)}
            </p>
          </div>
          <IonChip 
            color={getStatusColor()} 
            className={`${styles.statusChip} ${styles[getStatusClass()]}`}
          >
            <IonIcon icon={getStatusIcon()} />
            {getStatusText()}
          </IonChip>
        </div>
        
        {/* <div className={styles.actionButtons}>
          <IonButton 
            size="small" 
            color="primary"
            className={styles.primaryButton}
            onClick={onNavigateToActs}
          >
            <IonIcon icon={documentsOutline} slot="start" />
            Акты
          </IonButton>
          <IonButton 
            fill="outline"
            size="small" 
            color="medium"
            className={styles.secondaryButton}
            onClick={onNavigateToPrint}
          >
            <IonIcon icon={printOutline} />
          </IonButton>
        </div> */}
      </div>

      {/* Основная информация */}
      <IonList className={styles.invoiceList}>
        {/* Адрес */}
        <IonItem className={styles.invoiceItem}>
          <IonIcon icon={locationOutline} slot="start" />
          <IonLabel>
            <div className={styles.itemHeader}>Адрес</div>
            <div className={styles.itemContent}>{getFullAddress()}</div>
            <div className={styles.itemSubtext}>
              Участок: <span className={styles.infoBadge}>{invoice.plot}</span>
            </div>
          </IonLabel>
          <IonButton 
            fill="outline" 
            color="primary"
            slot="end"
            onClick={handleAddressSearch}
            disabled={isUpdatingAddress}
          >
            {isUpdatingAddress ? (
              <IonSpinner name="dots" />
            ) : (
              <IonIcon icon={searchOutline} />
            )}
          </IonButton>
        </IonItem>

        {/* Заявитель */}
        {invoice.applicant && (
          <IonItem className={styles.invoiceItem}>
            <IonIcon icon={personCircleOutline} slot="start" />
            <IonLabel>
              <div className={styles.itemHeader}>Заявитель</div>
              <div className={styles.itemContent}>{invoice.applicant}</div>
            </IonLabel>
          </IonItem>
        )}

        {/* Телефон */}
        {invoice.phone && (
          <IonItem className={styles.invoiceItem}>
            <IonIcon icon={callOutline} slot="start" />
            <IonLabel>
              <div className={styles.itemHeader}>Телефон</div>
              <div className={styles.itemContent}>
                {formatPhone ? formatPhone(invoice.phone) : invoice.phone}
              </div>
            </IonLabel>
            <IonButton 
              fill="outline" 
              color="success"
              slot="end"
              onClick={handleCall}
            >
              <IonIcon icon={callOutline} />
            </IonButton>
          </IonItem>
        )}

        {/* Лицевой счет */}
        <IonItem className={styles.invoiceItem}>
          <IonIcon icon={codeWorkingOutline} slot="start" />
          <IonLabel>
            <div className={styles.itemHeader}>Лицевой счет</div>
            <div className={styles.itemContent}>{invoice.lic}</div>
          </IonLabel>
          <IonButton 
            fill="outline" 
            color="primary"
            onClick={handleAccountSearch}
            slot="end"
          >
            <IonIcon icon={ellipsisHorizontalOutline} />
          </IonButton>
        </IonItem>

        {/* Характер заявки */}
        {invoice.character && (
          <IonItem className={styles.invoiceItem}>
            <IonIcon icon={documentTextOutline} slot="start" />
            <IonLabel>
              <div className={styles.itemHeader}>Характер заявки</div>
              <div className={styles.itemContent}>{invoice.character}</div>
            </IonLabel>
          </IonItem>
        )}

        {/* Время выполнения */}
        <IonItem className={styles.invoiceItem}>
          <IonIcon icon={calendarOutline} slot="start" />
          <IonLabel>
            <div className={styles.itemHeader}>Сроки выполнения</div>
            <div className={styles.infoSection}>
              <div className={styles.itemContent}>
                Удобное время: {formatDate(invoice.plan_date)}
              </div>
            </div>
            <div className={styles.infoSection}>
              <div className={styles.itemContent}>
                Фактическое выполнение: {formatDate(invoice.complete_date)}
              </div>
            </div>
          </IonLabel>
        </IonItem>

        {/* Комментарий */}
        {invoice.complete_text && (
          <IonItem className={styles.invoiceItem}>
            <IonIcon icon={documentTextOutline} slot="start" />
            <IonLabel>
              <div className={styles.itemHeader}>Комментарий по выполнению</div>
              <div className={styles.itemContent}>{invoice.complete_text}</div>
            </IonLabel>
          </IonItem>
        )}

        {/* Текст заявки */}
        {invoice.service && (
          <IonItem className={styles.invoiceItem}>
            <IonIcon icon={documentTextOutline} slot="start" />
            <IonLabel>
              <div className={styles.itemHeader}>Текст заявки</div>
              <div className={styles.itemContent}>{invoice.service}</div>
            </IonLabel>
          </IonItem>
        )}
      </IonList>

      {/* Модальные окна - нужно будет адаптировать под ваши компоненты */}
      <IonModal isOpen={isAddressSearchModalOpen} onDidDismiss={() => setIsAddressSearchModalOpen(false)}>
        <AddressForm
          initialAddress    = { currentAddress.address }
          invoiceId         = { invoice.id }
          onAddressSaved    = { handleAddressUpdate }
          disabled          = { isUpdatingAddress }
          onAddressClosed={() => setIsAddressSearchModalOpen(false)}
        /> 
      </IonModal>

      <IonModal isOpen={isAccountSearchModalOpen} onDidDismiss={() => setIsAccountSearchModalOpen(false)}>
        <FindLics 
          address           = {currentAddress.address }
          invoiceId         = {invoice.id}
          onSelect          = {(lic: string) => {
            setIsAccountSearchModalOpen(false);
          }}
          isOpen={isAccountSearchModalOpen}
          onClose={() => setIsAccountSearchModalOpen(false)}
        /> 
      </IonModal>
    </IonCard>
  );
};