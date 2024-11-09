// src/components/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';


// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDltUOxhhr1rn4Q69hT2ITquhlbwBzuv0I",
  authDomain: "todd-719cc.firebaseapp.com",
  projectId: "todd-719cc",
  storageBucket: "todd-719cc.appspot.com",
  messagingSenderId: "780011821761",
  appId: "1:780011821761:web:c5db6279ce82075c8b5240",
  measurementId: "G-MZHTQWTHV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore, Storage, and Auth
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Export the services
export { db, storage, auth };
