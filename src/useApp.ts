// hooks/useLogin.ts
import { useEffect }          from 'react';
import { useAuth, useToken } from './Store/loginStore';
import { post } from './Store/api';
import { useData, useLoading } from './Store/licsStore';
import { useInvoices } from './Store/invoiceStore';

export const useApp = () => {

  const { auth }                  = useAuth()
  const { token }                 = useToken();

  const { setLoading }            = useLoading()
  const { setData: setLics }      = useData()
  const { setData: setInvoices }  = useInvoices()

  useEffect(()=>{
    if( auth ){
        get_lics( token )
        get_invoices( token )
    }
  },[auth])

  const get_lics                    = async (token ) => {
    const res = await post("get_lics", { token })
    console.log("get_lics App...", res.data )
    if( res.success ) setLics( res.data )
  }

  const get_invoices                = async (token ) => {
    const res = await post("mp_invoices", { token })
    console.log("invoices App...", res.data )
    if( res.success ) setInvoices( res.data )
      setInvoices( res.data )
  }

  return {
    auth
  };
};