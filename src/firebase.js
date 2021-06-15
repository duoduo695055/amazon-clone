// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC1xVE8ZV36tKqkJleiT5_07tvhrbwDad0",
  authDomain: "challenge-7f107.firebaseapp.com",
  projectId: "challenge-7f107",
  storageBucket: "challenge-7f107.appspot.com",
  messagingSenderId: "277762583201",
  appId: "1:277762583201:web:497581ccafeffc00b05ee0",
  measurementId: "G-0TS9MJRYQD",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
