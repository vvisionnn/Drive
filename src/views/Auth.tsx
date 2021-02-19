import React, {useState} from "react";
import {
  Button,
  Card,
  CardContent,
  makeStyles, TextField,
  Typography,
} from "@material-ui/core";
import {useSetConfApi} from "../api/api";

const useStyles = makeStyles((theme) => ({
  layer: {
    // height: "100vh",
    display: "grid",
  },
  authCard: {
    margin: "auto",
  },
  row: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

function FormRow(props: {value: string, setValue: React.Dispatch<React.SetStateAction<string>>, label: string }) {
  const classes = useStyles();

  return <div className={classes.row}>
    <TextField required fullWidth value={props.value} onChange={event => props.setValue(event.target.value)} label={props.label} variant={"outlined"} size={"small"} />
  </div>
}

export default function AuthView() {
  const classes = useStyles();
  const [clientId, setClientId] = useState<string>("")
  const [clientSecret, setClientSecret] = useState<string>("")
  const [redirectUrl, setRedirectUrl] = useState<string>("")

  const {confLoading, isSetConfErr, doSetConf } = useSetConfApi()

  const handleAuth = async () => {
    doSetConf({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_url: redirectUrl,
      path: window.location.href,
    }, url => {
      window.location.href=  url
    })
  };

  return (
    <div className={classes.layer}>
      {confLoading && <div>loading</div>}
      {isSetConfErr && <div>set config error</div>}
      <Card className={classes.authCard}>
        <CardContent>
          <Typography variant={"h5"}>You need authorize first</Typography>
          <form>
            <FormRow value={clientId} setValue={setClientId} label={"client id"}/>
            <FormRow value={clientSecret} setValue={setClientSecret} label={"client secret"}/>
            <FormRow value={redirectUrl} setValue={setRedirectUrl} label={"redirect url"}/>
          </form>
          <div className={classes.row}>
            <Button
              fullWidth
              variant={"contained"}
              color={"primary"}
              onClick={handleAuth}
              disabled={clientId === "" || clientSecret === "" || redirectUrl === ""}
            >
              click to authorize
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
