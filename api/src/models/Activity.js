const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("activity", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    difficulty: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      allowNull: false,
    },

    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    season: {
      type: DataTypes.ENUM(
        "Verano",
        "Otoño",
        "Invierno",
        "Primavera",
        "All Seasons"
      ),
      allowNull: false,
    },
  });
};
