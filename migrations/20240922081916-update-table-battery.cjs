'use strict';

const Sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const db = await import('../config/database.js'); // Dynamic import for ES Module

    await queryInterface.addColumn('Battery', 'tegangan', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Battery', 'arus', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Battery', 'daya', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Battery', 'suhu', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Add reverting commands here
  }
};
