// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgTdOEvTDCzwW2wgawjVQuAnmoByf8TZU",
  authDomain: "email-auth-7da9c.firebaseapp.com",
  projectId: "email-auth-7da9c",
  storageBucket: "email-auth-7da9c.appspot.com",
  messagingSenderId: "532637758213",
  appId: "1:532637758213:web:f38738c3e1cc6612b1fd6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;