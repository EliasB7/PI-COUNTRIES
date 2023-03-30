const express = require("express");
const router = express.Router();
const { createActivity } = require("../controllers/activityController");
const { activitiesHandler } = require("../handlers/activityHandler");

router.get("/", activitiesHandler);
router.post("/newactivity", createActivity);

module.exports = router;
