import React, {useEffect, useState} from 'react';
import './App.css';

import HomeView from "./views/Home";
import axios from "axios";
import AuthView from "./views/Auth";
import {AppBar, CssBaseline, makeStyles, Toolbar, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  appContainer: {
    width: "80%",
    // marginTop: -20,
    margin: "auto",
    // backgroundColor: "yellow",
    [theme.breakpoints.down('sm')]: {
      width: "90%",
    },
    [theme.breakpoints.up('md')]: {
      width: "60%",
    },
  },
  appbar: {
    // backgroundColor: "green",
    height: "9vh",
  },
  appbarText: {
    lineHeight: "50px",
    [theme.breakpoints.up('xs')]: {
      lineHeight: "40px",
    },
    [theme.breakpoints.up('sm')]: {
      lineHeight: "55px",
    },
  },
  toolbar: {
  },
  Header: {
    minHeight: "50px",
    width: "50%",
    margin: "auto",
    boxShadow: "0px 3px 14px -2px rgba(0, 0, 0, 0.25)",
    borderRadius: "100px",
    textAlign:"center",
    lineHeight:"100px",
    // backgroundColor: "red"
    [theme.breakpoints.up('xs')]: {
      minHeight: "40px",
      width: "50%",
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: "55px",
      width: "50%",
    },
  },
  toolbarSpacer: {
    height: "55px",
    [theme.breakpoints.up('xs')]: {
      height: "45px",
    },
    [theme.breakpoints.up('sm')]: {
      height: "60px",
    },
  },
  content: {},
}))

function App() {
  const [loginStat, setLoginStat] = useState<boolean>(false)
  const classes = useStyles();

  useEffect(() => {
    axios.get("/api/auth/stat").then(resp => {
      setLoginStat(resp
        && resp.data
        && resp.data['status']
        && resp.data['status'] === "ok")
    }).catch(err => {
      console.log(`fetch status error: ${err}`)
    })
  }, [])


  return (
    <>
      <div className={classes.appContainer}>
        <AppBar color={"transparent"} elevation={0} className={classes.appbar}>
          <div className={classes.Header}>
            <Typography className={classes.appbarText}>
              Onedrive List Index
            </Typography>
          </div>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.toolbarSpacer} />
          {loginStat
            ? <HomeView />
            : <AuthView />
          }
        </main>
      </div>
    </>
  );
}

export default App;
