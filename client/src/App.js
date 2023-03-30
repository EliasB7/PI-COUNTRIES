import { Landing, Home, NavBar } from "./components/index";
import "./App.css";
import { getActivities, getCountries } from "./redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import Detail from "./components/Detail/Detail";
import Activity from "./components/Activity/Activity";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;
  const lastCountries = currentPage * countriesPerPage;
  const firtsCountries = lastCountries - countriesPerPage;

  const handlerPagination = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div className="background">
      {location.pathname !== "/" && (
        <NavBar handlerPagination={handlerPagination} />
      )}

      <Route exact path="/">
        <Landing />
      </Route>

      <Route path="/home">
        <Home
          handlerPagination={handlerPagination}
          firtsCountries={firtsCountries}
          lastCountries={lastCountries}
          currentPage={currentPage}
          countriesPerPage={countriesPerPage}
        />
      </Route>

      <Route path="/newactivity">
        <Activity />
      </Route>

      <Route exact path="/countries/:id" component={Detail} />
    </div>
  );
}

export default App;
