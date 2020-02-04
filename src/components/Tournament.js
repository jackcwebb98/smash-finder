import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";

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
    alignItems: "center",
    paddingLeft: 10
  }
});

function Tournament(props) {
  const { name, images } = props.tournament;
  const link = "https://smash.gg" + props.tournament.url;

  const image = images[0];

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
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  ) : (
    <Card className={classes.card}>
      <CardActionArea onClick={openTab}>
        <CardContent className={classes.content}>
          <Typography>{name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Tournament;
