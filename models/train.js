"use strict";
module.exports = (sequelize, DataTypes) => {
  const train = sequelize.define(
    "train",
    {
      trainName: DataTypes.STRING,
      id_trainClass: DataTypes.INTEGER,
      dateStart: DataTypes.DATEONLY,
      departure: DataTypes.TIME,
      arrival: DataTypes.TIME,
      from: DataTypes.STRING,
      to: DataTypes.STRING,
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER
    },
    {}
  );
  train.associate = function(models) {
    train.belongsTo(models.trainClass, {
      foreignKey: "id_trainClass",
      as: "type"
    });
  };
  return train;
};
