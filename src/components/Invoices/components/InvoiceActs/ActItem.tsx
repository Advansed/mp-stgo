import React from 'react';
import {
    IonCard,
    IonIcon
} from '@ionic/react';
import { 
    documentOutline, 
    eyeOutline, 
    createOutline
} from 'ionicons/icons';
import { ActData } from '../../../../Store/ActTypes';
import styles from './ActItem.module.css';

interface ActItemProps {
    act: ActData;
    actTemplates: Array<{
        type: ActData['type'];
        name: string;
    }>;
    onPreview: (id: string, type: ActData['type']) => void;
    onEdit: (id: string, type: ActData['type']) => void;
}

export const ActItem: React.FC<ActItemProps> = ({
    act,
    actTemplates,
    onPreview,
    onEdit
}) => {
    const actTypeName = actTemplates.find(t => t.type === act.type)?.name || act.type;

    const handleViewClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onPreview(act.id, act.type);
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit(act.id, act.type);
    };

    const getStatusClass = () => {
        const statusMap: Record<string, string> = {
            'draft': 'status-draft',
            'signed': 'status-signed',
            'completed': 'status-completed',
            'archived': 'status-archived'
        };
        return `${styles.statusBadge} ${styles[statusMap[act.status] || 'status-draft'] || ''}`;
    };

    return (
        <IonCard 
            className={styles.actCard}
        >
            <div className={styles.cardContentWrapper}>
                {/* Заголовок - номер и статус в одной строке */}
                <div className={styles.cardHeader}>
                    <div className={styles.headerLeft}>
                        <h3 className={styles.actNumber}>
                            {act.act_number || `Акт #${act.id.slice(0, 8)}`}
                        </h3>
                        <p className={styles.actDate}>
                            {new Date(act.created_at).toLocaleDateString('ru-RU')}
                        </p>
                    </div>
                    <div className={getStatusClass()}>
                        {act.status}
                    </div>
                </div>

                {/* Основной контент */}
                <div className={styles.cardContent}>
                    <div className={styles.infoRow}>
                        <div className={`${styles.labelWithIcon} ${styles.infoLabel}`}>
                            <IonIcon icon={documentOutline} className={styles.labelIcon} />
                            Тип:
                        </div>
                        <p className={styles.infoValue}>
                            <b>{actTypeName}</b>
                        </p>
                    </div>
                </div>

                {/* Футер с кнопками */}
                <div className={styles.cardFooter}>
                    <div className={styles.actActions}>
                        <button 
                            className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                            onClick={handleViewClick}
                        >
                            <IonIcon 
                                icon={eyeOutline} 
                                className={styles.actionIcon}
                            />
                            Просмотр
                        </button>
                        <button 
                            className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
                            onClick={handleEditClick}
                        >
                            <IonIcon 
                                icon={createOutline} 
                                className={styles.actionIcon}
                            />
                            Редактировать
                        </button>
                    </div>
                </div>
            </div>
        </IonCard>
    );
};
