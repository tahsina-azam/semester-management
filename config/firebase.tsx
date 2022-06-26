// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXjgwTD7EkErmJrPlKGvQF-mTVPOPtLSc",
  authDomain: "classademia.firebaseapp.com",
  projectId: "classademia",
  storageBucket: "classademia.appspot.com",
  messagingSenderId: "985394337561",
  appId: "1:985394337561:web:e8b3718c4e41caaf95d788",
  measurementId: "G-0ZNCXHE851"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
