"use strict";
module.exports = (sequelize, DataTypes) => {
  const train = sequelize.define(
    "train",
    {
      trainName: DataTypes.STRING,
      idTrainClass: DataTypes.INTEGER,
      departureDate: DataTypes.DATEONLY,
      departureTime: DataTypes.TIME,
      idFrom: DataTypes.INTEGER,
      arrivalDate: DataTypes.DATEONLY,
      arrivalTime: DataTypes.TIME,
      idTo: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER
    },
    {}
  );
  train.associate = function(models) {
    train.belongsTo(models.trainClass, {
      foreignKey: "idTrainClass",
      as: "trainTrainClass"
    });

    train.belongsTo(models.station, {
      foreignKey: "idFrom",
      as: "trainFrom"
    });

    train.belongsTo(models.station, {
      foreignKey: "idTo",
      as: "trainTo"
    });
  };
  return train;
};
