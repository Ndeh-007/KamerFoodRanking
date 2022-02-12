import React from "react";
import { firestore } from "../firebase/Firebase";

// not used. Was created to help with redirecting to the rankings page
// once someone has already visited the place before.
export function setRedirect(state: boolean) {
  state
    ? localStorage.setItem("redirect", "true")
    : localStorage.setItem("redirect", "false");
}

// create unique id and store device and db.
export function checkDevice() {
  let id = localStorage.getItem("deviceId");
  let deviceId = "user_" + Date.now().toString();
  if (id === null) {
    localStorage.setItem("deviceId", deviceId);
    storeId(deviceId);
  }
}

function storeId(value: string) {
  firestore
    .collection("raters")
    .add({
      id: value,
      liked:["123456789"]
    })
    .then((res) => {})
    .catch((err) => {
      console.error(err);
    });
}

export function setLikedDishes(){
  firestore.collection("raters").where("id" , "==" , localStorage.getItem("deviceId")).get().then(items=>{
    let liked = items.docs[0].data().liked; 
    localStorage.setItem("liked",JSON.stringify(liked));
  })
}
