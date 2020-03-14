"use strict";
module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define(
    "ticket",
    {
      id_user: DataTypes.INTEGER,
      id_train: DataTypes.INTEGER,
      id_trainClass: DataTypes.INTEGER,
      totalTicket: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      status: DataTypes.ENUM("pending", "finished"),
      attachment: DataTypes.STRING
    },
    {}
  );
  ticket.associate = function(models) {
    ticket.belongsTo(models.user, {
      foreignKey: "id_user",
      as: "owned"
    });
    ticket.belongsTo(models.train, {
      foreignKey: "id_train",
      as: "ticketTrain"
    });
    ticket.belongsTo(models.trainClass, {
      foreignKey: "id_trainClass",
      as: "ticketTrainClass"
    });
  };
  return ticket;
};
