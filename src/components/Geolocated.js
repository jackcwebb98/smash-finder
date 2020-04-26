import React, { useState, useEffect, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import getTournaments from "../request";
import Tournament from "./Tournament";
import firebase from "firebase";
import { forEach } from "lodash";
import * as moment from "moment";
import { AppContext } from "../context/AppContext";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ededeb",
    height: "100%",
    overflow: "hidden"
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
  const [upcomingTourneys, setUpcomingTourneys] = useState([]);
  const { open, setOpen } = useContext(AppContext);


  useEffect(() => {
    const load = async () => {
      await geoLocate();
    };
    load();
  }, []);

  const date = moment().unix();

  const loadTournaments = async (lat, long) => {
    let upcoming = [];
    let past = [];
    const latitude = String(lat);
    const longitude = String(long);
    let variables = {
      coordinates: latitude + ", " + longitude,
      radius: "25mi",
      videogameId: 1386
    };

    let tournaments = await getTournaments(variables);

    forEach(tournaments.tournaments.nodes, function(tournament) {
      if (tournament.startAt > date) {
        upcoming.push(tournament);
      } else {
        past.push(tournament);
      }
    });

    setUpcomingTourneys(upcoming);
    setTourneys(past);
  };

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
  const mappedUpcoming = upcomingTourneys.map(tourney => {
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
          <Grid item>
            <Typography>Upcoming Tournaments</Typography>
          </Grid>
          {mappedUpcoming}
        </Grid>
        <Divider variant="middle" />
        <Grid container spacing={3} justify="center" className={classes.grid}>
          <Grid item>
            <Typography>Past Tournaments</Typography>
          </Grid>
          {mappedTourneys}
        </Grid>
      </div>
    </>
  );
}

export default Geolocator;
