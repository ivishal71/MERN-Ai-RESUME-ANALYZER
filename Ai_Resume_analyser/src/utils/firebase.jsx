import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaGt-DWE-u1YUGHJgn4HF7B3amCkH1T28",
  authDomain: "mern-ai-dfbc5.firebaseapp.com",
  projectId: "mern-ai-dfbc5",
  storageBucket: "mern-ai-dfbc5.firebasestorage.app",
  messagingSenderId: "717889197398",
  appId: "1:717889197398:web:306dc719214bd9c889f2f7",
  measurementId: "G-806CTYT2TZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
