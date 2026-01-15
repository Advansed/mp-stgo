import { create } from 'zustand';
import { ActData } from './ActTypes';

interface ActState {
  // Состояние
  acts:                     ActData[];
  act:                      ActData | null;
  loading:                  boolean;
  
  // Actions
  setActs:                  (acts: ActData[]) => void;
  setAct:                   (act: ActData | null) => void;
  setLoading:               (loading: boolean) => void;
  
}

export const useActStore = create<ActState>((set, get) => ({
  acts:                     [],
  act:                      null,
  loading:                  false,

  // Базовые сеттеры
  setActs:                  (acts) => set({ acts }),
  setAct:                   (act) => set({ act }),
  setLoading:               (loading) => set({ loading }),

}));

// Хуки для удобства
export const useActs        = () => useActStore(state => state.acts);
export const useAct         = () => useActStore(state => state.act);
export const useActLoading  = () => useActStore(state => state.loading);

