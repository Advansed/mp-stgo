// ActIGEForm.tsx
import React, { useEffect, useState } from 'react';
import { useActIGE } from './useActIGE';
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
import styles from './ActIGEForm.module.css';
import { useToast } from '../../Toast';
import { useLoginStore } from '../../../Store/loginStore';
import { PageData } from '../../DataEditor/types';
import { MeterInstallationData } from '../../../Store/types';
import DataEditor from '../../DataEditor';
import { PDFDoc } from '../../Files';

interface ActIGEFormProps {
  onBack: () => void;
  invoice_id?: string;
}

export const ActIGEForm: React.FC<ActIGEFormProps> = ({ onBack, invoice_id }) => {
  const toast = useToast();
  const user = useLoginStore(state => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [previewData, setPreviewData] = useState<PageData | null>(null);
  const { actData, isLoading, loadData, saveData, get_pdf } = useActIGE();
  const [modal, setModal] = useState<any>();

  const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>АКТ УСТАНОВКИ ГАЗОВОГО СЧЕТЧИКА</title>
  <style>
    @page { size: A4; margin: 0cm; }
    body { font-family: "Times New Roman", serif; font-size: 12pt; line-height: 1.2; margin: 0; padding: 0; }
    .container { width: 21cm; min-height: 29.7cm; margin: 0 auto; padding: 1.5cm 2cm; box-sizing: border-box; }
    .header { text-align: center; margin-bottom: 10px; }
    .company-name { font-size: 12pt; line-height: 1.1; margin-bottom: 5px; }
    .company-table { width: 100%; border: 1px solid #000; border-collapse: collapse; margin-bottom: 10px; }
    .company-table td { padding: 2px 5px; border: none; }
    .main-title { font-size: 14pt; font-weight: bold; text-align: center; text-decoration: underline; margin: 10px 0; }
    .content { margin: 10px 0; }
    .field-block { margin-bottom: 8px; }
    .field-value { display: inline; border-bottom: 1px solid #000; min-width: 200px; padding: 0 5px; text-align: center; }
    .inline-value { display: inline-block; border-bottom: 1px solid #000; min-width: 150px; padding: 0 5px; text-align: center; }
    .signature-block { margin-top: 30px; }
    .signature-line { display: inline-block; border-bottom: 1px solid #000; min-width: 250px; padding: 0 5px; margin-top: 20px; }
    .text-center { text-align: center; }
    .sketch-title { font-size: 12pt; font-weight: bold; margin: 15px 0 5px 0; }
    .attachments { margin-top: 20px; }
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
      677005 Республика Саха (Якутия) г. Якутск, ул. П. Алексеева д. 64, тел/факс 319-555<br>
      Время работы: <strong>будни</strong> с 8:00 до 17:00, обед с 12:00 до 13:00;
      <strong>суббота, воскресенье – выходной</strong>
    </td></tr>
  </table>

  <div class="main-title">АКТ УСТАНОВКИ ГАЗОВОГО СЧЕТЧИКА</div>

  <div class="content">
    <div class="field-block">
      Нами службой СТГО УГРС АО «Сахатранснефтегаз»,
    </div>

    <div class="field-block">
      «<span class="field-value">{{INSTALLATION_DATE}}</span>» года установлен новый газовый счетчик
      <span class="field-value">{{METER_MODEL}}</span>
    </div>

    <div class="field-block">
      С заводским № <span class="field-value">{{METER_NUMBER}}</span>, пломба
      № <span class="field-value">{{SEAL_NUMBER}}</span>
    </div>

    <div class="field-block">
      По адресу: <strong>г. Якутск,
      ул.</strong> <span class="field-value">{{OBJECT_ADDRESS}}</span>,
      <strong>д.</strong> ______ <strong>кв.</strong> ___
    </div>

    <div class="field-block">
      <strong>Абонент:</strong>
      <span class="field-value">{{OWNER_NAME}}</span>
    </div>

    <div class="sketch-title">ЭСКИЗ:</div>

    <div class="field-block">
      Первичные показания счетчика на момент установки <span class="field-value">{{METER_READING}}</span> м³
    </div>

    <div class="attachments">
      <div class="field-block">
        <strong>Приложение:</strong> 1. акт пломбирования<br>
        2. паспорт счетчика
      </div>
    </div>

    <div class="signature-block">
      <div class="field-block">
        <em>Представитель СТГО УГРС АО «Сахатранснефтегаз»</em><br>
        <span class="signature-line">{{TECHNICIAN_SIGNATURE}}</span>
      </div>
      <div class="field-block">
        <em>Заказчик</em><br>
        <span class="signature-line">{{OWNER_SIGNATURE}}</span>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;

  useEffect(() => { loadData(invoice_id); }, []);
  useEffect(() => { if (actData) setPreviewData(getFormData(actData)); }, [actData]);

  const getFormData = (act?: MeterInstallationData | null): PageData => [
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
        { label: 'ФИО техника', type: 'string', data: act?.technician_name || user.full_name || '', validate: true },
        { label: 'Подпись техника', type: 'string', data: act?.technician_signature || '', validate: true },
      ],
    },
    {
      title: 'Абонент',
      data: [
        { label: 'ФИО абонента', type: 'string', data: act?.owner_name || '', validate: true },
        { label: 'Телефон абонента', type: 'string', data: act?.owner_phone || '', validate: true },
        { label: 'Подпись абонента', type: 'string', data: act?.owner_signature || '', validate: true },
      ],
    },
    {
      title: 'Объект',
      data: [
        { label: 'Адрес объекта', type: 'address', data: act?.object_address || '', validate: true },
      ],
    },
    {
      title: 'Счетчик',
      data: [
        { label: 'Дата установки', type: 'date', data: act?.installation_date || '', validate: true },
        { label: 'Модель счетчика', type: 'string', data: act?.meter_model || '', validate: true },
        { label: 'Заводской номер', type: 'string', data: act?.meter_number || '', validate: true },
        { label: 'Первичные показания', type: 'string', data: act?.meter_reading || '', validate: true },
        { label: 'Номер пломбы', type: 'string', data: act?.seal_number || '', validate: true },
      ],
    },
    {
      title: 'Статус',
      data: [
        { label: 'Статус', type: 'select', values: ['Черновик', 'Подписан', 'Отправлен'], data: act?.status || 'Черновик', validate: true },
        { label: 'Путь к скану', type: 'string', data: act?.document_scan_path || '', validate: false },
      ],
    },
  ];

  const handleSave = (data: PageData) => {
    const formData: MeterInstallationData = {
      invoice_id: invoice_id,
      act_number: data[0].data[0].data,
      act_date: data[0].data[1].data,
      technician_name: data[1].data[0].data,
      technician_signature: data[1].data[1].data,
      owner_name: data[2].data[0].data,
      owner_phone: data[2].data[1].data,
      owner_signature: data[2].data[2].data,
      object_address: data[3].data[0].data,
      installation_date: data[4].data[0].data,
      meter_model: data[4].data[1].data,
      meter_number: data[4].data[2].data,
      meter_reading: data[4].data[3].data,
      seal_number: data[4].data[4].data,
      status: data[5].data[0].data,
      document_scan_path: data[5].data[1].data,
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
          <h2 className={styles.formTitle}><b>Акт установки газового счетчика</b></h2>
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
                            : field.type === 'address' && field.data
                              ? field.data.address
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