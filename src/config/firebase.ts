// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


import {getAuth, GoogleAuthProvider} from "firebase/auth"


import {getFirestore} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5LQJlg54G6yxSSQ50Wnka44cZDnX2nro",
  authDomain: "react-social--media.firebaseapp.com",
  projectId: "react-social--media",
  storageBucket: "react-social--media.appspot.com",
  messagingSenderId: "582812330032",
  appId: "1:582812330032:web:a40479aa120909b78ba5f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)

// auth contains all the user data that will sign in with the google account

export const provider = new GoogleAuthProvider()

export const db = getFirestore(app)