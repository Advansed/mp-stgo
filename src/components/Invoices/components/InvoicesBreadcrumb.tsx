import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { InvoicePosition, InvoiceBreadcrumbItem } from '../types';
<<<<<<< HEAD
import './InvoicesBreadcrumb.css'; // Импортируем новый CSS файл
import { useItem } from '../../../Store/navigationStore';

interface InvoicesBreadcrumbProps {
    currentPosition:        number;
=======
import './Invoices.css';

interface InvoicesBreadcrumbProps {
    currentPosition:        number;
    selectedInvoiceId:      string | null;
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
    canGoBack:              boolean;
    onNavigate:             ( position: any ) => void;
    onGoBack:               ( ) => void;
}

const BREADCRUMB_LABELS: Record<InvoicePosition, string> = {
    0:  'Список',
    1:  'Заявка', 
    2:  'Акты',
    3:  'Печать'
};

export const InvoicesBreadcrumb: React.FC<InvoicesBreadcrumbProps> = ({
    currentPosition,
<<<<<<< HEAD
=======
    selectedInvoiceId,
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
    canGoBack,
    onNavigate,
    onGoBack
}) => {
<<<<<<< HEAD

    const { item } = useItem()
    
    const getBreadcrumbItems = (): InvoiceBreadcrumbItem[] => {
        return [0, 1, 2, 3].map((pos) => ({
            position:       pos as InvoicePosition,
            label:          BREADCRUMB_LABELS[pos as InvoicePosition],
            active:         pos === currentPosition,
            accessible:     pos === 0 || pos <= currentPosition || item !== undefined
=======
    
    const getBreadcrumbItems = (): InvoiceBreadcrumbItem[] => {
        return [0, 1, 2, 3].map((pos) => ({
            position: pos as InvoicePosition,
            label: BREADCRUMB_LABELS[pos as InvoicePosition],
            active: pos === currentPosition,
            accessible: pos === 0 || (pos <= currentPosition && selectedInvoiceId !== null)
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
        }));
    };

    const items = getBreadcrumbItems();

    return (
        <div className="invoices-breadcrumb">
<<<<<<< HEAD
            {/* {canGoBack && (
=======
            {canGoBack && (
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
                <IonButton 
                    fill="clear" 
                    size="small"
                    className="breadcrumb-back-btn"
                    onClick={onGoBack}
                >
                    <IonIcon icon={chevronBackOutline} slot="icon-only" />
                </IonButton>
<<<<<<< HEAD
            )} */}
=======
            )}
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
            
            <div className="breadcrumb-nav">
                {items.map((item, index) => (
                    <React.Fragment key={item.position}>
                        <div 
                            className={`breadcrumb-item ${item.active ? 'active' : ''} ${item.accessible ? 'accessible' : 'disabled'}`}
                            onClick={item.accessible ? () => onNavigate({ position: item.position, canGoBack: false }) : undefined}
                        >
                            <span className="breadcrumb-number">
                                {item.active ? `(${item.position})` : item.position}
                            </span>
                            <span className="breadcrumb-label">{item.label}</span>
                        </div>
                        
                        {index < items.length - 1 && (
                            <span className="breadcrumb-separator">—</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};