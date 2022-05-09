import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore/lite";

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
const auth = getAuth(firebaseApp);
console.log("firebaseAuth", auth);

const firebaseDb = getFirestore(firebaseApp);
console.log(firebaseDb);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log("firebaseConnection.onAuthStateChanged().user", user);
  } else {
    // User is signed out
    user = null;
  }
});

export default function firebase() {
  return { auth };
}
