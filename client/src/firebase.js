import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB0Gl25c158jw46PTavheFG9MZqGzT8p-A",
  authDomain: "mern-gql.firebaseapp.com",
  // databaseURL: "https://mern-gql.firebaseio.com",
  projectId: "mern-gql",
  storageBucket: "mern-gql.appspot.com",
  // messagingSenderId: "729180290036",
  appId: "1:729180290036:web:0b57d37027d1905d4dd7a1",
  measurementId: "G-E6M1R4YPH0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
