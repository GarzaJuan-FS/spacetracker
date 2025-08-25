"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Planet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Planet belongs to many Stars (binary star systems)
      Planet.belongsToMany(models.Star, {
        through: models.StarsPlanets,
        foreignKey: "planetId",
        otherKey: "starId",
      });
    }
  }
  Planet.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Planet",
    }
  );
  return Planet;
};
