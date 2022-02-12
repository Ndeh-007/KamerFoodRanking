import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { star, thumbsUp, thumbsUpOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { DishCardProperties } from "../data/Interface";
import { firestore } from "../firebase/Firebase";
import localImages from "../images/images";

const DishCard: React.FC<{
  data: DishCardProperties;
  id?: string;
  rate: Function;
  LikedArray: Array<string | number>;
}> = (props) => {
  const [ratingInterface, setRatingInterface] = useState(true);
  const [selected, setSelected] = useState("none");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [rated, setRated] = useState(false);

  // function to like card
  function cardLiked() {
    // change icon to liked icon.
    setRated(true);
    // call the rating function
    props.rate(props.data.id, true);
  }

  // function to unlike a card
  function cardDisliked() {
    setRated(false);
    props.rate(props.data.id, false);
  }

  
  return (
    <IonCard mode="md" className="food-card">
      {props.data.image.length < 138 ? (
        <>
          <IonImg src={localImages.noImage}></IonImg>
        </>
      ) : (
        <>
          <IonImg src={props.data.image}></IonImg>
        </>
      )}
      <IonCardHeader>
        <div className="ion-float-end">
          <IonButtons>
            <IonButton size="large" fill="clear">
              <IonLabel slot="start">{props.data.rateCount}</IonLabel>
            </IonButton>
            {rated || props.data.liked ? (
              <IonButton
                fill="clear"
                color="success"
                size="large"
                onClick={() => {
                  cardDisliked();
                }}
              >
                <IonIcon
                  slot="icon-only"
                  color={"success"}
                  icon={thumbsUp}
                ></IonIcon>
              </IonButton>
            ) : (
              <IonButton
                fill="clear"
                size="large"
                color="success"
                onClick={() => {
                  cardLiked();
                }}
              >
                <IonIcon
                  slot="icon-only"
                  color={"success"}
                  icon={thumbsUpOutline}
                ></IonIcon>
              </IonButton>
            )}
          </IonButtons>
        </div>
        <IonCardTitle>{props.data.name}</IonCardTitle>
        <IonCardSubtitle>{props.data.region}</IonCardSubtitle>
        <IonNote>
          Uploaded by <strong>{props.data.uploader}</strong>
        </IonNote>
      </IonCardHeader>
      <IonCardContent>
        <IonText>{props.data.description}</IonText>
        {/* {ratingInterface ? (
          <IonToolbar
            style={{ "--background": "white" }}
            className="ion-padding-top"
          >
            <IonButton
              slot="end"
              mode="md"
              color="success"
              onClick={(e) => {
                setRatingInterface(false);
              }}
            >
              rate
            </IonButton>
          </IonToolbar>
        ) : (
          <>
            <IonToolbar
              style={{ "--background": "white" }}
              className="ion-padding-top"
            >
              <IonButton
                slot="start"
                color="danger"
                fill="clear"
                onClick={() => setRatingInterface(true)}
              >
                cancel
              </IonButton>
            </IonToolbar>
            <IonItem lines="none">
              <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <IonButton
                      fill="clear"
                      type="button"
                      key={index}
                      
                      className={
                        index <= (hover || rating) ? "on" : "off"
                      }
                      onClick={() => {
                        setRating(index); 
                        console.log(rating)
                      }}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      <span className="star">&#9733;</span>
                    </IonButton>
                  );
                })}
              </div>
            </IonItem>
            <IonButton
              slot="end"
              mode="md"
              color="primary"
              size="small"
              className="ion-float-end ion-margin"
              onClick={() => {
                if (!isNaN(rating)) {
                  alert("Select a rating");
                } else {
                  setRatingInterface(true); 
                  props.rate([props.data.id, rating]);
                }
              }}
            >
              Submit
            </IonButton>
          </>
        )} */}
      </IonCardContent>
    </IonCard>
  );
};

// Secondary card design for first item. Has not been used.
const FirstDishCard: React.FC = () => {
  return (
    <IonCard mode="ios">
      <IonRow className="ion-align-items-center">
        <IonCol sizeLg="4" sizeMd="2" sizeSm="12" size="12">
          <IonImg src={localImages.achuSoup}></IonImg>
        </IonCol>
        <IonCol sizeLg="8" sizeMd="10" sizeSm="12" size="12">
          <div>
            <IonCardHeader>
              <div className="ion-float-end">
                <IonText>
                  <h1>
                    4.3 <IonIcon color={"warning"} icon={star}></IonIcon>
                  </h1>
                </IonText>
              </div>
              <IonCardTitle>Achu Soup</IonCardTitle>
              <IonCardSubtitle>North West Region</IonCardSubtitle>
              <IonNote className="ion-padding-top">
                Uploaded by <strong>Awakedom</strong>
              </IonNote>
            </IonCardHeader>
            <IonCardContent>
              <IonText color="dark">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non,
                eius. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Non, eius. Lorem ipsum dolor sit
                amet. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Non, eius. Lorem ipsum dolor sit amet.
              </IonText>
              <IonToolbar
                style={{ "--background": "white" }}
                className="ion-padding-top"
              >
                <IonButton slot="end" mode="md" color="success">
                  rate
                </IonButton>
              </IonToolbar>
            </IonCardContent>
          </div>
        </IonCol>
      </IonRow>
    </IonCard>
  );
};

export { FirstDishCard };
export default DishCard;
