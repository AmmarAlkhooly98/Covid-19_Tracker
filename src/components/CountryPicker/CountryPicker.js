import React, { useState, useEffect } from "react";
import { FormControl, NativeSelect } from "@material-ui/core";
import { fetchCountries } from "../../api";

import styles from "./CountryPicker.module.css";

const CountryPicker = ({ handelCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      setCountries(await fetchCountries());
    };

    getCountries();
  }, [setCountries]);

  return countries.length ? (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handelCountryChange(e.target.value)}
      >
        <option value="">Global</option>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
        {}
      </NativeSelect>
    </FormControl>
  ) : null;
};

export default CountryPicker;
