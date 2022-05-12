import { ref } from "vue";
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

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { setUserDetails } from "src/store/UserStore/mutations";

const user = ref(null);

export default function useAuthUser() {
  const firebase = useFirebase();

  const login = async (email, password) => {
    //console.log("useAuthUser().login", email, password);

    const userCredential = await signInWithEmailAndPassword(
      firebase.firebaseAuth,
      email,
      password
    );

    const user = userCredential.user;
    //console.log("useAuthUser().login", user);

    return user;
  };

  const register = async (email, password) => {
    //console.log("register", email, password);

    const userCredential = await createUserWithEmailAndPassword(
      firebase.firebaseAuth,
      email,
      password
    );

    const user = userCredential.user;
    //console.log("useAuthUser().register", user);

    // await setDoc(doc(firebase.firebaseDb, "users", user.uid), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA",
    // });

    return user;
  };

  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await firebase.firebaseAuth.signIn({ provider });
    if (error) throw error;
    return user;
  };

  const logout = async () => {
    //console.log("useAuthUser().logout:before", user.value);
    user.value = await signOut(firebase.firebaseAuth);
    //console.log("useAuthUser().logout:after", user.value);
  };

  const isLoggedIn = () => {
    //console.log("isLoggedIn", user.value);
    return user.value != null;
  };

  /**
   * Update user email, password, or meta data
   */
  const update = async (data) => {
    const { user, error } = await firebase.firebaseAuth.update(data);
    if (error) throw error;
    return user;
  };

  const sendPasswordResetEmail = async (email) => {
    console.log("sendPasswordResetEmail", email);
    const { user, error } =
      await firebase.firebaseAuth.api.resetPasswordForEmail(email);
    if (error) throw error;
    return user;
  };

  const resetPassword = async (accessToken, newPassword) => {
    console.log("resetPassword", accessToken, newPassword);

    const { user, error } = await firebase.firebaseAuth.api.updateUser(
      accessToken,
      {
        password: newPassword,
      }
    );
    if (error) throw error;
    return user;
  };

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordResetEmail,
    resetPassword,
  };
}
