// lib/firebase.js
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAB1A6y32LbRucNP0SXHR7V6qsEhIsVz8k",
  authDomain: "dsb-a55e2.firebaseapp.com",
  projectId: "dsb-a55e2",
  storageBucket: "dsb-a55e2.firebasestorage.app",
  messagingSenderId: "803636375872",
  appId: "1:803636375872:web:243466830cc9c96a748aa5",
  measurementId: "G-B8DZR2QSYH"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
