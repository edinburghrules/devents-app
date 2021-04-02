import * as firebase from "firebase/app";
import * as geofirestore from "geofirestore";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyC6yxjrp-kXWHMbc3X5YORqRqAYJWjV8RM",
  authDomain: "devents-e8874.firebaseapp.com",
  databaseURL: "https://devents-e8874.firebaseio.com",
  projectId: "devents-e8874",
  messagingSenderId: "113735009053",
  appId: "1:113735009053:web:273f3bf40d78014c3b17f4",
  storageBucket: "devents-e8874.appspot.com",
  measurementId: "G-NLL4QV6D4P",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const GeoFirestore = geofirestore.initializeApp(firebase.firestore());

firebase.firestore();
firebase.auth();

export { firebase as default, GeoFirestore };
