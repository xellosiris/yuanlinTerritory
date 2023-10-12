// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7p0xEsFeKGh2L4NaqGKjMXVwA8HHAiFo",
  authDomain: "jw-map-56ba6.firebaseapp.com",
  projectId: "jw-map-56ba6",
  storageBucket: "jw-map-56ba6.appspot.com",
  messagingSenderId: "460925473351",
  appId: "1:460925473351:web:fd661cb25de90c9da71762",
  measurementId: "G-2YJHZNSKE8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
