import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getCountriesByName } from "../../redux/actions";
import CountryCard from "../ActivityCard/CountryCard";
import style from "./Form.module.css";

export default function Form() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries); // selecciono la lista de países del estado global utilizando la función useSelector de Redux
  const regexName = /^[a-zA-Z][a-zA-Z\s]{1,48}[a-zA-Z]$/;
  const [inputName, setInputName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [formFilled, setFormFilled] = useState(false); // establece el estado inicial para determinar si el formulario está completo o no

  // filtra los países para mostrar solo aquellos que corresponden a la página actual
  const filteredCountries = countries.slice(currentPage, currentPage + 12);

  // establece el estado inicial para los datos del formulario
  const [dataForm, setDataForm] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countryID: [],
  });

  // establece el estado inicial para los errores de validación del formulario
  const [error, setError] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countryID: "",
  });

  // restablece los datos del formulario y el nombre del usuario a sus valores iniciales
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
    if (currentPage < 12) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 12);
    }
  };

  // elimina los país de la lista de países seleccionados en el formulario
  const handleRemoveCountry = (country) => {
    setDataForm({
      ...dataForm,
      countryID: dataForm.countryID.filter((c) => c !== country), // filtro todos los elementos que no sean igual a country que deseo eliminar
    });
  };

  // actualizo el estado del nombre del usuario cuando se envía el formulario de búsqueda de países
  const submitInputName = (e) => {
    setInputName(e.target.value); //seteo el valor del estado inputName con el valor de la busqueda
  };

  // manejo la selección de un país en el formulario
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

  // valida el formulario y devuelve cualquier error de validación
  const validateForm = (dataForm) => {
    let error = {};

    if (!dataForm.name) {
      error.name = "INSERT NAME";
    }
    if (dataForm.countryID.length === 0) {
      error.countryID = "SELECT LESS 1 COUNTRY";
    }
    if (dataForm.name) {
      if (regexName.test(dataForm.name)) {
        error.name = "";
      } else {
        error.name = "Please select a valid option ";
      }
    }

    if (!dataForm.difficulty) {
      error.difficulty = "SELECT DIFFICULTY";
    }

    if (!dataForm.duration) {
      error.duration = "SELECT DURATION";
    }
    if (!dataForm.season) {
      error.season = "SELECT SEASON";
    }
    if (
      !dataForm.name ||
      !dataForm.difficulty ||
      !dataForm.duration ||
      !dataForm.season ||
      dataForm.countryID.length === 0
    ) {
      error.form = "RELLENE TODOS LOS CAMPOS";
    }

    return error;
  };

  const setDataHandler = (e) => {
    // Ejecuto la función validateForm y establece el error devuelto en el estado de error
    setError(
      validateForm({
        ...dataForm,
        [e.target.name]: e.target.value,
      })
    );
    // Actualizo el valor del campo en el formulario de datos
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    dispatch(createActivity(dataForm))
      .then(() => {
        stateReset();
        setError({});
        alert("Activity added");
      })
      .catch(() => {
        alert("Error adding activity");
      });

    // Recarga la página actual
    window.location.reload();
  };

  useEffect(() => {
    // Verifico si el formulario está completo y actualiza el estado en consecuencia
    const isFormFilled =
      dataForm.name &&
      dataForm.difficulty &&
      dataForm.duration &&
      dataForm.season &&
      dataForm.countryID.length > 0;

    setFormFilled(isFormFilled);
  }, [dataForm]);

  useEffect(() => {
    // Establezco la página actual en cero al cambiar la lista de países
    setCurrentPage(0);
  }, [countries]);

  useEffect(() => {
    // Obtengo la lista de países filtrados por nombre del servidor cuando se cambia el nombre de entrada
    dispatch(getCountriesByName(inputName));
  }, [dispatch, inputName]);

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
            {error.name && <span>{error.name}</span>}
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
              <option value="SELECT AN OPTION">SELECT AN OPTION</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            {error.difficulty && <span>{error.difficulty}</span>}
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
            {error.duration && <span>{error.duration}</span>}
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
              <option value="Summer">SUMMER</option>
              <option value="Winter">WINTER</option>
              <option value="Spring">SPRING</option>
              <option value="Autumn">AUTUMN</option>
              <option value="All Seasons">ALL SEASONS</option>
            </select>
            {error.season && <span>{error.season}</span>}
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
            {error.countryID && <span>{error.countryID}</span>}
          </div>
          <div>
            <input
              className={style.butn}
              type="submit"
              value="CREATE ACTIVITY"
              disabled={!formFilled}
            />
            {error.form && <span>RELLENE TODOS LOS CAMPOS</span>}
          </div>
        </form>
      </div>

      <button onClick={prevPage} className={style.butn}>
        {"<"}
      </button>
      <button onClick={nextPage} className={style.butn}>
        {">"}
      </button>

      <div className={style.mybutton}>
        {dataForm.countryID.map((country, id) => (
          <div>
            {country}
            <button
              key={id}
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
          ? filteredCountries.map((e, index) => (
              <div className={style.countryCont} key={index}>
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
          : alert("ERROR :(")}
      </div>
    </div>
  );
}
