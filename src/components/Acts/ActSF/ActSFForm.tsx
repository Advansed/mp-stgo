// ActSFForm.tsx
import React, { useEffect, useState } from 'react';
import { useActSF } from './useActSF';
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
import styles from './ActSFForm.module.css';
import { useToast } from '../../Toast';
import { useLoginStore } from '../../../Store/loginStore';
import { PageData } from '../../DataEditor/types';
import { SealBreakData } from '../../../Store/types';
import DataEditor from '../../DataEditor';
import { PDFDoc } from '../../Files';

interface ActSFFormProps {
  onBack: () => void;
  invoice_id?: string;
}

export const ActSFForm: React.FC<ActSFFormProps> = ({ onBack, invoice_id }) => {
  const toast = useToast();
  const user = useLoginStore(state => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [previewData, setPreviewData] = useState<PageData | null>(null);
  const { actData, isLoading, loadData, saveData, get_pdf } = useActSF();
  const [modal, setModal] = useState<any>();

  const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>АКТ СРЫВА ПЛОМБЫ</title>
  <style>
    @page { size: A4; margin: 0cm; }
    body { font-family: "Times New Roman", serif; font-size: 12pt; line-height: 1.2; margin: 0; padding: 0; }
    .container { width: 21cm; min-height: 29.7cm; margin: 0 auto; padding: 1.5cm 2cm; box-sizing: border-box; }
    .header { text-align: center; margin-bottom: 10px; }
    .company-name { font-size: 12pt; line-height: 1.1; margin-bottom: 5px; }
    .company-table { width: 100%; border: 1px solid #000; border-collapse: collapse; margin-bottom: 10px; }
    .company-table td { padding: 2px 5px; border: none; }
    .main-title { font-size: 14pt; font-weight: bold; text-align: center; text-decoration: underline; margin: 10px 0; }
    .date-line { text-align: right; margin: 15px 0; }
    .content { margin: 10px 0; }
    .field-block { margin-bottom: 8px; }
    .field-value { display: inline; border-bottom: 1px solid #000; min-width: 200px; padding: 0 5px; text-align: center; }
    .inline-value { display: inline-block; border-bottom: 1px solid #000; min-width: 150px; padding: 0 5px; text-align: center; }
    .signature-block { margin-top: 30px; }
    .signature-line { display: inline-block; border-bottom: 1px solid #000; min-width: 250px; padding: 0 5px; margin-top: 20px; }
    .text-center { text-align: center; }
    .act-number { font-size: 12pt; font-weight: bold; text-align: center; margin: 5px 0 10px 0; }
    .reason-block { margin-left: 30px; margin-bottom: 8px; }
  </style>
</head>
<body>
<div class="container">
  <div class="header">
     <img src="{{LOGO_SRC}}" alt="logo" style="height:60px;" />
    <div class="company-name">Акционерное общество</div>
    <div class="company-name"><strong>«Сахатранснефтегаз»</strong></div>
  </div>

  <table class="company-table">
    <tr><td class="text-center"><strong>Структурное подразделение</strong></td></tr>
    <tr><td class="text-center"><strong>Управление газораспределительных сетей</strong></td></tr>
    <tr><td class="text-center">
      677005 Республика Саха (Якутия) г. Якутск, ул. П. Алексеева д. 64, тел/факс 46-00-07<br>
      Время работы: <strong>будни</strong> с 8:00 до 17:00, обед с 12:00 до 13:00;
      <strong>суббота, воскресенье – выходной</strong>
    </td></tr>
  </table>

  <div class="act-number">Акт №: {{NUMBER}}/{{YEAR}}</div>
  <div class="main-title">АКТ СРЫВА ПЛОМБЫ</div>

  <div class="date-line">
    г. Якутск «<span class="field-value">{{ACT_DAY}}</span>» 
    <span class="field-value">{{ACT_MONTH}}</span> 
    <span class="field-value">{{ACT_YEAR}}</span> год
  </div>

  <div class="content">
    <div class="field-block">
      <span>Представителями УГРС АО «Сахатранснефтегаз»:</span>
    </div>
    
    <div class="field-block">
      <span>Слесарем СТГО АО УГРС «Сахатранснефтегаз»:</span>
      <span class="field-value">{{TECHNICIAN1_NAME}}</span>
    </div>

    <div class="field-block">
      <span>Слесарем СТГО АО УГРС «Сахатранснефтегаз»:</span>
      <span class="field-value">{{TECHNICIAN2_NAME}}</span>
    </div>

    <div class="field-block">
      <span>Владельцем объекта:</span>
      <span class="field-value">{{OWNER_NAME}}</span>
    </div>

    <div class="field-block">
      составлен настоящий акт в том, что в
      <span class="field-value">{{OBJECT_TYPE}}</span>
      (жилом доме, гараже, бане и т.д.)
    </div>

    <div class="field-block">
      находящегося по адресу: [г. Якутск ул.]
      <span class="field-value">{{STREET}}</span>
      д. <span class="inline-value">{{HOUSE}}</span> 
      кв. <span class="inline-value">{{APARTMENT}}</span>
    </div>

    <div class="field-block">
      <strong>Сорвана</strong> «<span class="field-value">{{BREAK_DAY}}</span>» 
      <span class="field-value">{{BREAK_MONTH}}</span> 
      <span class="field-value">{{BREAK_YEAR}}</span> г:
    </div>

    <div class="reason-block">
      <div class="field-block">
        1. Пломба № <span class="inline-value">{{BREAK_SEAL_NUMBER}}</span> 
        цвет <span class="inline-value">{{BREAK_SEAL_COLOR}}</span>
      </div>
      <div class="field-block">
        2. Счетчик газа G---<span class="inline-value">{{BREAK_METER_MODEL}}</span> 
        № <span class="inline-value">{{BREAK_METER_NUMBER}}</span>
        с показаниями <span class="inline-value">{{BREAK_METER_READING}}</span> м3.
      </div>
    </div>

    <div class="field-block">
      По причине <span class="field-value">{{REASON}}</span>
    </div>

    <div class="field-block">
      <strong>Установлена</strong> «<span class="field-value">{{INSTALL_DAY}}</span>» 
      <span class="field-value">{{INSTALL_MONTH}}</span> 
      <span class="field-value">{{INSTALL_YEAR}}</span> г:
    </div>

    <div class="reason-block">
      <div class="field-block">
        1. Пломба № <span class="inline-value">{{INSTALL_SEAL_NUMBER}}</span> 
        цвет <span class="inline-value">{{INSTALL_SEAL_COLOR}}</span>
      </div>
      <div class="field-block">
        2. Счетчик газа G---<span class="inline-value">{{INSTALL_METER_MODEL}}</span> 
        № <span class="inline-value">{{INSTALL_METER_NUMBER}}</span>
        с показаниями <span class="inline-value">{{INSTALL_METER_READING}}</span> м3.
      </div>
    </div>

    <div class="signature-block">
      <div class="field-block">
        <span>Подписи сторон:</span>
      </div>
      <div class="field-block">
        <span>Слесарь СТГО АО УГРС «Сахатранснефтегаз»:</span><br>
        <span class="signature-line">{{TECHNICIAN1_SIGNATURE}}</span>
      </div>
      <div class="field-block">
        <span>Слесарь СТГО АО УГРС «Сахатранснефтегаз»:</span><br>
        <span class="signature-line">{{TECHNICIAN2_SIGNATURE}}</span>
      </div>
      <div class="field-block">
        <span>Владелец объекта:</span><br>
        <span class="signature-line">{{OWNER_SIGNATURE}}</span>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;

  useEffect(() => { loadData(invoice_id); }, []);
  useEffect(() => { if (actData) setPreviewData(getFormData(actData)); }, [actData]);

  const getFormData = (act?: SealBreakData | null): PageData => [
    {
      title: 'Реквизиты акта',
      data: [
        { label: 'Номер акта', type: 'string', data: act?.act_number || '', validate: true },
        { label: 'Дата акта', type: 'date', data: act?.act_date || '', validate: true },
      ],
    },
    {
      title: 'Исполнители',
      data: [
        { label: 'ФИО слесаря 1', type: 'string', data: act?.technician1_name || user.full_name || '', validate: true },
        { label: 'ФИО слесаря 2', type: 'string', data: act?.technician2_name || '', validate: false },
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
        { label: 'Улица', type: 'string', data: act?.street || '', validate: true },
        { label: 'Дом', type: 'string', data: act?.house || '', validate: true },
        { label: 'Квартира', type: 'string', data: act?.apartment || '', validate: false },
      ],
    },
    {
      title: 'Сорванная пломба',
      data: [
        { label: 'Дата срыва', type: 'date', data: act?.break_date || '', validate: true },
        { label: 'Номер пломбы', type: 'string', data: act?.break_seal_number || '', validate: true },
        { label: 'Цвет пломбы', type: 'string', data: act?.break_seal_color || '', validate: false },
        { label: 'Модель счетчика', type: 'string', data: act?.break_meter_model || '', validate: true },
        { label: 'Номер счетчика', type: 'string', data: act?.break_meter_number || '', validate: true },
        { label: 'Показания', type: 'string', data: act?.break_meter_reading || '', validate: true },
        { label: 'Причина срыва', type: 'string', data: act?.reason || '', validate: true },
      ],
    },
    {
      title: 'Установленная пломба',
      data: [
        { label: 'Дата установки', type: 'date', data: act?.install_date || '', validate: true },
        { label: 'Номер пломбы', type: 'string', data: act?.install_seal_number || '', validate: true },
        { label: 'Цвет пломбы', type: 'string', data: act?.install_seal_color || '', validate: false },
        { label: 'Модель счетчика', type: 'string', data: act?.install_meter_model || '', validate: true },
        { label: 'Номер счетчика', type: 'string', data: act?.install_meter_number || '', validate: true },
        { label: 'Показания', type: 'string', data: act?.install_meter_reading || '', validate: true },
      ],
    },
    {
      title: 'Подписи и статус',
      data: [
        { label: 'Подпись слесаря 1', type: 'string', data: act?.technician1_signature || '', validate: true },
        { label: 'Подпись слесаря 2', type: 'string', data: act?.technician2_signature || '', validate: false },
        { label: 'Подпись владельца', type: 'string', data: act?.owner_signature || '', validate: true },
        { label: 'Статус', type: 'select', values: ['Черновик', 'Подписан', 'Отправлен'], data: act?.status || 'Черновик', validate: true },
        { label: 'Путь к скану', type: 'string', data: act?.document_scan_path || '', validate: false },
      ],
    },
  ];

  const handleSave = (data: PageData) => {
    const formData: SealBreakData = {
      invoice_id: invoice_id,
      act_number: data[0].data[0].data,
      act_date: data[0].data[1].data,
      technician1_name: data[1].data[0].data,
      technician2_name: data[1].data[1].data,
      technician_position: data[1].data[2].data,
      owner_name: data[2].data[0].data,
      owner_phone: data[2].data[1].data,
      object_type: data[3].data[0].data,
      street: data[3].data[1].data,
      house: data[3].data[2].data,
      apartment: data[3].data[3].data,
      break_date: data[4].data[0].data,
      break_seal_number: data[4].data[1].data,
      break_seal_color: data[4].data[2].data,
      break_meter_model: data[4].data[3].data,
      break_meter_number: data[4].data[4].data,
      break_meter_reading: data[4].data[5].data,
      reason: data[4].data[6].data,
      install_date: data[5].data[0].data,
      install_seal_number: data[5].data[1].data,
      install_seal_color: data[5].data[2].data,
      install_meter_model: data[5].data[3].data,
      install_meter_number: data[5].data[4].data,
      install_meter_reading: data[5].data[5].data,
      technician1_signature: data[6].data[0].data,
      technician2_signature: data[6].data[1].data,
      owner_signature: data[6].data[2].data,
      status: data[6].data[3].data,
      document_scan_path: data[6].data[4].data,
    };
    saveData(formData);
    setIsEditing(false);
  };

  const handlePrint = async () => {
    const res = await get_pdf(htmlTemplate);
    if (res.success) {
      setModal(res.data);
      toast.success("PDF сгенерирован");
    } else toast.error("Не удалось сгенерировать PDF");
  };

  const renderPreview = () => {
    if (!previewData) return null;
    return (
      <div className={styles.meterActForm}>
        <div className={styles.formHeaderLeft}>
          <h2 className={styles.formTitle}><b>Акт срыва пломбы</b></h2>
        </div>
        <div className={styles.formHeader}>
          <div className={`${styles.formActions} ${styles.formActionsButtons}`}>
            <div className='w-50'>
              <IonButton onClick={handlePrint} fill="solid" expand='block' color="primary">
                <IonIcon slot="start" icon={printOutline} /> Печать
              </IonButton>
            </div>
            <div className='w-50'>
              <IonButton onClick={() => setIsEditing(true)} fill="solid" expand="block" color="secondary">
                <IonIcon slot="start" icon={createOutline} /> Изменить
              </IonButton>
            </div>
          </div>
        </div>

        <div className={styles.formScrollContainer}>
          <div className={styles.meterActFormCard}>
            <div className={styles.meterActFormContent}>
              {previewData.map((section, sectionIndex) => (
                <div key={sectionIndex} className={styles.previewModeFormSection}>
                  <h3 className={styles.previewModeSectionTitle}>{section.title}</h3>
                  <div className={styles.previewModeSectionContent}>
                    {section.data.map((field, fieldIndex) => (
                      <div key={fieldIndex} className={styles.previewField}>
                        <span className={styles.previewLabel}>{field.label}:</span>
                        <span className={styles.previewValue}>
                          {field.type === 'date' && field.data
                            ? new Date(field.data).toLocaleDateString('ru-RU')
                            : field.data || '—'}
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
          data={getFormData(actData)}
          onSave={handleSave}
          onBack={() => setIsEditing(false)}
        />
      </>
    );
  }

  return (
    <>
      <IonLoading isOpen={isLoading} message="Подождите..." />
      {renderPreview()}
      <IonModal isOpen={modal !== undefined} onDidDismiss={() => setModal(undefined)}>
        <div className={styles.modalContent}>
          <div className="w-auto h-auto">
            {modal ? (
              <PDFDoc url={modal} onClose={() => setModal(undefined)} />
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