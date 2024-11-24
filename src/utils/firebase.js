// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV8TejHLZBBZN3LpvzflOSMlDIe-F_P7I",
  authDomain: "task-manager-e8597.firebaseapp.com",
  projectId: "task-manager-e8597",
  storageBucket: "task-manager-e8597.firebasestorage.app",
  messagingSenderId: "152561377610",
  appId: "1:152561377610:web:164434fb4b225b171961b3",
  measurementId: "G-JEYGE3DHRV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);