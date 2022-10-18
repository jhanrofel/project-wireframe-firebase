import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAS6ynB65kqJxkMmYOjZCF13pBIZa5en5A",
  authDomain: "project-wireframe-e2497.firebaseapp.com",
  projectId: "project-wireframe-e2497",
  storageBucket: "project-wireframe-e2497.appspot.com",
  messagingSenderId: "467248734465",
  appId: "1:467248734465:web:25ce250524222c6b09bb00",
  measurementId: "G-RFES20PLWG",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
