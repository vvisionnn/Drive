import React from "react";
import {
  List,
  ListItem,
  Typography,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Divider,
} from "@material-ui/core";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import FolderRoundedIcon from "@material-ui/icons/FolderRounded";
import InsertDriveFileRoundedIcon from "@material-ui/icons/InsertDriveFileRounded";
import { makeStyles } from "@material-ui/core/styles";

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
  // todo: change to custom property
  "@microsoft.graph.downloadUrl"?: string
}

declare interface ItemsListProps {
  content: itemProp[];
  updateHandler: (itemInfo: itemProp) => any;
}

const useStyles = makeStyles((theme) => ({
  folderAvatar: {
    color: "rgba(246, 205, 138, 1)",
    backgroundColor: "transparent",
  },
  fileAvatar: {
    color: theme.palette.grey.A200,
    backgroundColor: "transparent",
  },
}));

function humanFileSize(bytes: number, si=false, dp=1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}

export default function ItemsList(props: ItemsListProps) {
  const { content, updateHandler } = props;
  const classes = useStyles();
  return (
    <>
      <List dense style={{ padding: 0 }}>
        {content.map((item, index) => (
          <div key={index}>
            <ListItem
              button
              disableRipple
              onClick={() => updateHandler(item)}
              style={{
                borderRadius: "10px"
              }}
            >
              <ListItemAvatar>
                {item.folder ? (
                  <Avatar className={classes.folderAvatar}>
                    <FolderRoundedIcon fontSize={"large"} />
                  </Avatar>
                ) : (
                  <Avatar className={classes.fileAvatar}>
                    <InsertDriveFileRoundedIcon fontSize={"large"} />
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                // todo: noWrap
                primary={<Typography noWrap>{item.name}</Typography>}
                secondary={`Size: ${humanFileSize(item.size)}`}
              />
              {item.file && (
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      window.open(item["@microsoft.graph.downloadUrl"])
                    }}
                  >
                    <GetAppRoundedIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
            <Divider variant="inset" />
          </div>
        ))}
      </List>
    </>
  );
}
