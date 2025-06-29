// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBbkGrJNF2G2HRsjI8HrT81IuWJJIcNkg",
  authDomain: "bug-tra.firebaseapp.com",
  projectId: "bug-tra",
  storageBucket: "bug-tra.firebasestorage.app",
  messagingSenderId: "690545557850",
  appId: "1:690545557850:web:60c464b0db24c9c3e03363",
  measurementId: "G-900SDNQZFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {app, analytics, auth, db, storage};