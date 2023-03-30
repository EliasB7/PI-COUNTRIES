import {
  GET_COUNTRIES,
  GET_ACTIVITIES,
  GET_COUNTRIES_DETAIL,
  GET_NAME,
  SORT_ALPHABETIC,
  SORT_ALPHABETIC_REVERSE,
  SORT_POPULATION,
  SORT_POPULATION_REVERSE,
  SORT_CONTINENT,
  FILTER_ACTIVITIES,
} from "./actionNames";

import { ordPopulation, ordAlphabetic } from "./order";

const initialState = {
  allCountries: [],
  countries: [],
  countryDetail: [],
  activities: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        countries: action.payload,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case GET_NAME:
      return {
        ...state,
        countries: action.payload,
      };

    case GET_COUNTRIES_DETAIL:
      return {
        ...state,
        countryDetail: action.payload,
      };

    case SORT_ALPHABETIC: {
      return {
        ...state,
        countries: state.allCountries.slice().sort(ordAlphabetic),
      };
    }

    case SORT_ALPHABETIC_REVERSE: {
      return {
        ...state,
        countries: state.allCountries.slice().sort(ordAlphabetic).reverse(),
      };
    }

    case SORT_POPULATION: {
      return {
        ...state,
        countries: state.allCountries.slice().sort(ordPopulation).reverse(),
      };
    }

    case SORT_POPULATION_REVERSE: {
      return {
        ...state,
        countries: state.allCountries.slice().sort(ordPopulation),
      };
    }

    case SORT_CONTINENT: {
      if (action.payload === "All") {
        return {
          ...state,
          countries: state.allCountries,
        };
      }
      return {
        ...state,
        countries: state.allCountries.filter(
          (c) => c.continent === action.payload
        ),
      };
    }

    case FILTER_ACTIVITIES: {
      const filterCountriesActiv = state.activities.find(
        (e) => e.name === action.payload
      );

      if (action.payload === "All") {
        return {
          ...state,
          countries: state.allCountries,
        };
      }

      return {
        ...state,
        countries: filterCountriesActiv.countries,
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
