// Acts/ActsList.tsx (часть с изменениями)
import React from 'react';
import {
    IonList,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
} from '@ionic/react';
import { 
    documentOutline, 
    addOutline
} from 'ionicons/icons';
import './Acts.css';
import { ActData } from '../../../../Store/ActTypes';
import { ActItem } from './ActItem';

interface ActsListProps {
    acts:           ActData[],
    loading:        boolean, 
    invoiceId:      string;
    onPreview:      ( id, type ) => void;
    onEdit:         ( id, type ) => void;
    onCreateClick:  () => void; // Новая пропса
}

export const ActsList: React.FC<ActsListProps> = ({
    acts, 
    loading,
    invoiceId,
    onPreview,
    onEdit,
    onCreateClick // Новая пропса
}) => {
    const actTemplates = [
        {
            type:           'actbr' as ActData['type'],
            name:           'Акт замены аккумуляторной батареи счетчика',
            icon:           'battery-charging-outline',
            color:          'tertiary',
            description:    'Замена аккумулятора в приборе учета'
        },
        {
            type:           'actmr' as ActData['type'],
            name:           'Акт замены счетчика',
            icon:           'swap-horizontal-outline',
            color:          'success',
            description:    'Замена прибора учета'
        },
        // ... добавьте остальные типы
    ];

    // ... остальной код без изменений до render ...

    return (
        <div className="acts-page">
            {/* Заголовок с кнопкой создания */}
            <div className="acts-page-header">
                <h2 className="acts-page-title">Акты заявки #{invoiceId}</h2>
                <IonButton 
                    color       =   "primary" 
                    fill        =   "solid"
                    onClick     =   { onCreateClick }
                    className   =   "create-act-button"
                >
                    <IonIcon icon={addOutline} slot="start" />
                    Создать акт
                </IonButton>
            </div>

            {/* Существующие акты */}
            <IonCard className="acts-existing-card">
                <IonCardHeader>
                    <IonCardTitle>Существующие акты</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    {acts.length === 0 ? (
                        <div className="no-acts-message">
                            <IonIcon icon={documentOutline} size="large" />
                            <p>Акты не созданы</p>
                        </div>
                    ) : (
                        <IonList lines="full">
                            {acts.map((act) => (
                                <ActItem
                                    key={act.id}
                                    act={act}
                                    actTemplates    = { actTemplates }
                                    onPreview       = { onPreview }
                                    onEdit          = { onEdit }
                                />
                            ))}
                        </IonList>
                    )}
                </IonCardContent>
            </IonCard>
        </div>
    );
};