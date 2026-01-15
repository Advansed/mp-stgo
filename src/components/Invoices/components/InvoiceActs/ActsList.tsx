// Acts/ActsList.tsx (часть с изменениями)
import React from 'react';
import {
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonBadge,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
} from '@ionic/react';
import { 
    documentOutline, 
    eyeOutline, 
    createOutline,
    addOutline // Добавлена иконка
} from 'ionicons/icons';
import './Acts.css';
import { ActData } from '../../../../Store/ActTypes';

interface ActsListProps {
    acts:           ActData[],
    loading:        boolean, 
    invoiceId:      string;
    onModeChange:   ( mode: 'view' | 'edit' | 'create', actId?: string, actType?: ActData['type'] ) => void;
    onCreateClick:  () => void; // Новая пропса
}

export const ActsList: React.FC<ActsListProps> = ({
    acts, 
    loading,
    invoiceId,
    onModeChange,
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
                                <IonItem key={act.id} button onClick={() => onModeChange('view', act.id)}>
                                    <IonIcon 
                                        icon={documentOutline} 
                                        slot="start" 
                                        color="primary"
                                    />
                                    <IonLabel>
                                        <h3>{act.act_number || `Акт #${act.id.slice(0, 8)}`}</h3>
                                        <p>Тип: {actTemplates.find(t => t.type === act.type)?.name || act.type}</p>
                                        <p>Создан: { act.created_at }</p>
                                    </IonLabel>
                                    <IonBadge 
                                        //color={getStatusColor(act.status)}
                                    >
                                        { act.status }
                                    </IonBadge>
                                    <div slot="end" className="act-actions">
                                        <IonButton 
                                            fill="clear" 
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onModeChange('edit', act.id);
                                            }}
                                        >
                                            <IonIcon icon={createOutline} />
                                        </IonButton>
                                        <IonButton 
                                            fill="clear" 
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onModeChange('view', act.id);
                                            }}
                                        >
                                            <IonIcon icon={eyeOutline} />
                                        </IonButton>
                                    </div>
                                </IonItem>
                            ))}
                        </IonList>
                    )}
                </IonCardContent>
            </IonCard>
        </div>
    );
};