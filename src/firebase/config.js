
import { initializeApp } from "firebase/app";
//import the following services
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


//Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAPMGo-qwJPJ-ykAxKNMw9KHVTQnThvMKo",
  authDomain: "eshop-build-94f64.firebaseapp.com",
  projectId: "eshop-build-94f64",
  storageBucket: "eshop-build-94f64.appspot.com",
  messagingSenderId: "588671815031",
  appId: "1:588671815031:web:c752e5528253b7a6326572",
  measurementId: "G-DVE48477Y3"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
//console.log(app)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

//We will be using the following firebase services for this project: authentication, firestore database, and storage

