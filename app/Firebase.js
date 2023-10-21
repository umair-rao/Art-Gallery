// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkVRLIwZ1Ly9I8gd5yv5GlXXRpAzvOh00",
  authDomain: "art-gallery-97653.firebaseapp.com",
  projectId: "art-gallery-97653",
  storageBucket: "art-gallery-97653.appspot.com",
  messagingSenderId: "835677121983",
  appId: "1:835677121983:web:d809fe3369907d1ccc050a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);