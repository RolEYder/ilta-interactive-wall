// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, getDocs, query, collection, where, addDoc } from "firebase/firestore"
import { getDatabase, ref, child, set } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyAqKsoULF8ZzX2vqJEV4gRANumeyuqdQQc",

    authDomain: "ilta-interactive-wall.firebaseapp.com",

    databaseURL: "https://ilta-interactive-wall-default-rtdb.firebaseio.com",

    projectId: "ilta-interactive-wall",

    storageBucket: "ilta-interactive-wall.appspot.com",

    messagingSenderId: "351875502945",

    appId: "1:351875502945:web:567a64a043cf37f353ab20",

    measurementId: "G-G1MNG0GNH6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
export { app, auth, db, createUserWithEmailAndPassword, addDoc, collection, database, ref, set }