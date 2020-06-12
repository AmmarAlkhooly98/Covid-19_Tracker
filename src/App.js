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
      </div>
    );
  }
}

export default App;
