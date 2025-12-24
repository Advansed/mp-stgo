// src/components/Invoices/InvoiceActs.tsx
import React, { useState } from 'react';
import { 
    IonButton, 
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardTitle, 
    IonCol, 
    IonGrid, 
    IonIcon, 
    IonRow,
} from '@ionic/react';
import { 
    homeOutline, 
    warningOutline,
    cameraOutline 
} from 'ionicons/icons';

import { Invoice }          from '../types';
import ActPrescript         from '../../Acts/ActPrescript/ActPrescript';
import './InvoiceActs.css';
import { useToast } from '../../Toast';
import { ActBRForm } from '../../Acts/ActBR/ActBRForm';
import { ActCCForm } from '../../Acts/ActCC/ActCCForm';
import { ActSGEForm } from '../../Acts/ActSGE/ActSGEForm';
import { ActPlombForm } from '../../Acts/ActPlomb/ActPlombForm';
import { ActSFForm } from '../../Acts/ActSF/ActSFForm';
import { ActIGEForm } from '../../Acts/ActIGE/ActIGEForm';

type ActType = 'list' | 'prescription' | 'act_battery'| 'act_counter_replace' | 'act_sge' | 'act_plomb' | 'act_sf' | 'act_ige';

interface InvoiceActsProps {
    invoice: Invoice;
}

const actButtons = [
    {
        type: 'act_battery' as ActType,
        name: 'Акт замены аккумуляторной батареи счетчика',
        icon: homeOutline,
        color: 'tertiary'
    },
    {
        type: 'act_sge' as ActType,
        name: 'Акт отключения бытового газоиспользующего газового оборудования',
        icon: homeOutline,
        color: 'success'
    },
    {
        type: 'act_counter_replace' as ActType,
        name: 'Акт замены счетчика',
        icon: homeOutline,
        color: 'success'
    },
    {
        type: 'act_plomb' as ActType,
        name: 'Акт пломбирования ПУ',
        icon: homeOutline,
        color: 'success'
    },
    {
        type: 'act_sf' as ActType,
        name: 'Акт срыва пломбы ПУ',
        icon: homeOutline,
        color: 'success'
    },
    {
        type: 'act_ige' as ActType,
        name: 'Акт установки газового счетчика',
        icon: homeOutline,
        color: 'success'
    },
    {
        type: 'prescription' as ActType,
        name: 'Предписание с требованиями по устранению нарушений',
        icon: warningOutline,
        color: 'danger'
    }
];

export const InvoiceActs: React.FC<InvoiceActsProps> = ({ invoice }) => {
    const [currentView, setCurrentView] = useState<ActType>('list');
    const toast                         = useToast();


    const handleCameraCapture           = () => {
        toast.info('Функция сканирования будет реализована');
    };


    const handleActButtonClick          = (actType: ActType) => {
        setCurrentView(actType);
    };

    // Компонент списка кнопок актов
    const ActButtonsList = () => (
        <div className="invoice-page">
            <div className="invoice-page-header">
                <h2 className="invoice-page-title">Акты и документы</h2>
                <p className="invoice-page-subtitle">Заявка #{invoice.number}</p>
            </div>

            <div className="invoice-page-content">
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Создание актов</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonGrid>
                            {actButtons.map((button, index) => (
                                <IonRow key={button.type}>
                                    <IonCol>
                                        <IonButton
                                            expand="block"
                                            fill="outline"
                                            color={button.color}
                                            onClick={() => handleActButtonClick(button.type)}
                                            className="act-button"
                                        >
                                            <IonIcon icon={button.icon} slot="start" />
                                            {button.name}
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            ))}
                        </IonGrid>

                        <div className="camera-section ion-margin-top">
                            <IonButton
                                expand="block"
                                fill="clear"
                                onClick={handleCameraCapture}
                                className="camera-button"
                            >
                                <IonIcon icon={cameraOutline} slot="start" />
                                Сканировать QR-код документа
                            </IonButton>
                        </div>
                    </IonCardContent>
                </IonCard>
            </div>
        </div>
    );


    // Рендер компонента в зависимости от текущего состояния
    const renderCurrentView = () => {
        switch (currentView) {
            case 'act_battery':

                return <ActBRForm invoice_id = { invoice.id } onBack = { () => { setCurrentView("list")} }/>;

            case 'act_counter_replace':

                return <ActCCForm invoice_id = { invoice.id } onBack = { () => { setCurrentView("list")} }/>;

            case 'act_sge':

                return <ActSGEForm invoice_id = { invoice.id } onBack = { () => { setCurrentView("list")} }/>;

            case 'act_plomb':

                return <ActPlombForm invoice_id = { invoice.id } onBack = { () => { setCurrentView("list")} }/>;

            case 'act_sf':

                return <ActSFForm invoice_id = { invoice.id } onBack = { () => { setCurrentView("list")} }/>;

            case 'act_ige':

                return <ActIGEForm invoice_id = { invoice.id } onBack = { () => { setCurrentView("list")} }/>;

            case 'prescription':

                return <ActPrescript />;

            default:

                return <ActButtonsList />;
        }
    };

    return (
        <>
            <div className='scroll'>
                {renderCurrentView()}
            </div>
        </>
    );
};

export default InvoiceActs;