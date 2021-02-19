import { useCallback, useState } from "react";
import axios from "axios";

import { itemProp } from "../components/filemanager/ItemsList";

// todo: add passwd verification for security

declare interface SetConfData {
  client_id: string
  client_secret: string
  redirect_url: string
  path: string
}

const api = {
  fetchStatus: () => {
    return axios.get("/api/auth/stat");
  },
  setConf: (data: SetConfData) => {
    return axios.put("/api/auth/conf", data);
  },
  getAuthUrl: () => {
    return axios.get("/api/auth/url", {
      params: {
        path: window.location.href,
      },
    });
  },
  fetchDrive: (id?: string) => {
    return axios.get(id ? `/api/drive/${id}` : "/api/drive");
  },
};

const useStatusApi = () => {
  const [status, setStatus] = useState<boolean>(false);
  const [statusLoading, setStatusLoading] = useState<boolean>(true);
  const [isFetchStatusErr, setIsFetchStatusErr] = useState<boolean>(false);

  const doFetchStatus = useCallback(() => {
    setStatusLoading(true);
    api
      .fetchStatus()
      .then((resp) => {
        console.log(resp);
        setStatus(
          resp &&
            resp.data &&
            resp.data["message"] &&
            resp.data["message"] === "ok"
        );
      })
      .catch((err) => {
        console.log(`fetch login status error: ${err}`);
        setIsFetchStatusErr(true);
      })
      .finally(() => {
        setStatusLoading(false);
      });
  }, []);

  return { status, statusLoading, isFetchStatusErr, doFetchStatus };
};

const useDriveListApi = () => {
  const [items, setItems] = useState<itemProp[]>([]);
  const [driveLoading, setDriveLoading] = useState<boolean>(false);
  const [isFetchDriveErr, setIsFetchRootErr] = useState<boolean>(false);

  const doFetchDrive = useCallback((id?: string) => {
    setDriveLoading(true);
    api
      .fetchDrive(id && id)
      .then((resp) => {
        console.log(resp.data);
        setItems(resp.data.data["value"]);
      })
      .catch((error) => {
        console.log(error);
        setIsFetchRootErr(true);
      })
      .finally(() => {
        setDriveLoading(false);
      });
  }, []);

  return { items, driveLoading, isFetchDriveErr, doFetchDrive };
};

const useSetConfApi = () => {
  const [confLoading, setConfLoading] = useState<boolean>(false);
  const [isSetConfErr, setIsSetConfErr] = useState<boolean>(false);

  const doSetConf = useCallback((data: SetConfData, redirect?: (url: string) => void) => {
    setConfLoading(true);
    api
      .setConf(data)
      .then((resp) => {
        console.log(resp);
        redirect && redirect(resp.data.data)
      })
      .catch((err) => {
        console.log(`set config error: ${err}`);
        setIsSetConfErr(true);
      })
      .finally(() => {
        setConfLoading(false);
      });
  }, []);

  return { confLoading, isSetConfErr, doSetConf };
};

export default api;
export { useStatusApi, useDriveListApi, useSetConfApi };
