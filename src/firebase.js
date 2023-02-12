// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQfoo1fO_wVmbcO4oFAg0wPAfV6Br8DAA",
  authDomain: "note-app-e0e52.firebaseapp.com",
  databaseURL: "https://note-app-e0e52-default-rtdb.firebaseio.com",
  projectId: "note-app-e0e52",
  storageBucket: "note-app-e0e52.appspot.com",
  messagingSenderId: "217081467836",
  appId: "1:217081467836:web:aaf6c626cf2783108bd1b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
