"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "trainClasses",
      [
        {
          className: "executive",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          className: "bussiness",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          className: "economy",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("trainClasses", null, {});
  }
};
