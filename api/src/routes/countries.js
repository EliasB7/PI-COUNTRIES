const express = require("express");
const router = express.Router();
const { GetCountryId } = require("../controllers/countryController");
const { countriesHandler } = require("../handlers/countriesHandlers");

router.get("/", countriesHandler);
router.get("/:id", GetCountryId);

module.exports = router;
