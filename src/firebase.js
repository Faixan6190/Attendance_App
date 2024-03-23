import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQWhuAh6X_4TGYny37HTdx-p00vIrK5Ms",
  authDomain: "attendance-app-ca17b.firebaseapp.com",
  projectId: "attendance-app-ca17b",
  storageBucket: "attendance-app-ca17b.appspot.com",
  messagingSenderId: "766405620025",
  appId: "1:766405620025:web:2a10b712ac109d2cc538e8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
// const db = getFirestore(app);

export { app, auth, db };
