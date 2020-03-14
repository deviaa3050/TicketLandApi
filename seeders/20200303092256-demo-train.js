"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "trains",
      [
        {
          trainName: "Agro Willis",
          id_trainClass: 1,
          dateStart: "2020-03-03",
          departure: "07:00:00",
          arrival: "19:00:00",
          from: "Stasiun Manggarai",
          to: "Stasiun Surabaya Pasar Turi",
          price: 300000,
          quantity: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("trains", null, {});
  }
};
