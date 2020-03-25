"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Test",
          username: "test",
          email: "test@gmail.com",
          password: "initest",
          gender: "female",
          phone: "12345",
          address: "Di Rumah Test",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
