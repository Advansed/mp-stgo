// src/Store/actsStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { 
  ActCompletedData, 
  ActPlombData, 
  ActShutdownData, 
  BatteryReplacementData, 
  HouseInspectData, 
  PrescriptData 
} from './types';

// ============================================
// ТИПЫ STORE И КОНФИГУРАЦИИ
// ============================================

// Типы для идентификации актов
export enum ActTypesEnum {
  ACT_COMPLETE = 0,
  ACT_HOUSE_INSPECT = 1,
  ACT_PLOMB = 2,
  ACT_SHUTDOWN = 3,
  ACT_PRESCRIPT = 4,
  BATTERY_REPLACEMENT = 5
}

export type ActType = ActTypesEnum;

// Тип данных акта (объединение всех типов)
export type ActDataType = 
  | ActCompletedData 
  | HouseInspectData 
  | ActPlombData 
  | ActShutdownData 
  | PrescriptData 
  | BatteryReplacementData;

// Ключи store для каждого типа акта
export type ActStoreKey = 
  | 'actComplete'
  | 'actHouseInspect'
  | 'actPlomb'
  | 'actShutdown'
  | 'prescript'
  | 'batteryReplacement';

// Конфигурация для каждого типа акта
export interface ActConfig<T extends ActDataType> {
  type: ActType;
  storeKey: ActStoreKey;
  initData: T;
  apiMethods: {
    getByInvoice: string;
    save: string;
    getPDF?: string;
  };
}

// Маппинг типов на ключи store
export const actTypeToStoreKey: Record<ActType, ActStoreKey> = {
  [ActTypesEnum.ACT_COMPLETE]: 'actComplete',
  [ActTypesEnum.ACT_HOUSE_INSPECT]: 'actHouseInspect',
  [ActTypesEnum.ACT_PLOMB]: 'actPlomb',
  [ActTypesEnum.ACT_SHUTDOWN]: 'actShutdown',
  [ActTypesEnum.ACT_PRESCRIPT]: 'prescript',
  [ActTypesEnum.BATTERY_REPLACEMENT]: 'batteryReplacement',
};

// Маппинг ключей store на типы
export const storeKeyToActType: Record<ActStoreKey, ActType> = {
  'actComplete': ActTypesEnum.ACT_COMPLETE,
  'actHouseInspect': ActTypesEnum.ACT_HOUSE_INSPECT,
  'actPlomb': ActTypesEnum.ACT_PLOMB,
  'actShutdown': ActTypesEnum.ACT_SHUTDOWN,
  'prescript': ActTypesEnum.ACT_PRESCRIPT,
  'batteryReplacement': ActTypesEnum.BATTERY_REPLACEMENT,
};

// ============================================
// ИНИЦИАЛИЗАЦИОННЫЕ ДАННЫЕ (ВСЕ ПОЛЯ)
// ============================================

export const initActCompleteData: ActCompletedData = {
  // Обязательные поля
  act_date:                       '',
  executor_name:                  '',
  executor_position:              '',
  client_name:                    '',
  address:                        '',
  work_description:               '',
  
  // Необязательные поля (можно будет убрать)
  id:                             '',
  invoice_id:                     '',
  act_number:                     '',
  equipment_used:                 '',
  work_started_date:              '',
  work_completed_date:            '',
  quality_assessment:             '',
  defects_found:                  '',
  recommendations:                '',
  executor_signature:             '',
  client_signature:               '',
  representative_signature:       '',
  notes:                          ''
};

export const initActHouseInspect: HouseInspectData = {
  // Обязательные поля
  act_date:                       '',
  subscriber_name:                '',
  address:                        '',
  
  // Необязательные поля
  id:                             undefined,
  invoice_id:                     undefined,
  act_number:                     '',
  act_time:                       '',
  account_number:                 '',
  street:                         '',
  house:                          '',
  apartment:                      '',
  organization_representative:    '',
  subscriber_document:            '',
  subscriber_representative_name: '',
  subscriber_representative_document: '',
  witness_name:                   '',
  witness_document:               '',
  violations_found:               '',
  living_area:                    undefined,
  non_living_area:                undefined,
  residents_count:                undefined,
  subscriber_opinion:             '',
  notes:                          '',
  meters:                         []
};

export const initActPlomb: ActPlombData = {
  // Обязательные поля
  act_date:                       '',
  subscriber_name:                '',
  address:                        '',
  
  // Необязательные поля
  id:                             undefined,
  invoice_id:                     undefined,
  act_number:                     '',
  street:                         '',
  house:                          '',
  apartment:                      '',
  usd_representative:             '',
  notes:                          '',
  meters:                         [{
    meter_number:                 '',
    seal_number:                  '',
    current_reading:              '',
    meter_type:                   '',
    notes:                        '',
    sequence_order:               1
  }],
  recipient_signature:            '',
  receipt_date:                   '',
  created_at:                     '',
  updated_at:                     ''
};

export const initActShutdown: ActShutdownData = {
  // Обязательные поля
  act_date:                       '',
  subscriber_name:                '',
  id:                             '',
  representative_name:            '',
  reason:                         '',
  equipment:                      '',
  apartment:                      '',
  house:                          '',
  street:                         '',
  order_issued_by:                '',
  order_received_by:              '',
  executor_name:                  '',
  execution_date:                 '',
  execution_time:                 '',
  disconnected_equipment:         '',
  execution_apartment:            '',
  execution_house:                '',
  execution_street:               '',
  reconnection_date:              '',
  reconnection_representative:    '',
  reconnection_supervisor:        '',
  reconnection_apartment:         '',
  reconnection_house:             '',
  reconnection_street:            '',
  reconnection_subscriber:        ''
};

export const initPrescript: PrescriptData = {
  // Обязательные поля
  prescription_date:              '',
  subscriber_name:                '',
  check_address:                  '',
  violations_text:                '',
  
  // Необязательные поля
  id:                             '',
  invoice_id:                     '',
  prescription_number:            '',
  account_number:                 '',
  subscriber_phone:               '',
  deadline_date:                  '',
  organization_representative:    '',
  subscriber_signature:           '',
  subscriber_representative:      '',
  violation_type:                 '',
  status:                         '',
  document_scan_path:             '',
};

export const initBatteryReplacementAct: BatteryReplacementData = {
  // ОБЯЗАТЕЛЬНЫЕ поля (останутся)
  act_date:                       '',
  technician_name:                '',
  owner_name:                     '',
  object_type:                    '',
  object_address:                  '',
  removal_date:                   '',
  removed_meter_model:            '',
  removed_meter_number:           '',
  removed_meter_reading:          '',
  removed_seal_number:            '',
  installation_date:              '',
  installed_meter_model:          '',
  installed_meter_number:         '',
  installed_meter_reading:        '',
  installed_seal_number:          '',
  
  // НЕОБЯЗАТЕЛЬНЫЕ поля (будем убирать)
  id:                             '',
  invoice_id:                     '',
  act_number:                     '',
  technician_position:            'Слесарь СТГО АО УГРС «Сахатранснефтегаз»',
  owner_phone:                    '',
  technician_signature:           '',
  owner_signature:                '',
  status:                         'completed',
  document_scan_path:             ''
};

// ============================================
// УТИЛИТЫ ДЛЯ РАБОТЫ С INIT DATA
// ============================================

// Утилита для получения обязательных полей из initData
export const getRequiredFieldsFromInitData = <T extends object>(initData: T): (keyof T)[] => {
  return Object.keys(initData) as (keyof T)[];
};

// Утилита для очистки initData от необязательных полей
export const createCleanInitData = <T extends ActDataType>(
  initData: T,
  keepFields: (keyof T)[] = []
): T => {
  const cleanData: any = {};
  const requiredFields = getRequiredFieldsFromInitData(initData);
  
  // Оставляем только указанные поля
  [...requiredFields, ...keepFields].forEach(field => {
    if (initData[field] !== undefined) {
      cleanData[field] = initData[field];
    }
  });
  
  return cleanData as T;
};

// ============================================
// КОНФИГУРАЦИИ ДЛЯ КАЖДОГО ТИПА АКТА
// ============================================

// Конфигурации для каждого типа акта
export const actConfigs: Record<ActType, ActConfig<ActDataType>> = {
  [ActTypesEnum.ACT_COMPLETE]: {
    type: ActTypesEnum.ACT_COMPLETE,
    storeKey: 'actComplete',
    initData: initActCompleteData,
    apiMethods: {
      getByInvoice:   'ACT_COMPLETE_GET_BY_INVOICE',
      save:           'ACT_COMPLETE_SAVE',
      getPDF:         'PDF_ACT_COMPLETE'
    }
  },
  [ActTypesEnum.ACT_HOUSE_INSPECT]: {
    type: ActTypesEnum.ACT_HOUSE_INSPECT,
    storeKey: 'actHouseInspect',
    initData: initActHouseInspect,
    apiMethods: {
      getByInvoice:   'ACT_HOUSE_INSPECT_GET',
      save:           'ACT_HOUSE_INSPECT_SAVE',
      getPDF:         'PDF_ACT_HOUSE_INSPECT'
    }
  },
  [ActTypesEnum.ACT_PLOMB]: {
    type: ActTypesEnum.ACT_PLOMB,
    storeKey: 'actPlomb',
    initData: initActPlomb,
    apiMethods: {
      getByInvoice:   'ACT_PLOMB_GET_BY_INVOICE',
      save:           'ACT_PLOMB_SAVE',
      getPDF:         'PDF_ACT_PLOMB'
    }
  },
  [ActTypesEnum.ACT_SHUTDOWN]: {
    type: ActTypesEnum.ACT_SHUTDOWN,
    storeKey: 'actShutdown',
    initData: initActShutdown,
    apiMethods: {
      getByInvoice:   'ACT_SHUTDOWN_GET_BY_INVOICE',
      save:           'ACT_SHUTDOWN_SAVE',
      getPDF:         'PDF_ACT_SHUTDOWN'
    }
  },
  [ActTypesEnum.ACT_PRESCRIPT]: {
    type: ActTypesEnum.ACT_PRESCRIPT,
    storeKey: 'prescript',
    initData: initPrescript,
    apiMethods: {
      getByInvoice:   'PRESCRIPT_GET_BY_INVOICE',
      save:           'PRESCRIPT_SAVE',
      getPDF:         'PDF_PRESCRIPT'
    }
  },
  [ActTypesEnum.BATTERY_REPLACEMENT]: {
    type: ActTypesEnum.BATTERY_REPLACEMENT,
    storeKey: 'batteryReplacement',
    initData: initBatteryReplacementAct,
    apiMethods: {
      getByInvoice:   'BATTERY_REPLACEMENT_GET',
      save:           'BATTERY_REPLACEMENT_CREATE',
      getPDF:         'PDF_ACT_BATTERY_REPLACEMENT'
    }
  }
} as const;

// Получаем обязательные поля для каждого типа акта
export const getRequiredFieldsForActType = (actType: ActType): string[] => {
  const config = actConfigs[actType];
  return getRequiredFieldsFromInitData(config.initData);
};

// ============================================
// INTERFACES
// ============================================

interface ActsState {
  actComplete:                  ActCompletedData;
  actHouseInspect:              HouseInspectData;
  actPlomb:                     ActPlombData;
  actShutdown:                  ActShutdownData;
  prescript:                    PrescriptData;
  batteryReplacement:           BatteryReplacementData;
  
  loading:                      boolean;
  saving:                       boolean;
}

interface ActsActions {
  // Старые методы для совместимости
  setData:                      (type: number, data: any)  => void;
  setLoading:                   (loading: boolean) => void;
  setSaving:                    (saving: boolean)  => void;
  reset:                        (type: number)     => void;
  setField:                     <K extends keyof any>(
    type:  number,
    field: K,
    value: any
  ) => void;

  // Универсальные методы
  getActData: <T extends ActDataType>(type: ActType) => T;
  getActByType: <T extends ActDataType>(type: ActType) => T;
  setActByType: (type: ActType, data: any) => void;
  setActField: (type: ActType, field: string, value: any) => void;
  resetAct: (type: ActType) => void;
  getActConfig: (type: ActType) => ActConfig<any>;
  getRequiredFields: (type: ActType) => string[];
  
  // Специальные методы
  getCurrentActType: () => ActType | null;
  setCurrentActType: (type: ActType | null) => void;
  
  // Валидация
  validateAct: (type: ActType) => { isValid: boolean; errors: Record<string, string> };
}

type ActsStore = ActsState & ActsActions;

// ============================================
// STORE IMPLEMENTATION
// ============================================

export const useActsStore = create<ActsStore>()(
  devtools((set, get) => ({
    // Initial state
    actComplete:            { ...initActCompleteData },
    actHouseInspect:        { ...initActHouseInspect },
    actPlomb:               { ...initActPlomb },
    actShutdown:            { ...initActShutdown },
    prescript:              { ...initPrescript },
    batteryReplacement:     { ...initBatteryReplacementAct },
    
    loading:                false,
    saving:                 false,

    // ========================
    // СТАРЫЕ МЕТОДЫ (для совместимости)
    // ========================
    
    setData: (type, data) => {
      switch(type) {
        case ActTypesEnum.ACT_COMPLETE:
          set({ actComplete: { ...get().actComplete, ...data } });
          break;
        case ActTypesEnum.ACT_HOUSE_INSPECT:
          set({ actHouseInspect: { ...get().actHouseInspect, ...data } });
          break;
        case ActTypesEnum.ACT_PLOMB:
          set({ actPlomb: { ...get().actPlomb, ...data } });
          break;
        case ActTypesEnum.ACT_SHUTDOWN:
          set({ actShutdown: { ...get().actShutdown, ...data } });
          break;
        case ActTypesEnum.ACT_PRESCRIPT:
          set({ prescript: { ...get().prescript, ...data } });
          break;
        case ActTypesEnum.BATTERY_REPLACEMENT:
          set({ batteryReplacement: { ...get().batteryReplacement, ...data } });
          break;
        default: 
          console.warn(`Unknown act type: ${type}`);
          break;
      }
    },
    
    setLoading: (loading) => set({ loading }),
    setSaving: (saving) => set({ saving }),
    
    setField: (type, field, value) => {
      switch(type) {
        case ActTypesEnum.ACT_COMPLETE:
          set((state) => ({
            actComplete: { ...state.actComplete, [field]: value }
          }));
          break;
        case ActTypesEnum.ACT_HOUSE_INSPECT:
          set((state) => ({
            actHouseInspect: { ...state.actHouseInspect, [field]: value }
          }));
          break;
        case ActTypesEnum.ACT_PLOMB:
          set((state) => ({
            actPlomb: { ...state.actPlomb, [field]: value }
          }));
          break;
        case ActTypesEnum.ACT_SHUTDOWN:
          set((state) => ({
            actShutdown: { ...state.actShutdown, [field]: value }
          }));
          break;
        case ActTypesEnum.ACT_PRESCRIPT:
          set((state) => ({
            prescript: { ...state.prescript, [field]: value }
          }));
          break;
        case ActTypesEnum.BATTERY_REPLACEMENT:
          set((state) => ({
            batteryReplacement: { ...state.batteryReplacement, [field]: value }
          }));
          break;
        default:
          console.warn(`Unknown act type: ${type}`);
          break;
      }
    },
    
    reset: (type: number) => {
      switch(type) {
        case ActTypesEnum.ACT_COMPLETE:
          set({ actComplete: { ...initActCompleteData } });
          break;
        case ActTypesEnum.ACT_HOUSE_INSPECT:
          set({ actHouseInspect: { ...initActHouseInspect } });
          break;
        case ActTypesEnum.ACT_PLOMB:
          set({ actPlomb: { ...initActPlomb } });
          break;
        case ActTypesEnum.ACT_SHUTDOWN:
          set({ actShutdown: { ...initActShutdown } });
          break;
        case ActTypesEnum.ACT_PRESCRIPT:
          set({ prescript: { ...initPrescript } });
          break;
        case ActTypesEnum.BATTERY_REPLACEMENT:
          set({ batteryReplacement: { ...initBatteryReplacementAct } });
          break;
        default:
          console.warn(`Unknown act type: ${type}`);
          break;
      }
    },

    // ========================
    // УНИВЕРСАЛЬНЫЕ МЕТОДЫ
    // ========================
    
    getActData: <T extends ActDataType>(type: ActType): T => {
      const state = get();
      switch(type) {
        case ActTypesEnum.ACT_COMPLETE:
          return state.actComplete as T;
        case ActTypesEnum.ACT_HOUSE_INSPECT:
          return state.actHouseInspect as T;
        case ActTypesEnum.ACT_PLOMB:
          return state.actPlomb as T;
        case ActTypesEnum.ACT_SHUTDOWN:
          return state.actShutdown as T;
        case ActTypesEnum.ACT_PRESCRIPT:
          return state.prescript as T;
        case ActTypesEnum.BATTERY_REPLACEMENT:
          return state.batteryReplacement as T;
        default:
          return state.actComplete as T;
      }
    },
    
    getActByType: <T extends ActDataType>(type: ActType): T => {
      return get().getActData<T>(type);
    },
    
    setActByType: (type: ActType, data: any) => {
      get().setData(type, data);
    },
    
    setActField: (type: ActType, field: string, value: any) => {
      get().setField(type, field, value);
    },
    
    resetAct: (type: ActType) => {
      get().reset(type);
    },
    
    getActConfig: (type: ActType): ActConfig<any> => {
      return actConfigs[type];
    },
    
    getRequiredFields: (type: ActType): string[] => {
      return getRequiredFieldsForActType(type);
    },
    
    getCurrentActType: () => {
      return null;
    },
    
    setCurrentActType: (type: ActType | null) => {
      // В будущем можно добавить логику
    },
    
    // Валидация акта
    validateAct: (type: ActType) => {
      const data = get().getActData(type);
      const requiredFields = get().getRequiredFields(type);
      const errors: Record<string, string> = {};
      
      requiredFields.forEach(field => {
        const value = (data as any)[field];
        if (!value || value.toString().trim() === '') {
          errors[field] = 'Поле обязательно для заполнения';
        }
      });
      
      return {
        isValid: Object.keys(errors).length === 0,
        errors
      };
    }
    
  }), { 
    name: 'acts-store',
    enabled: process.env.NODE_ENV === 'development'
  })
);

// ============================================
// ACTIONS
// ============================================

export const actsActions = {
  // Старые actions для совместимости
  setData: (type: number, data: any) => useActsStore.getState().setData(type, data),
  setField: <K extends keyof any>(type: number, field: K, value: any) => 
    useActsStore.getState().setField(type, field, value),
  reset: (type: number) => useActsStore.getState().reset(type),
  setLoading: (loading: boolean) => useActsStore.getState().setLoading(loading),

  // Универсальные actions
  getActByType: <T extends ActDataType>(type: ActType): T => 
    useActsStore.getState().getActByType<T>(type),
  setActByType: (type: ActType, data: any) => 
    useActsStore.getState().setActByType(type, data),
  setActField: (type: ActType, field: string, value: any) => 
    useActsStore.getState().setActField(type, field, value),
  resetAct: (type: ActType) => useActsStore.getState().resetAct(type),
  getActConfig: (type: ActType) => useActsStore.getState().getActConfig(type),
  getRequiredFields: (type: ActType) => useActsStore.getState().getRequiredFields(type),
  validateAct: (type: ActType) => useActsStore.getState().validateAct(type),
};

// ============================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================

// Получить конфигурацию акта по типу
export const getActConfig = (type: ActType): ActConfig<any> => {
  return actConfigs[type];
};

// Получить инициализационные данные по типу
export const getInitData = (type: ActType): ActDataType => {
  return actConfigs[type].initData;
};

// Получить store ключ по типу
export const getStoreKey = (type: ActType): ActStoreKey => {
  return actTypeToStoreKey[type];
};

// Получить тип по store ключу
export const getActType = (storeKey: ActStoreKey): ActType => {
  return storeKeyToActType[storeKey];
};