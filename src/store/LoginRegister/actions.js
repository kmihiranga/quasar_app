import Vue from "vue";
import { firebaseAuth, firebaseDB } from "../../boot/firebase.js";

export const registerUser = ({ commit }, payload) => {
  firebaseAuth
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then((res) => {
      let userId = firebaseAuth.currentUser.uid;
      firebaseDB.ref("users/" + userId).set({
        name: payload.name,
        email: payload.email,
        profile_pic: payload.profile_pic,
        online: true,
        type: "user"
      });
      commit("REGISTER_USER", payload);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const loginUser = ({ commit }, payload) => {
  firebaseAuth
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then((res) => {
      console.log(res);
      commit("LOGIN_USER", {
        name: payload.name,
        email: payload.email
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const userLogOut = ({ commit }) => {
  firebaseAuth.signOut();
  commit("USER_DETAILS", {});
};

export const handleAuthStateChanged = ({ commit }, payload) => {
  firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      // user is logged in
      let userId = firebaseAuth.currentUser.uid;
      firebaseDB.ref("users/" + userId).once("value", (snapshot) => {
        let userDetails = snapshot.val();
        commit("USER_DETAILS", {
          name: userDetails.name,
          email: userDetails.email,
          online: userDetails.online,
          type: userDetails.type,
          userId: userId
        });
      });
      Vue.router.push("");
    } else {
      // user is logged out
      commit("USER_DETAILS", {});
      Vue.router.replace('chat');
    }
  });
};
