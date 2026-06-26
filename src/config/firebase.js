import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA0mbmLEkTO8Hdc0t6ZzZjsycrjBGjE3Ew",
  authDomain: "mobile-program-4ae69.firebaseapp.com",
  databaseURL: "https://mobile-program-4ae69-default-rtdb.firebaseio.com",
  projectId: "mobile-program-4ae69",
  storageBucket: "mobile-program-4ae69.firebasestorage.app",
  messagingSenderId: "536089823127",
  appId: "1:536089823127:web:4a30390926c718115426d2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;
