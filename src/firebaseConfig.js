import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDoAryQTDbjf5xark8QFl5L1kZMWH_WHfo",
    authDomain: "good-studies.firebaseapp.com",
    projectId: "good-studies",
    storageBucket: "good-studies.firebasestorage.app",
    messagingSenderId: "1025730556275",
    appId: "1:1025730556275:web:fb0b2c6d3b0ead15789506",
    measurementId: "G-CJC3TFFHPP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
