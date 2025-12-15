// src/Store/invoicesStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

<<<<<<< HEAD
=======
interface InvoicesStore {
  data:     any;
  setData: (invoices: any) => void;
}
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
// ============================================
// ZUSTAND STORE
// ============================================

<<<<<<< HEAD
export const useInvoicesStore = create<any>()(
=======
export const useInvoicesStore = create<InvoicesStore>()(
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
  devtools(
    (set) => ({

      data:             [],

      setData:          ( invoices)  => set({ data: invoices }),
    
    }),
    { name: 'invoices-store' }
  )
);

// ============================================
// СЕЛЕКТИВНЫЕ ХУКИ ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ
// ============================================

export const useInvoices                = () => {
  const data      = useInvoicesStore( (state) => state.data )
  const setData   = useInvoicesStore( (state) => state.setData )

  return { data, setData }
};


// ============================================
// ACTIONS (совместимость)
// ============================================

