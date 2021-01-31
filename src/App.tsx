import React, {useEffect} from 'react';
import './App.css';

import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Divider} from "@material-ui/core";
import {ThemeProvider, createMuiTheme} from "@material-ui/core"
import {useStatusApi} from "./api/api";
import AuthView from "./views/Auth";
import HomeView from "./views/Home";


const drawerWidth = 240;

const customTheme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  palette: {

  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  fileManager: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
  },
}));


function App() {
  const {status, statusLoading, isFetchStatusErr, doFetchStatus} = useStatusApi();
  const classes = useStyles();

  useEffect(() => {
    doFetchStatus()
  }, [])

  return (
    <ThemeProvider theme={customTheme}>
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar elevation={0} position="absolute">
          <Toolbar className={classes.toolbar}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Onedrive Share Index
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer}/>
          <Divider/>
          {
            !statusLoading && !isFetchStatusErr && status
              ? <HomeView/>
              : <AuthView/>
          }
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
