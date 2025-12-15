import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';
import { Lics } from '../components/Lics';
import { useAdd, useRoutes } from '../Store/navigationStore';
import { addOutline, arrowBackOutline } from 'ionicons/icons';
import Invoices from '../components/Invoices';

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

  return (
    <IonPage>
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
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <PageContent />
      </IonContent>
    </IonPage>
  );
};

export default Page;