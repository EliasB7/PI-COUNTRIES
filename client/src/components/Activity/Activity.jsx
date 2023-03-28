import React from "react";
import Form from "../Form/Form";
import styles from "./Activity.module.css";

export const Activity = () => {
  return (
    <div>
      <h1 className={styles.color}>Create A New Activity</h1>
      <Form />
    </div>
  );
};

export default Activity;
