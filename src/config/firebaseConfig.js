// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
} from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { useContext, createContext, useEffect, useState } from "react";
import 'firebase/storage'
import { getStorage } from "firebase/storage";
export const AuthContext = createContext();

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,

    authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,

    databaseURL: `${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,

    projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID }`,

    storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,

    messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,

    appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,

    measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`,
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