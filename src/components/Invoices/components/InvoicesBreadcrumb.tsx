import React from 'react';
import { InvoicePosition, InvoiceBreadcrumbItem } from '../types';
import './InvoicesBreadcrumb.css'; // Импортируем новый CSS файл
import { useItem } from '../../../Store/navigationStore';

interface InvoicesBreadcrumbProps {
    page:                   number;
    canGoBack:              boolean;
    onPage:                 ( page: number ) => void;
    onGoBack:               ( ) => void;
}

const BREADCRUMB_LABELS: Record<InvoicePosition, string> = {
    0:  'Список',
    1:  'Заявка', 
    2:  'Акты',
    3:  'Печать'
};

export const InvoicesBreadcrumb: React.FC<InvoicesBreadcrumbProps> = ({
    page,
    onPage,
}) => {

    const { item } = useItem()
    
    const getBreadcrumbItems = (): InvoiceBreadcrumbItem[] => {
        return [0, 1, 2, 3].map((pos) => ({
            position:       pos as InvoicePosition,
            label:          BREADCRUMB_LABELS[pos as InvoicePosition],
            active:         pos === page,
            accessible:     pos === 0 || pos <= page || item !== undefined
        }));
    };

    const items = getBreadcrumbItems();

    return (
        <div className="invoices-breadcrumb">
            {/* {canGoBack && (
                <IonButton 
                    fill="clear" 
                    size="small"
                    className="breadcrumb-back-btn"
                    onClick={onGoBack}
                >
                    <IonIcon icon={chevronBackOutline} slot="icon-only" />
                </IonButton>
            )} */}
            
            <div className="breadcrumb-nav">
                {items.map((item, index) => (
                    <React.Fragment key={item.position}>
                        <div 
                            className={`breadcrumb-item ${item.active ? 'active' : ''} ${item.accessible ? 'accessible' : 'disabled'}`}
                            onClick={item.accessible ? () => onPage( item.position ) : undefined}
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