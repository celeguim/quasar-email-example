export function setUserDetails(state, payload) {
  console.log("UserStore.mutations.setUserDetails", state, payload);
  state.userDetails = payload;
}
