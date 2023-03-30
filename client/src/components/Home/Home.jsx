import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

export default function Home({
  countriesPerPage,
  lastCountries,
  firtsCountries,
  handlerPagination,
}) {
  const countries = useSelector((state) => state.countries);

  const currentCountries = countries.slice(firtsCountries, lastCountries);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.cardsContainer}>
          {currentCountries?.map((e, index) => {
            return (
              <div className={styles.card} key={index}>
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
          countries={countries.length}
          pagination={handlerPagination}
        />
      </div>
    </div>
  );
}
