import { collection } from "firebase/firestore";
// import { FirebaseContext } from '../store/FirebaseContext';
// import { useContext } from "react";
import { db } from "../firebase/config";

export const productCollectionRef = collection(db, 'products');
export const userCollectionRef = collection(db, 'users');
 