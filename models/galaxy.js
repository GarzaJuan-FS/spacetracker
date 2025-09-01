"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Galaxy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Galaxy has many Stars
      Galaxy.hasMany(models.Star, {
        foreignKey: "galaxyId",
      });
    }
  }
  Galaxy.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Galaxy",
    }
  );
  return Galaxy;
};
