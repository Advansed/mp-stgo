import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './ActBatteryReplacement.css';
import { IonLoading, IonModal } from '@ionic/react';
import { FormField, FormRow, FormSection, ReadOnlyField } from '../Forms/Forms';
import { useBatteryReplacement } from './useBatteryReplacement';
import ActBatteryReplacementPrint from './ActBatteryReplacementPrint';

interface BatteryReplacementFormProps {
  invoiceId?: string;
  onSave?: (data: any) => void;
  onCancel?: () => void;
}

const ActBatteryReplacementForm: React.FC<BatteryReplacementFormProps> = ({
  invoiceId,
  onSave,
  onCancel
}) => {
  const {
    data,
    errors,
    loading,
    saving,
    updateField,
    handleFieldChange,
    getFieldValue,
    getFieldError,
    saveAct,
    loadActByInvoice
  } = useBatteryReplacement();

  const [showPrintModal, setShowPrintModal] = useState(false);

  useEffect(() => {
    if (invoiceId) {
      loadActByInvoice(invoiceId);
    }
  }, [invoiceId, loadActByInvoice]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const savedData = await saveAct();
      if (savedData && onSave) {
        onSave(savedData);
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  }, [saveAct, onSave]);

  const handlePrint = useCallback(() => {
    setShowPrintModal(true);
  }, []);

  const handleClosePrintModal = useCallback(() => {
    setShowPrintModal(false);
  }, []);

  const mapDataForPrint = useMemo(() => ({
    id:                     data.id,
    actNumber:              data.act_number || '',
    actDate:                data.act_date,
    technicianPosition:     data.technician_position,
    technicianName:         data.technician_name,
    ownerName:              data.owner_name,
    objectType:             data.object_type,
    objectStreet:           data.object_street,
    objectHouse:            data.object_house,
    objectApartment:        data.object_apartment,
    removalDate:            data.removal_date,
    removedMeterModel:      data.removed_meter_model,
    removedMeterNumber:     data.removed_meter_number,
    removedMeterReading:    data.removed_meter_reading,
    removedSealNumber:      data.removed_seal_number,
    installationDate:       data.installation_date,
    installedMeterModel:    data.installed_meter_model,
    installedMeterNumber:   data.installed_meter_number,
    installedMeterReading:  data.installed_meter_reading,
    installedSealNumber:    data.installed_seal_number,
    technicianSignature:    data.technician_signature,
    ownerSignature:         data.owner_signature,
    status:                 data.status
  }), [data]);

  const BasicInfoSection = useMemo(() => (
    <FormSection title="Основная информация">
      <FormRow>
        <ReadOnlyField
          label="Номер акта"
          value={getFieldValue('act_number') || (data.id ? 'Загрузка...' : 'Будет присвоен при сохранении')}
        />
        <FormField
          label="Дата акта"
          name="act_date"
          type="date"
          required
          value={getFieldValue('act_date')}
          onChange={(e) => updateField('act_date', e.target.value)}
          error={getFieldError('act_date')}
        />
        {data.invoice_id && (
          <ReadOnlyField
            label="Связанная заявка"
            value={`Заявка №${data.invoice_id}`}
          />
        )}
      </FormRow>
    </FormSection>
  ), [data.act_number, data.id, data.invoice_id, getFieldValue, getFieldError, updateField]);

  const TechnicianSection = useMemo(() => (
    <FormSection title="Данные исполнителя">
      <FormRow>
        <ReadOnlyField
          label="Должность"
          value="Слесарь СТГО АО УГРС «Сахатранснефтегаз»"
        />
        <FormField
          label="ФИО слесаря"
          name="technician_name"
          required
          value={getFieldValue('technician_name')}
          onChange={(e) => updateField('technician_name', e.target.value)}
          error={getFieldError('technician_name')}
          placeholder="Введите ФИО слесаря"
        />
      </FormRow>
    </FormSection>
  ), [getFieldValue, getFieldError, updateField]);

  const OwnerSection = useMemo(() => (
    <FormSection title="Данные владельца">
      <FormRow>
        <FormField
          label="ФИО владельца"
          name="owner_name"
          required
          value={getFieldValue('owner_name')}
          onChange={(e) => updateField('owner_name', e.target.value)}
          error={getFieldError('owner_name')}
          placeholder="Введите ФИО владельца"
        />
        <FormField
          label="Телефон владельца"
          name="owner_phone"
          value={getFieldValue('owner_phone')}
          onChange={(e) => updateField('owner_phone', e.target.value)}
          error={getFieldError('owner_phone')}
          placeholder="Введите телефон"
        />
      </FormRow>
    </FormSection>
  ), [getFieldValue, getFieldError, updateField]);

  const ObjectSection = useMemo(() => (
    <FormSection title="Объект и адрес">
      <FormRow>
        <FormField
          label="Тип объекта"
          name="object_type"
          required
          value={getFieldValue('object_type')}
          onChange={(e) => updateField('object_type', e.target.value)}
          error={getFieldError('object_type')}
          placeholder="жилой дом, гараж, баня и т.д."
        />
      </FormRow>
      <FormRow>
        <FormField
          label="Улица"
          name="object_street"
          required
          value={getFieldValue('object_street')}
          onChange={(e) => updateField('object_street', e.target.value)}
          error={getFieldError('object_street')}
          placeholder="Название улицы"
        />
        <FormField
          label="Дом"
          name="object_house"
          required
          value={getFieldValue('object_house')}
          onChange={(e) => updateField('object_house', e.target.value)}
          error={getFieldError('object_house')}
          placeholder="№ дома"
        />
        <FormField
          label="Квартира"
          name="object_apartment"
          value={getFieldValue('object_apartment')}
          onChange={(e) => updateField('object_apartment', e.target.value)}
          error={getFieldError('object_apartment')}
          placeholder="№ кв."
        />
      </FormRow>
    </FormSection>
  ), [getFieldValue, getFieldError, updateField]);

  const RemovalSection = useMemo(() => (
    <FormSection title="Снятый счетчик">
      <FormRow>
        <FormField
          label="Дата снятия"
          name="removal_date"
          type="date"
          required
          value={getFieldValue('removal_date')}
          onChange={(e) => updateField('removal_date', e.target.value)}
          error={getFieldError('removal_date')}
        />
        <FormField
          label="Модель счетчика"
          name="removed_meter_model"
          required
          value={getFieldValue('removed_meter_model')}
          onChange={(e) => updateField('removed_meter_model', e.target.value)}
          error={getFieldError('removed_meter_model')}
          placeholder="G---"
        />
        <FormField
          label="Заводской номер"
          name="removed_meter_number"
          required
          value={getFieldValue('removed_meter_number')}
          onChange={(e) => updateField('removed_meter_number', e.target.value)}
          error={getFieldError('removed_meter_number')}
          placeholder="Номер счетчика"
        />
      </FormRow>
      <FormRow>
        <FormField
          label="Показания (м³)"
          name="removed_meter_reading"
          required
          value={getFieldValue('removed_meter_reading')}
          onChange={(e) => updateField('removed_meter_reading', e.target.value)}
          error={getFieldError('removed_meter_reading')}
          placeholder="Показания счетчика"
        />
        <FormField
          label="Номер пломбы"
          name="removed_seal_number"
          required
          value={getFieldValue('removed_seal_number')}
          onChange={(e) => updateField('removed_seal_number', e.target.value)}
          error={getFieldError('removed_seal_number')}
          placeholder="Номер пломбы"
        />
      </FormRow>
    </FormSection>
  ), [getFieldValue, getFieldError, updateField]);

  const InstallationSection = useMemo(() => (
    <FormSection title="Установленный счетчик">
      <FormRow>
        <FormField
          label="Дата установки"
          name="installation_date"
          type="date"
          required
          value={getFieldValue('installation_date')}
          onChange={(e) => updateField('installation_date', e.target.value)}
          error={getFieldError('installation_date')}
        />
        <FormField
          label="Модель счетчика"
          name="installed_meter_model"
          required
          value={getFieldValue('installed_meter_model')}
          onChange={(e) => updateField('installed_meter_model', e.target.value)}
          error={getFieldError('installed_meter_model')}
          placeholder="G---"
        />
        <FormField
          label="Заводской номер"
          name="installed_meter_number"
          required
          value={getFieldValue('installed_meter_number')}
          onChange={(e) => updateField('installed_meter_number', e.target.value)}
          error={getFieldError('installed_meter_number')}
          placeholder="Номер счетчика"
        />
      </FormRow>
      <FormRow>
        <FormField
          label="Показания (м³)"
          name="installed_meter_reading"
          required
          value={getFieldValue('installed_meter_reading')}
          onChange={(e) => updateField('installed_meter_reading', e.target.value)}
          error={getFieldError('installed_meter_reading')}
          placeholder="Показания счетчика"
        />
        <FormField
          label="Номер пломбы"
          name="installed_seal_number"
          required
          value={getFieldValue('installed_seal_number')}
          onChange={(e) => updateField('installed_seal_number', e.target.value)}
          error={getFieldError('installed_seal_number')}
          placeholder="Номер пломбы"
        />
      </FormRow>
    </FormSection>
  ), [getFieldValue, getFieldError, updateField]);

  const SignaturesSection = useMemo(() => (
    <FormSection title="Подписи">
      <FormRow>
        <FormField
          label="Подпись слесаря"
          name="technician_signature"
          value={getFieldValue('technician_signature')}
          onChange={(e) => updateField('technician_signature', e.target.value)}
          error={getFieldError('technician_signature')}
          placeholder="Подпись слесаря"
        />
        <FormField
          label="Подпись владельца"
          name="owner_signature"
          value={getFieldValue('owner_signature')}
          onChange={(e) => updateField('owner_signature', e.target.value)}
          error={getFieldError('owner_signature')}
          placeholder="Подпись владельца"
        />
      </FormRow>
    </FormSection>
  ), [getFieldValue, getFieldError, updateField]);

  if (loading) {
    return (
      <div className="battery-replacement-form">
        <div className="battery-form-loading">
          <IonLoading isOpen={loading} message="Загрузка данных..." />
          Загрузка акта...
        </div>
      </div>
    );
  }

  return (
    <div className="battery-replacement-form">
      <div className="form-header">
        <h2>
          {data.id ? 'Редактирование' : 'Создание'} акта замены АКБ газового счетчика
          {data.invoice_id && ` (Заявка №${data.invoice_id})`}
        </h2>
        <div className="form-actions">
          <button type="button" onClick={handlePrint} className="btn btn-secondary">
            Печать
          </button>
          <button type="button" onClick={onCancel} className="btn btn-outline">
            Отмена
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="battery-form">
        {BasicInfoSection}
        {TechnicianSection}
        {OwnerSection}
        {ObjectSection}
        {RemovalSection}
        {InstallationSection}
        {SignaturesSection}

        <div className="form-footer">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="btn btn-outline"
          >
            Отмена
          </button>
        </div>
      </form>

      <IonModal isOpen={showPrintModal} onDidDismiss={handleClosePrintModal}>
        <ActBatteryReplacementPrint
          mode="print"
          data={mapDataForPrint}
          onClose={handleClosePrintModal}
        />
      </IonModal>
    </div>
  );
};

export default ActBatteryReplacementForm;