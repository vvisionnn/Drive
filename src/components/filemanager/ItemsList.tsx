import React from "react";

export declare interface itemProp {
  name: string,
  createdDateTime: Date,
  folder: {childCount: number},
  id: string,
  size: number,
  webUrl: string,
}

declare interface ItemsListProps {
  content: itemProp[]
  updateHandler: (itemInfo: itemProp) => any
}

export default function ItemsList (props: ItemsListProps) {
  const {content, updateHandler} = props
  console.log(content)
  return <>
    <ul>
      {content.map((item, index) => (
        <li key={index} onClick={() => updateHandler(item)}>
          {item.name}
        </li>
      ))}
    </ul>
  </>
}