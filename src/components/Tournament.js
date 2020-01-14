import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  media: {
    height: 200
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
        <CardMedia className={classes.media} image={image.url} />
        <CardContent>
          <Typography>{name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ) : (
    <Card className={classes.card}>
      <CardActionArea onClick={openTab}>
        <CardContent>
          <Typography>{name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Tournament;
