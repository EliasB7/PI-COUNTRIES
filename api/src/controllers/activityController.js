const { Activity, Country } = require("../db");
const axios = require("axios");
const { Op, Sequelize } = require("sequelize");

async function getActivities(req, res) {
  const dbActivities = await Activity.findAll({
    include: {
      model: Country,
      through: {
        attributes: [],
      },
    },
  });
  return dbActivities;
}

async function createActivity(req, res) {
  const { name, difficulty, duration, season, countryID } = req.body;

  const validation = await Activity.findOne({
    where: {
      name: name,
    },
  });

  if (!validation) {
    const addAct = await Activity.create({
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season,
    });

    const matchingcountries = await Country.findAll({
      where: {
        id: countryID,
      },
    });

    const resact = await addAct.addCountries(matchingcountries);

    return res.send(resact);
  }

  const matchingcountries = await Country.findAll({
    where: {
      id: countryID,
    },
  });

  const resact = await validation.addCountries(matchingcountries);

  res.send(resact);
}

module.exports = {
  getActivities,
  createActivity,
};
