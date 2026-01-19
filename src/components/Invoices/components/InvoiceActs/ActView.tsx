// Acts/ActView.tsx
import React, { useState, useEffect } from 'react';
import { ActData, ActType } from '../../../../Store/ActTypes';
import { useActStore } from '../../../../Store/actStore';
import { ActBRView } from '../../../Acts/ActBR/ActBRView';
import { ActMRView } from '../../../Acts/ActMR/ActMRView';
import { ActPlombView } from '../../../Acts/ActPlomb/ActPlombView';
import { ActMIView } from '../../../Acts/ActMI/ActMIView';
import { ActSFView } from '../../../Acts/ActSF/ActSFView';
import { ActSGEView } from '../../../Acts/ActSGE/ActSGEView';

interface ActViewProps {
    onBack:        () => void;
    onEdit:        () => void;
}

export const ActView: React.FC<ActViewProps> = ({
    onBack, onEdit
}) => {
    const act   = useActStore(state => state.act)

    const [ type, setType ] = useState<ActType>()

    useEffect(()=>{
        if(act){
            setType( act.type )
        }
    },[ act ])

    return (
        <>
            { 
                type === 'actbr' 
                    ? <ActBRView act = { act  } onBack = { onBack } onEdit = { onEdit }/>
                : type === 'actmr' 
                    ? <ActMRView act = { act  } onBack = { onBack } onEdit = { onEdit }/>
                : type === 'actmi' 
                    ? <ActMIView act = { act  } onBack = { onBack } onEdit = { onEdit }/>
                : type === 'actplomb' 
                    ? <ActPlombView act = { act  } onBack = { onBack } onEdit = { onEdit }/>
                : type === 'actsf' 
                    ? <ActSFView act = { act  } onBack = { onBack } onEdit = { onEdit }/>
                : type === 'actsge' 
                    ? <ActSGEView act = { act  } onBack = { onBack } onEdit = { onEdit }/>
                : <></>
            }
        </>
    );
};
