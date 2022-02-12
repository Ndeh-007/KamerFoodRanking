import React from "react";
import firebase from "firebase" 

const firebaseConfig = {
    apiKey: "AIzaSyCHL9TCe9G2q_IgXflWAc6xhcKJh4c19yY",
    authDomain: "kamer-food-rankings.firebaseapp.com",
    projectId: "kamer-food-rankings",
    storageBucket: "kamer-food-rankings.appspot.com",
    messagingSenderId: "592881858199",
    appId: "1:592881858199:web:407bbccfaee2216cda9bd2",
    measurementId: "G-5LMHLF7M7H"
  };

const app = firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const storage = firebase.storage();

export {firestore,storage}