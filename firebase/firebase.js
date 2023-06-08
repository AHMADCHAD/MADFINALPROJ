// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import EventDetails from "../Screens/Booking/EventDetails";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5u3dEIft0YcwLQYUsnUDa9q8rnfzKOH0",
  authDomain: "madfinalproj1.firebaseapp.com",
  projectId: "madfinalproj1",
  storageBucket: "madfinalproj1.appspot.com",
  messagingSenderId: "507599059979",
  appId: "1:507599059979:web:0ac4b53e55b5fcc9131b0e"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const auth = getAuth(FIREBASE_APP);
export const firestore = getFirestore(FIREBASE_APP);