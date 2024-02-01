// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARtClAynmoz-KNzogcIsCb8tmbLGyodE0",
  authDomain: "fdr2309-28fc4.firebaseapp.com",
  databaseURL: "https://fdr2309-28fc4-default-rtdb.firebaseio.com",
  projectId: "fdr2309-28fc4",
  storageBucket: "fdr2309-28fc4.appspot.com",
  messagingSenderId: "757044435301",
  appId: "1:757044435301:web:76102dafc3864e9718a98c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig