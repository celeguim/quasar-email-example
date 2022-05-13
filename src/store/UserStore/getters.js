import UserStore from "src/store/UserStore";

export function getUserName(state) {
  if (state && state.userDetails) {
    //console.log("UserStore.getters.getUserName", state.userDetails.name);
    return state.userDetails.name;
  }
  return "please update";
}

export function getUserId(state) {
  //console.log("getters", state);
  //console.log("UserStore.state", UserStore.state.userDetails);
  if (state && state.userDetails) return state.userDetails.userid;
  if (UserStore.state.userDetails) return UserStore.state.userDetails.userid;
  //return "dHrhRoALBbQJYUgInwOueHZD81A2";
}
