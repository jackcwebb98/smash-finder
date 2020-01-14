import { useStore } from "./AppContext";
import firebaseApp from "../services/firebase";

const UserStore = () => {
  const [user, setUser] = useStore();

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
