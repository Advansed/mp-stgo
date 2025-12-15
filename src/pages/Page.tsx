<<<<<<< HEAD
=======
// Page.tsx
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
<<<<<<< HEAD
  IonToolbar 
=======
  IonToolbar,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
} from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';
import { Lics } from '../components/Lics';
import { useAdd, useRoutes } from '../Store/navigationStore';
<<<<<<< HEAD
import { addOutline, arrowBackOutline } from 'ionicons/icons';
import Invoices from '../components/Invoices';
=======
import { addOutline, arrowBackOutline, businessOutline, personOutline, refreshOutline } from 'ionicons/icons';
import Invoices from '../components/Invoices';
import { useUser } from '../Store/loginStore';
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19

const Page: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const { currentRoute, goBack } = useRoutes();
  const { setAdd } = useAdd();

  const PageContent = () => {
    let elem = <></>;
    switch(currentRoute.route) {
      case '/lics':       elem = <Lics page={currentRoute.page} />; break;
      case '/invoices':   elem = <Invoices />; break;
      default: elem = <></>;
    }
    return elem;
  };

  const get_name = (name: string) => {
    switch(name) {
      case 'lics':        return "Лицевые счета";
      case 'invoices':    return "Заявки";
      default: return "";
    }
  };

  const buttons = (name: string) => {
    switch(name) {
      case 'lics':   return (
        <IonIcon 
          icon={addOutline} 
          className="corp-action-icon w-2 h-2"
          onClick={() => { setAdd(true); }}
        />
      );
      default: return <></>;
    }
  };

  const { user }      = useUser()

  const { currentRoute, goBack } = useRoutes()

  const { add, setAdd } = useAdd()

  const PageContent = () => {

    let elem = <></>
      switch(currentRoute.route) {
          case '/lics':       elem = <Lics page = { currentRoute.page }/>;break;
          case '/invoices':   elem = <Invoices />;break;
          default: elem = <></>
      }

      return elem

  }

  const get_name = (name) => {
    switch(name) {
      case 'lics':        return "Лицевые счета"
      case 'invoices':    return "Заявки"
      default: return ""
    }
  }

  const buttons = (name) => {
    switch(name) {
      case 'lics':   return <>
              <IonIcon icon = { addOutline }  className='w-15 h-15'
                onClick = { () => { setAdd( true ) } }
              />
          </>
      case 'invoices':   return <>
              <IonIcon icon={ refreshOutline } className="action-icon back-icon"
                  onClick={() => { setAdd( !add ); }}
              />
          </>
      default: return <></>
    }
  }


  return (
    <IonPage>
<<<<<<< HEAD
      <IonHeader className="corp-page-header">
        <IonToolbar className="corp-page-toolbar">
          <IonButtons slot="start">
            <IonIcon 
              icon={arrowBackOutline} 
              className="corp-action-icon"
              onClick={() => { goBack(); }}
            />
          </IonButtons>
          
          <IonTitle className="corp-page-title">{get_name(name)}</IonTitle>
          
          <IonButtons slot="end">
            {buttons(name)}
            <IonMenuButton className="corp-action-icon" />
          </IonButtons>
=======
      <IonHeader className="page-header">
        <IonToolbar className="page-toolbar">
          <div className="header-content">
              {/* Кнопки действий */}
              <IonButtons className="action-buttons">
                <IonIcon icon={arrowBackOutline} className="action-icon back-icon"
                  onClick={() => { goBack(); }}
                />
              </IonButtons>
            {/* Левая часть - логотип и название компании */}
            <div className="header-left">
              <IonIcon icon={businessOutline} className="company-icon" />
              <div className="company-info">
                <span className="company-name">САХАТРАНСНЕФТЕГАЗ</span>
              </div>
            </div>
              <div className="user-info-compact">
                <IonAvatar className="user-avatar">
                  <IonIcon icon={personOutline} className="avatar-icon" />
                </IonAvatar>
                <div className="user-details">
                  <span className="user-name">{user.fullName}</span>
                </div>
              </div>

            {/* Центральная часть - заголовок страницы */}
            <div className="header-center">
              <IonTitle className="page-title">{get_name(name)}</IonTitle>
            </div>

            {/* Правая часть - пользователь и кнопки */}
            <div className="header-right">
              {/* Информация о пользователе */}
              <IonButtons className="action-buttons">
                {buttons(name)}
              </IonButtons>

            </div>
          </div>
>>>>>>> 690d9ee61ca52a160964de5de5f99ca3ff946f19
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <PageContent />
      </IonContent>
    </IonPage>
  );
};

export default Page;