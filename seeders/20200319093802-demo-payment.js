"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "payments",
      [
        {
          user_id: 1,
          train_id: 1,
          trainClass_id: 1,
          totalTicket: 1,
          totalPrice: 300000,
          attachment: "",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("payments", null, {});
  }
};
