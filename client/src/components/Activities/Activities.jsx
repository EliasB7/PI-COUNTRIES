import React from "react";
import { Link } from "react-router-dom";
import styles from "./Activities.moduel.css";

const Activities = ({ activities, countryName }) => {
  if (activities && activities.length > 0) {
    return (
      <div className="box">
        <h3>Activities planed for this country: {countryName}</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Duration</th>
              <th>Season</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {activities &&
              activities.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.duration}</td>
                  <td>{a.season}</td>
                  <td>{a.difficulty}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <Link to="/newactivity">
        <h3 className={styles.link}>CREATE AN ACTIVITY FOR THIS COUNTRY :D</h3>
      </Link>
    );
  }
};

export default Activities;
