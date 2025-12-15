import React, { useCallback } from 'react';
import { 
    IonButton, 
    IonRefresher, 
    IonRefresherContent, 
    IonText
} from '@ionic/react';
import { InvoiceItem } from './InvoiceItem';
<<<<<<< HEAD
import './InvoiceList.css';
=======
import styles from './InvoiceList.module.css';
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19

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

<<<<<<< HEAD
    const handleRefresh = useCallback(async () => {
        await onRefresh();
    }, [onRefresh]);

    const handleInvoiceSelect = useCallback((invoiceId: string) => {
        onInvoiceSelect(invoiceId);
    }, [onInvoiceSelect]);

    const handleCall = useCallback((phone: string, event: React.MouseEvent) => {
=======

    const handleRefresh             = useCallback(async (event: CustomEvent) => {
        await onRefresh();
        event.detail.complete();
    }, [onRefresh]);


    const handleInvoiceSelect       = useCallback((invoiceId: string) => {
        onInvoiceSelect(invoiceId);
    }, [onInvoiceSelect]);


    const handleCall                = useCallback((phone: string, event: React.MouseEvent) => {
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
        event.stopPropagation();
        if (phone) {
            window.open(`tel:${phone}`);
        }
    }, []);

<<<<<<< HEAD
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
=======
    const render                    = (invoices:any) => {
        let elem = <></>

        console.log("render", invoices) 
        for(let i = 0; i < invoices.length;i++){
            const invoice = invoices[i]
            if(invoice)
                elem = <>
                    { elem }
                    <InvoiceItem
                        key         = { invoice?.Ссылка }
                        invoice     = { invoice }
                        status      = { getInvoiceStatus(invoice) }
                        onSelect    = { handleInvoiceSelect }
                        onCall      = { handleCall }
                        formatDate  = { formatDate }
                        formatPhone = { formatPhone }
                    />

                </>
        }

        return elem 
    }

    return (
        <div className={styles.invoicePage}>
            <div className={styles.invoicePageHeader}>
                <h2 className={styles.invoicePageTitle}>Заявки</h2>
                <p className={styles.invoicePageSubtitle}>Всего: {invoices.length}</p>
            </div>

            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent />
            </IonRefresher>

            <div className={styles.invoicePageContent}>
                {loading && !refreshing ? (
                    <div className={styles.loadingState}>
                        <IonText color="medium">Загрузка заявок...</IonText>
                    </div>
                ) : invoices.length === 0 ? (
                    <div className={styles.emptyState}>
                        <IonText color="medium">Нет заявок</IonText>
                        <IonButton fill="clear" onClick={onRefresh}>
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
                            Обновить
                        </IonButton>
                    </div>
                ) : (
<<<<<<< HEAD
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
=======
                    <div className={styles.invoicesList}>
                        { render(invoices) }
                    </div>
                )}
            </div>

        </div>
    );
    
};

export default React.memo(InvoicesList);
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
