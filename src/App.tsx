import React, {useEffect, useMemo} from "react";
import "./App.css";

import {darken, lighten, makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {createMuiTheme, ThemeProvider, useMediaQuery} from "@material-ui/core";
import { useStatusApi } from "./api/api";
import AuthView from "./views/Auth";
import HomeView from "./views/Home";
import Loading from "./components/loading/Loading";
import Error from "./components/error/error";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    textAlign: "center",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  fileManager: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
  },
}));

function App() {
  const {
    status,
    statusLoading,
    isFetchStatusErr,
    doFetchStatus,
  } = useStatusApi();
  const classes = useStyles();

  // Enabling Dark Mode according to system-wide setting
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const customTheme = useMemo(() => createMuiTheme({
      props: {
        MuiButtonBase: {
          disableRipple: true,
        },
      },
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
        primary: {
          light: "#092244",
          main: prefersDarkMode
            ? lighten("#092244", 0.3)
            : "#092244",
          dark: darken("#092244", 0.3),
          // contrastText?: string;
        },
        secondary: {
          main: "#1DE9B6",
        },
      },
    }),
    [prefersDarkMode],
  );

  useEffect(() => {
    doFetchStatus();
  }, [doFetchStatus]);

  return (
    <ThemeProvider theme={customTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar elevation={0} position="absolute">
          <Toolbar className={classes.toolbar}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Onedrive Share Index
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {/*<Divider />*/}
          {isFetchStatusErr ? (
            <Error text={"Fetch Status Error"} />
          ) : statusLoading ? (
            <Loading />
          ) : status ? (
            <HomeView />
          ) : (
            <AuthView />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
