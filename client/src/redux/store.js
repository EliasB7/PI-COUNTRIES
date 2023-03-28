import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta línea es para conectar con la extensión del navegador => REDUX DEVTOOLS

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware)) // esta línea es para poder hacer peticiones a un server
);

export default store;
