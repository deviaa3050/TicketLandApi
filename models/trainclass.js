"use strict";
module.exports = (sequelize, DataTypes) => {
  const trainClass = sequelize.define(
    "trainClass",
    {
      className: DataTypes.ENUM("executive", "bussiness", "economy")
    },
    {}
  );
  trainClass.associate = function(models) {};
  return trainClass;
};
