// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXJco_X_QSTsur1o-XWKyYM28VgQUi5Pc",
  authDomain: "astro-auth-85f30.firebaseapp.com",
  projectId: "astro-auth-85f30",
  storageBucket: "astro-auth-85f30.firebasestorage.app",
  messagingSenderId: "610470862410",
  appId: "1:610470862410:web:d950c8f071032f54c2d0b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth.languageCode = "es";

export const firebase = {
  app,
  auth,
};
