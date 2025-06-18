// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB1A6y32LbRucNP0SXHR7V6qsEhIsVz8k",
  authDomain: "dsb-a55e2.firebaseapp.com",
  projectId: "dsb-a55e2",
  storageBucket: "dsb-a55e2.firebasestorage.app",
  messagingSenderId: "803636375872",
  appId: "1:803636375872:web:243466830cc9c96a748aa5",
  measurementId: "G-B8DZR2QSYH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
