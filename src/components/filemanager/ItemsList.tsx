import React from "react";
import {List, ListItem, Typography} from "@material-ui/core";

export declare interface itemProp {
  name: string,
  createdDateTime: Date,
  folder: { childCount: number },
  id: string,
  size: number,
  webUrl: string,
}

declare interface ItemsListProps {
  content: itemProp[]
  updateHandler: (itemInfo: itemProp) => any
}

export default function ItemsList(props: ItemsListProps) {
  const {content, updateHandler} = props
  console.log(content)
  return <>
    <List>
      {content.map((item, index) => (
        <ListItem button key={index}>
          <Typography noWrap onClick={() => updateHandler(item)}>
            {item.name}
          </Typography>
        </ListItem>
      ))}
    </List>
  </>
}