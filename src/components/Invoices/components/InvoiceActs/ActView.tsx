// Acts/ActView.tsx
import React, { useState, useEffect } from 'react';
import { ActData, ActType } from '../../../../Store/ActTypes';
import { useActStore } from '../../../../Store/actStore';
import { ActBRView } from '../../../Acts/ActBR/ActBRView';

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
                    ? <></>
                : type === 'actmi' 
                    ? <></>
                : type === 'actplomb' 
                    ? <></>
                : type === 'actsf' 
                    ? <></>
                : type === 'actsge' 
                    ? <></>
                : <></>
            }
        </>
    );
};
