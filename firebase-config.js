import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBza8hHHP0NKd3jnsQE9MGSi_zDnLq2ZgI",
    databaseURL: "https://moddho-for-pervasive.firebaseio.com",
    authDomain: "moddho-for-pervasive.firebaseapp.com",
    projectId: "moddho-for-pervasive",
    storageBucket: "moddho-for-pervasive.appspot.com",
    messagingSenderId: "566560247468",
    appId: "1:566560247468:web:fd0ebdc18be30e9312d909",
    // measurementId:"G-684VRK99Y1",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence : getReactNativePersistence(AsyncStorage)
}) 
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
