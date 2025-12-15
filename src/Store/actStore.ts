// src/Store/actsStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
<<<<<<< HEAD
import { ActCompletedData, ActPlombData, ActShutdownData, BatteryReplacementData, HouseInspectData, PrescriptData } from './types'; // путь поправьте
=======
import { ActCompletedData, ActPlombData, HouseInspectData } from './types'; // путь поправьте
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19

// ============================================
// ТИПЫ STORE
// ============================================
interface ActsState {

    actComplete:                  ActCompletedData;

    actHouseInspect:              HouseInspectData;

    actPlomb:                     ActPlombData; // НОВЫЙ

<<<<<<< HEAD
    actShutdown:                  ActShutdownData; // НОВЫЙ

    prescript:                    PrescriptData; // НОВЫЙ

    batteryReplacement:           BatteryReplacementData;

=======
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
    loading:                      boolean;
  
    saving:                       boolean;

}

interface ActsActions {
  setData:                        ( type, data: any)  => void;
  setLoading:                     ( loading: boolean) => void;
  setSaving:                      ( saving: boolean)  => void;
  reset:                          ( type: number )    => void
  setField:                       <K extends keyof any>(
    type:     number,
    field:    K,
    value:    any
  ) => void;
}

type ActsStore = ActsState & ActsActions;


<<<<<<< HEAD

=======
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
export const initActCompleteData: ActCompletedData = {
  id:                             '',
  invoice_id:                     '',
  act_number:                     '',
  act_date:                       new Date().toISOString().split('T')[0],
  executor_name:                  '',
  executor_position:              '',
  client_name:                    '',
  address:                        '',
  work_description:               '',
  equipment_used:                 '',
  work_started_date:              new Date().toISOString().split('T')[0],
  work_completed_date:            new Date().toISOString().split('T')[0],
  quality_assessment:             '',
  defects_found:                  '',
  recommendations:                '',
  executor_signature:             '',
  client_signature:               '',
  representative_signature:       '',
  notes:                          ''
};

<<<<<<< HEAD
export const initActHouseInspect: HouseInspectData = {
=======
export const initialActHouseInspect: HouseInspectData = {
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
  id:                              undefined,
  invoice_id:                      undefined,
  act_number:                      '',
  act_date:                        new Date().toISOString().split('T')[0],
  act_time:                        new Date().toTimeString().slice(0, 5),
  account_number:                  '',
  address:                         '',
  street:                          '',
  house:                           '',
  apartment:                       '',
  organization_representative:     '',
  subscriber_name:                 '',
  subscriber_document:             '',
  subscriber_representative_name:  '',
  subscriber_representative_document: '',
  witness_name:                    '',
  witness_document:                '',
  violations_found:                '',
  living_area:                     undefined,
  non_living_area:                 undefined,
  residents_count:                 undefined,
  subscriber_opinion:              '',
  notes:                           '',
  meters:                          []
};

<<<<<<< HEAD
export const initActPlomb: ActPlombData = {
=======
export const initialActPlomb: ActPlombData = {
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
  id:                       undefined,
  invoice_id:               undefined,
  act_number:               '',
  act_date:                 new Date().toISOString().split('T')[0],
  subscriber_name:          '',
  address:                  '',
  street:                   '',
  house:                    '',
  apartment:                '',
  usd_representative:       '',
  notes:                    '',
  meters:                   [{
    meter_number:           '',
    seal_number:            '',
    current_reading:        '',
    meter_type:             '',
    notes:                  '',
    sequence_order:         1
  }],
  recipient_signature:      '',
  receipt_date:             '',
  created_at:               '',
  updated_at:               ''
};

<<<<<<< HEAD
export const initActShutdown: ActShutdownData = {
  id:                           '',
  act_date:                     new Date().toISOString().split('T')[0],
  representative_name:          '',
  reason:                       '',
  equipment:                    '',
  apartment:                    '',
  house:                        '',
  street:                       '',
  subscriber_name:              '',
  order_issued_by:              '',
  order_received_by:            '',
  executor_name:                '',
  execution_date:               '',
  execution_time:               '',
  disconnected_equipment:       '',
  execution_apartment:          '',
  execution_house:              '',
  execution_street:             '',
  reconnection_date:            '',
  reconnection_representative:  '',
  reconnection_supervisor:      '',
  reconnection_apartment:       '',
  reconnection_house:           '',
  reconnection_street:          '',
  reconnection_subscriber:      ''
};

export const initPrescript: PrescriptData = {
  id:                           '',
  invoice_id:                   '',
  prescription_number:          '',
  prescription_date:            '',
  check_address:                '',
  account_number:               '',
  subscriber_name:              '',
  subscriber_phone:             '',
  violations_text:              '',
  deadline_date:                '',
  organization_representative:  '',
  subscriber_signature:         '',
  subscriber_representative:    '',
  violation_type:               '',
  status:                       '',
  document_scan_path:           '',
};

export const initBatteryReplacementAct: BatteryReplacementData = {
  id:                           '',
  invoice_id:                   '',
  act_number:                   '',
  act_date:                     new Date().toISOString().split('T')[0],
  
  // Данные исполнителя
  technician_position:          'Слесарь СТГО АО УГРС «Сахатранснефтегаз»',
  technician_name:              '',
  
  // Данные владельца
  owner_name:                   '',
  owner_phone:                  '',
  
  // Объект и адрес
  object_type:                  '',
  object_street:                '',
  object_house:                 '',
  object_apartment:             '',
  
  // Данные замены оборудования
  removal_date:                 new Date().toISOString().split('T')[0],
  removed_meter_model:          'G---',
  removed_meter_number:         '',
  removed_meter_reading:        '',
  removed_seal_number:          '',
  
  installation_date:          new Date().toISOString().split('T')[0],
  installed_meter_model:        'G---',
  installed_meter_number:       '',
  installed_meter_reading:      '',
  installed_seal_number:        '',
  
  // Подписи
  technician_signature:         '',
  owner_signature:              '',
  
  // Статус и документы
  status:                       'completed',
  document_scan_path:           ''
};


=======
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
export const useActsStore = create<ActsStore>()(

  devtools((set) => ({
    
    actComplete:            { ...initActCompleteData },
    
<<<<<<< HEAD
    actHouseInspect:        initActHouseInspect,

    actPlomb:               initActPlomb,
    
    actShutdown:            initActShutdown,

    prescript:              initPrescript,

    batteryReplacement:     initBatteryReplacementAct,
=======
    actHouseInspect:        initialActHouseInspect,

    actPlomb:               initialActPlomb,
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19

    errors:                 {},
    loading:                false,
    saving:                 false,

    setData:                ( type, data ) => {
      switch( type ){
        case 0:     set({ actComplete: data });break;
        case 1:     set({ actHouseInspect: data });break;
        case 2:     set({ actPlomb: data });break;
<<<<<<< HEAD
        case 3:     set({ actShutdown: data });break;
        case 4:     set({ prescript: data });break;
        case 5:     set({ batteryReplacement: data });break;
=======
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
        default: break;
      }
      
    },
    
    setLoading:             (loading) => set({ loading }),
    
    setField:               ( type, field, value) => {
      switch( type ) {
        
        case 0: set((state) => ({
                    actComplete: { ...state.actComplete, [field]: value }
                })); break;
        
        case 1: set((state) => ({
                    actHouseInspect: { ...state.actHouseInspect, [field]: value }
                })); break;
        
        case 2: set((state) => ({
                    actPlomb: { ...state.actPlomb, [field]: value }
                })); break;
<<<<<<< HEAD
                
        case 3: set((state) => ({
                    actShutdown: { ...state.actShutdown, [field]: value }
                })); break;
        
        case 4: set((state) => ({
                    prescript: { ...state.prescript, [field]: value }
                })); break;
        
        case 5: set((state) => ({
                    batteryReplacement: { ...state.batteryReplacement, [field]: value }
                })); break;
=======
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
        
        default: break;

      }
    },
    
    reset:       (type: number) => {
      switch( type ) {
        
        case 0: set({ actComplete: initActCompleteData })
        
<<<<<<< HEAD
        case 1: set({ actHouseInspect: initActHouseInspect })

        case 2: set({ actPlomb: initActPlomb })

        case 3: set({ actShutdown: initActShutdown })

        case 4: set({ prescript: initPrescript })

        case 5: set({ batteryReplacement: initBatteryReplacementAct })
=======
        case 1: set({ actHouseInspect: initialActHouseInspect })

        case 2: set({ actPlomb: initialActPlomb })
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19

      }
      
    }

  }), { name: 'acts-store' })

);


export const actsActions = {

  setActCompleteData:       ( data: ActCompletedData) => { useActsStore.getState().setData(0, data) },
  setActCompleteField:      < K extends keyof any >( field: K, value: any ) => useActsStore.getState().setField(0, field, value),
  resetActComplete:         ( ) => useActsStore.getState().reset( 0 ),

<<<<<<< HEAD
  setData:                  (type: number, data: any) => { useActsStore.getState().setData(type, data) },
=======
  setData:                  (type: number, data: HouseInspectData) => { useActsStore.getState().setData(type, data) },
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
  setField:                 <K extends keyof any>(type: number, field: K, value: any) => useActsStore.getState().setField(type, field, value),
  reset:                    (type: number) => useActsStore.getState().reset( type ),

  setLoading:               ( loading: boolean ) => useActsStore.getState().setLoading( loading )

};
