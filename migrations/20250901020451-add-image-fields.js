"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add image field to Planets table
    await queryInterface.addColumn("Planets", "image", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Add image field to Stars table
    await queryInterface.addColumn("Stars", "image", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Add image field to Galaxies table
    await queryInterface.addColumn("Galaxies", "image", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove image field from Planets table
    await queryInterface.removeColumn("Planets", "image");

    // Remove image field from Stars table
    await queryInterface.removeColumn("Stars", "image");

    // Remove image field from Galaxies table
    await queryInterface.removeColumn("Galaxies", "image");
  },
};
