import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore/lite";

import useAuthUser from "src/composables/UseAuthUser";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsW4lYMIAFMRGn-vFyOpPyPqi-b1KBLgw",
  authDomain: "quasar-email-example.firebaseapp.com",
  projectId: "quasar-email-example",
  storageBucket: "quasar-email-example.appspot.com",
  messagingSenderId: "486024966262",
  appId: "1:486024966262:web:732875c68f8683c3bc2f57",
};

const firebaseApp = initializeApp(firebaseConfig);
//console.log("firebaseApp", firebaseApp);

// Initialize Firebase Authentication and get a reference to the service
const firebaseAuth = getAuth(firebaseApp);
//console.log("firebaseAuth", firebaseAuth);

const firebaseDb = getFirestore(firebaseApp);
//console.log(firebaseDb);

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
