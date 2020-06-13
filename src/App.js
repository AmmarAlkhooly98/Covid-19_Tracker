import React from "react";

import { Cards, Chart, CountryPicker, Table } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import image from "./images/image.png";

class App extends React.Component {
  state = {
    data: {},
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handelCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handelCountryChange={this.handelCountryChange} />
        <Chart data={data} country={country} />
        <Table />
        <div className={styles.push}></div>
        <div className={styles.footer}>
          Made by:{" "}
          <a href="https://www.linkedin.com/in/ammar-alkhooly/">
            Ammar Alkhooly
          </a>{" "}
          | Email:{" "}
          <a href="mailto:ammaralkhooly1@gmail.com">ammaralkhooly1@gmail.com</a>{" "}
          | Phone: <a href="tel:+962780623701">+962780623701</a>
        </div>
      </div>
    );
  }
}

export default App;
