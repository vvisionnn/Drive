import React from "react";
import {itemProp} from "./ItemsList";

declare interface RouterBarProps {
  routes: itemProp[]
  updateContent: (index: number) => any
}

export default function RouterBar(props: RouterBarProps) {
  const {routes, updateContent} = props

  return (
    <div>
      <button>home</button>
      {routes.map((item, index) => {
        return (
          <button
            key={index}
            onClick={() => updateContent(index)}
          >
            {item.name}
          </button>
        )
      })}
    </div>
  )
}