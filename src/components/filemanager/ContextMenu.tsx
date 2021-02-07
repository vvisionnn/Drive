import React from "react";
import {ClickAwayListener, Collapse, MenuItem, MenuList, Paper, SvgIconProps, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import InfoRounded from "@material-ui/icons/InfoRounded";

export declare interface ContextMenuItemProps {
  icon?: SvgIconProps,
  name: string,
  handleClick?: () => void,
}

declare interface ContextMenuProps {
  open: boolean,
  position: {
    X: number,
    Y: number,
  },
  dense?: boolean,
  contextMinWidth?: number,
  items: ContextMenuItemProps[],
  handleClose: () => void
}

const useStyles = makeStyles(theme => ({
  menu: {
    zIndex: theme.zIndex.appBar + 1,
    position: "fixed",
  },
  itemText: {
    paddingLeft: theme.spacing(2)
  }
}))

export default function ContextMenu(props: ContextMenuProps) {
  const classes = useStyles();
  const { open, position, items, handleClose } = props
  const dense = props.dense ? props.dense : false
  const itemMinHeight = dense ? 32 : 50
  const contextMinWidth = props.contextMinWidth ? props.contextMinWidth : 300
  const body = document.body
  const html = document.documentElement;
  const _maxHeight = Math.max(
    body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight
  )
  const _maxWidth = Math.max(
    body.scrollWidth, body.offsetWidth,
    html.clientWidth, html.scrollWidth, html.offsetWidth
  )

  const upDown = position.Y + itemMinHeight * items.length < _maxHeight-10
  const leftRight = position.X + contextMinWidth < _maxWidth - 10
  const positionX = leftRight ? position.X : position.X - contextMinWidth
  const positionY = upDown ? position.Y : position.Y - items.length * itemMinHeight

  return (
    <ClickAwayListener
      mouseEvent={"onMouseDown"}
      touchEvent={"onTouchStart"}
      onClickAway={handleClose}
    >
      <Paper
        elevation={open ? 10 : 0}
        className={classes.menu}
        style={{
          minWidth: contextMinWidth,
          top: positionY,
          left: positionX,
        }}
      >
        <Collapse in={open}>
          <MenuList>
            {items.length > 0 && items.map((item, index) => (
              <MenuItem
                key={index}
                dense={dense}
                onClick={item.handleClick? item.handleClick : handleClose}
              >
                {item.icon ? item.icon : <InfoRounded />}
                <span className={classes.itemText}>{item.name}</span>
              </MenuItem>
            ))}
          </MenuList>
        </Collapse>
      </Paper>
    </ClickAwayListener>
  )
}