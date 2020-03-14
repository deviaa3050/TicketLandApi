"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "tickets",
      [
        {
          id_user: 1,
          id_train: 1,
          id_trainClass: 1,
          totalTicket: 1,
          totalPrice: 300000,
          status: "pending",
          attachment: "http://inipunyatest.com",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tickets", null, {});
  }
};
