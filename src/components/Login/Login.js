import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/Buttonbase";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase";
import background from "../../assets/background.jpg";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw"
  },
  backgroundImage: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `url(${background})`
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    width: "50%"
  },
  item: {
    padding: 12
  }
});

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.log(error);
      });
  };

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      props.history.push("/tournaments");
    }
  });

  const classes = useStyles(props);
  return (
    <div className={classes.backgroundImage}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography className={classes.item}>Smash Brocator</Typography>
          <TextField
            type={email}
            className={classes.item}
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
            className={classes.item}
            onClick={() => emailLogin(email, password)}
          >
            login
          </Button>

          <Link to="/register" style={{ textDecoration: "none" }}>
            <ButtonBase className={classes.item}>
              <Typography>Not registered? Sign up here!</Typography>
            </ButtonBase>
          </Link>
        </Paper>
      </div>
    </div>
  );
};

export default Login;
