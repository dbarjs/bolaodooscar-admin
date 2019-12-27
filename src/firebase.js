import firebaseConfig from "./firebaseConfig";
import "firebase/auth";
import "firebase/database";
import * as firebase from "firebase/app";

export default firebase.initializeApp(firebaseConfig);
