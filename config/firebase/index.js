// Import the functions you need from the SDKs you need
// import firebase from 'firebase';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// import "firebase/storage";
// import "firebase/firestore";
// import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyCeU8bFMDGiTQDhiWgQMWjph_AeqyHW0o4",
  authDomain: "the-urbarn-car-wash.firebaseapp.com",
  projectId: "the-urbarn-car-wash",
  storageBucket: "the-urbarn-car-wash.appspot.com",
  messagingSenderId: "724207947135",
  appId: "1:724207947135:web:c1d7a931fd66c8be155e4a"
};


// Initialize Firebase

// firebase.initializeApp({});
let app = initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage(app);
const auth = getAuth(app);
export { storage, db, auth };
