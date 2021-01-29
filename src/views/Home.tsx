import React, {useEffect, useState} from "react";
import axios from "axios";
import ItemsList from "../components/filemanager/ItemsList";
import {itemProp} from "../components/filemanager/ItemsList"
import RouterBar from "../components/filemanager/RouterBar";

export default function HomeView() {
  const [routes, setRoutes] = useState<itemProp[]>([])
  const [items, setItems] = useState<itemProp[]>([])

  useEffect(() => {
    axios.get("/api/drive")
      .then(resp => {
        console.log(resp.data)
        setItems(resp.data['value'])
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const updateItems = (itemInfo:itemProp, callback?: () => any) => {
    axios.get("/api/drive", {
        params: {"id": itemInfo.id}
      })
      .then(resp => {
        console.log(resp.data)
        setItems(resp.data['value'])
        callback && callback()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const addRoute = (itemInfo:itemProp) => {
    updateItems(itemInfo, () => {setRoutes([...routes, itemInfo])})
  }

  const removeRoute = (index: number) => {
    updateItems(routes[index], () => {setRoutes([...routes.slice(0, index+1)])})
  }


  return (
    <div>
      <RouterBar routes={routes} updateContent={removeRoute} />
      <ItemsList content={items} updateHandler={addRoute} />
    </div>
  )
}