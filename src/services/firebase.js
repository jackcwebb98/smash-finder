import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAZi2pFPwwAAnOG3cBACfMOjF9HW8Hu2gU",
  authDomain: "smashfinder-d6d47.firebaseapp.com",
  databaseURL: "https://smashfinder-d6d47.firebaseio.com",
  projectId: "smashfinder-d6d47",
  storageBucket: "smashfinder-d6d47.appspot.com",
  messagingSenderId: "238643248737",
  appId: "1:238643248737:web:c6a33e4980f1dd5a157420",
  measurementId: "G-K4LZJXY4XS"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config);
const auth = firebase.auth()

export default firebaseApp
