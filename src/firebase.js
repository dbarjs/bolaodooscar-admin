import firebaseConfig from "./firebaseConfig";
import firebase from "firebase/app";
import "firebase/firestore";

export default firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore();
export const categoriesRef = database.collection("categories");
export const moviesRef = database.collection("movies");