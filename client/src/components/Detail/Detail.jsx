import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCountryDetail } from "../../redux/actions";
import Activities from "../Activities/Activities";
import style from "./Detail.module.css";

export default function Detail() {
  const countryDetail = useSelector((state) => state.countryDetail);
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [id]);

  return (
    <div className={style.all}>
      <button className={style.butn}>
        <Link className={style.link} to="/home">
          Back to countries
        </Link>
      </button>
      {countryDetail ? (
        <div className={style.countryContainer}>
          <h1>{countryDetail.name}</h1>
          <h3>{countryDetail.id}</h3>
          <div className={style.imgContainer}>
            <img src={countryDetail.flags} alt="No img" />
          </div>
          <h4>Region: {countryDetail.continent}</h4>
          <h5>Capital: {countryDetail.capital}</h5>
          <h5>Population: {countryDetail.population} Hab. </h5>
          <div className={style.activity}>
            <Activities
              countryName={countryDetail.name}
              activities={countryDetail.activities}
            />
          </div>
        </div>
      ) : (
        <div>NOT COUNTRY DETAIL FOUND :/</div>
      )}
    </div>
  );
}
