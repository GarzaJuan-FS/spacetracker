"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Galaxies", "image", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Stars", "image", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Planets", "image", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Galaxies", "image");
    await queryInterface.removeColumn("Stars", "image");
    await queryInterface.removeColumn("Planets", "image");
  },
};
