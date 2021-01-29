import React from "react";
import {Button, Card, CardContent, makeStyles, Typography} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  layer: {
    height: "100vh",
    display: "grid"
  },
  authCard: {
    margin: "auto"
  },
}))

export default function AuthView() {

  const classes = useStyles();
  const handleAuth = () => {
    console.log("click")

    axios.get('/api/auth/url', {
      params: {
        'path': window.location.href
      }
    }).then(resp => {
      console.log(resp.data)
      window.location.href = resp.data
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className={classes.layer}>
      <Card className={classes.authCard}>
        <CardContent>
          <Typography variant={"body1"}>You need authorize first</Typography>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={handleAuth}
          >
            click to authorize
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}