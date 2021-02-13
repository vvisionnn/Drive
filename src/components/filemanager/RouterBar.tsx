import React from "react";
import { itemProp } from "./ItemsList";
import { Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";

declare interface RouterBarProps {
  routes: itemProp[];
  updateContent: (index: number) => any;
}

const useStyles = makeStyles((theme) => ({
  item: {
    border: `1px solid ${theme.palette.background.default}`,
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

function RouteButton(props: {
  index?: any;
  onClick: () => void;
  text: string;
}) {
  const classes = useStyles();
  return (
    <span key={props.index} style={{ display: "flex", alignItems: "center" }}>
      <KeyboardArrowRightRoundedIcon />
      <Button
        className={classes.item}
        onClick={props.onClick}
        style={{ maxWidth: "150px" }}
      >
        <Typography noWrap variant={"body2"}>
          {props.text}
        </Typography>
      </Button>
    </span>
  );
}

const CustomMenu = (props: MenuProps) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
);

export default function RouterBar(props: RouterBarProps) {
  const { routes, updateContent } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  function renderFull() {
    return routes.map((item, index) => {
      return (
        <RouteButton
          index={index}
          onClick={() => updateContent(index)}
          text={item.name}
        />
      );
    });
  }

  function renderEllipsis() {
    const parts = routes.slice(0, routes.length - 1);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <span style={{ display: "flex", alignItems: "center" }}>
        <KeyboardArrowRightRoundedIcon />
        <IconButton ref={anchorRef} size={"small"} onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
        <CustomMenu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {parts.map((item, index) => {
            return (
              <MenuItem
                key={index}
                onClick={() => {
                  handleClose();
                  updateContent(index);
                }}
              >
                <Typography noWrap style={{ maxWidth: "150px" }}>
                  {item.name}
                </Typography>
              </MenuItem>
            );
          })}
        </CustomMenu>
      </span>
    );
  }

  function renderParts() {
    const lastRoute = routes[routes.length - 1];
    return (
      <>
        {renderEllipsis()}
        <RouteButton
          onClick={() => updateContent(routes.length - 1)}
          text={lastRoute.name}
        />
      </>
    );
  }

  return (
    <Toolbar variant={"dense"}>
      <Button
        className={classes.item}
        startIcon={<HomeRoundedIcon />}
        onClick={() => updateContent(-1)}
      >
        <Typography noWrap variant={"body2"}>
          Home
        </Typography>
      </Button>
      {routes.length <= 3 ? renderFull() : renderParts()}
    </Toolbar>
  );
}
