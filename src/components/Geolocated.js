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
    backgroundColor: "#ededeb",
    height: "100%",
    overflow: 'hidden'
  },
  bar: {
    height: "10vh",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  button: {
    height: "50%"
  },
  grid: {
    padding: 10
  },
  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

function Geolocator(props) {
  const [loadingState, setLoadingState] = useState(false);
  const [tourneys, setTourneys] = useState([]);

  useEffect(() => {
    const load = async () => {
      await geoLocate();
    };
    load();
  }, []);

  const loadTournaments = async (lat, long) => {
    const latitude = String(lat);
    const longitude = String(long);
    let variables = {
      coordinates: latitude + ", " + longitude,
      radius: "25mi",
      videogameId: 1386
    };
    await getTournaments(variables).then(res =>
      setTourneys(res.tournaments.nodes)
    );
  };

  // const logout = () => {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(function() {
  //       console.log("successful");
  //     })
  //     .catch(function() {
  //       console.log("there was an issue");
  //     });
  // };

  const geoLocate = async () => {
    await navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const success = pos => {
    let crd = pos.coords;
    loadTournaments(crd.latitude, crd.longitude);

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

  const mappedTourneys = tourneys.map(tourney => {
    return (
      <Grid key={tourney.id} item xs={12} sm={6} md={3}>
        <Tournament tournament={tourney} />
      </Grid>
    );
  });

  const classes = useStyles(props);
  return loadingState === false ? (
    <>
      <Box className={classes.loading}>
        <Typography>Loading Tournaments Near You...</Typography>
      </Box>
    </>
  ) : (
    <>
      <div className={classes.root}>
        <Grid container spacing={3} justify="center" className={classes.grid}>
          {mappedTourneys}
        </Grid>
      </div>
    </>
  );
}

export default withProvider(Geolocator);
