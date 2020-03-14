"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("trains", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trainName: {
        type: Sequelize.STRING
      },
      id_trainClass: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "trainClasses",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      dateStart: {
        type: Sequelize.DATEONLY
      },
      departure: {
        type: Sequelize.TIME
      },
      arrival: {
        type: Sequelize.TIME
      },
      from: {
        type: Sequelize.STRING
      },
      to: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("trains");
  }
};
