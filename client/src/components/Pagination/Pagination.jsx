import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({
  countriesPerPage,
  countries,
  pagination,
}) {
  const pageNumber = [];

  for (let i = 1; i <= Math.floor(countries / countriesPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className={styles.pagination}>
      <ul className={styles.pagination}>
        {pageNumber &&
          pageNumber.map((number, id) => (
            <li className={styles.pagination} key={id}>
              <button onClick={() => pagination(number)}>{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
