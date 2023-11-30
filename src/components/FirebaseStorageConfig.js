// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCe4wBSCHctgLIu5tjzcDRowmDVEEc2zP4",
    authDomain: "moviesubtitlewebsite.firebaseapp.com",
    projectId: "moviesubtitlewebsite",
    storageBucket: "moviesubtitlewebsite.appspot.com",
    messagingSenderId: "970566829638",
    appId: "1:970566829638:web:90670a99e32d64043f2c47",
    measurementId: "G-BVG49T927J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DBStorage = getStorage(app)
//const analytics = getAnalytics(app);