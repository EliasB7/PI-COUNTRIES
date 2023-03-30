import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = ({ handlerPagination }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    setName(event.target.value);
    handlerPagination(1);
  };

  useEffect(() => {
    dispatch(getCountriesByName(name));
  }, [dispatch, name]);

  return (
    <div className={style.searchContainer}>
      <form>
        <input
          className={style.searchInput}
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
