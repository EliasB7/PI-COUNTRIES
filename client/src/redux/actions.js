import axios from "axios";
import {
  GET_COUNTRIES,
  GET_ACTIVITIES,
  FILTER_ACTIVITIES,
  GET_COUNTRIES_DETAIL,
  GET_NAME,
  SORT_ALPHABETIC,
  SORT_ALPHABETIC_REVERSE,
  SORT_POPULATION,
  SORT_POPULATION_REVERSE,
  SORT_CONTINENT,
} from "./actionNames";

export function getCountries() {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3001/countries/");
    dispatch({ type: GET_COUNTRIES, payload: res.data });
  };
}

export function getActivities() {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3001/activities/");
    dispatch({ type: GET_ACTIVITIES, payload: res.data });
  };
}

export function getCountriesByName(name) {
  return async (dispatch) => {
    try {
      let res = await axios.get(`http://localhost:3001/countries?name=${name}`);
      dispatch({ type: GET_NAME, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCountryDetail(id) {
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:3001/countries/${id}`);
    dispatch({ type: GET_COUNTRIES_DETAIL, payload: res.data });
  };
}

export function createActivity(activity) {
  return async function () {
    try {
      const newActivity = await axios.post(
        "http://localhost:3001/activities/newactivity",
        activity
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderAlphabetic() {
  return {
    type: SORT_ALPHABETIC,
  };
}

export function orderAlphabeticRev() {
  return {
    type: SORT_ALPHABETIC_REVERSE,
  };
}

export function orderPop() {
  return {
    type: SORT_POPULATION,
  };
}

export function orderPopRev() {
  return {
    type: SORT_POPULATION_REVERSE,
  };
}

export const orderCont = (payload) => {
  return {
    type: SORT_CONTINENT,
    payload,
  };
};

export const filterActivities = (activity) => {
  return {
    type: FILTER_ACTIVITIES,
    payload: activity,
  };
};
