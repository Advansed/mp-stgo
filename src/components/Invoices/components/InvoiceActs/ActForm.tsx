// Acts/ActForm.tsx
import React, { useState, useEffect } from 'react';
import { ActData, ActType } from '../../../../Store/ActTypes';
import { useActStore } from '../../../../Store/actStore';
import { t_actbr, t_actmi, t_actmr, t_actplomb, t_actsf, t_actsge } from '../../../../constants/templates';
import { ActBRForm } from '../../../Acts/ActBR/ActBRForm';
import { ActMRForm } from '../../../Acts/ActMR/ActMRForm';
import { ActPlombForm } from '../../../Acts/ActPlomb/ActPlombForm';
import { ActMIForm } from '../../../Acts/ActMI/ActMIForm';
import { ActSFForm } from '../../../Acts/ActSF/ActSFForm';
import { ActSGEForm } from '../../../Acts/ActSGE/ActSGEForm';

interface ActFormProps {
    onClose:        () => void;
    onSave:         (act:ActData) => Promise<void>
}

type TemplateType = typeof t_actbr | typeof t_actmr | typeof t_actmi | typeof t_actplomb | typeof t_actsf | typeof t_actsge;

export const ActForm: React.FC<ActFormProps> = ({
    onClose, onSave
}) => {
    const act   = useActStore(state => state.act)

    const [ type, setType ] = useState<ActType>()

    useEffect(()=>{
        if(act){
            setType( act.type )
        }
    },[ act ])

    const handleSave = (n_act) => {
        onSave( n_act )
    }



    return (
        <>
            { 
                type === 'actbr' 
                    ? <ActBRForm act = { act  } onClose = { onClose } onSave = { handleSave }/>
                : type === 'actmr' 
                    ? <ActMRForm act = { act  } onClose = { onClose } onSave = { handleSave }/>
                : type === 'actmi' 
                    ? <ActMIForm act = { act  } onClose = { onClose } onSave = { handleSave }/>
                : type === 'actplomb' 
                    ? <ActPlombForm act = { act  } onClose = { onClose } onSave = { handleSave }/>
                : type === 'actsf' 
                    ? <ActSFForm act = { act  } onClose = { onClose } onSave = { handleSave }/>
                : type === 'actsge' 
                    ? <ActSGEForm act = { act  } onClose = { onClose } onSave = { handleSave }/>
                : <></>
            }
        </>
    );
};