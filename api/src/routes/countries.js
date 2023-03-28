const express = require("express");
const router = express.Router();
const {
  getCountries,
  GetCountryId,
  saveCountries,
} = require("../controllers/countryController");

router.post("/", saveCountries);
router.get("/", getCountries);
router.get("/:id", GetCountryId);

module.exports = router;
