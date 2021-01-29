import React, {useEffect, useState} from "react";
import axios from "axios";
import ItemsList from "../components/filemanager/ItemsList";
import {itemProp} from "../components/filemanager/ItemsList"

export default function HomeView() {
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

  const updateItemsByID = (id: string) => {
    axios.get("/api/drive", {
        params: {id}
      })
      .then(resp => {
        console.log(resp.data)
        setItems(resp.data['value'])
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <ItemsList content={items} updateHandler={updateItemsByID}/>
    </div>
  )
}