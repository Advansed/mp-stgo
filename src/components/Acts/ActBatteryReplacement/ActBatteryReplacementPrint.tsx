import React from 'react';
import { PrintRow } from '../Forms/Forms';

// Интерфейс данных для печатной формы
interface ActBatteryReplacementData {
  id?: string;
  actNumber: string;
  actDate: string;
  technicianPosition: string;
  technicianName: string;
  ownerName: string;
  objectType: string;
  objectStreet: string;
  objectHouse: string;
  objectApartment: string;
  removalDate: string;
  removedMeterModel: string;
  removedMeterNumber: string;
  removedMeterReading: string;
  removedSealNumber: string;
  installationDate: string;
  installedMeterModel: string;
  installedMeterNumber: string;
  installedMeterReading: string;
  installedSealNumber: string;
  technicianSignature: string;
  ownerSignature: string;
  status: string;
}

// Обновленный интерфейс props
interface ActBatteryReplacementProps {
  mode: 'print';
  data: ActBatteryReplacementData;
  onClose: () => void;
}

const ActBatteryReplacementPrint: React.FC<ActBatteryReplacementProps> = ({
  mode,
  data,
  onClose
}) => {
  // Функции форматирования
  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return { day: '_____', month: '__________________', year: '___' };
    const date = new Date(dateStr);
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return {
      day: date.getDate().toString(),
      month: months[date.getMonth()],
      year: date.getFullYear().toString().slice(-2)
    };
  };

  const formatDateForDisplayShort = (dateStr: string) => {
    if (!dateStr) return { day: '___', month: '____________', year: '___' };
    const date = new Date(dateStr);
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return {
      day: date.getDate().toString(),
      month: months[date.getMonth()],
      year: date.getFullYear().toString().slice(-2)
    };
  };

  // Форматированные данные
  const actDateFormatted = formatDateForDisplay(data.actDate);
  const removalDateFormatted = formatDateForDisplayShort(data.removalDate);
  const installationDateFormatted = formatDateForDisplayShort(data.installationDate);

  const handlePrint = () => {
    window.print();
  };

  // Режим печати - возвращаем только печатную форму
  if (mode === 'print') {
    return (
      <div className="acts-print-wrapper">
        <div className="acts-print-actions act-no-print">
          <button className="acts-btn acts-btn-primary" onClick={handlePrint}>
            Печать PDF
          </button>
          <button className="acts-btn acts-btn-secondary" onClick={onClose}>
            Вернуться к редактированию
          </button>
        </div>

        <div className="acts-print-scrollable">
          <div className="acts-print-content">
            {/* Заголовок с логотипом */}
            <div className="acts-document-header">
              <div className="acts-logo-section">
                <div className="acts-logo-circle">
                  <div className="acts-logo-text">
                    АО<br />«Сахатранснефтегаз»
                  </div>
                </div>
                <div>
                  <div className="acts-organization-name">
                    Акционерное общество<br />
                    «Сахатранснефтегаз»
                  </div>
                  <div className="acts-department">
                    <strong>Структурное подразделение</strong><br />
                    <strong>Управление газораспределительных сетей</strong>
                  </div>
                </div>
              </div>
              <div className="acts-contact-info">
                677005 Республика Саха (Якутия) г. Якутск, ул. П. Алексеева д. 64,<br />
                тел/факс 46-00-07<br />
                Время работы: <strong>будни</strong> с 8:00 до 17:00, обед с 12:00 до 13:00;<br />
                <strong>суббота, воскресенье — выходной</strong>
              </div>
            </div>

            {/* Заголовок акта */}
            <div className="acts-document-title">
              <h1>АКТ ЗАМЕНЫ АККУМУЛЯТОРНОЙ БАТАРЕИ</h1>
              <h2>ГАЗОВОГО СЧЕТЧИКА</h2>
            </div>

            <div className="act-date-line">
              г. Якутск «{actDateFormatted.day}» {actDateFormatted.month} 20{actDateFormatted.year} г.
            </div>

            {/* Содержание документа */}
            <div className="acts-document-content">
              <PrintRow 
                prefix={'Слесарем СТГО АО УГРС «Сахатранснефтегаз»'} 
                data={data.technicianName || '____________________'} 
              />
              <div className="acts-field-description">должность, ф.и.о.</div>

              <PrintRow 
                prefix={'Владельцем объекта'} 
                data={data.ownerName || '____________________'} 
              />
              <div className="acts-field-description">ф.и.о.</div>

              <PrintRow 
                prefix={'составлен настоящий акт о том, что в'} 
                data={data.objectType || '____________________'} 
              />
              <div className="acts-field-description">(жилом доме, гараже, бане и т.д.)</div>

              <PrintRow 
                prefix={'находящегося по адресу: г. Якутск ул.'} 
                data={(data.objectStreet || '_______________') + ' д. ' + (data.objectHouse || '___') + ' кв. ' + (data.objectApartment || '___')} 
              />

              {/* Снятый счетчик */}
              <div className="acts-equipment-section">
                <div className="acts-section-title">Снят «{removalDateFormatted.day}» {removalDateFormatted.month} 20{removalDateFormatted.year} г:</div>
                <PrintRow 
                  prefix={'Счетчик газа'} 
                  data={(data.removedMeterModel || 'G---______') + ' № ' + (data.removedMeterNumber || '___________') + ' с показаниями ' + (data.removedMeterReading || '______') + ' м³.'} 
                />
                <PrintRow 
                  prefix={'Пломба №'} 
                  data={data.removedSealNumber || '___________'} 
                />
              </div>

              {/* Установленный счетчик */}
              <div className="acts-equipment-section">
                <div className="acts-section-title">Установлен «{installationDateFormatted.day}» {installationDateFormatted.month} 20{installationDateFormatted.year} г:</div>
                <PrintRow 
                  prefix={'Счетчик газа'} 
                  data={(data.installedMeterModel || 'G---______') + ' № ' + (data.installedMeterNumber || '___________') + ' с показаниями ' + (data.installedMeterReading || '______') + ' м³.'} 
                />
                <PrintRow 
                  prefix={'Пломба №'} 
                  data={data.installedSealNumber || '___________'} 
                />
              </div>

              {/* Подписи */}
              <div className="acts-signatures-section">
                <div className="acts-signature-block">
                  <PrintRow prefix={'Слесарь СТГО АО УГРС «Сахатранснефтегаз»'} data={''} />
                  <div className="acts-signature-line">
                    <div className="acts-signature-field">____________________</div>
                    <div className="acts-signature-name">{data.technicianName || ''}</div>
                  </div>
                  <div className="acts-field-description">подпись, ф.и.о.</div>
                </div>

                <div className="acts-signature-block">
                  <PrintRow prefix={'Владелец объекта'} data={''} />
                  <div className="acts-signature-line">
                    <div className="acts-signature-field">____________________</div>
                    <div className="acts-signature-name">{data.ownerName || ''}</div>
                  </div>
                  <div className="acts-field-description">подпись, ф.и.о.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // В других режимах возвращаем null
  return null;
};

export default ActBatteryReplacementPrint;