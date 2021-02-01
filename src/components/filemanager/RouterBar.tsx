import React from "react";
import { itemProp } from "./ItemsList";
import { Button, Divider, Toolbar, Typography } from "@material-ui/core";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import {makeStyles} from "@material-ui/core/styles";

declare interface RouterBarProps {
  routes: itemProp[];
  updateContent: (index: number) => any;
}

const useStyles = makeStyles(theme => ({
  item: {
    border: `1px solid ${theme.palette.background.default}`,
    "&:hover" : {
      borderColor: theme.palette.primary.main
    }
  }
}))

export default function RouterBar(props: RouterBarProps) {
  const { routes, updateContent } = props;
  const classes = useStyles();

  return (
    <>
      <Toolbar variant={"dense"}>
        <Button
          className={classes.item}
          startIcon={<HomeRoundedIcon />}
          onClick={() => updateContent(-1)}
        >
          <Typography noWrap variant={"body2"}>Home</Typography>
        </Button>
        {routes.map((item, index) => {
          return (
            <span style={{ display: 'flex', alignItems: "center" }}>
              <KeyboardArrowRightRoundedIcon />
              <Button
                key={index}
                className={classes.item}
                onClick={() => updateContent(index)}
                style={{ maxWidth: "150px" }}
              >
                <Typography noWrap variant={"body2"}>{item.name}</Typography>
              </Button>
            </span>
          );
        })}
      </Toolbar>
      <Divider />
    </>
  );
}
