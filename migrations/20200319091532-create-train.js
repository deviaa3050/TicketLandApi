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
      idTrainClass: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "trainClasses",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      departureDate: {
        type: Sequelize.DATEONLY
      },
      departureTime: {
        type: Sequelize.TIME
      },
      idFrom: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "stations",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      arrivalDate: {
        type: Sequelize.DATEONLY
      },
      arrivalTime: {
        type: Sequelize.TIME
      },
      idTo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "stations",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
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
