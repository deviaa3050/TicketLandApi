"use strict";
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define(
    "payment",
    {
      user_id: DataTypes.INTEGER,
      train_id: DataTypes.INTEGER,
      trainClass_id: DataTypes.INTEGER,
      totalTicket: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      attachment: DataTypes.STRING,
      status: DataTypes.ENUM("pending", "cancelled", "approved")
    },
    {}
  );
  payment.associate = function(models) {
    payment.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "paymentUser"
    });

    payment.belongsTo(models.train, {
      foreignKey: "train_id",
      as: "paymentTrain"
    });

    payment.belongsTo(models.trainClass, {
      foreignKey: "trainClass_id",
      as: "paymentTrainClass"
    });
  };
  return payment;
};
