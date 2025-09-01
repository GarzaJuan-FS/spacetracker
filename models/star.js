"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Star belongs to Galaxy
      Star.belongsTo(models.Galaxy, {
        foreignKey: "galaxyId",
      });

      // Star has many Planets (through join table)
      Star.belongsToMany(models.Planet, {
        through: models.StarsPlanets,
        foreignKey: "starId",
        otherKey: "planetId",
      });
    }
  }
  Star.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      galaxyId: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Star",
    }
  );
  return Star;
};
