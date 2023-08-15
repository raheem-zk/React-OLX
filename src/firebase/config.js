import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCjINcsI0KX5Qgvue_agNnkelSHWxYyszo",
  authDomain: "fir-5e911.firebaseapp.com",
  projectId: "fir-5e911",
  storageBucket: "fir-5e911.appspot.com",
  messagingSenderId: "826213614340",
  appId: "1:826213614340:web:0a2ce8a822fd9d2f5b0651",
  measurementId: "G-E1DRCLPVWZ",
};


const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);
export const storageDB = getStorage(firebaseApp);