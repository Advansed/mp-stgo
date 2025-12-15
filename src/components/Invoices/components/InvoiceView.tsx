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
<<<<<<< HEAD
  IonModal, 
  IonSpinner,
  IonText 
=======
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonButtons
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
} from '@ionic/react';
import { 
  callOutline, 
  locationOutline, 
<<<<<<< HEAD
  timeOutline, 
=======
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
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
<<<<<<< HEAD
  documentsOutline
=======
  documentsOutline,
  closeOutline
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
} from 'ionicons/icons';
import styles from './InvoiceView.module.css';
import { AddressForm } from '../../Lics/components/FindAddress/FindAddress';
import { FindLics } from '../../Lics';
<<<<<<< HEAD
import { Invoice } from '../types';
=======
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19


interface InvoiceStatus {
  color: 'primary' | 'success' | 'warning' | 'danger' | 'medium';
  text: string;
}

interface InvoiceViewProps {
<<<<<<< HEAD
  invoice: Invoice;
=======
  invoice: any;
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
  invoiceStatus: InvoiceStatus;
  formatDate: (dateString: string) => string;
  formatPhone?: (phone: string) => string;
  onNavigateToActs: () => void;
  onNavigateToPrint: () => void;
  onUpdateAddress?: (invoiceId: string, newAddress: string) => Promise<{success: boolean, message?: string}>;
<<<<<<< HEAD
=======
  isOpen: boolean;
  onClose: () => void;
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
}

export const InvoiceView: React.FC<InvoiceViewProps> = ({
  invoice,
  invoiceStatus,
  formatDate,
  formatPhone,
  onNavigateToActs,
  onNavigateToPrint,
<<<<<<< HEAD
  onUpdateAddress
}) => {
  const [currentAddress, setCurrentAddress] = useState(invoice.address);
=======
  onUpdateAddress,
  isOpen,
  onClose
}) => {
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const [isAddressSearchModalOpen, setIsAddressSearchModalOpen] = useState(false);
  const [isAccountSearchModalOpen, setIsAccountSearchModalOpen] = useState(false);

<<<<<<< HEAD
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
=======
  const handleCall = useCallback(() => {
    if (!invoice.Телефон) return;
    
    try {
      window.open(`tel:${invoice.Телефон}`);
    } catch (error) {
      console.error('Ошибка при попытке звонка:', error);
    }
  }, [invoice.Телефон]);

  console.log('view', invoice )

  const handleAddressSearch = useCallback(() => {
    console.log( "current address", invoice.Адрес.address )
    setIsAddressSearchModalOpen(true);
  }, []);

  const handleAccountSearch = useCallback(() => {
    setIsAccountSearchModalOpen(true);
  }, []);

  const handleAddressUpdate = useCallback(async (newAddress: any) => {
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
    if (!onUpdateAddress) return;
    
    setIsUpdatingAddress(true);
    try {
<<<<<<< HEAD
      const result = await onUpdateAddress(invoice.id, newAddress);
      if (result.success) {
        setCurrentAddress(newAddress);
=======
      const result = await onUpdateAddress(invoice.Ссылка, newAddress);
      if (result.success) {
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
        setIsAddressSearchModalOpen(false);
      }
    } catch (error) {
      console.error('Ошибка обновления адреса:', error);
    } finally {
      setIsUpdatingAddress(false);
    }
<<<<<<< HEAD
  }, [onUpdateAddress, invoice.id]);

  const getStatusIcon           = () => {
=======
  }, [onUpdateAddress, invoice.Ссылка]);

  const getStatusIcon = () => {
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
    switch (invoiceStatus?.color) {
      case 'success': return checkmarkCircleOutline;
      case 'warning': return warningOutline;
      case 'danger': return alertCircleOutline;
      default: return alertCircleOutline;
    }
  };

<<<<<<< HEAD
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
=======
  const getStatusColor = () => {
    return invoiceStatus?.color || 'medium';
  };

  const getStatusClass = () => {
    return `status${invoiceStatus?.color.charAt(0).toUpperCase() + invoiceStatus?.color.slice(1)}`;
  };

  const getFullAddress = () => {
    return (invoice.Адрес as any).address;
  };

  const getStatusText = () => {
    if (invoice.ФлагВыполнения === 1) return 'Выполнена';
    if (invoice.Просрочена === 1) return 'Просрочена';
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
    return 'В работе';
  };

  return (
<<<<<<< HEAD
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
=======
    <IonModal 
      isOpen={isOpen} 
      onDidDismiss={onClose}
      className={styles.invoiceModal}
    >
      <IonHeader className={styles.modalHeader}>
        <IonToolbar className={styles.modalToolbar}>
          <IonButtons slot="start">
            <IonButton 
              onClick={onClose}
              className={styles.closeButton}
            >
              <IonIcon icon={closeOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle className={styles.modalTitle}>Детали заявки</IonTitle>
          <IonButtons slot="end">
            <IonButton 
              onClick={onNavigateToPrint}
              className={styles.printButton}
            >
              <IonIcon icon={printOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className={styles.modalContent}>
        <div className={styles.invoiceContainer}>
          {/* Заголовок карточки */}
          <div className={styles.invoiceHeader}>
            <div className={styles.invoiceTitle}>
              <h2>#{invoice.Номер.trim()}</h2>
              <p className={styles.invoiceSubtitle}>
                {formatDate(invoice.Дата)}
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

          {/* Основная информация */}
          <IonList className={styles.invoiceList}>
            {/* Адрес */}
            <IonItem className={styles.invoiceItem}>
              <IonIcon icon={locationOutline} slot="start" />
              <IonLabel>
                <div className={styles.itemHeader}>Адрес</div>
                <div className={styles.itemContent}>{getFullAddress()}</div>
                <div className={styles.itemSubtext}>
                  Участок: <span className={styles.infoBadge}>{invoice.Участок}</span>
                </div>
              </IonLabel>
              <IonButton 
                fill="outline" 
                color="primary"
                slot="end"
                onClick={handleAddressSearch}
                disabled={isUpdatingAddress}
                className={styles.actionButton}
              >
                {isUpdatingAddress ? (
                  <IonSpinner name="dots" />
                ) : (
                  <IonIcon icon={searchOutline} />
                )}
              </IonButton>
            </IonItem>

            {/* Заявитель */}
            {invoice.Заявитель && (
              <IonItem className={styles.invoiceItem}>
                <IonIcon icon={personCircleOutline} slot="start" />
                <IonLabel>
                  <div className={styles.itemHeader}>Заявитель</div>
                  <div className={styles.itemContent}>{invoice.Заявитель}</div>
                </IonLabel>
              </IonItem>
            )}

            {/* Телефон */}
            {invoice.Телефон && (
              <IonItem className={styles.invoiceItem}>
                <IonIcon icon={callOutline} slot="start" />
                <IonLabel>
                  <div className={styles.itemHeader}>Телефон</div>
                  <div className={styles.itemContent}>
                    {formatPhone ? formatPhone(invoice.Телефон) : invoice.Телефон}
                  </div>
                </IonLabel>
                <IonButton 
                  fill="solid" 
                  color="success"
                  slot="end"
                  onClick={handleCall}
                  className={styles.callButton}
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
                <div className={styles.itemContent}>{invoice.ЛицевойСчет}</div>
              </IonLabel>
              <IonButton 
                fill="outline" 
                color="primary"
                onClick={handleAccountSearch}
                slot="end"
                className={styles.actionButton}
              >
                <IonIcon icon={ellipsisHorizontalOutline} />
              </IonButton>
            </IonItem>

            {/* Характер заявки */}
            {invoice.ХарактерЗаявки && (
              <IonItem className={styles.invoiceItem}>
                <IonIcon icon={documentTextOutline} slot="start" />
                <IonLabel>
                  <div className={styles.itemHeader}>Характер заявки</div>
                  <div className={styles.itemContent}>{invoice.ХарактерЗаявки}</div>
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
                    Удобное время: {formatDate(invoice.ВремяУдобноеДляЗаказчика)}
                  </div>
                </div>
                <div className={styles.infoSection}>
                  <div className={styles.itemContent}>
                    Фактическое выполнение: {formatDate(invoice.ВремяФактическогоВыполнения)}
                  </div>
                </div>
              </IonLabel>
            </IonItem>

            {/* Комментарий */}
            {invoice.КомментарийПоВыполнению && (
              <IonItem className={styles.invoiceItem}>
                <IonIcon icon={documentTextOutline} slot="start" />
                <IonLabel>
                  <div className={styles.itemHeader}>Комментарий по выполнению</div>
                  <div className={styles.itemContent}>{invoice.КомментарийПоВыполнению}</div>
                </IonLabel>
              </IonItem>
            )}

            {/* Текст заявки */}
            {invoice.ТекстЗаявки && (
              <IonItem className={styles.invoiceItem}>
                <IonIcon icon={documentTextOutline} slot="start" />
                <IonLabel>
                  <div className={styles.itemHeader}>Текст заявки</div>
                  <div className={styles.itemContent}>{invoice.ТекстЗаявки}</div>
                </IonLabel>
              </IonItem>
            )}
          </IonList>

          {/* Кнопка актов */}
          <div className={styles.footerActions}>
            <IonButton 
              expand="block"
              color="primary"
              className={styles.actsButton}
              onClick={onNavigateToActs}
            >
              <IonIcon icon={documentsOutline} slot="start" />
              Передать к исполнению
            </IonButton>
          </div>
        </div>

        {/* Модальные окна */}
        <IonModal isOpen={isAddressSearchModalOpen} onDidDismiss={() => setIsAddressSearchModalOpen(false)}>
          <AddressForm
            initialAddress={ invoice.Адрес.address }
            invoiceId={invoice.Ссылка}
            onAddressSaved={handleAddressUpdate}
            disabled={isUpdatingAddress}
            onAddressClosed={() => setIsAddressSearchModalOpen(false)}
          /> 
        </IonModal>

        <IonModal isOpen={isAccountSearchModalOpen} onDidDismiss={() => setIsAccountSearchModalOpen(false)}>
          <FindLics 
            address={ invoice.Адрес.address }
            invoiceId={invoice.Ссылка}
            onSelect={(lic: string) => {
              setIsAccountSearchModalOpen(false);
            }}
            isOpen={isAccountSearchModalOpen}
            onClose={() => setIsAccountSearchModalOpen(false)}
          /> 
        </IonModal>
      </IonContent>
    </IonModal>
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
  );
};