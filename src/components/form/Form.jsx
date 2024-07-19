import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";

import Button from "../button/Button";
import BackButton from "../backButton/BackButton";

import { useUrlPosition } from "../../hooks/useUrlPosition";

import Message from "./../mesagge/Message";
import Spinner from "./../spinner/Spinner";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../contexts/CitiesContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isloading } = useCities();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingErr, setGeocodingErr] = useState("");
  const navigate = useNavigate("");
  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCity() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingErr("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              "That dosn't seem to be a city. click somewhere else😉 "
            );
          setCityName(data.city || data.locality);
          setEmoji(convertToEmoji(data.countryCode));
          setCountry(data.countryName);
        } catch (err) {
          setGeocodingErr(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCity();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (geocodingErr) return <Message message={geocodingErr} />;
  if (!lat && !lng)
    return <Message message={"start by clicking somewhere on the map"} />;

  return (
    <form
      className={`${styles.form} ${isloading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          dateFormat="dd/ MM/ yyyy"
          onChange={(date) => setDate(date)}
          selected={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
