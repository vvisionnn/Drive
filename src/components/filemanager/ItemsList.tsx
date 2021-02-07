import React, {useState} from "react";
import {
  ClickAwayListener,
  Collapse,
  Card,
  MenuItem,
  MenuList,
  Paper,
  TableContainer,
  Grow,
  Menu
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
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
  "@microsoft.graph.downloadUrl"?: string;
}

declare interface ItemsListProps {
  content: itemProp[];
  updateHandler: (itemInfo: itemProp) => any;
}

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    width: "100%",
  },
  tableCell: {
    maxWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  row: {
    // width: "100%"
    userSelect: "none"
  },
  rowIcon: {
    marginRight: theme.spacing(2),
    verticalAlign: "middle",
    backgroundColor: "transparent",
  },
  rowNameContainer: {
    width: "80%",
    [theme.breakpoints.down("xs")]: {
      width: "70%"
    }
  },
  rowSizeContainer: {
    width: "20%",
    [theme.breakpoints.down("xs")]: {
      width: "30%"
    }
  },
  // rowDownloadIconContainer: {
  //   width: "10%"
  // },
  folderIcon: {
    color: "rgba(246, 205, 138, 1)",
  },
  fileIcon: {
    color: theme.palette.grey.A200,
  },
}));

function humanFileSize(bytes: number, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}

declare interface ContextMenuValue {
  type: boolean; // 0 => folder; 1 => file
}

declare interface ContextMenuProp {
  status: boolean;
  mouseX: number;
  mouseY: number;
  value: ContextMenuValue;
}

export default function ItemsList(props: ItemsListProps) {
  const { content, updateHandler } = props;
  const [mouseState, setMouseState] = useState<ContextMenuProp>({
    status: false,
    mouseX: 0,
    mouseY: 0,
    value: {
      type: false
    }
  });
  const classes = useStyles();

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log(event.target)
    const iconElement = (event.target as Element).getElementsByTagName("svg")[0]
    setMouseState({
      status: true,
      mouseX: event.clientX,
      mouseY: event.clientY,
      value: {
        type: iconElement.classList.value.indexOf("folder") !== -1
      }
    });
  }

  const handleClose = () => {
    setMouseState({
      ...mouseState,
      status: false,
    });
  };

  return <>
    <ClickAwayListener
      mouseEvent={"onMouseDown"}
      touchEvent={"onTouchStart"}
      onClickAway={handleClose}
    >
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table size={"small"}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content &&
            content.map((item, index) => (

                <TableRow
                  key={index}
                  onContextMenu={handleRightClick}
                  hover
                  className={classes.row}
                  onDoubleClick={() => updateHandler(item)}
                >
                  <TableCell
                    className={`${classes.rowNameContainer} ${classes.tableCell}`}
                  >
                    {item.folder ? (
                      <FolderRoundedIcon
                        className={`${classes.rowIcon} ${classes.folderIcon}`}
                      />
                    ) : (
                      <InsertDriveFileRoundedIcon
                        className={`${classes.rowIcon} ${classes.fileIcon}`}
                      />
                    )}
                    {item.name}
                  </TableCell>
                  <TableCell
                    className={`${classes.rowSizeContainer} ${classes.tableCell}`}
                  >
                    {humanFileSize(item.size)}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ClickAwayListener>
    <ClickAwayListener
      mouseEvent={"onMouseDown"}
      touchEvent={"onTouchStart"}
      onClickAway={handleClose}
    >
      <div
        style={{
          position: "fixed",
          top: mouseState.mouseY,
          left: mouseState.mouseX,
        }}
      >
        <Collapse in={mouseState.status}>
          <Paper>
            <MenuList>
              <MenuItem onClick={handleClose}>Placeholder</MenuItem>
              <MenuItem onClick={handleClose}>
                {mouseState.value.type ? "Folder" : "File"}
              </MenuItem>
              <MenuItem onClick={handleClose}>Highlight</MenuItem>
              <MenuItem onClick={handleClose}>Email</MenuItem>
            </MenuList>
          </Paper>
        </Collapse>
      </div>
    </ClickAwayListener>
  </>
}
