"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      id_train: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "trains",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
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
      totalTicket: {
        type: Sequelize.INTEGER
      },
      totalPrice: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM("pending", "finished")
      },
      attachment: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable("tickets");
  }
};
