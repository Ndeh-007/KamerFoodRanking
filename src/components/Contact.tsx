import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { informationCircle } from "ionicons/icons";

const ContactForm: React.FC = () => {
  const emailInput = useRef<HTMLIonInputElement>(null);
  const nameInput = useRef<HTMLIonInputElement>(null);
  const subjectInput = useRef<HTMLIonInputElement>(null);
  const messageInput = useRef<HTMLIonTextareaElement>(null);
  const [showToastUploadSuccessful, setShowToastUploadSuccessful] =
    useState(false);
  const [showToastUploadFailed, setShowToastUploadFailed] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  let data = {
    name: nameInput.current?.value,
    email: emailInput.current?.value,
    subject: subjectInput.current?.value,
    message: messageInput.current?.value,
  };
 

  function sendEmail() {
    emailjs
      .send("service_r9s420l", "template_sxd609l", data, "user_c53fw8KxQvmVLFDZHvn0U")
      .then(
        (result) => {
          setShowToastUploadSuccessful(true);
          nameInput.current?.setAttribute('value','');
          emailInput.current?.setAttribute('value','');
          subjectInput.current?.setAttribute('value','');
          messageInput.current?.setAttribute('value','');
        },
        (error) => {
          setShowToastUploadFailed(true)
        }
      );
  }

  return (
    <form className="contact-form ion-padding-vertical" onSubmit={(e)=>{
      e.preventDefault();
      sendEmail();
    }}>
      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeLg="3" sizeMd="12"></IonCol>
          <IonCol size="12" sizeLg="6" sizeMd="12">
            <IonText>
              <h1>Contact</h1>
            </IonText>
            <IonText>
              <p>Direct all your queries about kFR to us.</p>
            </IonText>
            <br />
            <div className="ion-no-padding">
              <IonRow>
                <IonCol size="12">
                  <IonItem lines="full">
                    <IonLabel position="stacked">Name</IonLabel>
                    <IonInput
                    required
                      className="form-input"
                      placeholder="Enter your name"
                      type="text"
                      name="user_name"
                      ref={nameInput}
                    ></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size="12" sizeLg="6">
                  <IonItem lines="full">
                    <IonLabel position="stacked">Email</IonLabel>
                    <IonInput
                    required
                      className="form-input"
                      placeholder="Your email address"
                      type="email"
                      name="user_email"
                      ref={emailInput}
                    ></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size="12" sizeLg="6">
                  <IonItem lines="full">
                    <IonLabel position="stacked">Subject</IonLabel>
                    <IonInput
                    required
                      className="form-input"
                      placeholder="Subject of Message"
                      name="subject"
                      ref={subjectInput}
                    ></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size="12">
                  <IonItem lines="full">
                    <IonLabel position="stacked">Message</IonLabel>
                    <IonTextarea
                    required
                      placeholder="Compose message"
                      name="message"
                      ref={messageInput}
                    ></IonTextarea>
                  </IonItem>
                </IonCol>
              </IonRow>
            </div>
          </IonCol>
          <IonCol size="12" sizeLg="3" sizeMd="12"></IonCol>
          <IonCol
            size="12"
            className="ion-align-content-center ion-text-center"
          >
            <IonButton
              type="submit"
              className="ion-text-capitalize" 
            >
              Send Message
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonToast
        isOpen={showToastUploadSuccessful}
        onDidDismiss={() => setShowToastUploadSuccessful(false)}
        message="Process Successful."
        position="bottom"
        icon={informationCircle}
        color="success"
        duration={1000}
      />

      <IonToast
        isOpen={showToastUploadFailed}
        onDidDismiss={() => setShowToastUploadFailed(false)}
        message="Process Failed"
        icon={informationCircle}
        color="danger"
        duration={1000}
        position="bottom"
      />
    </form>
  );
};

export default ContactForm;
