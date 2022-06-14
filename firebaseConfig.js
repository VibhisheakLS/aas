// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// ..
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUHz6Buj01bnPObUGAtogjB85Hbk9bGPk",
  authDomain: "oneapp2storedata.firebaseapp.com",
  projectId: "oneapp2storedata",
  storageBucket: "oneapp2storedata.appspot.com",
  messagingSenderId: "686802306422",
  appId: "1:686802306422:web:069bfab6c0390d1d026657",
  measurementId: "G-HGY210H9LL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const database = getFirestore(app);