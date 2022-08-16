// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArkg_uNzzu5o7Zlr6U9WPbhWwgyE0VZRA",
  authDomain: "instagram-clone-a7c8e.firebaseapp.com",
  projectId: "instagram-clone-a7c8e",
  storageBucket: "instagram-clone-a7c8e.appspot.com",
  messagingSenderId: "76850175667",
  appId: "1:76850175667:web:26134f3abda1f68eeedac6",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
