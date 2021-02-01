import React from "react";
import {
  List,
  ListItem,
  Typography,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import FolderRoundedIcon from "@material-ui/icons/FolderRounded";
import InsertDriveFileRoundedIcon from "@material-ui/icons/InsertDriveFileRounded";

declare interface fileProp {
  hashes: { quickXorHash: string };
  mimeType: string;
}

declare interface folderProp {
  childCount: number;
}

export declare interface itemProp {
  name: string;
  createdDateTime: Date;
  folder?: folderProp;
  file?: fileProp;
  id: string;
  size: number;
  webUrl: string;
}

declare interface ItemsListProps {
  content: itemProp[];
  updateHandler: (itemInfo: itemProp) => any;
}

export default function ItemsList(props: ItemsListProps) {
  const { content, updateHandler } = props;
  console.log(content);
  return (
    <>
      <List dense>
        {content.map((item, index) => (
          <ListItem button disableRipple key={index}>
            <ListItemAvatar>
              <Avatar>
                {item.folder ? (
                  <FolderRoundedIcon />
                ) : (
                  <InsertDriveFileRoundedIcon />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText onClick={() => updateHandler(item)}>
              <Typography noWrap>{item.name}</Typography>
            </ListItemText>
            {item.file && (
              <IconButton>
                <GetAppRoundedIcon />
              </IconButton>
            )}
            <IconButton>
              <InfoRoundedIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
