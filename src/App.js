import React from "react";

import { Cards, Chart, CountryPicker, TableData } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";

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
    console.log(fetchedData);
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <Cards data={data} />
        <CountryPicker handelCountryChange={this.handelCountryChange} />
        <Chart data={data} country={country} />
        <TableData data={data} />
      </div>
    );
  }
}

export default App;
