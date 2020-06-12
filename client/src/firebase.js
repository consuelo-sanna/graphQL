import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-gql.firebaseapp.com",
  // databaseURL: "https://mern-gql.firebaseio.com",
  projectId: "mern-gql",
  storageBucket: "mern-gql.appspot.com",
  // messagingSenderId: "729180290036",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
