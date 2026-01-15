export interface ActCompletedData {

  id?:                            string;
  invoice_id?:                    string;
  act_number?:                    string;
  act_date:                       string;
  
  // Исполнитель работ
  executor_name:                  string;
  executor_position:              string;
  
  // Заказчик/абонент
  client_name:                    string;
  address:                        string;
  
  // Описание выполненных работ
  work_description:               string;
  equipment_used:                 string;
  work_started_date:              string;
  work_completed_date:            string;
  
  // Оценка качества
  quality_assessment:             string;
  defects_found:                  string;
  recommendations:                string;
  
  // Подписи сторон
  executor_signature:             string;
  client_signature:               string;
  representative_signature:       string;
  
  // Дополнительные сведения
  notes:                          string;
  
}

export interface HouseMeterData {
  id?:                            string;
  house_inspect_id?:              string;
  sequence_order:                 number;
  meter_type?:                    string;
  meter_number:                   string;
  current_reading?:               number;
  seal_number?:                   string;
  seal_color?:                    string;
  gas_equipment?:                 string;
  living_area?:                   number;
  non_living_area?:               number;
  residents_count?:               number;
  notes?:                         string;
}

export interface HouseInspectData {
  id?:                            string;
  invoice_id?:                    string;
  act_number?:                    string;
  act_date:                       string;
  act_time?:                      string;
  account_number?:                string;
  address?:                       string;
  street?:                        string;
  house?:                         string;
  apartment?:                     string;
  organization_representative:    string;
  subscriber_name:                string;
  subscriber_document?:           string;
  subscriber_representative_name?: string;
  subscriber_representative_document?: string;
  witness_name?:                  string;
  witness_document?:              string;  
  violations_found?:              string;
  living_area?:                   number;
  non_living_area?:               number;
  residents_count?:               number;
  subscriber_opinion?:            string;
  notes?:                         string;
  meters:                         HouseMeterData[];
}

export interface PlombMeter {
  meter_number:                   string;
  seal_number:                    string;
  current_reading?:               string;
  meter_type?:                    string;
  notes?:                         string;
  sequence_order?:                number;
}

export interface ActPlombData {
  id?:                            string;
  act_number?:                    string;
  act_date:                       string;
  subscriber_name:                string;
  address?:                       string;
  street:                         string;
  house:                          string;
  apartment:                      string;
  usd_representative:             string;
  notes?:                         string;
  invoice_id?:                    string;
  meters:                         PlombMeter[];
  recipient_signature?:           string;
  receipt_date?:                  string;
  created_at?:                    string;
  updated_at?:                    string;
}

export interface ActShutdownData {
  id?:                            string;
  invoice_id?:                    string;
  act_number?:                    string;
  act_date:                       string;
  
  // Представитель и причина
  representative_name:            string;
  reason:                         string;
  
  // Объект отключения
  equipment:                      string;
  apartment:                      string;
  house:                          string;
  street:                         string;
  subscriber_name:                string;
  
  // Административные данные
  order_issued_by:                string;
  order_received_by:              string;
  
  // Выполнение работ
  executor_name:                  string;
  execution_date:                 string;
  execution_time:                 string;
  disconnected_equipment:         string;
  execution_apartment:            string;
  execution_house:                string;
  execution_street:               string;
  
  // Подключение (опциональные)
  reconnection_date?:             string;
  reconnection_representative?:   string;
  reconnection_supervisor?:       string;
  reconnection_apartment?:        string;
  reconnection_house?:            string;
  reconnection_street?:           string;
  reconnection_subscriber?:       string;
  
}

export interface PrescriptData {
  id?:                            string;
  invoice_id?:                    string;
  prescription_number?:           string;
  prescription_date:              string;
  check_address:                  string;
  account_number:                 string;
  subscriber_name:                string;
  subscriber_phone:               string;
  violations_text:                string;
  deadline_date:                  string;
  organization_representative:    string;
  subscriber_signature:           string;
  subscriber_representative:      string;
  violation_type:                 string;
  status:                         string;
  document_scan_path:             string;
}

export interface BatteryReplacementData {
  id?:                            string;
  invoice_id?:                    string;
  act_number?:                    string;
  act_date:                       string;
  
  // Данные исполнителя
  technician_position:            string;
  technician_name:                string;
  
  // Данные владельца
  owner_name:                     string;
  owner_phone:                    string;
  
  // Объект и адрес
  object_type:                    string;
  object_address:                 string;
  
  // Данные замены оборудования
  removal_date:                   string;
  removed_meter_model:            string;
  removed_meter_number:           string;
  removed_meter_reading:          string;
  removed_seal_number:            string;
  
  installation_date:              string;
  installed_meter_model:          string;
  installed_meter_number:         string;
  installed_meter_reading:        string;
  installed_seal_number:          string;
  
  // Подписи
  technician_signature:           string;
  owner_signature:                string;
  
  // Статус и документы
  status:                         string;
  document_scan_path:             string;
}

export interface MeterReplacementData {
  id?: string;
  invoice_id?: string;
  act_number?: string;
  act_date?: string;
  
  // Исполнитель
  technician_name?: string;
  technician_position?: string;
  
  // Заказчик/владелец
  owner_name?: string;
  owner_phone?: string;
  
  // Объект
  object_type?: string;
  object_address?: any;
  
  // Старый счетчик
  removal_date?: string;
  removed_meter_model?: string;
  removed_meter_number?: string;
  removed_meter_reading?: string;
  removed_seal_number?: string;
  
  // Новый счетчик
  installation_date?: string;
  installed_meter_model?: string;
  installed_meter_number?: string;
  installed_meter_reading?: string;
  installed_seal_number?: string;
  
  // Подписи и статус
  technician_signature?: string;
  owner_signature?: string;
  status?: string;
  document_scan_path?: string;
  
  created_at?: string;
  updated_at?: string;
}

export interface DisconnectionActData {
  invoice_id?: string;
  act_number?: string;
  act_date?: string;
  personal_account?: string;
  work_order_number?: string;
  work_order_date?: string;
  debt_reason?: string;
  apartment_number?: string;
  house_number?: string;
  building_number?: string;
  street_name?: string;
  city_district?: string;
  customer_name?: string;
  representative_position?: string;
  representative_name?: string;
  disconnection_time_hours?: string;
  disconnection_time_minutes?: string;
  equipment_description?: string;
  equipment_count?: string;
  disconnection_method?: string;
  seal_number?: string;
  reconnection_date?: string;
  reconnection_representative?: string;
  reconnection_basis?: string;
  representative_signature?: string;
  customer_signature?: string;
  reconnection_representative_signature?: string;
  status?: string;
  document_scan_path?: string;
}

export interface MeterSealingData {
  invoice_id?:            string;
  act_number:             string;
  act_date:               string;
  technician_name:        string;
  technician_position:    string;
  owner_name:             string;
  owner_phone:            string;
  object_address:         any;
  meter_model:            string;
  meter_number:           string;
  seal_number:            string;
  note:                   string;
  technician_signature:   string;
  owner_signature:        string;
  status:                 string;
  document_scan_path:     string;
}

export interface SealBreakData {
  invoice_id?:            string;
  act_number:             string;
  act_date:               string;
  technician1_name:       string;
  technician2_name:       string;
  technician_position:    string;
  owner_name:             string;
  owner_phone:            string;
  object_type:            string;
  street:                 string;
  house:                  string;
  apartment?:             string;
  break_date:             string;
  break_seal_number:      string;
  break_seal_color?:      string;
  break_meter_model:      string;
  break_meter_number:     string;
  break_meter_reading:    string;
  reason:                 string;
  install_date:           string;
  install_seal_number:    string;
  install_seal_color?:    string;
  install_meter_model:    string;
  install_meter_number:   string;
  install_meter_reading:  string;
  technician1_signature:  string;
  technician2_signature?: string;
  owner_signature:        string;
  status:                 string;
  document_scan_path?:    string;
}

export interface MeterInstallationData {

  invoice_id?:            string;
  act_number:             string;
  act_date:               string;
  technician_name:        string;
  technician_signature:   string;
  owner_name:             string;
  owner_phone:            string;
  owner_signature:        string;
  object_address:         string | { address: string };
  installation_date:      string;
  meter_model:            string;
  meter_number:           string;
  meter_reading:          string;
  seal_number:            string;
  status:                 string;
  document_scan_path:     string;

}