import {
  IonButton,
  IonButtons,
  IonFooter,
  IonItem,
  IonText,
} from "@ionic/react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <IonFooter className="footer" collapse="fade">
      <div className="center-footer">
        <IonItem lines="none" color="light">
          <IonButtons className="center-footer">
            <IonButton className="ion-text-capitalize" routerLink="/">Home</IonButton>
            <IonButton className="ion-text-capitalize" routerLink="/Rankings">Rankings</IonButton>
          </IonButtons>
        </IonItem>
      </div>
      <div className="ion-text-center ion-padding-vertical">
          
        <IonText color="medium">
          &copy; {new Date().getFullYear()} Kamer Food Rankings |{" "}
          <strong>Awakedom</strong>
        </IonText>
      </div>
    </IonFooter>
  );
};

export default Footer;
