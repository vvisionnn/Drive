import React from "react";
import { Paper, TableContainer } from "@material-ui/core";
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

export default function ItemsList(props: ItemsListProps) {
  const { content, updateHandler } = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table size={"small"}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ width: "100%" }}>
          {content &&
            content.map((item, index) => (
              <TableRow
                key={index}
                hover
                className={classes.row}
                onClick={() => updateHandler(item)}
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
                {/*<TableCell align="left" className={classes.rowDownloadIconContainer}>*/}
                {/*  {item.file && (*/}
                {/*  <IconButton size={"small"} onClick={() => {window.open(item["@microsoft.graph.downloadUrl"])}}>*/}
                {/*    <GetAppRoundedIcon />*/}
                {/*  </IconButton>)}*/}
                {/*</TableCell>*/}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
