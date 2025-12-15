// hooks/useLogin.ts
import { useEffect }          from 'react';
import { useAuth, useToken } from './Store/loginStore';
import { post } from './Store/api';
import { useData, useLoading } from './Store/licsStore';
import { useInvoices } from './Store/invoiceStore';
<<<<<<< HEAD
=======
import { useWorkers } from './Store/navigationStore';
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19


export const useApp = () => {

  const { auth }                  = useAuth()
  const { token }                 = useToken();

  const { setLoading }            = useLoading()
  const { setData: setLics }      = useData()
  const { setData: setInvoices }  = useInvoices()
<<<<<<< HEAD
=======
  const { setWorkers }            = useWorkers()
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19

  useEffect(()=>{
    if( auth ){

        get_lics( token )

        get_invoices( token )
<<<<<<< HEAD
    }
=======

        get_workers( token )
    }  
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
  },[auth])

  const get_lics                    = async (token ) => {

    const res = await post("get_lics", { token })
    console.log("get_lics App...", res.data )
    if( res.success ) setLics( res.data )

  }

  const get_invoices                = async (token ) => {

<<<<<<< HEAD
    const res = await post("mp_invoices", { token })
    console.log("invoices App...", res.data )
    if( res.success ) setInvoices( res.data )
      setInvoices( res.data )
=======
    const res = await post("get_invoices", { token })
    console.log("get_invoices App...", res.data )
    if( res.success ) setInvoices( res.data )
      

  }

  const get_workers                = async (token ) => {

    const res = await post("get_workers", { token })
    console.log("get_workers App...", res.data )
    if( res.success ) setWorkers( res.data )
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19

  }

  return {
    auth
  };
};
