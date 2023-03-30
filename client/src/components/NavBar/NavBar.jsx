import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import ico from "./ico.PNG";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar/Searchbar";
import {
  getCountries,
  filterActivities,
  orderCont,
  orderAlphabetic,
  orderAlphabeticRev,
  orderPop,
  orderPopRev,
} from "../../redux/actions";

export default function NavBar({ handlerPagination }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const activities = useSelector((state) => state.activities);

  const handlerFilterContinents = (e) => {
    dispatch(orderCont(e.target.value));
    handlerPagination(1);
  };

  const handleChangeSort = (event) => {
    switch (event.target.value) {
      case "ALL":
        dispatch(getCountries());
        handlerPagination(1);
        break;
      case "A-Z":
        dispatch(orderAlphabetic());
        handlerPagination(1);
        break;
      case "Z-A":
        dispatch(orderAlphabeticRev());
        handlerPagination(1);
        break;
      case "↑ POPULATION":
        dispatch(orderPop());
        handlerPagination(1);
        break;
      case "↓ POPULATION":
        dispatch(orderPopRev());
        handlerPagination(1);
        break;

      default:
        break;
    }
  };

  const handlerActivities = (event) => {
    dispatch(filterActivities(event.target.value));
    handlerPagination(1);
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/home">
        <img src={ico} alt="ico" className={styles.ico} />
      </Link>

      {location.pathname === "/home" && (
        <SearchBar handlerPagination={handlerPagination} />
      )}

      {location.pathname === "/home" && (
        <div>
          <p>Filter by Continent</p>
          <div>
            <select
              onChange={handlerFilterContinents}
              className={styles.continents}
            >
              <option value="All">All</option>
              <option value="Americas">AMERICAS</option>
              <option value="Europe">EUROPE</option>
              <option value="Africa">AFRICA</option>
              <option value="Oceania">OCEANIA</option>
              <option value="Asia">ASIA</option>
              <option value="Antarctic">ANTARCTIC</option>
            </select>
          </div>
        </div>
      )}

      {location.pathname === "/home" && (
        <div>
          <p>Filter by Order</p>
          <select className={styles.sort} onChange={handleChangeSort}>
            <option value="ALL">All</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="↑ POPULATION">↑ POPULATION</option>
            <option value="↓ POPULATION">↓ POPULATION</option>
          </select>
        </div>
      )}

      {location.pathname === "/home" && (
        <div>
          <p>Search by Activities</p>
          <select onChange={handlerActivities} className={styles.sort}>
            <option value="All">All</option>
            {activities.map((e) => {
              return (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>
      )}

      <ul className={styles.navLinks}>
        <li>
          <Link to="/newactivity" className={styles.link}>
            CREATE AN ACTIVITY
          </Link>
        </li>
      </ul>
    </nav>
  );
}
