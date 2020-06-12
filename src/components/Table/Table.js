import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { fetchTableData } from "../../api";

// import styles from "./Table.module.css";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const TableData = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getTableData = async () => {
      setTableData(await fetchTableData());
    };
    getTableData();
  }, [setTableData]);

  console.log(tableData);

  return (
    <TableContainer
      component={Paper}
      style={{
        minWidth: "650",
        maxWidth: 1300,
        justifyContent: "left",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "60px",
      }}
    >
      <Table
        aria-label="simple table"
        style={{ minWidth: "650", maxWidth: 1300 }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">Country</TableCell>
            <TableCell align="left">Infected</TableCell>
            <TableCell align="left">Recovered</TableCell>
            <TableCell align="left">Deaths</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item, i) => (
            <TableRow key={item}>
              {console.log(item)}
              <TableCell align="left">{item.country}</TableCell>
              <TableCell component="th" scope="row" align="left">
                {item.cases.total}
              </TableCell>
              {item.cases.recovered !== 0 ? (
                <TableCell align="left">{item.cases.recovered}</TableCell>
              ) : (
                <TableCell>-</TableCell>
              )}
              <TableCell align="left">{item.deaths.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableData;
