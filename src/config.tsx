
// src/firebase-config.js

import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, collection } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCnTeIx0yTO_u1TnOoGaUwKBUbD7L_OAGs",
    authDomain: "mentalli-7552a.firebaseapp.com",
    projectId: "mentalli-7552a",
    storageBucket: "mentalli-7552a.appspot.com",
    messagingSenderId: "689554959325",
    appId: "1:689554959325:web:96f43157215306f4fda434"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const firestore = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app, 'asia-south1');

// Uncomment the lines below if you're using emulators
// connectFirestoreEmulator(firestore, 'localhost', 8080);
// connectAuthEmulator(auth, 'http://localhost:9099');
// connectFunctionsEmulator(functions, 'localhost', 5001);

export { firestore, auth, functions };
export const messagesRef = collection(firestore, 'messages');