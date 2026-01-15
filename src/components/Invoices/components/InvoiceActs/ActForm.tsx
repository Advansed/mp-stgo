// Acts/ActForm.tsx
import React, { useState, useEffect } from 'react';
import { ActType } from '../../../../Store/ActTypes';
import { useActStore } from '../../../../Store/actStore';
import { t_actbr, t_actmi, t_actmr, t_actplomb, t_actsf, t_actsge } from '../../../../constants/templates';
import { ActBRForm } from '../../../Acts/ActBR/ActBRForm';

interface ActFormProps {
    onClose:       () => void;
}

type TemplateType = typeof t_actbr | typeof t_actmr | typeof t_actmi | typeof t_actplomb | typeof t_actsf | typeof t_actsge;

export const ActForm: React.FC<ActFormProps> = ({
    onClose
}) => {
    const { act, setAct, acts, setActs }   = useActStore()

    const [ type, setType ] = useState<ActType>()

    useEffect(()=>{
        if(act){
            setType( act.type )
        }
    },[ act ])

    const handleSave = ( n_act ) => {
        
        const u_acts:any = acts.map(e => {
            e.id === n_act.id ? n_act : e
        })

        setActs( u_acts )
        
        setAct( n_act )

    }


    return (
        <>
            { 
                type === 'actbr' 
                    ? <ActBRForm act = { act  } onClose = { onClose } onSave = { handleSave }/>
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