import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, orderCont } from "../../redux/actions";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const lastCountries = currentPage * countriesPerPage;
  const firtsCountries = lastCountries - countriesPerPage;
  const currentCountries = countries.slice(firtsCountries, lastCountries);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div>
      {/* <div className={styles.inputActivityContainer}>
        <label>Activity</label>
        <form>
          <input
            className={styles.inputText}
            placeholder="Search your activity."
            type="text"
            autoComplete="off"
          />
          <button className={styles.butn} type="submit">
            Search
          </button>
        </form>
      </div> */}

      {/* <div className={styles.sortContainer}>
        <p>Sort by</p>
        <select>
          <option value="ALL">-</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="↑ POPULATION">↑ POPULATION</option>
          <option value="↓ POPULATION">↓ POPULATION</option>
        </select>
      </div> */}

      <div className={styles.container}>
        <div className={styles.cardsContainer}>
          {currentCountries?.map((e) => {
            return (
              <div className={styles.card}>
                <Card
                  id={e.id}
                  name={e.name}
                  flags={e.flags}
                  continent={e.continent}
                />
              </div>
            );
          })}
        </div>
        <Pagination
          countriesPerPage={countriesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          countries={countries.length}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
