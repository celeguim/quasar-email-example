import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    userDetails: {},
  }),

  getters: {
    getUserName(state) {
      return state.userDetails.name;
    },

    getUserId(state) {
      return state.userDetails.userid;
    },
  },

  mutations: {
    setUserDetails(state, payload) {
      state.userDetails = payload;
    },
  },

  actions: {
    async loadUser({ state, commit }, id) {
      if (state.userId !== null) throw new Error("Already logged in");
      const res = await api.user.load(id);
      commit("updateUser", res);
    },

    handleAuthStateChanged({ commit, dispatch, state }) {
      const firebase = useFirebase();
      const firebaseAuth = firebase.firebaseAuth;
      const firebaseDb = firebase.firebaseDb;

      console.log("onAuthStateChanged().state", state);

      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          if (doc) {
            //console.log("actions.onAuthStateChanged().getUserName", getUserName());

            const docRef = doc(firebaseDb, "users", user.uid);

            // getDoc(docRef).then((doc) => {
            //   console.log("actions.onAuthStateChanged().getDoc", doc.id);
            //   commit(setUserDetails, {
            //     name: doc.id,
            //     email: doc.id,
            //     id: doc.id,
            //   });
            //   //dispatch("firebaseUpdateUser", { userid: doc.uid, online: true });
            // });

            console.log("actions.onAuthStateChanged().BeforeGetDoc");

            getDoc(docRef).then((doc) => {
              if (doc.exists) {
                console.log("actions.onAuthStateChanged().docSnap", doc);

                const userDetails = doc.data();
                userDetails.userid = user.uid;
                console.log(
                  "actions.onAuthStateChanged().userDetails",
                  userDetails
                );

                commit("setUserDetails", userDetails);

                // commit("setUserDetails", {
                //   //name: doc.data().name,
                //   name: "PleaseUpdate",
                //   email: user.email,
                //   userid: user.uid,
                // });
                // dispatch("firebaseUpdateUser", { userid: user.uid, online: true });
                dispatch("firebaseUpdateUser", {
                  userid: userDetails.userid,
                  name: userDetails.name,
                  online: true,
                });
              } else {
                console.log(
                  "actions.onAuthStateChanged().userDetails",
                  userDetails
                );
                commit("setUserDetails", {});
              }
            });

            console.log("actions.onAuthStateChanged().AfterGetDoc");
          }
        } else {
          console.log("actions.onAuthStateChanged().state", state);

          if (state.userDetails) {
            dispatch("firebaseUpdateUser", {
              userid: state.userDetails.userid,
              online: false,
            });

            commit("setUserDetails", {
              userid: state.userDetails.userid,
              online: false,
            });
          }
        }
      });
    },
    firebaseUpdateUser({}, payload) {
      if (payload.userid) {
        console.log("actions.firebaseUpdateUser()", payload);
        const firebase = useFirebase();
        const firebaseDb = firebase.firebaseDb;
        updateDoc(doc(firebaseDb, "users/" + payload.userid), {
          online: payload.online,
          //name: payload.name,
        });
      }
    },
  },
});
