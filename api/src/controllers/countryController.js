const { Country, Activity } = require("../db");
const axios = require("axios");
const { Op, Sequelize } = require("sequelize");
const db = require("../db");

async function saveCountries(req, res) {
  try {
    const country = req.body;
    let countries = [];

    const allCountries = await axios.get("https://restcountries.com/v3/all");
    countries.push(...allCountries.data);

    const addCountries = countries.map((country) => {
      return {
        id: country.cca3,
        name: country.name.common,
        flags: country.flags[0],
        region: country.region,
        capital: country.capital ? country.capital[0] : "Unknown",
        population: country.population,
      };
    });
    console.log(addCountries);

    const dbCountiries = await Country.bulkCreate(addCountries, {
      ignoreDuplicates: true,
    });
    console.log(dbCountiries);

    res.json(dbCountiries);
  } catch (error) {
    console.error(error);
  }
}

async function getCountries(req, res) {
  const { name } = req.query;

  try {
    if (!name) {
      const countryAll = await Country.findAll({ include: Activity });
      res.send(countryAll);
    } else {
      const countryQuery = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: Activity,
      });

      if (countryQuery[0]) {
      }
      return res.send(countryQuery);
    }
  } catch (error) {
    res.send(error);
  }
}

async function GetCountryId(req, res) {
  try {
    const id = req.params.id.toUpperCase();
    const country = await Country.findOne({
      where: {
        id: id,
      },
      include: Activity,
    });

    return res.json(country);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  saveCountries,
  GetCountryId,
  getCountries,
};
