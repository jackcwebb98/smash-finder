import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import * as moment from "moment";

const useStyles = makeStyles({
  card: {
    display: "flex"
  },
  content: {
    display: "flex",
    height: 80,
    "&:hover": {
      backgroundColor: "#ededed"
    }
  },
  text: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 10
  },
  date: {
    color: "grey"
  },
  name: {
    display: "flex",
    alignItems: "center"
  }
});

function Tournament(props) {
  const { name, images, startAt } = props.tournament;
  const link = "https://smash.gg" + props.tournament.url;

  const image = images[0];
  const date = moment.unix(startAt);

  const openTab = () => {
    window.open(link);
  };

  const classes = useStyles(props);
  return image ? (
    <Card className={classes.card}>
      <CardActionArea onClick={openTab}>
        <CardContent className={classes.content}>
          <CardMedia
            className={classes.media}
            image={image.url}
            style={{ height: 80, width: "40%" }}
          />
          <div className={classes.text}>
            <Typography>{name}</Typography>
            <Typography className={classes.date}>
              {date.format("MMM Do YYYY")}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  ) : (
    <Card className={classes.card}>
      <CardActionArea onClick={openTab}>
        <CardContent className={classes.text}>
          <Typography>{name}</Typography>
          <Typography className={classes.date}>
            {date.format("MMM Do YYYY")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Tournament;
