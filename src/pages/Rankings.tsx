import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonProgressBar,
  IonRow,
  IonSearchbar,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { add, arrowBack, close, informationCircle } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import DishCard from "../components/DishCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { DishCardProperties } from "../data/Interface";
import { firestore, storage } from "../firebase/Firebase";
import { checkDevice, setLikedDishes } from "../functions/Functions";
import localImages from "../images/images";
import "../styles/Rankings.css";

export function updateRating(value: any) {
  return value;
}

const Rankings: React.FC = () => {
  const [addDishModal, setAddDishModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(true);
  const [searchArea, setSearchArea] = useState(true);
  const [customImage, setcustomImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const [topRated, setTopRated] = useState<DishCardProperties[]>([]);
  const [runnerUps, setRunnerUps] = useState<DishCardProperties[]>([]);
  const [Dishes, setDishes] = useState<any[]>([]);
  const [dataUri, setDataUri] = useState(localImages.select);
  const [foodImage, setFoodImage] = useState<any>();
  const [fileName, setFileName] = useState<string | undefined>("");
  const [showToastUploadSuccessful, setShowToastUploadSuccessful] =
    useState(false);
  const [showToastUploadFailed, setShowToastUploadFailed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const nameOfDishInput = useRef<HTMLIonInputElement>(null);
  const uploaderOfDishInput = useRef<HTMLIonInputElement>(null);
  const originOfDishInput = useRef<HTMLIonInputElement>(null);
  const descriptionOfDishinput = useRef<HTMLIonTextareaElement>(null);
  const searchbar = useRef<HTMLIonSearchbarElement>(null);
  const USER_ID = localStorage.getItem("deviceId");
  const dishesFromLocalStorage: any = localStorage.getItem("liked");
  const LIKED_DISHES = JSON.parse(dishesFromLocalStorage);

  /**
   * Rates a Dish by adding the number of likes
   * @param {string} id The Id of the dish on firestore
   * @param {boolean} type The nature of the call, either true for add or false for subtract
   */
  function rateDish(id: string, type: boolean) {
    firestore
      .collection("dishes")
      .where("id", "==", id)
      .get()
      .then((items) => {
        items.docs.forEach((doc) => {
          let tempId = doc.id;
          let count: number;
          if (type) {
            count = Number(doc.data().rateCount) + 1;
          } else {
            count = Number(doc.data().rateCount) - 1;
          }

          firestore
            .collection("dishes")
            .doc(tempId)
            .update({
              rateCount: count,
              liked: type,
            })
            .then(() => {
              updateUserLikes(id, type);
              return true;
            })
            .catch((e) => {
              console.error(e);
              setShowToastUploadFailed(true);
              return false;
            });
        });
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  }

  /**
   * Add card to the list of cards liked by the user
   * @param {string} cardID The Id of the dish on firestore
   * @param {string} docID The Id of the liked dish on firestore
   * @param {boolean} state The nature of the call, either true for add or false for subtract
   */
  function updateUserLikes(cardID: string, state: boolean) {
    let docID: string;
    // get data from the store
    firestore
      .collection("raters")
      .where("id", "==", USER_ID)
      .get()
      .then((users) => {
        users.docs.forEach((doc) => {
          let arr: any[] = [];
          arr = doc.data().liked;
          docID = doc.id;
          // if card is liked, add the liked item to the list, else remove the recently liked item

          if (state) {
            arr.push(cardID);
          } else {
            // remove the selected item only.
            let index = arr.indexOf(cardID);
            if (index > -1) arr.splice(index, 1);
          }

          // Update the value of the liked dishes for the chosen user
          firestore
            .collection("raters")
            .doc(docID)
            .update({
              liked: arr,
            })
            .then(() => {
              return true;
            })
            .catch((e) => {
              console.error(e);
              return false;
            });
        });
      })
      .catch((err) => console.error(err));
  }

  // to show the image the user is about to upload.
  // image must be gotten and converted to dataURL
  const fileToDataUri = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event?.target?.result);
      };
      reader.readAsDataURL(file);
    });

  const onChange = (file: File | null) => {
    if (!file) {
      setDataUri("");
      return;
    }
    fileToDataUri(file).then((dataUri: any) => {
      setDataUri(dataUri);
    });
  };

  /*
   * Function to store user Data in the database.
   * The image is first stored in the storage and then the url is set to the firestore for quick retrieval
   */
  function storeData() {
    var storageRef = storage.ref();
    var imageStorageRef = storageRef.child("images/" + fileName);

    imageStorageRef
      .put(foodImage)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          firestore
            .collection("dishes")
            .add({
              name: nameOfDishInput.current?.value,
              image: url,
              origin: originOfDishInput.current?.value,
              uploader: uploaderOfDishInput.current?.value,
              rating: "1",
              description: descriptionOfDishinput.current?.value,
              rateCount: "1",
              totalRating: "1",
              liked: false,
              id: Date.now(),
            })
            .then((res) => {
              setUploading(false);
              setAddDishModal(false);
              setShowToastUploadSuccessful(true);
            })
            .catch((e) => console.error(e));
        });
      })
      .catch((e) => {
        setUploading(false);
        setShowToastUploadFailed(true);
        console.error(e);
      });
  }

  // separate all dishes to the top 3 rated and the rest
  function SeparateDishes(dishes: DishCardProperties[]) {
    // collect the first 3
    let tempTopRated = dishes.splice(0, 3);

    // collect the rest
    let tempRunnerUp = dishes;

    setTopRated(tempTopRated);
    setRunnerUps(tempRunnerUp);
    setDishes([...topRated, ...runnerUps]);
  }

  // On page load, get all foods from the firestore
  function fetchDishes() {
    let temp: any[] = [];
    firestore
      .collection("dishes")
      .orderBy("rateCount", "desc")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          temp.push(doc.data());
        });
        SeparateDishes(temp);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  // To handle the search functionalities
  let handleInput = () => {
    let res: any[] = [];
    Dishes.map((dish, index) => {
      if (dish.name.toLowerCase().includes(searchbar.current?.value)) {
        res.push(
          <IonCol size="12" sizeLg="3" sizeMd="4">
            <DishCard
              data={dish}
              rate={rateDish}
              key={index}
              LikedArray={LIKED_DISHES}
            />
          </IonCol>
        );
      }
    });
    return res;
  };

  searchbar.current?.addEventListener("ionInput", handleInput);

  // listen for live changes from the firestore
  useEffect(() => {
    setLikedDishes();
    checkDevice();
    fetchDishes();
    setLoading(true);
    firestore.collection("dishes").onSnapshot((snapshot) => {
      fetchDishes();
    });
  }, []);

  // set the total dishes to update based on the the separated dishes
  useEffect(() => {
    setDishes([...topRated, ...runnerUps]);
  }, [topRated, runnerUps]);

  return (
    <IonPage>
      <Header></Header>
      {/* <IonRow>
        <IonCol></IonCol>
        <IonCol size="12" sizeLg="6">
          <IonSearchbar
            mode="md"
            color="light"
            ref={searchbar}
            className="searchbar"
            disabled
          ></IonSearchbar>
        </IonCol>
        <IonCol></IonCol>
      </IonRow> */}
      <IonContent className="main-content">
        {/* {searchArea ? (
          <>
            <IonRow>{handleInput()}</IonRow>
          </>
        ) : (
          " "
        )} */}
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeSm="12" sizeLg="4">
              <IonHeader slot="fixed">
                <IonCard>
                  <IonCardContent>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Cum culpa sunt nostrum doloribus velit mollitia tempore
                    suscipit, qui magni molestias incidunt quisquam magnam.
                  </IonCardContent>
                </IonCard>
              </IonHeader>
            </IonCol>
            <IonCol size="12" sizeSm="12" sizeLg="4">
              {loading ? (
                <div className="ion-text-center">
                  <IonSpinner color="success" name="dots"></IonSpinner>
                </div>
              ) : (
                ""
              )}
              {/* top 3 */}
              {topRated.map((dish, index) => {
                return (
                  <DishCard
                    data={dish}
                    rate={rateDish}
                    key={index}
                    LikedArray={LIKED_DISHES}
                  ></DishCard>
                );
              })}
              {runnerUps.map((dish, index) => {
                return (
                  <DishCard
                    data={dish}
                    rate={rateDish}
                    key={index}
                    LikedArray={LIKED_DISHES}
                  ></DishCard>
                );
              })}
            </IonCol>
            <IonCol size="12" sizeSm="12" sizeLg="4"></IonCol>
          </IonRow>
        </IonGrid>
        <IonFab
          horizontal="end"
          vertical="bottom"
          slot="fixed"
          // className="ion-margin"
        >
          <IonFabButton color="success" onClick={() => setAddDishModal(true)}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        {loading ? "" : <Footer></Footer>}
      </IonContent>

      {/* Add Dish Modal */}
      <IonModal
        isOpen={addDishModal}
        onDidDismiss={() => setAddDishModal(false)}
        onDidPresent={() => setModalAlert(true)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButton
              slot="start"
              fill="clear"
              color="primary"
              onClick={() => setAddDishModal(false)}
            >
              <IonIcon color="primary" icon={arrowBack}></IonIcon>
            </IonButton>
            <IonTitle>Add New Dish</IonTitle>
          </IonToolbar>
          {uploading ? (
            <IonProgressBar
              type="indeterminate"
              color="primary"
            ></IonProgressBar>
          ) : (
            " "
          )}
        </IonHeader>
        <IonContent>
          {modalAlert ? (
            <IonCard color="warning" mode="ios">
              <IonCardHeader>
                <IonButton
                  fill="clear"
                  className="ion-float-end"
                  onClick={() => setModalAlert(false)}
                >
                  <IonIcon
                    icon={close}
                    color="dark"
                    className="ion-padding"
                  ></IonIcon>
                </IonButton>
                <IonCardTitle>Note</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                When adding a new dish, please provide data as accurate as
                possible. <strong>Any dish is allowed</strong>. If you have
                tried a combination and you like it, please by all means add it
                so far as it is in the Cameroonian context.
              </IonCardContent>
            </IonCard>
          ) : (
            <div className="ion-text-center ion-padding-vertical">
              <IonTitle color="medium">Enter Dish Details</IonTitle>
            </div>
          )}
          <IonList className="add-dish-list">
            <IonItem lines="full" shape="round">
              <IonLabel position="floating">Name of Dish</IonLabel>
              <IonInput
                type="text"
                placeholder="e.g Ekwang"
                className="ion-padding"
                ref={nameOfDishInput}
              ></IonInput>
            </IonItem>
            <IonItem lines="full">
              <IonLabel position="floating">Origin</IonLabel>
              <IonInput
                type="text"
                placeholder="e.g Bakweri"
                className="ion-padding"
                ref={originOfDishInput}
              ></IonInput>
            </IonItem>
            <IonItem lines="full">
              <IonLabel position="floating">Uploader</IonLabel>
              <IonInput
                type="text"
                placeholder="e.g James"
                className="ion-padding"
                ref={uploaderOfDishInput}
              ></IonInput>
            </IonItem>
            <IonItem lines="full">
              <div className="ion-text-center ">
                <IonImg src={dataUri} alt="Dish Image" />
              </div>
            </IonItem>
            <IonItem
              lines="full"
              button
              onClick={() => fileInput.current?.click()}
            >
              <IonLabel>Select Dish Image</IonLabel>
            </IonItem>
            <IonItem lines="full">
              <IonLabel position="floating">Description</IonLabel>
              <IonTextarea
                ref={descriptionOfDishinput}
                placeholder="e.g This meal ... "
                className="ion-padding"
              ></IonTextarea>
            </IonItem>

            <div className="ion-text-center ion-padding-top">
              <IonButton
                onClick={() => {
                  setUploading(true);
                  storeData();
                }}
              >
                Submit
              </IonButton>
            </div>
          </IonList>
          <div hidden>
            <input
              type="file"
              ref={fileInput}
              onChange={(event) => {
                setcustomImage(true);
                setFoodImage(event.target?.files?.item(0));
                setFileName(event?.target?.files?.item(0)?.name);
                onChange(event?.target?.files?.item(0) || null);
              }}
            />
          </div>
        </IonContent>
      </IonModal>
      <IonToast
        isOpen={showToastUploadSuccessful}
        onDidDismiss={() => setShowToastUploadSuccessful(false)}
        message="Process Successful."
        position="bottom"
        icon={informationCircle}
        color="success"
        duration={1200}
      />

      <IonToast
        isOpen={showToastUploadFailed}
        onDidDismiss={() => setShowToastUploadFailed(false)}
        message="Process Failed"
        icon={informationCircle}
        color="danger"
        duration={1200}
        position="bottom"
      />
    </IonPage>
  );
};

export default Rankings;
