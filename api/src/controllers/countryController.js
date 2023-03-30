const { Country, Activity } = require("../db");
const axios = require("axios");
const { Op, Sequelize } = require("sequelize");

async function saveCountries() {
  const allCountries = await (
    await axios("https://restcountries.com/v3/all")
  ).data; //me traigo la informacion de la api y la guardo en la constante allCountries
  const addCountries = await allCountries.map((country) => {
    return {
      id: country.cca3,
      name: country.name.common,
      flags: country.flags[0],
      continent: country.region,
      capital: country.capital ? country.capital[0] : "Unknown",
      population: country.population,
    };
  });

  const dbCountries = await Country.bulkCreate(addCountries);
  return dbCountries;
}

async function getCountries(name) {
  if (!name) {
    const countryAll = await Country.findAll();
    return !countryAll.length ? await saveCountries() : countryAll; //si el length de countyAll es 0 entonces ejecuto la funcion saveCountries y guarda la info, si no devuelve countryAll
  } else {
    const countryQuery = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: Activity,
    });

    return countryQuery;
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
  GetCountryId,
  getCountries,
  saveCountries,
};
