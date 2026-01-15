
export const t_actbr    = `<!DOCTYPE html>
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
</html>`


export const t_actmr    = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>АКТ ЗАМЕНЫ ГАЗОВОГО СЧЕТЧИКА</title>
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
    .counter-block { margin-left: 30px; margin-bottom: 8px; }
    .signature-block { margin-top: 30px; }
    .signature-line { display: inline-block; border-bottom: 1px solid #000; min-width: 250px; padding: 0 5px; margin-top: 20px; }
    .text-center { text-align: center; }
    .act-number { font-size: 12pt; font-weight: bold; text-align: center; margin: 5px 0 10px 0; }
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
  <div class="main-title">АКТ ЗАМЕНЫ ГАЗОВОГО СЧЕТЧИКА</div>

  <div class="date-line">
    г. Якутск <span class="field-value">{{ACT_DATE}}</span> {{ACT_YEAR}} г.
  </div>

  <div class="content">
    <div class="field-block">
      <span>Слесарем СТГО АО УГРС «Сахатранснефтегаз»:</span>
      <span class="field-value">{{TECHNICIAN_NAME}}</span>
    </div>

    <div class="field-block">
      <span>Владельцем объекта:</span>
      <span class="field-value">{{OWNER_NAME}}</span>
    </div>

    <div class="field-block">
      составлен настоящий акт о том, что в
      <span class="field-value">{{OBJECT_TYPE}}</span>
      (жилом доме, гараже, бане и т.д.)
    </div>

    <div class="field-block">
      находящегося по адресу: <strong>г. Якутск ул.</strong>
      <span class="field-value">{{OBJECT_ADDRESS}}</span>
      д. ______ кв. ___
    </div>

    <div class="field-block">
      <strong>Снят</strong>
      <span class="field-value">{{REMOVAL_DATE}}</span>
    </div>

    <div class="counter-block">
      <div class="field-block">
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

    <div class="field-block">
      <strong>Установлен</strong>
      <span class="field-value">{{INSTALLATION_DATE}}</span>
    </div>

    <div class="counter-block">
      <div class="field-block">
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

    <div class="signature-block">
      <div class="field-block">
        <span>Слесарь СТГО АО УГРС «Сахатранснефтегаз»:</span><br>
        <span class="signature-line">{{TECHNICIAN_SIGNATURE}}</span>
      </div>
      <div class="field-block">
        <span>Владелец объекта:</span><br>
        <span class="signature-line">{{OWNER_SIGNATURE}}</span>
      </div>
    </div>
  </div>
</div>
</body>
</html>`


export const t_actsge   = `<!DOCTYPE html>
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


export const t_actplomb = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>АКТ ПЛОМБИРОВАНИЯ ПРИБОРА УЧЕТА ГАЗА</title>
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
    .counter-block { margin-left: 30px; margin-bottom: 8px; }
    .signature-block { margin-top: 30px; }
    .signature-line { display: inline-block; border-bottom: 1px solid #000; min-width: 250px; padding: 0 5px; margin-top: 20px; }
    .text-center { text-align: center; }
    .act-number { font-size: 12pt; font-weight: bold; text-align: center; margin: 5px 0 10px 0; }
    .note-block { margin-top: 10px; }
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
  <div class="main-title">АКТ ПЛОМБИРОВАНИЯ ПРИБОРА УЧЕТА ГАЗА</div>

  <div class="date-line">
    г. Якутск <span class="field-value">{{ACT_DATE}}</span> {{ACT_YEAR}} г.
  </div>

  <div class="content">
    <div class="field-block">
      <span>Дана:</span>
      <span class="field-value">{{OWNER_NAME}}</span>
    </div>

    <div class="field-block">
      <span>По адресу:</span>
      <span class="field-value">{{OBJECT_ADDRESS}}</span>
    </div>

    <div class="field-block">
      <strong>Прибор учета расхода газа опломбирован:</strong>
    </div>

    <div class="counter-block">
      <div class="field-block">
        1. G - <span class="inline-value">{{METER_MODEL}}</span>
        № сч. <span class="inline-value">{{METER_NUMBER}}</span>
        пломба № <span class="inline-value">{{SEAL_NUMBER}}</span>
      </div>
      <div class="note-block">
        <span>Примечание:</span>
        <span class="inline-value" style="min-width: 300px;">{{NOTE}}</span>
      </div>
    </div>

    <div class="signature-block">
      <div class="field-block">
        <span>УГРС АО «Сахатранснефтегаз»</span><br>
        <span class="signature-line">{{TECHNICIAN_SIGNATURE}}</span>
      </div>
      <div class="field-block">
        <span>Акт получил:</span><br>
        <span class="signature-line">{{OWNER_SIGNATURE}}</span>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;


export const t_actsf    = `<!DOCTYPE html>
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


export const t_actmi    = `<!DOCTYPE html>
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