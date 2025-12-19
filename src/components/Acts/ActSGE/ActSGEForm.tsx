// ActSGEForm.tsx
import React, { useEffect, useState } from 'react';
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
import styles from './ActSGEForm.module.css';
import { useToast } from '../../Toast';
import { useLoginStore } from '../../../Store/loginStore';
import { PageData } from '../../DataEditor/types';
import DataEditor from '../../DataEditor';
import { PDFDoc } from '../../Files';
import { useActSGE } from './useActSGE';
import { DisconnectionActData } from '../../../Store/types';

interface ActSGEFormProps {
  onBack: () => void;
  invoice_id?: string;
}

export const ActSGEForm: React.FC<ActSGEFormProps> = ({ onBack, invoice_id }) => {
  const toast = useToast();
  const user = useLoginStore(state => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [previewData, setPreviewData] = useState<PageData | null>(null);
  const { actData, isLoading, loadData, saveData, get_pdf } = useActSGE();
  const [modal, setModal] = useState<any>();

  const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>АКТ ОТКЛЮЧЕНИЯ БЫТОВОГО ГАЗОИСПОЛЬЗУЮЩЕГО ГАЗОВОГО ОБОРУДОВАНИЯ</title>
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
    .underline { text-decoration: underline; }
    .bold { font-weight: bold; }
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
  <div class="main-title">АКТ ОТКЛЮЧЕНИЯ БЫТОВОГО ГАЗОИСПОЛЬЗУЮЩЕГО ГАЗОВОГО ОБОРУДОВАНИЯ</div>

  <div class="date-line">
    «<span class="field-value">{{ACT_DAY}}</span>» <span class="field-value">{{ACT_MONTH}}</span> <span class="field-value">{{ACT_YEAR}}</span> г. л/с <span class="field-value">{{PERSONAL_ACCOUNT}}</span>
  </div>

  <div class="content">
    <div class="field-block">
      Ввиду <span class="underline">Наряд-задание на отключение № <span class="field-value">{{WORK_ORDER_NUMBER}}</span> от <span class="field-value">{{WORK_ORDER_DATE}}</span> по задолженности</span>
    </div>

    <div class="field-block">
      <span class="field-value">{{DEBT_REASON}}</span>
    </div>

    <div class="field-block">
      <span>в квартире № <span class="field-value">{{APARTMENT_NUMBER}}</span> дома № <span class="field-value">{{HOUSE_NUMBER}}</span> корпус <span class="field-value">{{BUILDING_NUMBER}}</span> по ул. <span class="field-value">{{STREET_NAME}}</span></span>
    </div>

    <div class="field-block">
      <span>г. Якутск <span class="field-value">{{CITY_DISTRICT}}</span></span>
    </div>

    <div class="field-block">
      <span>Заказчик <span class="field-value">{{CUSTOMER_NAME}}</span></span>
    </div>

    <div class="field-block">
      <span>представителем УГРС АО «Сахатранснефтегаз» <span class="field-value">{{REPRESENTATIVE_POSITION}}</span> <span class="field-value">{{REPRESENTATIVE_NAME}}</span></span>
    </div>

    <div class="field-block">
      <span>в <span class="field-value">{{DISCONNECTION_TIME_HOURS}}</span> ч <span class="field-value">{{DISCONNECTION_TIME_MINUTES}}</span> мин. отключено газоиспользующее оборудование:</span>
    </div>

    <div class="field-block">
      <span class="field-value">{{EQUIPMENT_DESCRIPTION}}</span>
    </div>

    <div class="field-block">
      <span class="field-value">{{EQUIPMENT_COUNT}}</span>
    </div>

    <div class="field-block">
      <span class="field-value">{{DISCONNECTION_METHOD}}</span>
    </div>

    <div class="field-block">
      <span>Установлена пломба № <span class="field-value">{{SEAL_NUMBER}}</span></span>
    </div>

    <div class="signature-block">
      <div class="field-block">
        <span>Представитель УГРС АО «Сахатранснегаз»</span><br>
        <span class="signature-line">{{REPRESENTATIVE_SIGNATURE}}</span><br>
        <span>личная подпись инициалы, фамилия</span>
      </div>

      <div class="field-block">
        <span>Заказчик</span><br>
        <span class="signature-line">{{CUSTOMER_SIGNATURE}}</span><br>
        <span>личная подпись инициалы, фамилия</span>
      </div>
    </div>

    <div class="field-block" style="margin-top: 40px;">
      <span>Газоиспользующее оборудование подключено «<span class="field-value">{{RECONNECTION_DATE}}</span>» <span class="field-value">{{RECONNECTION_MONTH}}</span> <span class="field-value">{{RECONNECTION_YEAR}}</span> г.</span>
    </div>

    <div class="field-block">
      <span>представителем УГРС АО «Сахатранснефтегаз»</span><br>
      <span class="field-value">{{RECONNECTION_REPRESENTATIVE}}</span><br>
      <span>должность, инициалы, фамилия личная подпись</span>
    </div>

    <div class="field-block">
      <span>Представитель УГРС АО «Сахатранснефтегаз»</span><br>
      <span class="signature-line">{{RECONNECTION_REPRESENTATIVE_SIGNATURE}}</span><br>
      <span>личная подпись инициалы, фамилия</span>
    </div>

    <div class="field-block">
      <span>Потребитель газа</span><br>
      <span class="signature-line">{{CUSTOMER_SIGNATURE}}</span><br>
      <span>личная подпись инициалы, фамилия</span>
    </div>

    <div class="field-block">
      <span>на основании <span class="field-value">{{RECONNECTION_BASIS}}</span></span>
    </div>
  </div>
</div>
</body>
</html>`;

  useEffect(() => { loadData(invoice_id); }, []);
  useEffect(() => { if (actData) setPreviewData(getFormData(actData)); }, [actData]);

  const getFormData = (act?: DisconnectionActData | null): PageData => [
    {
      title: 'Реквизиты акта',
      data: [
        { label: 'Номер акта', type: 'string', data: act?.act_number || '', validate: true },
        { label: 'Дата акта', type: 'date', data: act?.act_date || '', validate: true },
        { label: 'Лицевой счет', type: 'string', data: act?.personal_account || '', validate: true },
      ],
    },
    {
      title: 'Наряд-задание',
      data: [
        { label: 'Номер наряда', type: 'string', data: act?.work_order_number || '', validate: true },
        { label: 'Дата наряда', type: 'date', data: act?.work_order_date || '', validate: true },
        { label: 'Причина отключения', type: 'string', data: act?.debt_reason || '', validate: true },
      ],
    },
    {
      title: 'Адрес объекта',
      data: [
        { label: 'Квартира №', type: 'string', data: act?.apartment_number || '', validate: true },
        { label: 'Дом №', type: 'string', data: act?.house_number || '', validate: true },
        { label: 'Корпус', type: 'string', data: act?.building_number || '', validate: true },
        { label: 'Улица', type: 'string', data: act?.street_name || '', validate: true },
        { label: 'Район города', type: 'string', data: act?.city_district || '', validate: true },
      ],
    },
    {
      title: 'Заказчик',
      data: [
        { label: 'ФИО заказчика', type: 'string', data: act?.customer_name || '', validate: true },
      ],
    },
    {
      title: 'Представитель УГРС',
      data: [
        { label: 'Должность', type: 'string', data: act?.representative_position || '', validate: true },
        { label: 'ФИО', type: 'string', data: act?.representative_name || user.full_name || '', validate: true },
      ],
    },
    {
      title: 'Отключение оборудования',
      data: [
        { label: 'Время отключения (часы)', type: 'string', data: act?.disconnection_time_hours || '', validate: true },
        { label: 'Время отключения (минуты)', type: 'string', data: act?.disconnection_time_minutes || '', validate: true },
        { label: 'Описание оборудования', type: 'string', data: act?.equipment_description || '', validate: true },
        { label: 'Количество', type: 'string', data: act?.equipment_count || '', validate: true },
        { label: 'Способ отключения', type: 'string', data: act?.disconnection_method || '', validate: true },
        { label: 'Номер пломбы', type: 'string', data: act?.seal_number || '', validate: true },
      ],
    },
    {
      title: 'Подключение оборудования',
      data: [
        { label: 'Дата подключения', type: 'date', data: act?.reconnection_date || '', validate: false },
        { label: 'Представитель при подключении', type: 'string', data: act?.reconnection_representative || '', validate: false },
        { label: 'Основание для подключения', type: 'string', data: act?.reconnection_basis || '', validate: false },
      ],
    },
    {
      title: 'Подписи и статус',
      data: [
        { label: 'Подпись представителя', type: 'string', data: act?.representative_signature || '', validate: true },
        { label: 'Подпись заказчика', type: 'string', data: act?.customer_signature || '', validate: true },
        { label: 'Подпись при подключении', type: 'string', data: act?.reconnection_representative_signature || '', validate: false },
        { label: 'Статус', type: 'select', values: ['Черновик', 'Подписан', 'Отправлен'], data: act?.status || 'Черновик', validate: true },
        { label: 'Путь к скану', type: 'string', data: act?.document_scan_path || '', validate: false },
      ],
    },
  ];

  const handleSave = (data: PageData) => {
    const formData: DisconnectionActData = {
      invoice_id: invoice_id,
      act_number: data[0].data[0].data,
      act_date: data[0].data[1].data,
      personal_account: data[0].data[2].data,
      work_order_number: data[1].data[0].data,
      work_order_date: data[1].data[1].data,
      debt_reason: data[1].data[2].data,
      apartment_number: data[2].data[0].data,
      house_number: data[2].data[1].data,
      building_number: data[2].data[2].data,
      street_name: data[2].data[3].data,
      city_district: data[2].data[4].data,
      customer_name: data[3].data[0].data,
      representative_position: data[4].data[0].data,
      representative_name: data[4].data[1].data,
      disconnection_time_hours: data[5].data[0].data,
      disconnection_time_minutes: data[5].data[1].data,
      equipment_description: data[5].data[2].data,
      equipment_count: data[5].data[3].data,
      disconnection_method: data[5].data[4].data,
      seal_number: data[5].data[5].data,
      reconnection_date: data[6].data[0].data,
      reconnection_representative: data[6].data[1].data,
      reconnection_basis: data[6].data[2].data,
      representative_signature: data[7].data[0].data,
      customer_signature: data[7].data[1].data,
      reconnection_representative_signature: data[7].data[2].data,
      status: data[7].data[3].data,
      document_scan_path: data[7].data[4].data,
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
      <div className={styles.disconnectionActForm}>
        <div className={styles.formHeaderLeft}>
          <h2 className={styles.formTitle}><b>Акт отключения бытового газоиспользующего газового оборудования</b></h2>
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
          <div className={styles.disconnectionActFormCard}>
            <div className={styles.disconnectionActFormContent}>
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