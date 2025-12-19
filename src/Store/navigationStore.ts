// src/Store/navigationStore.ts

import React from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';


export const useNavigationStore     = create<any>()(
  
  devtools(
    (set, get) => ({

        route:                  '/invoices',
        page:                   0,
        history:                [{ route: '/invoices', page: 0 }],
        item:                   undefined,
        add:                    false,

        setRoute:        (route) => {

            set((state) => ({
                currentRoute: route,
                history: [...state.history, { route, page: 0 }]
            })); 

            console.log( get().history, route)

        },

        setPage:                (page) => {
            set((state) => ({
                page:       page,
                history:    [...state.history, { route: state.route, page: page }]
            })); 

            console.log( get().history, page )
        },

        back:                   () => set((state) => {
            console.log('back')
            if (state.history.length > 1) {
                console.log( state.history )
                const newHistory = state.history.slice(0, -1);
                return {
                    history:    newHistory,
                    route:      newHistory[newHistory.length - 1].route,
                    page:       newHistory[newHistory.length - 1].page,
                };
            }
            // если истории нет, оставляем как есть
            return state;
        }),

        setItem:                ( item ) => set({ item }),

        setAdd:                 ( add ) => set({ add })

    }),
    { name: 'navigation-store' }
  )

);

export const useRoutes              = (  ) => {

    const route                 = useNavigationStore( (state) => state.route );
    const page                  = useNavigationStore( (state) => state.page );
    const setRoute              = useNavigationStore( (state) => state.setRoute );
    const setPage               = useNavigationStore( (state) => state.setPage );
    const back                  = useNavigationStore( (state) => state.back );

    const goBack        = ( ) => back()

  return { route, page, setRoute, setPage, goBack };
};

export const useItem                = ( ) => {
    const item                  = useNavigationStore( (state) => state.item )
    const setItem               = useNavigationStore( (state) => state.setItem )

    return { item, setItem }
}

export const useAdd                 = ( ) => {
    const add                  = useNavigationStore( (state) => state.add )
    const setAdd               = useNavigationStore( (state) => state.setAdd )

    return { add, setAdd }
}       