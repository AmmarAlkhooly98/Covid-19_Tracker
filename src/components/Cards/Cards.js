import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import CountUp from "react-countup";
import styles from "./Cards.module.css";
import { LoopCircleLoading } from "react-loadingg";
import { fetchTableData } from "../../api";
import cx from "classnames";

const Cards = (props) => {
  let {
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

  // const destructureData = () => {
  if (newCases !== undefined && newCases !== null && newCases.length === 1) {
    for (var i = 0; i < newCases.length; i++) {
      newCasesDestructured.push(
        {
          title: "New Cases",
          total: newCases[0].cases.new,
          "time updated": newCases[0].time,
          country: newCases[0].country,
          info: "New cases for Covid-19",
        },

        {
          title: "Infected",
          total: newCases[0].cases.total,
          "time updated": newCases[0].time,
          country: newCases[0].country,
          info: "Number of active cases of Covid-19",
        },
        {
          title: "Recovered",
          total: newCases[0].cases.recovered,
          "time updated": newCases[0].time,
          country: newCases[0].country,
          info: "Number of recoveries from Covid-19",
        },
        {
          title: "Deaths",
          total: newCases[0].deaths.total,
          "time updated": newCases[0].time,
          country: newCases[0].country,
          info: "Number of deaths caused by Covid-19",
        }
      );
    }
  } else if (
    newCases !== undefined &&
    newCases !== null &&
    newCases.length > 1
  ) {
    newCases.map((item) => {
      if (item.country === "All") {
        newCasesDestructured.push(
          {
            title: "New Cases",
            total: item.cases.new,
            "time updated": item.time,
            country: item.country,
            info: "New cases for Covid-19",
          },

          {
            title: "Infected",
            total: item.cases.total,
            "time updated": item.time,
            country: item.country,
            info: "Number of active cases of Covid-19",
          },
          {
            title: "Recovered",
            total: item.cases.recovered,
            "time updated": item.time,
            country: item.country,
            info: "Number of recoveries from Covid-19",
          },
          {
            title: "Deaths",
            total: item.deaths.total,
            "time updated": item.time,
            country: item.country,
            info: "Number of deaths caused by Covid-19",
          }
        );
      }
    });
  }
  // };
  // destructureData();
  useEffect(() => {
    if (country && newCasesDestructured.length === 0) {
      const getTableData = async () => {
        setNewCases(await fetchTableData());
      };
      getTableData();
    }
  }, [newCasesDestructured.length, country]);

  return (
    <div className={styles.container}>
      {!confirmed ? (
        <LoopCircleLoading />
      ) : (
        <Grid container justify="center" spacing={3}>
          {newCasesDestructured.map((item, i) => {
            const style =
              item.title === "Infected"
                ? styles.confirmed
                : item.title === "Deaths"
                ? styles.deaths
                : item.title === "Recovered"
                ? styles.recovered
                : item.title === "New Cases"
                ? styles.newCases
                : null;
            return (
              <Grid
                item
                key={i}
                component={Card}
                className={cx(styles.card, style)}
              >
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {item.title}{" "}
                    {country && newCases.length === 1 ? (
                      <text is="x3d">-</text>
                    ) : null}{" "}
                    {country && newCases.length === 1 ? country : null}
                  </Typography>
                  <Typography variant="h5">
                    {item.title === "New Cases" ? "+" : null}
                    <CountUp
                      start={0}
                      end={item.total}
                      duration={2.5}
                      separator=","
                    />
                  </Typography>
                  <Typography color="textSecondary">
                    {new Date(item["time updated"]).toDateString()}
                  </Typography>
                  <Typography variant="body2">{item.info}</Typography>
                </CardContent>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default Cards;
