import styles from "./Card.module.css";
import React from "react";
import { Link } from "react-router-dom";

const Card = ({ flags, continent, name, id }) => {
  return (
    <Link to={`/countries/${id}`} className={styles.link}>
      <div className={styles.card}>
        <img className={styles.image} src={flags} alt={name} />
        <div>
          <h2>{name}</h2>
          <p>{continent}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
