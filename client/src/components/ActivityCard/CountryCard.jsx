import styles from "./CountryCard.module.css";
import React from "react";

const CountryCard = ({ flags, name }) => {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={flags} alt={name} />
      <div>
        <h2>{name}</h2>{" "}
      </div>
    </div>
  );
};

export default CountryCard;
