import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import getTournaments from "../request";
import Tournament from "./Tournament";
import { makeStyles } from "@material-ui/core/styles";
import { withProvider } from "../context/AppContext";
import UserStore from "../context/UserStore";
import firebase from "firebase";

const useStyles = makeStyles({
  root: {
    width: "100vw"
  },
  grid: {
    padding: 50
  }
});

function Geolocator(props) {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [tourneys, setTourneys] = useState([]);
  const { user, currentUser } = UserStore();

  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      currentUser([]);
      props.history.push("/login");
    }
  });

  useEffect(() => {
    geoLocate();
  }, []);

  const doTheThing = (lat, long) => {
    const latitude = String(lat);
    const longitude = String(long);
    let variables = {
      coordinates: latitude + ", " + longitude,
      radius: "50mi",
      videogameId: 1386
    };
    getTournaments(variables).then(res => setTourneys(res.tournaments.nodes));
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("successful");
      })
      .catch(function() {
        console.log("there was an issue");
      });
  };

  const success = pos => {
    let crd = pos.coords;
    setLat(crd.latitude);
    setLong(crd.longitude);
    setLoadingState(true);
  };

  const error = err => {
    console.log(err);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 100000,
    maximumAge: 0
  };

  const geoLocate = async () => {
    await navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const mappedTourneys = tourneys.map(tourney => {
    return (
      <Grid key={tourney.id} item xs={12} sm={4} md={3}>
        <Tournament tournament={tourney} />
      </Grid>
    );
  });

  const classes = useStyles(props);
  return loadingState === false ? (
    <>
      <Box>
        <Typography>Loading...</Typography>
      </Box>
    </>
  ) : (
    <>
      <Box className={classes.root}>
        <Button onClick={() => doTheThing(lat, long)}>Show Tournaments</Button>
        <Button onClick={logout}>Logout</Button>
        <Grid container spacing={2} justify="center" className={classes.grid}>
          {mappedTourneys}
        </Grid>
      </Box>
    </>
  );
}

export default withProvider(Geolocator);
