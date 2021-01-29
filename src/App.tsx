import React, {useEffect, useState} from 'react';
import './App.css';

import HomeView from "./views/Home";
import axios from "axios";
import AuthView from "./views/Auth";

function App() {
  const [loginStat, setLoginStat] = useState<boolean>(false)

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
    <div className="App">
      {loginStat
        ? <HomeView />
        : <AuthView />
      }
    </div>
  );
}

export default App;
