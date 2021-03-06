import firebaseConfig from "./firebaseConfig";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore();
export const categoriesRef = database.collection("categories");
export const moviesRef = database.collection("movies");
export const usersRef = database.collection("users");
export const votesRef = database.collection("votes");

export const auth = firebase.auth();
export const authProviders = {
  facebook: new firebase.auth.FacebookAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider(),
  twitter: new firebase.auth.TwitterAuthProvider(),
};
