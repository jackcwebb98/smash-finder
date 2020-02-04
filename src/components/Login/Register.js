import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import firebase from "firebase";

const useStyles = makeStyles({
  root: {
    display: "flex",
    backgroundColor: "grey"
  },
  moreLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw"
  },
  item: {
    padding: 20,
    width: "75%"
  },
  button: {
    padding: 20,
    "&:hover": {
      backgroundColor: "red"
    }
  }
});

const Register = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async (email, password) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.log(error);
        alert(error);
        return;
      })
      .then(props.history.push("/"));
  };

  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <div className={classes.moreLeft}>
        <Typography>Welcome!</Typography>
        <TextField
          className={classes.item}
          type={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={"Email"}
          variant="outlined"
        />
        <TextField
          className={classes.item}
          onChange={e => setPassword(e.target.value)}
          placeholder={"Password"}
          variant="outlined"
          type="password"
        />
        <Button
          onClick={() => createUser(email, password)}
          className={classes.button}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Register;
