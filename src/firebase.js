import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAQWhuAh6X_4TGYny37HTdx-p00vIrK5Ms",
//   authDomain: "attendance-app-ca17b.firebaseapp.com",
//   projectId: "attendance-app-ca17b",
//   storageBucket: "attendance-app-ca17b.appspot.com",
//   messagingSenderId: "766405620025",
//   appId: "1:766405620025:web:2a10b712ac109d2cc538e8",
// };
const firebaseConfig = {
  apiKey: "AIzaSyAQWhuAh6X_4TGYny37HTdx-p00vIrK5Ms",
  authDomain: "attendance-app-ca17b.firebaseapp.com",
  databaseURL: "https://attendance-app-ca17b-default-rtdb.firebaseio.com",
  projectId: "attendance-app-ca17b",
  storageBucket: "attendance-app-ca17b.appspot.com",
  messagingSenderId: "766405620025",
  appId: "1:766405620025:web:2a10b712ac109d2cc538e8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
const database = getDatabase();

export { app, auth, db, storage };
