import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonProgressBar,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronForward, star, thumbsUp, thumbsUpSharp } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "../components/Carousel";
import ContactForm from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { DishCardProperties } from "../data/Interface";
import { firestore } from "../firebase/Firebase";
import localImages from "../images/images";
import "../styles/Home.css";

const Home: React.FC = () => {
  const About = useRef<HTMLDivElement>(null);
  const Contact = useRef<HTMLDivElement>(null);
  const [selectedSample, setSelectedSample] = useState<DishCardProperties[]>(
    []
  );

  function getDishes() {
    let temp: any[] = [];
    firestore
      .collection("dishes")
      .orderBy("rateCount", "desc")
      .limit(3)
      .get()
      .then((results) => {
        results.forEach((result) => {
          temp.push(result.data());
        });
        console.log(temp);
        setSelectedSample(temp);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    // secondVisit();
    getDishes();
    firestore.collection("dishes").onSnapshot((snapshot) => {
      getDishes();
    });
  }, []);

  function secondVisit() {
    let value = localStorage.getItem("visited");
    let redirect = localStorage.getItem("redirect");
    if ((value === "true") || (redirect === "false") ) {
      localStorage.setItem("redirect","false")
      window.location.pathname = "/Rankings";
    } else {
      localStorage.setItem("visited", "true");
    }
  }
  return (
    <IonPage>
      <IonContent>
        <Header></Header>
        <Carousel></Carousel>
        <IonGrid className=" ">
          <IonRow className="ion-padding-top ion-margin-top ion-align-items-center">
            <IonCol size="12" sizeLg="2" sizeSm="12" sizeMd="12"></IonCol>
            <IonCol size="12" sizeLg="5" sizeSm="12" sizeMd="12">
              <div className="text-holder" ref={About}>
                <IonText>
                  <h1>About Kamer Food Rankings</h1>
                </IonText>
                <IonText>
                  <p className="ion-padding-vertical">
                    This is an open ranking platform for Cameroon dishes. With
                    the large number of ethnic groups, there exist a large
                    number of traditional dishes of which the people know very
                    little. Contribution of information is free and optional.
                  </p>
                </IonText>

                <IonText color="danger" className="ion-text-bold">
                  Point to Note:
                </IonText>
                <IonText>
                  <p className="ion-padding-start">
                    The information presented here is a computed summary of open
                    source ratings.
                  </p>
                </IonText>
                <br />
                <IonButton className="view-rankings" routerLink="/Rankings">
                  <IonLabel slot="start">View Rankings</IonLabel>{" "}
                  <IonIcon slot="end" icon={chevronForward}></IonIcon>
                </IonButton>
              </div>
            </IonCol>
            <IonCol
              size="12"
              sizeLg="3"
              sizeSm="12"
              sizeMd="12"
              className="ion-hide-lg-down"
            >
              <div className="image-holder">
                <IonImg src={localImages.what}></IonImg>
              </div>
            </IonCol>
            <IonCol size="12" sizeLg="2" sizeSm="12" sizeMd="12"></IonCol>
          </IonRow> 
          {/* <div className="ion-margin-vertical"></div> */}
          <IonRow className="ion-padding-vertical ion-margin-vertical ion-align-items-center">
            <IonCol size="12" sizeLg="2" sizeSm="12" sizeMd="12"></IonCol>
            <IonCol
              size="12"
              sizeLg="3"
              sizeSm="12"
              sizeMd="12"
              className="ion-hide-lg-down"
            >
              <div className="image-holder">
                <IonImg src={localImages.why}></IonImg>
              </div>
            </IonCol>
            <IonCol size="12" sizeLg="5" sizeSm="12" sizeMd="12">
              <div className="text-holder left">
                <IonText>
                  <h1>Why was KFR created?</h1>
                </IonText>
                <IonText>
                  <p className="ion-padding-vertical">
                    {" "}
                    With the large number of ethnic groups, there exist a large
                    number of traditional dishes of which the people know very
                    little. This serves as a means to educate the masses on what
                    Cameroon has to offers
                  </p>

                  <p>
                    KFR comes to put to bed the argument of which meal is
                    better, as the population shall decide and it will be known
                    throughout the realm. KFR is also a project created for fun,
                    to see how far this project will go.
                  </p>
                </IonText>
              </div>
            </IonCol>
            <IonCol size="12" sizeLg="2" sizeSm="12" sizeMd="12"></IonCol>
          </IonRow>
        </IonGrid>
        <div className="sub-hero">
          <div className="sub-hero-content">
            <IonButton
              className="view-rankings"
              color="danger"
              routerLink="/Rankings"
            >
              <IonLabel slot="start">Contribute to Rankings</IonLabel>
              <IonIcon slot="end" icon={chevronForward}></IonIcon>
            </IonButton>
            <br />
            <br />
            <IonText color="light">
              Go through the various dishes and rate them.
            </IonText>
          </div>
        </div>

        <IonTitle className="ion-text-center ion-padding-top ion-margin-top">
          Top Rated
        </IonTitle>
        <IonGrid>
          <IonRow className="ion-padding-vertical ion-margin-vertical ion-align-items-center ion-justify-content-center">
            {/* <IonCol size="12" sizeLg="1" sizeSm="12" sizeMd="0"></IonCol> */}
            {selectedSample.map((dish, index: number) => {
              let colors = ["success", "danger", "warning"];
              return (
                <IonCol size="12" sizeLg="3" sizeSm="12" sizeMd="4" key={index}>
                  <IonCard mode="ios">
                    {dish.image.length < 138 ? (
                      <>
                        <IonImg src={localImages.noImage}></IonImg>
                      </>
                    ) : (
                      <>
                        <IonImg src={dish.image}></IonImg>
                      </>
                    )}
                    <IonCardHeader>
                      <div className="ion-float-end">
                        <IonText>
                          <h1>
                            {dish.rateCount}{" "}
                            <IonIcon color={colors[index]} icon={thumbsUp}></IonIcon>
                          </h1>
                        </IonText>
                      </div>
                      <IonCardTitle>{dish.name}</IonCardTitle>
                      <IonCardSubtitle>{dish.region}</IonCardSubtitle>
                      <IonNote>
                        Uploaded by <strong>{dish.uploader}</strong>
                      </IonNote>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonText>{dish.description}</IonText>
                    </IonCardContent>
                    <IonProgressBar
                      value={1}
                      color={colors[index]}
                    ></IonProgressBar>
                  </IonCard>
                </IonCol>
              );
            })}
            {/* <IonCol size="12" sizeLg="1" sizeSm="12" sizeMd="0"></IonCol> */}
          </IonRow>
        </IonGrid>
        <div ref={Contact}></div>
        <ContactForm></ContactForm>
        <Footer></Footer>
      </IonContent>
    </IonPage>
  );
};
export default Home;
