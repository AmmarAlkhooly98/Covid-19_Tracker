import React, { useState, useEffect } from "react";
import { FormControl, NativeSelect, Typography } from "@material-ui/core";
import { fetchCountries, fetchTableData } from "../../api";

import styles from "./CountryPicker.module.css";

const CountryPicker = ({ handelCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      setCountries(await fetchCountries());
    };

    getCountries();
  }, [setCountries]);

  return countries?.length ? (
    <FormControl className={styles.formControl}>
      <Typography variant="overline" display="block" gutterBottom>
        Choose Country:
      </Typography>
      <NativeSelect
        defaultValue=""
        onChange={(e) => {
          handelCountryChange(e.target.value);
          fetchTableData(e.target.value);
        }}
      >
        <option value="">Global</option>
        <option value="USA">USA</option>
        <option value="Jordan">Jordan</option>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  ) : null;
};

export default CountryPicker;
