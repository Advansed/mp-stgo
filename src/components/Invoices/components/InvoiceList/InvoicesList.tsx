import React, { useCallback } from 'react';
import { 
    IonButton, 
    IonRefresher, 
    IonRefresherContent, 
    IonText
} from '@ionic/react';
import { InvoiceItem } from './InvoiceItem';
import './InvoiceList.css';

export const InvoicesList: React.FC<any> = ({
    invoices,
    loading,
    refreshing,
    onRefresh,
    onInvoiceSelect,
    getInvoiceStatus,
    formatDate,
    formatPhone
}) => {

    const handleRefresh = useCallback(async () => {
        await onRefresh();
    }, [onRefresh]);

    const handleInvoiceSelect = useCallback((invoiceId: string) => {
        onInvoiceSelect(invoiceId);
    }, [onInvoiceSelect]);

    const handleCall = useCallback((phone: string, event: React.MouseEvent) => {
        event.stopPropagation();
        if (phone) {
            window.open(`tel:${phone}`);
        }
    }, []);

    const renderInvoices = (invoices: any) => {
        return invoices.map((invoice: any) => (
            invoice && (
                <InvoiceItem
                    key={invoice?.Ссылка}
                    invoice={invoice}
                    status={getInvoiceStatus(invoice)}
                    onSelect={handleInvoiceSelect}
                    onCall={handleCall}
                    formatDate={formatDate}
                    formatPhone={formatPhone}
                />
            )
        ));
    };

    return (
        <div className="invoice-page">
            <div className="invoice-page-header">
                <div className='flex fl-space'>
                    <div >
                        <h2 className="invoice-page-title">Заявки</h2>
                        <p className="invoice-page-subtitle">Всего: {invoices.length}</p>
                    </div>
                    <div>
                        <IonButton
                            fill    = 'outline'
                            onClick = { handleRefresh }
                            color   = "dark"
                        >
                            Обновить
                        </IonButton>
                    </div>

                </div>
            </div>

            {/* <IonRefresher slot="fixed" onIonRefresh={handleRefresh} className="corp-refresher">
                <IonRefresherContent />
            </IonRefresher> */}

            <div className="invoice-page-content">
                {loading && !refreshing ? (
                    <div className="loading-state">
                        <IonText color="medium" className="loading-text">Загрузка заявок...</IonText>
                    </div>
                ) : invoices.length === 0 ? (
                    <div className="empty-state">
                        <IonText color="medium" className="empty-text">Нет заявок</IonText>
                        <IonButton 
                            fill="solid" 
                            onClick={onRefresh}
                            className="corp-refresh-button"
                        >
                            Обновить
                        </IonButton>
                    </div>
                ) : (
                    <div className="invoices-scroll-container">
                        <div className="invoices-scroll-content">
                            {renderInvoices(invoices)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(InvoicesList);
