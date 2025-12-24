// ActBRForm.tsx
import React, { useEffect, useState } from 'react';
import { useActBR } from './useActBR';
import {
  IonLoading,
  IonButton,
  IonIcon,
  IonModal,
} from '@ionic/react';
import {
  printOutline,
  createOutline,
  documentOutline,
} from 'ionicons/icons';
import styles from './ActBRForm.module.css';
import { useToast } from '../../Toast';
import { useLoginStore, useToken } from '../../../Store/loginStore';
import { PageData } from '../../DataEditor/types';
import { BatteryReplacementData } from '../../../Store/types';
import DataEditor from '../../DataEditor';
import { PDFDoc } from '../../Files';

interface ActBRFormProps {
  onBack: () => void;
  invoice_id?: string; // id акта, если редактирование
}

export const ActBRForm: React.FC<ActBRFormProps> = ({ onBack, invoice_id }) => {
  const toast                           = useToast();
  const user                            = useLoginStore(state => state.user);
  const [isEditing, setIsEditing]       = useState(false);
  const [previewData, setPreviewData]   = useState<PageData | null>(null);

  const { actData, isLoading, loadData
    , saveData, get_pdf }               = useActBR();

  const [ modal, setModal ]             = useState<any>()

  const htmlTemplate                    = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>АКТ ЗАМЕНЫ АККУМУЛЯТОРНОЙ БАТАРЕИ ГАЗОВОГО СЧЕТЧИКА</title>
  <style>
    @page {
      size: A4;
      margin: 0cm;
    }
    body {
      font-family: "Times New Roman", serif;
      font-size: 12pt;
      line-height: 1.2;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 21cm;
      min-height: 29.7cm;
      margin: 0 auto;
      padding: 1.5cm 2cm;
      box-sizing: border-box;
    }
    .header {
      text-align: center;
      margin-bottom: 10px;
    }
    .logo {
      text-align: center;
      margin-bottom: 5px;
    }
    .company-name {
      font-size: 12pt;
      line-height: 1.1;
      margin-bottom: 5px;
    }
    .company-table {
      width: 100%;
      border: 1px solid #000;
      border-collapse: collapse;
      margin-bottom: 10px;
    }
    .company-table td {
      padding: 2px 5px;
      border: none;
    }
    .main-title {
      font-size: 14pt;
      font-weight: bold;
      text-align: center;
      text-decoration: underline;
      margin: 10px 0;
    }
    .sub-title {
      font-size: 14pt;
      font-weight: bold;
      text-align: center;
      text-decoration: underline;
      margin-bottom: 10px;
    }
    .date-line {
      text-align: right;
      margin: 15px 0;
    }
    .content {
      margin: 10px 0;
    }
    .field-block {
      margin-bottom: 8px;
    }
    .field-label {
      display: inline;
    }
    .field-value {
      display: inline;
      border-bottom: 1px solid #000;
      min-width: 200px;
      padding: 0 5px;
      text-align: center;
    }
    .inline-value {
      display: inline-block;
      border-bottom: 1px solid #000;
      min-width: 150px;
      padding: 0 5px;
      text-align: center;
    }
    .counter-section {
      margin: 15px 0;
    }
    .counter-block {
      margin-left: 30px;
      margin-bottom: 8px;
    }
    .signature-block {
      margin-top: 30px;
    }
    .signature-line {
      display: inline-block;
      border-bottom: 1px solid #000;
      min-width: 250px;
      padding: 0 5px;
      margin-top: 20px;
    }
    .text-center {
      text-align: center;
    }
    .text-right {
      text-align: right;
    }
    .mb-5 {
      margin-bottom: 5px;
    }
    .mb-10 {
      margin-bottom: 10px;
    }
    .mb-15 {
      margin-bottom: 15px;
    }
    .mt-10 {
      margin-top: 10px;
    }
    .mt-15 {
      margin-top: 15px;
    }
    .mt-20 {
      margin-top: 20px;
    }
    .ml-30 {
      margin-left: 30px;
    }
    .act-number {
      font-size: 12pt;
      font-weight: bold;
      text-align: center;
      margin: 5px 0 10px 0;
    }
  </style>
</head>
<body>
<div class="container">

  <!-- Шапка с логотипом -->
  <div class="header">
     <img src="{{LOGO_SRC}}" alt="logo" style="height:60px;" />
    <div class="company-name">Акционерное общество</div>
    <div class="company-name"><strong>«Сахатранснефтегаз»</strong></div>
  </div>

  <!-- Информация о компании -->
  <table class="company-table">
    <tr>
      <td class="text-center"><strong>Структурное подразделение</strong></td>
    </tr>
    <tr>
      <td class="text-center"><strong>Управление газораспределительных сетей</strong></td>
    </tr>
    <tr>
      <td class="text-center">
        677005 Республика Саха (Якутия) г. Якутск, ул. П. Алексеева д. 64, тел/факс 46-00-07<br>
        Время работы: <strong>будни</strong> с 8:00 до 17:00, обед с 12:00 до 13:00;
        <strong>суббота, воскресенье – выходной</strong>
      </td>
    </tr>
  </table>

  <!-- Номер акта -->
  <div class="act-number">Акт №: {{NUMBER}}/{{YEAR}}</div>

  <!-- Заголовок -->
  <div class="main-title">АКТ ЗАМЕНЫ АККУМУЛЯТОРНОЙ БАТАРЕИ</div>
  <div class="sub-title">ГАЗОВОГО СЧЕТЧИКА</div>

  <!-- Дата и место -->
  <div class="date-line mb-15">
    г. Якутск <span class="field-value">{{ACT_DATE}}</span> {{ACT_YEAR}} г.
  </div>

  <!-- Исполнитель и владелец -->
  <div class="content">
    <div class="field-block mb-10">
      <span class="field-label">Слесарем СТГО АО УГРС «Сахатранснефтегаз»:</span>
      <span class="field-value">{{TECHNICIAN_NAME}}</span>
    </div>

    <div class="field-block mb-15">
      <span class="field-label">Владельцем объекта:</span>
      <span class="field-value">{{OWNER_NAME}}</span>
    </div>

    <!-- Текст акта -->
    <div class="field-block mb-10 mt-15">
      составлен настоящий акт о том, что в
      <span class="field-value">{{OBJECT_TYPE}}</span>
      (жилом доме, гараже, бане и т.д.)
    </div>

    <div class="field-block mb-15">
      находящегося по адресу: <strong>г. Якутск ул.</strong>
      <span class="field-value">{{OBJECT_ADDRESS}}</span>
      д. ______ кв. ___
    </div>

    <!-- Снятый счетчик -->
    <div class="field-block mt-20 mb-10">
      <strong>Снят</strong>
      <span class="field-value">{{REMOVAL_DATE}}</span> {{REMOVAL_YEAR}} г:
    </div>

    <div class="counter-block ml-30 mb-15">
      <div class="field-block mb-5">
        Счетчик газа G –
        <span class="inline-value">{{REMOVED_METER_MODEL}}</span>
        № <span class="inline-value">{{REMOVED_METER_NUMBER}}</span>
        с показаниями
        <span class="inline-value">{{REMOVED_METER_READING}}</span> м³.
      </div>

      <div class="field-block">
        Пломба № <span class="inline-value">{{REMOVED_SEAL_NUMBER}}</span>
      </div>
    </div>

    <!-- Установленный счетчик -->
    <div class="field-block mt-20 mb-10">
      <strong>Установлен</strong>
      <span class="field-value">{{INSTALLATION_DATE}}</span> {{INSTALLATION_YEAR}} г:
    </div>

    <div class="counter-block ml-30 mb-15">
      <div class="field-block mb-5">
        Счетчик газа G –
        <span class="inline-value">{{INSTALLED_METER_MODEL}}</span>
        № <span class="inline-value">{{INSTALLED_METER_NUMBER}}</span>
        с показаниями
        <span class="inline-value">{{INSTALLED_METER_READING}}</span> м³.
      </div>

      <div class="field-block">
        Пломба № <span class="inline-value">{{INSTALLED_SEAL_NUMBER}}</span>
      </div>
    </div>

    <!-- Подписи -->
    <div class="signature-block mt-20">
      <div class="field-block mb-10">
        <span class="field-label">Слесарь СТГО АО УГРС «Сахатранснефтегаз»:</span><br>
        <span class="signature-line">{{TECHNICIAN_SIGNATURE}}</span>
      </div>

      <div class="field-block">
        <span class="field-label">Владелец объекта:</span><br>
        <span class="signature-line">{{OWNER_SIGNATURE}}</span>
      </div>
    </div>
  </div>
</div>
</body>
</html>
`

  useEffect(()  => {
    loadData(invoice_id);
  }, []);

  useEffect(()  => {
    if (actData) {
      setPreviewData(getFormData(actData));
    }
  }, [actData]);

  const getFormData                     = (act?: BatteryReplacementData | null): PageData => [
    {
      title: 'Реквизиты акта',
      data: [
        { label: 'Номер акта', type: 'string', data: act?.act_number || '', validate: true },
        { label: 'Дата акта', type: 'date', data: act?.act_date || '', validate: true },
      ],
    },
    {
      title: 'Исполнитель',
      data: [
        { label: 'ФИО', type: 'string', data: act?.technician_name || user.full_name || '', validate: true },
        { label: 'Должность', type: 'string', data: act?.technician_position || '', validate: true },
      ],
    },
    {
      title: 'Владелец',
      data: [
        { label: 'ФИО владельца', type: 'string', data: act?.owner_name || '', validate: true },
        { label: 'Телефон', type: 'string', data: act?.owner_phone || '', validate: true },
      ],
    },
    {
      title: 'Объект',
      data: [
        { label: 'Тип объекта', type: 'string', data: act?.object_type || '', validate: true },
        { label: 'Адрес', type: 'address', data: act?.object_address || '', validate: true },
      ],
    },
    {
      title: 'Снятый счетчик',
      data: [
        { label: 'Дата снятия', type: 'date', data: act?.removal_date || '', validate: true },
        { label: 'Модель', type: 'string', data: act?.removed_meter_model || '', validate: true },
        { label: 'Номер', type: 'string', data: act?.removed_meter_number || '', validate: true },
        { label: 'Показания', type: 'string', data: act?.removed_meter_reading || '', validate: true },
        { label: 'Номер пломбы', type: 'string', data: act?.removed_seal_number || '', validate: false },
      ],
    },
    {
      title: 'Установленный счетчик',
      data: [
        { label: 'Дата установки', type: 'date', data: act?.installation_date || '', validate: true },
        { label: 'Модель', type: 'string', data: act?.installed_meter_model || '', validate: true },
        { label: 'Номер', type: 'string', data: act?.installed_meter_number || '', validate: true },
        { label: 'Показания', type: 'string', data: act?.installed_meter_reading || '', validate: true },
        { label: 'Номер пломбы', type: 'string', data: act?.installed_seal_number || '', validate: false },
      ],
    },
    {
      title: 'Подписи и статус',
      data: [
        { label: 'Подпись техника', type: 'string', data: act?.technician_signature || '', validate: true },
        { label: 'Подпись владельца', type: 'string', data: act?.owner_signature || '', validate: true },
        { label: 'Статус', type: 'select', values: ['Черновик', 'Подписан', 'Отправлен'], data: act?.status || 'Черновик', validate: true },
        { label: 'Путь к скану', type: 'string', data: act?.document_scan_path || '', validate: false },
      ],
    },
  ];

  const handleSave                      = (data: PageData) => {
    const formData: BatteryReplacementData = {
      invoice_id: invoice_id,
      act_number: data[0].data[0].data,
      act_date: data[0].data[1].data,
      technician_name: data[1].data[0].data,
      technician_position: data[1].data[1].data,
      owner_name: data[2].data[0].data,
      owner_phone: data[2].data[1].data,
      object_type: data[3].data[0].data,
      object_address: data[3].data[1].data,
      removal_date: data[4].data[0].data,
      removed_meter_model: data[4].data[1].data,
      removed_meter_number: data[4].data[2].data,
      removed_meter_reading: data[4].data[3].data,
      removed_seal_number: data[4].data[4].data,
      installation_date: data[5].data[0].data,
      installed_meter_model: data[5].data[1].data,
      installed_meter_number: data[5].data[2].data,
      installed_meter_reading: data[5].data[3].data,
      installed_seal_number: data[5].data[4].data,
      technician_signature: data[6].data[0].data,
      owner_signature: data[6].data[1].data,
      status: data[6].data[2].data,
      document_scan_path: data[6].data[3].data,
    };

    saveData(formData);
    setIsEditing(false);
  };

  const handlePrint                     = async() => {
    const res = await get_pdf( htmlTemplate )
    console.log('get_pdf', res)
    if(res.success){
        setModal( res.data )
        toast.success("pdf сгенерен")
    }
    else toast.error("не получилось сгенерить pdf")
  };

  const handleEdit                      = () => {
    setIsEditing(true);
  };

  const handleCancelEdit                = () => {
    setIsEditing(false);
  };

  const renderPreview                   = () => {
    if (!previewData) return null;

    return (
      <div className={styles.batteryActForm}>
        <div className={styles.formHeaderLeft}>
          <h2 className={styles.formTitle}><b>Акт замены батареи</b></h2>
        </div>
        <div className={styles.formHeader}>
          <div className={`${styles.formActions} ${styles.formActionsButtons}`}>
            <div className='w-50'>
              <IonButton onClick={handlePrint} fill="solid" expand='block' color="primary">
                <IonIcon slot="start" icon={printOutline} />
                Предпросмотр
              </IonButton>
            </div>
            <div className='w-50'>
              <IonButton onClick={handleEdit} fill="solid" expand="block" color="secondary">
                <IonIcon slot="start" icon={createOutline} />
                Изменить
              </IonButton>
            </div>
          </div>
        </div>

        <div className={styles.formScrollContainer}>
          <div className={styles.batteryActFormCard}>
            <div className={styles.batteryActFormContent}>
              {previewData.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className={styles.previewModeFormSection}
                >
                  <h3 className={styles.previewModeSectionTitle}>
                    {section.title}
                  </h3>
                  <div className={styles.previewModeSectionContent}>
                    {section.data.map((field, fieldIndex) => (
                      <div key={fieldIndex} className={styles.previewField}>
                        <span className={styles.previewLabel}>
                          {field.label}:
                        </span>
                        <span className={styles.previewValue}>
                          {
                            field.type === 'date' && field.data
                              ? new Date(field.data).toLocaleDateString('ru-RU')
                              : field.type === 'address' && field.data
                                ? field.data.address
                                : field.data || '—'
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isEditing) {
    return (
      <>
        <IonLoading isOpen={isLoading} message="Подождите..." />
        <DataEditor
          data    = { getFormData(actData) }
          onSave  = { handleSave }
          onBack  = { handleCancelEdit }
        />
      </>
    );
  }

  return (
    <>
      <IonLoading isOpen={isLoading} message="Подождите..." />
      { renderPreview() }
       <IonModal
          className     = { styles.modal }
          isOpen        = { modal !== undefined }
          onDidDismiss  = { () => setModal( undefined )}
      >
        <div className = {styles.modalContent}>
          <div className="w-auto h-auto">
            {modal ? (
                <PDFDoc  url = { modal } onClose = { () => setModal( undefined )} />              
            ) : (
              <div className={styles.noPdf}>
                <IonIcon icon={documentOutline} className={styles.noPdfIcon} />
                <p>PDF документ не загружен</p>
              </div>
            )}
          </div>
        </div>
      </IonModal>
    </>
  );
};
