import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import CountUp from "react-countup";
import styles from "./Cards.module.css";
import { LoopCircleLoading } from "react-loadingg";
import { fetchTableData } from "../../api";
import cx from "classnames";

const Cards = (props) => {
  const {
    data,
    data: { confirmed },
    country,
  } = props;
  const [newCases, setNewCases] = useState("");
  const newCasesDestructured = [];

  useEffect(() => {
    const getTableData = async () => {
      setNewCases(await fetchTableData(country));
    };
    getTableData();
  }, [country]);

  console.log(newCases, "new cases");
  if (newCases !== undefined && newCases !== null && newCases.length === 1) {
    for (var i = 0; i < newCases.length; i++) {
      newCasesDestructured.push(
        ["New Cases", newCases[0].cases.new],
        ["Country", newCases[0].country],
        ["Time Updated", newCases[0].time]
      );
    }
  } else if (
    newCases !== undefined &&
    newCases !== null &&
    newCases.length > 1
  ) {
    newCases.map((item) => {
      console.log(item.country);
      if (item.country === "All") {
        newCasesDestructured.push(
          ["New Cases", item.cases.new],
          ["Country", item.country],
          ["Time Updated", item.time]
        );
      }
    });
  }

  console.log(newCasesDestructured, "new cases destructured");

  return (
    <div className={styles.container}>
      {!confirmed ? (
        <LoopCircleLoading />
      ) : (
        <Grid container justify="center" spacing={3}>
          {Object.entries(data).map((item, i) => {
            const confirmed = item[0] === "confirmed" ? "Infected" : null;
            const confirmedInfo =
              item[0] === "confirmed"
                ? "Number of active cases of Covid-19"
                : null;
            const confirmedVal = item[0] === "confirmed" ? item[1].value : null;
            const recovered = item[0] === "recovered" ? "Recovered" : null;
            const recoveredInfo =
              item[0] === "recovered"
                ? "Number of recoveries from Covid-19"
                : null;
            const recoveredVal = item[0] === "recovered" ? item[1].value : null;
            const deaths = item[0] === "deaths" ? "Deaths" : null;
            const deathsInfo =
              item[0] === "deaths"
                ? "Number of deaths caused by Covid-19"
                : null;
            // const lastUpdated = item[0] === "lastUpdate" ? item[1] : null;
            const deathsVal = item[0] === "deaths" ? item[1].value : null;
            const style =
              item[0] === "confirmed"
                ? styles.confirmed
                : item[0] === "deaths"
                ? styles.deaths
                : item[0] === "recovered"
                ? styles.recovered
                : null;

            return (
              <div key={item[0]}>
                {item[0] !== "lastUpdate" ? (
                  <Grid
                    item
                    component={Card}
                    // xs={12}
                    // md={4}
                    className={cx(styles.card, style)}
                  >
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        {confirmed || deaths || recovered}{" "}
                        {country && <text is="x3d">-</text>}{" "}
                        {country && country}
                      </Typography>
                      <Typography variant="h5">
                        <CountUp
                          start={0}
                          end={confirmedVal || deathsVal || recoveredVal}
                          duration={2.5}
                          separator=","
                        />
                      </Typography>
                      <Typography color="textSecondary">
                        {new Date().toDateString()}
                      </Typography>
                      <Typography variant="body2">
                        {recoveredInfo || deathsInfo || confirmedInfo}
                      </Typography>
                    </CardContent>
                  </Grid>
                ) : null}
              </div>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default Cards;
