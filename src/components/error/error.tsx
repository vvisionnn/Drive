import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

declare interface ErrorPageProps {
  text: string
}

const useStyles = makeStyles(theme => ({
  layer: {
    display: "flex",
    width: "100%",
    height: "calc(100% - 64px)",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      height: "calc(100% - 56px)",
    },
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: "30px",
    display: "inline-block",
    paddingRight: "12px",
  }
}))

export default function Error(props: ErrorPageProps) {
  const classes = useStyles();
  return <div className={classes.layer}>
    <Typography className={classes.text}>
      {props.text}
    </Typography>
  </div>
}