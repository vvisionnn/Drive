import React, { useEffect, useState } from "react";
import ItemsList, { itemProp } from "../components/filemanager/ItemsList";
import RouterBar from "../components/filemanager/RouterBar";
import { useDriveListApi } from "../api/api";
import Loading from "../components/loading/Loading";

export default function HomeView() {
  const [routes, setRoutes] = useState<itemProp[]>([]);

  const {
    items,
    driveLoading,
    isFetchDriveErr,
    doFetchDrive,
  } = useDriveListApi();

  useEffect(() => {
    doFetchDrive();
  }, [doFetchDrive]);

  const updateItems = (itemInfo: itemProp, callback?: () => any) => {
    console.log(itemInfo.id)
    doFetchDrive({ id: itemInfo.id });
    callback && callback();
  };

  const addRoute = (itemInfo: itemProp) => {
    updateItems(itemInfo, () => {
      setRoutes([...routes, itemInfo]);
    });
  };

  const removeRoute = (index: number) => {
    if (index >= 0) {
      updateItems(routes[index], () => {
        setRoutes([...routes.slice(0, index + 1)]);
      })
    } else {
      doFetchDrive()
      setRoutes([])
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <RouterBar routes={routes} updateContent={removeRoute} />
      {isFetchDriveErr ? (
        <div>error</div>
      ) : driveLoading ? (
        <Loading />
      ) : (
        <ItemsList content={items} updateHandler={addRoute} />
      )}
    </div>
  );
}
