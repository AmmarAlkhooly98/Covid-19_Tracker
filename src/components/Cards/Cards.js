import React from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";

import styles from "./Cards.module.css";

const Cards = (props) => {
  console.log("hii", props);
  return (
    <div className={styles.container}>
      <Grid container justify="center" spacing={3}>
        <Grid item xs={12} md={6} lg={4} component={Card} justify="center">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              infected
            </Typography>
            <Typography variant="h5">REAL DATA</Typography>
            <Typography color="textSecondary">infected</Typography>
            <Typography variant="body2">Number of cases of Covid-19</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
