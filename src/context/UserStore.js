import { useStore } from "./AppContext";
import firebase from "firebase";
import firebaseApp from "../services/firebase";

const UserStore = () => {
  const [user, setUser] = useStore();
  const [loadingState, setLoadingState] = useStore();

  const currentUser = (user) => {
    setUser(user)
  };

  return {
    //state
    user,
    //functions
    currentUser
  };
};

export default UserStore;
