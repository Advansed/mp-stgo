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

  const { setUser } = useUser();
  const { setAuth } = useAuth();
  const { loading, setLoading } = useLoading();
  const { setToken } = useToken();
  const toast = useToast();

  useEffect(() => {
    const login = localStorage.getItem("mi.login");
    const pass = localStorage.getItem("mi.password");
    
    if (login || pass) {
      setState(prev => ({
        username: login || prev.username,
        password: pass || prev.password,
        rememberMe: !!(login && pass)
      }));
    }
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