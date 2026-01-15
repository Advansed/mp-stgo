// Acts/index.tsx
import React, { useState, useEffect } from 'react';
import { ActsList } from './ActsList';
//import { ActView } from './ActView';
import { ActForm } from './ActForm';
import { useActs } from './useActs';
import { ActType } from '../../../../Store/ActTypes'; // Добавляем импорт
import { ActsCreate } from './ActsCreate';
import { IonLoading } from '@ionic/react';

interface ActsManagerProps {
    invoice:        any;
    initialMode?:   string;
}

export const ActsManager: React.FC<ActsManagerProps> = ({
    invoice,
    initialMode = 'list'
}) => {
    const [mode, setMode] = useState(initialMode);
    const [selectedActId, setSelectedActId] = useState<string | undefined>();
    const [selectedActType, setSelectedActType] = useState<ActType | undefined>();

    const { acts, loading, loadActs, getAct } = useActs(invoice.id);

    const handleModeChange = (newMode: 'list' | 'create' | 'view' | 'edit', actId?: string, actType?: ActType) => {
        setMode(newMode);
        setSelectedActId(actId);
        setSelectedActType(actType);
    };

    const handleCreateClick = () => {
        handleModeChange('create');
    };

    const handleActTypeSelect = async(actType: ActType) => {
        // Переходим к форме создания конкретного типа акта
        await getAct( invoice.id, actType )
        
        handleModeChange('edit', undefined, actType);    
        
    };

    const renderContent = () => {
        switch (mode) {
            case 'list':
                return (
                    <ActsList
                        invoiceId       = { invoice.number }
                        acts            = { acts }
                        loading         = { loading }
                        onModeChange    = { handleModeChange }
                        onCreateClick   = { handleCreateClick } // Передаем обработчик
                    />
                );

            case 'create':
                return (
                    <ActsCreate
                        invoiceId       = { invoice.number }
                        onActTypeSelect = { handleActTypeSelect }
                        onBack          = { () => handleModeChange('list') }
                    />
                );

            case 'edit':
                return ( 
                    <ActForm
                        onClose         = { () => handleModeChange('list') }
                    />
                );

            case 'view':
                return (
                    <></>
                    // <ActView
                    //     actId={selectedActId!}
                    //     onBack={() => handleModeChange('list')}
                    //     onEdit={() => handleModeChange('edit', selectedActId!)}
                    // />
                );

            default:
                return null;
        }
    };

    return (
        <div className="acts-manager">
            <IonLoading isOpen = { loading } message = 'Подождите'/>
            {renderContent()}
        </div>
    );
};

export default ActsManager;