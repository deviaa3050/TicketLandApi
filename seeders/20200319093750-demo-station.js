"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "stations",
      [
        {
          code: "GBU",
          stationName: "Gubeng",
          city: "Surabaya",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          code: "PST",
          stationName: "Pasar Turi",
          city: "Surabaya",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          code: "PSE",
          stationName: "Pasar Senen",
          city: "Jakarta",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          code: "GBR",
          stationName: "Gambir",
          city: "Jakarta",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("stations", null, {});
  }
};
