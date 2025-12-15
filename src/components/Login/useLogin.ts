import { useCallback, useEffect, useState } from 'react';
import { useAuth, useLoading, useToken, useUser } from '../../Store/loginStore';
import { post } from '../../Store/api';
import { useToast } from '../Toast';

export const useLogin = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

<<<<<<< HEAD
  const { setUser } = useUser();
  const { setAuth } = useAuth();
  const { loading, setLoading } = useLoading();
  const { setToken } = useToken();
  const toast = useToast();
=======
  const [username, setUsername]     = useState('');
  const [password, setPassword]     = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const { user, setUser }           = useUser()
  const { setAuth }                 = useAuth()
  const { loading, setLoading }     = useLoading()
  const { token, setToken }         = useToken();
  const toast                       = useToast()
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19

  useEffect(() => {
    const login = localStorage.getItem("mi.login");
    const pass = localStorage.getItem("mi.password");
    
<<<<<<< HEAD
    if (login || pass) {
      setState(prev => ({
        username: login || prev.username,
        password: pass || prev.password,
        rememberMe: !!(login && pass)
      }));
    }
=======
    const login         = localStorage.getItem("mi.login")
    if( login ){ setUsername( login ); }
    
    const pass          = localStorage.getItem("mi.password")
    if( pass ){ setPassword( pass ); setRememberMe(true)}

  },[])

  const handleLogin                 = useCallback( async (data:any) => {

    setLoading( true )
    
    try {
      const res = await post("login", data )
      
      console.log( res )  

      if( res.success ){

        setUser( res.data )
        setToken( res.data.token )
        setAuth( true )

        if(rememberMe){
          console.log('member')
          localStorage.setItem("mi.login", data.login )
          localStorage.setItem("mi.password", data.password )
        }

      } else toast.error( res.message)

    } catch(e: any) {

      toast.error( e.message )

    } finally {

      setLoading( false )

    }

    
  }, [rememberMe, password, username]);


  const handleMemberMe              = useCallback( (data: boolean) => {
      console.log("member", data)
      if(!data){
        localStorage.removeItem("mi.login")  
        localStorage.removeItem("mi.password")  
      }; setRememberMe( data )

>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
  }, []);

  const handleLogin = useCallback(async (data: any) => {
    setLoading(true);
    
    try {
      const res = await post("login", data);
      
      if (res.success) {
        setUser(res.data);
        setToken(res.data.token);
        setAuth(true);

        if (state.rememberMe) {
          localStorage.setItem("mi.login", data.login);
          localStorage.setItem("mi.password", data.password);
        }

        toast.success('Успешный вход в систему');
      } else {
        toast.error(res.message || 'Ошибка авторизации');
      }
    } catch (e: any) {
      console.error('Login error:', e);
      toast.error(e.message || 'Произошла ошибка при входе');
    } finally {
      setLoading(false);
    }
  }, [state.rememberMe, setLoading, setUser, setToken, setAuth, toast]);

  const handleMemberMe = useCallback((remember: boolean) => {
    if (!remember) {
      localStorage.removeItem("mi.login");
      localStorage.removeItem("mi.password");
    }
    setState(prev => ({ ...prev, rememberMe: remember }));
  }, []);

  return {
    ...state,
    setUsername: (username: string) => setState(prev => ({ ...prev, username })),
    setPassword: (password: string) => setState(prev => ({ ...prev, password })),
    handleMemberMe,
    loading,
    login: handleLogin
  };
};