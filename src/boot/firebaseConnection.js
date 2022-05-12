import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore/lite";

import useAuthUser from "src/composables/UseAuthUser";

const firebaseConfig = {
  apiKey: "AIzaSyDY7HVOvsFcLkwHhxRG88p69M13rKGNuTI",
  authDomain: "multi-lang-chat-project.firebaseapp.com",
  projectId: "multi-lang-chat-project",
  storageBucket: "multi-lang-chat-project.appspot.com",
  messagingSenderId: "131256732681",
  appId: "1:131256732681:web:21b421c7f0b8dc8c44bcd8",
};

const firebaseApp = initializeApp(firebaseConfig);
console.log("firebaseApp", firebaseApp);

// Initialize Firebase Authentication and get a reference to the service
const firebaseAuth = getAuth(firebaseApp);
//console.log("firebaseAuth", firebaseAuth);

const firebaseDb = getFirestore(firebaseApp);
console.log(firebaseDb);

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log("firebaseConnection.onAuthStateChanged().user", user);
//   } else {
//     user = null;
//   }
// });

export { firebaseDb };

export default function firebase() {
  return { firebaseAuth, firebaseDb };
}
