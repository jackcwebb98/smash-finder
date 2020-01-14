import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
const useStyles = makeStyles({});

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
    <div>
      <Typography>REGISTER</Typography>
      <TextField
        type={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={"Email"}
        variant="outlined"
      />
      <TextField
        onChange={e => setPassword(e.target.value)}
        placeholder={"Password"}
        variant="outlined"
        type="password"
      />
      <Button onClick={() => createUser(email, password)}>Register</Button>
    </div>
  );
};

export default Register;
