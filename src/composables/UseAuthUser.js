import { ref } from "vue";
import useFirebase from "boot/firebaseConnection";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const user = ref(null);

export default function useAuthUser() {
  const firebase = useFirebase();

  const login = async (email, password) => {
    console.log("useAuthUser().login", email, password);

    const userCredential = await signInWithEmailAndPassword(
      firebase.auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log("useAuthUser().login", user);

    return user;
  };

  const register = async (email, password) => {
    console.log("register", email, password);

    const userCredential = await createUserWithEmailAndPassword(
      firebase.auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log("useAuthUser().login", user);
    return user;
  };

  const onAuthStateChangedXXX = async (user) => {
    console.log("UseAuthUser.onAuthStateChanged:before", user);
    const userCredential = await onAuthStateChanged(firebase.auth, user);
    console.log("UseAuthUser.onAuthStateChanged:after", user);
    return user;
  };

  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await firebase.auth.signIn({ provider });
    if (error) throw error;
    return user;
  };

  const logout = async () => {
    console.log("useAuthUser().logout:before", user.value);
    user.value = await signOut(firebase.auth);
    console.log("useAuthUser().logout:after", user.value);
  };

  const isLoggedIn = () => {
    console.log("isLoggedIn", user.value);
    return user.value != null;
  };

  /**
   * Update user email, password, or meta data
   */
  const update = async (data) => {
    const { user, error } = await firebase.auth.update(data);
    if (error) throw error;
    return user;
  };

  const sendPasswordResetEmail = async (email) => {
    console.log("sendPasswordResetEmail", email);
    const { user, error } = await firebase.auth.api.resetPasswordForEmail(
      email
    );
    if (error) throw error;
    return user;
  };

  const resetPassword = async (accessToken, newPassword) => {
    console.log("resetPassword", accessToken, newPassword);

    const { user, error } = await firebase.auth.api.updateUser(accessToken, {
      password: newPassword,
    });
    if (error) throw error;
    return user;
  };

  //onAuthStateChanged(firebase.auth, user);

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
