import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDoAryQTDbjf5xark8QFl5L1kZMWH_WHfo",
    authDomain: "good-studies.firebaseapp.com",
    projectId: "good-studies",
    storageBucket: "good-studies.firebasestorage.app",
    messagingSenderId: "1025730556275",
    appId: "1:1025730556275:web:2c4421b0eaae64c5789506",
    measurementId: "G-L9WPV3EXBG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);