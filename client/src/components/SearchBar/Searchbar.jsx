import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  useEffect(() => {
    dispatch(getCountriesByName(name));
  }, [name]);

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
