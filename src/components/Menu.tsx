import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList, 
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonTitle,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import { home, homeSharp, statsChart, statsChartOutline } from "ionicons/icons";
import "./Menu.css";
import localImages from "../images/images";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/",
    iosIcon: home,
    mdIcon: homeSharp,
  },
  {
    title: "Rankings",
    url: "/Rankings",
    iosIcon: statsChart,
    mdIcon: statsChartOutline,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="push" side="end">
      <IonContent>
        <IonList id="inbox-list">
          <div className="ion-text-center ion-justify-content-center"> 
            <IonAvatar style={{margin:"0px auto"}} className="ion-margin-vertical">
              <IonImg src={localImages.logo}></IonImg>
            </IonAvatar>
            <IonTitle>KFR</IonTitle>
            <IonNote>Kamer Food Rankings</IonNote>
          </div>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "focused" : ""
                  }
                  routerLink={appPage.url} 
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
