import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  layer: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
  },
  icon: {
    fontSize: "75px",
  },
  text: {
    width: "100%",
    opacity: "0.75",
  },
}));

export default function EmptyFolder() {
  const classes = useStyles();
  return (
    <div className={classes.layer}>
      <div className={classes.text}>
        <Typography>This is an empty folder</Typography>
      </div>
    </div>
  );
}
