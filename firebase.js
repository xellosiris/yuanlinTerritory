// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzBYViVdxYDqY4az59nxsjLBJZDM5fITU",
  authDomain: "yuanlinterritory.firebaseapp.com",
  projectId: "yuanlinterritory",
  storageBucket: "yuanlinterritory.appspot.com",
  messagingSenderId: "618682200684",
  appId: "1:618682200684:web:d7da2261b72f74aa541e49",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
