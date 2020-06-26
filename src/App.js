import React, { useState, useEffect } from "react";

import { Cards, Chart, CountryPicker, Table, StickyFooter } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import image from "./images/image.png";

const App = () => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("");

  const handleDataFetch = async () => {
    try {
      const res = await fetchData();
      setData(res);
    } catch (e) {
      console.error(e);
    }
  };

  const handelCountryChange = async (country) => {
    try {
      const res = await fetchData(country);
      setData(res);
      setCountry(country);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handleDataFetch();
  }, []);
  return (
    <div className={styles.container} style={{ marginleft: "0%" }}>
      <img className={styles.image} src={image} alt="COVID-19" />
      <Cards data={data} country={country} />
      <CountryPicker handelCountryChange={handelCountryChange} />
      <Chart data={data} country={country} />
      <Table country={country} />
      <div className={styles.push}></div>
      {data.confirmed && <StickyFooter />}
    </div>
  );
};

export default App;
