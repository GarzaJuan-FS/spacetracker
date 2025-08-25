"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StarsPlanets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // This is a join table, associations are handled in Star and Planet models
    }
  }
  StarsPlanets.init(
    {
      starId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Stars",
          key: "id",
        },
      },
      planetId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Planets",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "StarsPlanets",
    }
  );
  return StarsPlanets;
};
