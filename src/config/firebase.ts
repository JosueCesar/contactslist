import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMbZUnd_B97VNIWxnSxEQ5FmbIwHlKjwc",
  authDomain: "agenda-4b949.firebaseapp.com",
  projectId: "agenda-4b949",
  storageBucket: "agenda-4b949.appspot.com",
  messagingSenderId: "162818970067",
  appId: "1:162818970067:web:1525199427663ee50c9f26"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

export default database;