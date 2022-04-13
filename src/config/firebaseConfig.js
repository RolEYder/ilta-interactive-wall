// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    getDocs,
    query,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import { getDatabase, ref, child, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, createContext, useEffect, useState } from "react";
import 'firebase/storage'
import { getStorage } from "firebase/storage";
export const AuthContext = createContext();

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



export const AuthContextProvider = (props) => {
    const [user, setUser] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged(setUser, setError);
        return () => unsubscribe();
    }, []);
    return <AuthContext.Provider value = {
        { user, error }
    } {...props }
    />;
};

export const useAuthState = () => {
    const authUser = useContext(AuthContext);
    return {...authUser, isAuthenticated: authUser.user != null };
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
const database = getDatabase(app);
export {
    storage,
    app,
    auth,
    db,
    createUserWithEmailAndPassword,
    addDoc,
    collection,
    database,
    ref,
    set,
};