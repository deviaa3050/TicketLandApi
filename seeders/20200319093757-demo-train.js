"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "trains",
      [
        {
          trainName: "Dharmawangsa",
          idTrainClass: 1,
          departureDate: "2020-04-30",
          departureTime: "10:00:00",
          idFrom: 1,
          arrivalDate: "2020-04-30",
          arrivalTime: "15:00:00",
          idTo: 4,
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
