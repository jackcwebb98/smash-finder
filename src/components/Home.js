import React from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import { withProvider } from "../context/AppContext";
import UserStore from "../context/UserStore";

function Home() {
  const { currentUser, user } = UserStore();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentUser(user);
    } else {
      currentUser(false);
    }
  });

  return user ? <Redirect to="/tournaments" /> : <Redirect to="/login" />;
}

export default withProvider(Home);
