const { getCountries } = require("../controllers/countryController");

const countriesHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const response = await getCountries(name);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  countriesHandler,
};
