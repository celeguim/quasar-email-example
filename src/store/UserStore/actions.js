import { onAuthStateChanged } from "firebase/auth";
import useFirebase from "boot/firebaseConnection";

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";

import { setUserDetails } from "./mutations";
import { getUserName, getUserId } from "./getters";

export function handleAuthStateChanged({ commit, dispatch, state }) {
  const firebase = useFirebase();
  const firebaseAuth = firebase.firebaseAuth;
  const firebaseDb = firebase.firebaseDb;

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      console.log("actions.onAuthStateChanged().state", state.userDetails);
      console.log("actions.onAuthStateChanged().state", getUserName());

      const docRef = doc(firebaseDb, "users", user.uid);
      const docSnap = getDoc(docRef).then(async (doc) => {
        //      console.log("actions.onAuthStateChanged().docSnap", doc);
        if (doc) {
          //console.log("actions.onAuthStateChanged().docSnap.data", doc.data());
          commit("setUserDetails", {
            name: doc.data().name,
            email: user.email,
            userid: user.uid,
          });

          dispatch("firebaseUpdateUser", { userid: user.uid, online: true });
        }
      });
    } else {
      console.log("actions.onAuthStateChanged().state", state);

      dispatch("firebaseUpdateUser", {
        userid: getUserId(),
        online: false,
      });
      // user = null;
      commit("setUserDetails", {});
    }
  });
}

export function firebaseUpdateUser({}, payload) {
  if (payload.userid) {
    console.log("actions.firebaseUpdateUser()", payload);
    const firebase = useFirebase();
    const firebaseDb = firebase.firebaseDb;
    updateDoc(doc(firebaseDb, "users/" + payload.userid), {
      online: payload.online,
    });
  }
}
