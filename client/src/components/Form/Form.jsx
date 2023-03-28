import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getCountriesByName } from "../../redux/actions";
import CountryCard from "../ActivityCard/CountryCard";
import style from "./Form.module.css";

export default function Form() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [inputName, setInputName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(false);
  const [dataForm, setDataForm] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countryID: [],
  });

  const stateReset = () => {
    setDataForm({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countryID: [],
    });
    setInputName("");
  };

  const nextPage = () => {
    if (countries.length <= currentPage + 12) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage + 12);
    }
  };

  const prevPage = () => {
    if (currentPage < 9) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 12);
    }
  };

  const handleRemoveCountry = (country) => {
    setDataForm({
      ...dataForm,
      countryID: dataForm.countryID.filter((c) => c !== country),
    });
  };

  const submitInputName = (e) => {
    e.preventDefault();
    setInputName(e.target.value);
  };

  const handleCountrySelection = (e) => {
    const countryId = e.target.value;
    if (dataForm.countryID.includes(countryId)) {
      alert("This country has already been selected.");
    } else {
      setDataForm({
        ...dataForm,
        countryID: [...dataForm.countryID, countryId],
      });
    }
  };

  const setDataHandler = (e) => {
    e.preventDefault();
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (
      !dataForm["difficulty"] ||
      !dataForm["duration"] ||
      !dataForm["season"]
    ) {
      setError(true);
      alert("Please select a valid option for all required fields.");
    } else if (
      dataForm["difficulty"] === "SELECT AN OPTION" ||
      dataForm["duration"] === "SELECT AN OPTION" ||
      dataForm["season"] === "SELECT AN OPTION"
    ) {
      setError(true);
      alert("Please select a valid option for all required fields.");
    } else if (
      dataForm["name"].length < 2 ||
      !dataForm["countryID"].length >= 1
    ) {
      setError(true);
      alert("Select at least one country.");
    } else {
      dispatch(createActivity(dataForm))
        .then(() => stateReset())
        .then(() => alert("Activity added"));
    }
  };

  const filteredCountries = countries.slice(currentPage, currentPage + 12);

  useEffect(() => {
    setCurrentPage(0);
  }, [countries]);

  useEffect(() => {
    dispatch(getCountriesByName(inputName));
  }, [inputName]);

  return (
    <div>
      <div>
        <form onSubmit={(e) => submitForm(e)}>
          <div className={style.name}>
            <input
              className={style.input}
              type="text"
              autoComplete="off"
              placeholder="Name your activity"
              name="name"
              value={dataForm.name}
              onChange={(e) => setDataHandler(e)}
            />
          </div>

          <div className={style.difficulty}>
            <label>Select difficulty</label>
            <select
              className={style.input}
              name="difficulty"
              value={dataForm.difficulty}
              id="difficulty"
              onChange={(e) => setDataHandler(e)}
            >
              <option>SELECT AN OPTION</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className={style.duration}>
            <label>Duration in hours</label>
            <select
              className={style.input}
              name="duration"
              value={dataForm.duration}
              id="duration"
              onChange={(e) => setDataHandler(e)}
            >
              <option>SELECT AN OPTION</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>
          </div>

          <div className={style.season}>
            <label>Select season</label>
            <select
              className={style.input}
              name="season"
              value={dataForm.season}
              id="season"
              onChange={(e) => setDataHandler(e)}
            >
              <option>SELECT AN OPTION</option>
              <option value="Verano">Verano</option>
              <option value="Invierno">Invierno</option>
              <option value="Primavera">Primavera</option>
              <option value="Otoño">Otoño</option>
            </select>
          </div>

          <div className={style.countries}>
            <label>Select Countries</label>
            <input
              className={style.input}
              type="text"
              autoComplete="off"
              placeholder="find your country..."
              onChange={submitInputName}
            />
          </div>
          <div>
            <input
              className={style.butn}
              type="submit"
              value="CREATE ACTIVITY"
            />
          </div>
        </form>
      </div>
      <button onClick={prevPage} className={style.butn}>
        {" "}
        {"<"}{" "}
      </button>
      <button onClick={nextPage} className={style.butn}>
        {" "}
        {">"}{" "}
      </button>

      <div className={style.mybutton}>
        {dataForm.countryID.map((country) => (
          <div key={country}>
            {country}
            <button
              onClick={() => handleRemoveCountry(country)}
              className={style.myXbutton}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className={style.order}>
        {filteredCountries.length < 30
          ? filteredCountries.map((e) => (
              <div className={style.countryCont}>
                <div>
                  <CountryCard key={e.id} name={e.name} flags={e.flags} />
                  <button
                    className={style.btn}
                    onClick={(e) => handleCountrySelection(e)}
                    value={e.id}
                    name="countryID"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))
          : console.log("ERROR :(")}
        {error && <div className={style.error}>{error}</div>}
      </div>
    </div>
  );
}
