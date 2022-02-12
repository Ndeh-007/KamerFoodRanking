import { IonAvatar, IonImg, IonText } from "@ionic/react";
import localImages from "../images/images";
import "./ExploreContainer.css";

interface ContainerProps {
  title: string;
  description: string;
  carousel?: boolean;
}

const ExploreContainer: React.FC<ContainerProps> = (props) => {
  return (
    <>
      {props.carousel ? (
        <div className={"explore-container"}>
          <div className="explore-container-content">
            <IonImg src={localImages.logo} className="slide-logo"></IonImg>
            <IonText>
              <h1>{props.title}</h1>
            </IonText>
            <IonText>
              <p>{props.description}</p>
            </IonText>
          </div>
        </div>
      ) : (
        <div className={`sub-hero sh-height ${props.title === "Top Rated" ? " short-hero" : " " }`}>
          <div className="holder">
            <div className="ion-text-center text-white">
              <img src={localImages.logo} alt="" className="" />
              {props.title === "Top Rated" ? (
                <IonText>
                  <h1>
                    <IonText color="success">T</IonText>
                    <IonText color="danger">o</IonText>
                    <IonText color="warning">p</IonText>{" "}
                    <IonText>Rated Dishes</IonText>
                  </h1>
                  <div className="ion-padding-horizontal">
                    <p className="text-light">{props.description}</p>
                  </div>
                </IonText>
              ) : (
                <IonText>
                  <h1>
                    <IonText color="success">Ka</IonText>
                    <IonText color="danger">m</IonText>
                    <IonText color="warning">er</IonText>{" "}
                    <IonText>Food Rankings</IonText>
                  </h1>
                  <div className="ion-padding-horizontal">
                    <p className="text-light">{props.description}</p>
                  </div>
                </IonText>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExploreContainer;
