import {useState, useCallback} from "react";
import axios from "axios";

const api = {
  fetchStatus: () => {
    return axios.get("/api/auth/stat")
  }
}

const useStatusApi = () => {
  const [status, setStatus] = useState<boolean>(false)
  const [statusLoading, setStatusLoading] = useState<boolean>(false)
  const [isFetchStatusErr, setIsFetchStatusErr] = useState<boolean>(false)

  const doFetchStatus = useCallback(() => {
    setStatusLoading(true)
    api.fetchStatus().then(resp => {
      console.log(resp)
      setStatus(resp
        && resp.data
        && resp.data['status']
        && resp.data['status'] === "ok")
    }).catch(err => {
      console.log(`fetch login status error: ${err}`)
      setIsFetchStatusErr(true)
    }).finally(() => {
      setStatusLoading(false)
    })
  },[])

  return {status, statusLoading, isFetchStatusErr, doFetchStatus};
};

export {useStatusApi}