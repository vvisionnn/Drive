import React, { useEffect, useState } from "react";
import ItemsList, { itemProp } from "../components/filemanager/ItemsList";
import RouterBar from "../components/filemanager/RouterBar";
import {useDriveListApi} from "../api/api";

export default function HomeView() {
  const [routes, setRoutes] = useState<itemProp[]>([]);

  const { items, driveLoading, isFetchDriveErr, doFetchDrive } = useDriveListApi()

  useEffect(() => {
    doFetchDrive()
  }, [doFetchDrive]);

  const updateItems = (itemInfo: itemProp, callback?: () => any) => {
    doFetchDrive({ id: itemInfo.id })
    callback && callback();
  };

  const addRoute = (itemInfo: itemProp) => {
    updateItems(itemInfo, () => {
      setRoutes([...routes, itemInfo]);
    });
  };

  const removeRoute = (index: number) => {
    updateItems(routes[index], () => {
      setRoutes([...routes.slice(0, index + 1)]);
    });
  };

  return (
    <div>
      <RouterBar routes={routes} updateContent={removeRoute} />
      {
        isFetchDriveErr
          ? <div>error</div>
          : driveLoading
            ? <div>loading</div>
            : <ItemsList content={items} updateHandler={addRoute} />
      }
    </div>
  );
}
