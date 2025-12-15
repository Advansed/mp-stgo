// Menu.tsx
import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { 
  archiveOutline, 
  archiveSharp, 
  bookmarkOutline, 
  businessOutline, 
  heartOutline, 
  heartSharp, 
  mailOutline, 
  mailSharp, 
  personOutline, 
  homeOutline,
  homeSharp,
  settingsOutline,
  settingsSharp,
  documentTextOutline,
  documentTextSharp,
  peopleOutline,
  peopleSharp
} from 'ionicons/icons';
import './Menu.css';
import { useUser } from '../Store/loginStore';
import { useRoutes } from '../Store/navigationStore';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Главная',
    url: '/invoices',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Лицевые счета',
    url: '/lics',
    iosIcon: documentTextOutline,
    mdIcon: documentTextSharp
  },
  {
    title: 'Сообщения',
    url: '/inbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Проекты',
    url: '/projects',
    iosIcon: businessOutline,
    mdIcon: businessOutline
  },
  {
    title: 'Команда',
    url: '/team',
    iosIcon: peopleOutline,
    mdIcon: peopleSharp
  },
  {
    title: 'Избранное',
    url: '/favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Архив',
    url: '/archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  }
];

const labels = ['Срочные', 'Важные', 'Заметки', 'Работа', 'Встречи', 'Напоминания'];

const Menu: React.FC = () => {
  const location      = useLocation();
  const { user }      = useUser()
  const { setRoute }  = useRoutes()

  return (
    <IonMenu contentId="main" type="overlay" className="corp-menu">
      <IonContent>
        <div className="corp-menu-header">
          <div className="corp-menu-company">
            <IonIcon icon={businessOutline} className="corp-menu-company-icon" />
            <div>
              <h3 className="corp-menu-company-name">САХАТРАНСНЕФТЕГАЗ</h3>
              <p className="corp-menu-company-subtitle">Мобильный сотрудник</p>
            </div>
          </div>
                    
          <IonList className="corp-menu-user-info">
            <IonItem lines="none" className="corp-menu-user-item">
              <IonAvatar slot="start" className="corp-menu-user-avatar">
                <IonIcon icon={personOutline} className="corp-menu-user-avatar-icon" />
              </IonAvatar>
              <IonLabel>
                <h2 className="corp-menu-user-name">{user.fullName}</h2>
                <p className="corp-menu-user-role">{user.role}</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </div>
        
        <IonList className="corp-menu-list">
          <IonListHeader className="corp-menu-list-header">Основное</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem 
                  className={`corp-menu-item ${location.pathname === appPage.url ? 'selected' : ''}`}
                  routerLink={appPage.url} 
                  routerDirection="none" 
                  lines="none" 
                  detail={false}
                  onClick={() => { setRoute({ route: appPage.url, page: 0 }) }}
                >
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList className="corp-menu-list">
          <IonListHeader className="corp-menu-list-header">Метки</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index} className="corp-menu-item">
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonList className="corp-menu-list mt-3">
          <IonMenuToggle autoHide={false}>
            <IonItem 
              className="corp-menu-item"
              routerLink="/settings" 
              routerDirection="none" 
              lines="none" 
              detail={false}
            >
              <IonIcon aria-hidden="true" slot="start" ios={settingsOutline} md={settingsSharp} />
              <IonLabel>Настройки</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;