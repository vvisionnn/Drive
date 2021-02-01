import React from "react";
import { itemProp } from "./ItemsList";
import { Button, Divider, Toolbar, Typography } from "@material-ui/core";

declare interface RouterBarProps {
  routes: itemProp[];
  updateContent: (index: number) => any;
}

export default function RouterBar(props: RouterBarProps) {
  const { routes, updateContent } = props;

  return (
    <>
      <Toolbar variant={"dense"}>
        <Button><Typography noWrap>Home</Typography></Button>
        {routes.map((item, index) => {
          return (
            <Button
              key={index}
              onClick={() => updateContent(index)}
              style={{ maxWidth: "150px" }}
            >
              <Typography noWrap>{item.name}</Typography>
            </Button>
          );
        })}
      </Toolbar>
      <Divider />
    </>
  );
}
