import {
  IonAvatar,
  IonButton,
  IonCol,
  IonHeader,
  IonImg,
  IonItem,
  IonMenuButton,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { setRedirect } from "../functions/Functions";
import localImages from "../images/images";
import "../styles/Header.css";

const Header: React.FC = () => {
  const rankingsButton = useRef<HTMLIonButtonElement>(null);
  const contactButton = useRef<HTMLIonButtonElement>(null);
  const aboutButton = useRef<HTMLIonButtonElement>(null);
  const homeButton = useRef<HTMLIonButtonElement>(null);

  const [rank, setrank] = useState(false);
  useEffect(checkURL, []);
  function checkURL() {
    if (window.location.pathname !== "/") {
      setrank(true);
    } else {
      setrank(false);
    }
  }
  return (
    <IonHeader className="header">
      <IonToolbar className="p">
        <IonRow>
          <IonCol size="12" sizeSm="12" sizeLg="2"></IonCol>
          <IonCol size="12" sizeSm="12" sizeLg="8">
            <IonItem lines="none" className="ion-float-start" routerLink="/">
              <IonAvatar slot="start" className="avatar">
                <IonImg src={localImages.logo}></IonImg>
              </IonAvatar>
              <IonTitle slot="start" className="ion-hide-md-down">
                <IonText color="success">Ka</IonText>
                <IonText color="danger">m</IonText>
                <IonText color="warning">er</IonText>{" "}
                <IonText color="medium">Food Rankings</IonText>
              </IonTitle>
              <IonTitle slot="start" className="ion-hide-md-up">
                <IonText color="success">K</IonText>
                <IonText color="danger">F</IonText>
                <IonText color="warning">R</IonText>
              </IonTitle>
            </IonItem>
            <div  className="ion-hide-sm-down ion-hide-md-down ion-float-end ion-padding-vertical">
              <IonRow>
                <IonCol
                  className={`ion-no-padding ion-activatable ripple-parent cursor ${
                    rank ? " " : "selected"
                  }`}
                  onClick={() => {
                    setRedirect(true);
                    aboutButton.current?.click();
                  }}
                >
                  <IonButton
                    className="nav-button"
                    fill="clear"
                    expand="full"
                    ref={homeButton}
                    color={rank ? "medium" : ""}
                    // href="/"
                    routerLink="/"
                  >
                    home
                  </IonButton>
                </IonCol>
                <IonCol
                  className={` ion-no-padding ion-activatable ripple-parent cursor ${
                    rank ? "selected" : " "
                  }`}
                  onClick={() => {
                    setRedirect(false);
                    rankingsButton.current?.click();
                  }}
                >
                  <IonButton
                    className="nav-button"
                    fill="clear"
                    expand="full"
                    color={rank ? " " : "medium"}
                    ref={rankingsButton}
                    // href="/Rankings"
                    routerLink="/Rankings"
                    routerDirection="none"
                  >
                    rankings
                  </IonButton>
                </IonCol>
              </IonRow>
            </div>

            <IonMenuButton 
              className="ion-hide-md-up ion-float-end"
            ></IonMenuButton>

            <div hidden>
              <IonButton ref={contactButton} routerLink="/">
                contact
              </IonButton>
              <IonButton ref={aboutButton} routerLink="/">
                about
              </IonButton>
              <IonButton ref={homeButton} href="/">
                home
              </IonButton>
            </div>
          </IonCol>
          <IonCol size="12" sizeSm="12" sizeLg="2"></IonCol>
        </IonRow>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
