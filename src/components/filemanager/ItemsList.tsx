import React from "react";
import {List, ListItem, Typography, ListItemAvatar, Avatar, ListItemText, IconButton, ListItemSecondaryAction} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder"
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';

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
    <List dense>
      {content.map((item, index) => (
        <ListItem button disableRipple key={index} >
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText onClick={() => updateHandler(item)}>
            <Typography noWrap>
              {item.name}
            </Typography>
          </ListItemText>
          <IconButton>
            <GetAppRoundedIcon />
          </IconButton>
          <IconButton>
            <InfoRoundedIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  </>
}