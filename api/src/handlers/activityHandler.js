const { getActivities } = require("../controllers/activityController");

const activitiesHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const response = await getActivities(name);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  activitiesHandler,
};
