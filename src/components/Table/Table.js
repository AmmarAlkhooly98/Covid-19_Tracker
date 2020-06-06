import React, { useEffect, useState, makeStyles } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { fetchDailyData, fetchCountries } from "../../api";

import styles from "./Table.module.css";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

const TableData = ({ data: { confirmed, recovered, deaths } }) => {
  //   const classes = useStyles();

  const [fetchedTableData, setFetchedTableData] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      setCountries(await fetchCountries());
    };
    getCountries();
  }, [setCountries]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedTableData(await fetchDailyData());
    };
    fetchAPI();
  }, [setFetchedTableData]);

  let tableData = [];
  let max = Math.max(fetchedTableData.length, countries.length);

  for (let i = 0; i < max; i++) {
    if (fetchedTableData.length > i) {
      tableData.push(fetchedTableData[i]);
    }
    if (countries.length > i) {
      tableData.push(countries[i]);
    }
  }

  console.log(tableData);

  console.log(fetchedTableData[0]);
  console.log(fetchedTableData[countries]);
  console.log(countries);

  return (
    <TableContainer
      component={Paper}
      style={{
        minWidth: "650",
        maxWidth: 1300,
        justifyContent: "center",
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
            <TableCell>Country</TableCell>
            <TableCell align="right">Infected</TableCell>
            <TableCell align="right">Recovered</TableCell>
            <TableCell align="right">Deaths</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fetchedTableData.map((item, i) => (
            <TableRow key={item}>
              {console.log(item)}
              <TableCell align="right">{countries[i]}</TableCell>
              <TableCell component="th" scope="row">
                {item.confirmed}
              </TableCell>
              <TableCell align="right">{item.recovered}</TableCell>
              <TableCell align="right">{item.deaths}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableData;
