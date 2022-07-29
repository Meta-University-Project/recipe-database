import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6_FtCCZMcRZ2edNytPrlPtQEH_zT8SqA",
  authDomain: "recipe--finder.firebaseapp.com",
  projectId: "recipe--finder",
  storageBucket: "recipe--finder.appspot.com",
  messagingSenderId: "851668473144",
  appId: "1:851668473144:web:781368dc86ec7505d19dcd",
  measurementId: "G-J19S7T0ECD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;

