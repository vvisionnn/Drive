import React from "react";
import {
  List,
  ListItem,
  Typography,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton, ListItemSecondaryAction, Divider,
} from "@material-ui/core";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import FolderRoundedIcon from "@material-ui/icons/FolderRounded";
import InsertDriveFileRoundedIcon from "@material-ui/icons/InsertDriveFileRounded";
import {makeStyles} from "@material-ui/core/styles";

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

const useStyles = makeStyles(theme => ({
  folderAvatar: {
    color: "rgba(246, 205, 138, 1)",
    backgroundColor: "transparent",
  },
  fileAvatar: {
    color: theme.palette.grey.A200,
    backgroundColor: "transparent",
  }
}))

export default function ItemsList(props: ItemsListProps) {
  const { content, updateHandler } = props;
  const classes = useStyles();
  return (
    <>
      <List dense style={{padding: 0}}>
        {content.map((item, index) => (
          <>
            <ListItem button disableRipple key={index} onClick={() => updateHandler(item)}>
              <ListItemAvatar>
                {item.folder ? (
                  <Avatar className={classes.folderAvatar}>
                    <FolderRoundedIcon />
                  </Avatar>
                ) : (
                  <Avatar className={classes.fileAvatar}>
                    <InsertDriveFileRoundedIcon />
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText>
                <Typography noWrap>{item.name}</Typography>
              </ListItemText>
              {item.file && <ListItemSecondaryAction>
                <IconButton onClick={() => {console.log("clicked")}}>
                  <GetAppRoundedIcon />
                </IconButton>
              </ListItemSecondaryAction>}
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </>
  );
}
