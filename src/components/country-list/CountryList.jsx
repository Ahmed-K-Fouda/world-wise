/* eslint-disable react/prop-types */
import { useCities } from "../../contexts/CitiesContext";
import CountryItem from "../country-item/CountryItem";
import Message from "../mesagge/Message";
import Spinner from "../spinner/Spinner";
import styles from "./CountryList.module.css";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map " />
    );

  if (isLoading) return <Spinner />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((ele) => ele.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}

export default CountryList;
