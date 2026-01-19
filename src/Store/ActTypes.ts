// Базовые типы
export type ActType = 'actbr' | 'actmr' | 'actmi' | 'actplomb' | 'actsf' | 'actsge';
export type ActStatus = 'draft' | 'signed' | 'completed' | 'archived';

// Базовый интерфейс акта
export interface BaseAct {
  id: string;
  type: ActType;
  invoice_id: string;
  act_number: string;
  act_date: string;
  status: ActStatus;
  title: string;
  document_scan_path: string;
  created_at: string;
  updated_at: string;
}

// Вспомогательные типы для адреса
export interface AddressObject {
  address?: string;
  lat?: number;
  lon?: number;
}

export interface Signature {
  dataUrl:  string;
  format:   string;
}

// 1. BatteryReplacementData (для actbr) - АКТ ЗАМЕНЫ СЧЕТЧИКА
export interface BatteryReplacementData {
  // Исполнитель работ
  technician_position: string;
  technician_name: string;
  
  // Данные владельца
  owner_name: string;
  owner_phone: string;
  
  // Объект и адрес
  object_type: string;
  object_address: string | AddressObject;
  
  // Данные замены оборудования
  removal_date: string;
  removed_meter_model: string;
  removed_meter_number: string;
  removed_meter_reading: string;
  removed_seal_number: string;
  
  installation_date: string;
  installed_meter_model: string;
  installed_meter_number: string;
  installed_meter_reading: string;
  installed_seal_number: string;
  
  // Подписи
  technician_signature: Signature;
  owner_signature: Signature;
}

// 2. MeterInstallationData (для actms) - АКТ МОНТАЖА СЧЕТЧИКА
export interface MeterInstallationData {
  // Исполнитель работ
  technician_name: string;
  technician_signature: Signature;
  
  // Владелец
  owner_name: string;
  owner_phone: string;
  owner_signature: Signature;
  
  // Адрес объекта
  object_address: string | AddressObject;
  
  // Данные установки
  installation_date: string;
  meter_model: string;
  meter_number: string;
  meter_reading: string;
  seal_number: string;
  
  // Для actms дополнительно:
  technician_position?: string;
  note?: string;
  
  // Для actIGE дополнительно:
  // (actIGE использует этот же тип, но с другими обязательными полями)
}

// 3. MeterReplacementData (для actmr) - АКТ ЗАМЕНЫ ПРИБОРА УЧЕТА
export interface MeterReplacementData {
  // Исполнитель
  technician_name: string;
  technician_position: string;
  
  // Заказчик/владелец
  owner_name: string;
  owner_phone: string;
  
  // Объект
  object_type: string;
  object_address: string | AddressObject;
  
  // Старый счетчик
  removal_date: string;
  removed_meter_model: string;
  removed_meter_number: string;
  removed_meter_reading: string;
  removed_seal_number: string;
  
  // Новый счетчик
  installation_date: string;
  installed_meter_model: string;
  installed_meter_number: string;
  installed_meter_reading: string;
  installed_seal_number: string;
  
  // Подписи
  technician_signature: Signature;
  owner_signature: Signature;
}

// 4. MeterSealingData (для actplomb) - АКТ ПЛОМБИРОВАНИЯ
export interface MeterSealingData {
  // Исполнитель
  technician_name: string;
  technician_position: string;
  
  // Владелец
  owner_name: string;
  owner_phone: string;
  
  // Адрес объекта
  object_address: string | AddressObject;
  
  // Данные счетчика
  meter_model: string;
  meter_number: string;
  seal_number: string;
  
  // Примечания и подписи
  note: string;
  technician_signature: Signature;
  owner_signature: Signature;
}

// 5. SealBreakData (для actsf) - АКТ СНЯТИЯ ПЛОМБЫ
export interface SealBreakData {
  // Техники
  technician1_name: string;
  technician2_name: string;
  technician_position: string;
  
  // Владелец
  owner_name: string;
  owner_phone: string;
  
  // Адрес объекта
  object_type: string;
  street: string;
  house: string;
  apartment: string;
  
  // Данные снятия пломбы
  break_date: string;
  break_seal_number: string;
  break_seal_color: string;
  break_meter_model: string;
  break_meter_number: string;
  break_meter_reading: string;
  reason: string;
  
  // Данные установки новой пломбы
  install_date: string;
  install_seal_number: string;
  install_seal_color: string;
  install_meter_model: string;
  install_meter_number: string;
  install_meter_reading: string;
  
  // Подписи
  technician1_signature: Signature;
  technician2_signature: Signature;
  owner_signature: Signature;
}

// 6. DisconnectionActData (для actsge) - АКТ СНЯТИЯ/ОГРАНИЧЕНИЯ ПОДАЧИ ГАЗА
export interface DisconnectionActData {
  // Данные абонента
  customer_name: string;
  personal_account: string;
  
  // Ордер/распоряжение
  work_order_number: string;
  work_order_date: string;
  debt_reason: string;
  
  // Адрес объекта
  apartment_number: string;
  house_number: string;
  building_number: string;
  street_name: string;
  city_district: string;
  
  // Исполнитель
  representative_position: string;
  representative_name: string;
  
  // Данные отключения
  disconnection_time_hours: string;
  disconnection_time_minutes: string;
  equipment_description: string;
  equipment_count: string;
  disconnection_method: string;
  seal_number: string;
  
  // Данные подключения (опциональные)
  reconnection_date: string | null;
  reconnection_representative: string;
  reconnection_basis: string;
  
  // Подписи
  representative_signature: Signature;
  customer_signature: Signature;
  reconnection_representative_signature: Signature;
}


// Объединенный тип для всех актов
export type ActData = BaseAct & (
  | { type: 'actbr';    details: BatteryReplacementData }
  | { type: 'actmr';    details: MeterReplacementData }
  | { type: 'actsge';   details: DisconnectionActData }
  | { type: 'actplomb'; details: MeterSealingData }
  | { type: 'actsf';    details: SealBreakData }
  | { type: 'actmi';    details: MeterInstallationData }
);

// Типы для заголовков актов (соответствуют БД)
export const actTitles: Record<ActType, string> = {
  actbr:    'Акт замены АКБ',
  actmr:    'Акт замены газового счетчика',
  actsge:   'Акт отключения бытового газового оборудования',
  actplomb: 'Акт пломбирования',
  actsf:    'Акт срыва пломбы',
  actmi:    'Акт установки газового счетчика'
};

// Функции-гварды для проверки типа
export function isActBR(act: ActData): act is ActData & { type: 'actbr' } {
  return act.type === 'actbr';
}

export function isActMR(act: ActData): act is ActData & { type: 'actmr' } {
  return act.type === 'actmr';
}

export function isActMI(act: ActData): act is ActData & { type: 'actms' } {
  return act.type === 'actmi';
}

export function isActPlomb(act: ActData): act is ActData & { type: 'actplomb' } {
  return act.type === 'actplomb';
}

export function isActSF(act: ActData): act is ActData & { type: 'actsf' } {
  return act.type === 'actsf';
}

export function isActSGE(act: ActData): act is ActData & { type: 'actsge' } {
  return act.type === 'actsge';
}

// Утилита для получения details в типобезопасном виде
export function getActDetails<T extends ActType>(
  act: ActData & { type: T }
): ActData['details'] {
  return act.details;
}

// Тип для создания черновика акта
export interface DraftActCreateParams {
  invoice_id: string;
  act_type: ActType;
  technician_name: string;
  technician_position: string;
}

// Тип для ответа API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

// Пример использования
const exampleAct: ActData = {
  id: '123',
  type: 'actbr',
  invoice_id: 'invoice-123',
  act_number: 'АКТ-01-0001',
  act_date: '2024-01-15',
  status: 'draft',
  title: 'Акт замены счетчика',
  document_scan_path: '',
  created_at: '2024-01-15T10:00:00',
  updated_at: '2024-01-15T10:00:00',
  details: {
    technician_position: 'Слесарь',
    technician_name: 'Иванов И.И.',
    owner_name: 'Петров П.П.',
    owner_phone: '+79991234567',
    object_type: 'Квартира',
    object_address: { address: 'ул. Ленина, д. 1, кв. 5' },
    removal_date: '2024-01-15',
    removed_meter_model: 'СГБ-1.6',
    removed_meter_number: '123456',
    removed_meter_reading: '100',
    removed_seal_number: 'П-001',
    installation_date: '2024-01-15',
    installed_meter_model: 'СГМ-1.6',
    installed_meter_number: '654321',
    installed_meter_reading: '0',
    installed_seal_number: 'П-002',
    technician_signature: { dataUrl: '', format: 'image/png' },
    owner_signature: { dataUrl: '', format: 'image/png' }
  }
};

// Проверка типа
if (isActBR(exampleAct)) {
  // TypeScript знает, что здесь details: BatteryReplacementData
  console.log(exampleAct.details.technician_name);
}