// Acts/ActsCreate.tsx
import React from 'react';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon
} from '@ionic/react';
import { 
    addOutline,
    batteryChargingOutline,
    swapHorizontalOutline,
    constructOutline,
    shieldCheckmarkOutline,
    warningOutline,
    flashOutline
} from 'ionicons/icons';
import { ActType, actTitles } from '../../../../Store/ActTypes';

interface ActsCreateProps {
    invoiceId: string;
    onActTypeSelect: (actType: ActType) => void;
    onBack: () => void;
}

export const ActsCreate: React.FC<ActsCreateProps> = ({
    invoiceId,
    onActTypeSelect,
    onBack
}) => {
    const actTemplates = [
        {
            type: 'actbr' as ActType,
            name: actTitles.actbr,
            icon: batteryChargingOutline,
            color: 'tertiary',
            description: 'Замена аккумуляторной батареи в приборе учета'
        },
        {
            type: 'actmr' as ActType,
            name: actTitles.actmr,
            icon: swapHorizontalOutline,
            color: 'success',
            description: 'Замена газового счетчика на новый прибор учета'
        },
        {
            type: 'actmi' as ActType,
            name: actTitles.actmi,
            icon: flashOutline,
            color: 'warning',
            description: 'Установка нового газового счетчика'
        },
        {
            type: 'actplomb' as ActType,
            name: actTitles.actplomb,
            icon: shieldCheckmarkOutline,
            color: 'primary',
            description: 'Пломбирование прибора учета'
        },
        {
            type: 'actsf' as ActType,
            name: actTitles.actsf,
            icon: warningOutline,
            color: 'danger',
            description: 'Снятие и повторная установка пломбы'
        },
        {
            type: 'actsge' as ActType,
            name: actTitles.actsge,
            icon: constructOutline,
            color: 'dark',
            description: 'Отключение или ограничение подачи газа'
        },
    ];

    const getDetailedDescription = (type: ActType) => {
        switch (type) {
            case 'actbr':
                return 'Замена аккумуляторной батареи в счетчике';
            case 'actmr':
                return 'Полная замена газового счетчика';
            case 'actmi':
                return 'Первичная установка газового счетчика';
            case 'actplomb':
                return 'Установка пломбы на прибор учета';
            case 'actsf':
                return 'Акт о нарушении целостности пломбы';
            case 'actsge':
                return 'Отключение газового оборудования за долги';
            default:
                return 'Создание акта';
        }
    };

    return (
        <div className="acts-create-page">
            {/* Заголовок */}
            <div className="acts-page-header">
                <div className="header-left">
                    <IonButton 
                        fill="clear" 
                        onClick={onBack}
                        className="back-button"
                    >
                        ← Назад
                    </IonButton>
                    <h2 className="acts-page-title">Создание акта</h2>
                </div>
                <div className="header-right">
                    <p className="invoice-info">Заявка #{invoiceId}</p>
                </div>
            </div>

            {/* Карточка с выбором типа акта */}
            <IonCard className="acts-create-card">
                <IonCardHeader>
                    <IonCardTitle>Выберите тип акта</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p className="create-instruction">
                        Выберите тип акта, который требуется создать для заявки #{invoiceId}.
                        После выбора откроется форма для заполнения данных.
                    </p>
                    
                    <IonGrid>
                        {actTemplates.map((template) => (
                            <IonRow key={template.type}>
                                <IonCol>
                                    <IonButton
                                        expand="block"
                                        fill="outline"
                                        color={template.color as any}
                                        onClick={() => onActTypeSelect(template.type)}
                                        className="act-type-button"
                                        size="large"
                                    >
                                        <div className="act-type-button-content">
                                            <div className="act-type-icon">
                                                <IonIcon 
                                                    icon={template.icon} 
                                                    size="large"
                                                />
                                            </div>
                                            <div className="act-type-info">
                                                <div className="act-type-title">
                                                    {template.name}
                                                </div>
                                                <div className="act-type-description">
                                                    {getDetailedDescription(template.type)}
                                                </div>
                                            </div>
                                            <IonIcon 
                                                icon={addOutline} 
                                                className="add-icon"
                                            />
                                        </div>
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        ))}
                    </IonGrid>

                    <div className="create-actions">
                        <IonButton 
                            expand="block" 
                            fill="clear" 
                            onClick={onBack}
                            className="cancel-button"
                        >
                            Отмена
                        </IonButton>
                    </div>
                </IonCardContent>
            </IonCard>

            {/* Информационная секция */}
            <IonCard className="info-card">
                <IonCardHeader>
                    <IonCardTitle>Информация о типах актов</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <ul className="act-types-info">
                        <li>
                            <strong>{actTitles.actbr}</strong> - используется при замене 
                            аккумуляторной батареи в газовом счетчике
                        </li>
                        <li>
                            <strong>{actTitles.actmr}</strong> - составляется при полной 
                            замене газового счетчика на новый
                        </li>
                        <li>
                            <strong>{actTitles.actmi}</strong> - акт первичной установки 
                            газового счетчика
                        </li>
                        <li>
                            <strong>{actTitles.actplomb}</strong> - документ о пломбировании 
                            прибора учета
                        </li>
                        <li>
                            <strong>{actTitles.actsf}</strong> - акт о нарушении целостности 
                            пломбы с последующей установкой новой
                        </li>
                        <li>
                            <strong>{actTitles.actsge}</strong> - акт отключения или 
                            ограничения подачи газа за долги
                        </li>
                    </ul>
                </IonCardContent>
            </IonCard>
        </div>
    );
};