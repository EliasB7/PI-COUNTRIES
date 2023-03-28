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
          pageNumber.map((number) => (
            <li className={styles.pagination}>
              <a
                onClick={() => pagination(number)}
                className={styles.pagination}
              >
                {number}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
