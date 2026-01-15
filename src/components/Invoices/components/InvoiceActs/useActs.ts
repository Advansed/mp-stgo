import { useEffect } from 'react';
import { useActStore } from '../../../../Store/actStore';
import { post } from '../../../../Store/api';
import { useToken } from '../../../../Store/loginStore';
import { useToast } from '../../../Toast';

export const useActs = ( invoice_id ) => {
    const { acts, setActs, setLoading, loading, act, setAct } = useActStore();

    const toast = useToast();

    const { token } = useToken();

    const loadActs = async( invoice_id: string ) => {
        
        const res = await post("mp_get_acts", { token, invoice_id });
        console.log('mp_get_acts', res )
        setActs(res.data || []);
    }
    
    useEffect(() => {
        if (invoice_id) {
            loadActs(invoice_id);
        }
    }, [invoice_id]);

    const getAct = async ( invoice_id: string, act_type:string ) => {
        setLoading( true )
        try {
        const res = await post("mp_get_act", { token, invoice_id, act_type })
        console.log("mp_get_act", res)
        if(res.success) {
            setAct( res.data )
        }
        } catch {
            toast.error("Ошибка получения акта")
        } finally {
            setLoading(false)
        }
    }


    return { 
        acts, 
        loading, 
        loadActs,
        getAct
    };
};
