import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <h1 className={styles.h1}>Welcome!</h1>
        <Link to="/home">
          <button className={styles.button}>JOIN :D</button>
        </Link>
      </div>
    </div>
  );
}
