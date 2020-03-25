const models = require("../models");
const moment = require("moment");

const Train = models.train;
const TrainClass = models.trainClass;
const Station = models.station;
const User = models.user;

exports.searchTrainByDate = async (req, res) => {
  try {
    const { departureDate } = req.query;
    console.log(departureDate);
    const data = await Train.findAll({
      where: { departureDate },
      attributes: {
        exclude: ["idTrainClass"]
      },
      include: [
        {
          model: TrainClass,
          as: "trainTrainClass",
          attributes: ["className"]
        }
      ]
    });

    if (data) {
      res.send({ message: "data found", data });
    } else {
      console.log(data);
      res.send({ message: "data not found", data });
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.searchTrain = async (req, res) => {
  try {
    const { departureDate, from, to } = req.body;
    console.log("haai", req.body);
    const idFrom = await Station.findOne({
      where: { stationName: from },
      attributes: ["id"]
    });
    console.log(idFrom);

    const idTo = await Station.findOne({
      where: { stationName: to },
      attributes: ["id"]
    });

    console.log(req.query);
    const data = await Train.findAll({
      where: { departureDate, idFrom: idFrom.id, idTo: idTo.id },
      attributes: {
        exclude: ["idTrainClass", "idFrom", "idTo"]
      },
      include: [
        {
          model: TrainClass,
          as: "trainTrainClass",
          attributes: ["className"]
        },
        {
          model: Station,
          as: "trainFrom",
          attributes: ["stationName"]
        },
        {
          model: Station,
          as: "trainTo",
          attributes: ["stationName"]
        }
      ]
    });

    if (data) {
      res.send({ message: "data found", data });
    } else {
      res.send({ message: "No data" });
    }
  } catch (error) {
    res.send("There are some errors");
    console.log(error);
  }
};

exports.showTrainsAll = async (req, res) => {
  try {
    const data = await Train.findAll({
      attributes: {
        exclude: ["idTrainClass", "idFrom", "idTo", "createdAt", "updatedAt"]
      },
      include: [
        {
          model: TrainClass,
          as: "trainTrainClass",
          attributes: ["className"]
        },
        {
          model: Station,
          as: "trainFrom",
          attributes: ["code", "stationName", "city"]
        },
        {
          model: Station,
          as: "trainTo",
          attributes: ["code", "stationName", "city"]
        }
      ]
    });

    if (data) {
      res.send({ message: "data found", data });
    } else {
      console.log(data);
      res.send({ message: "data not found", data });
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.addTrain = async (req, res) => {
  try {
    const id_user = req.user;

    const admin = await User.findOne({
      where: { id: id_user }
    });

    if (admin.role == "admin") {
      const {
        trainName,
        idTrainClass,
        departureDate,
        departureTime,
        idFrom,
        arrivalDate,
        arrivalTime,
        idTo,
        price,
        quantity
      } = req.body;

      const departureDates = moment(departureDate).format();
      const arrivalDates = moment(arrivalDate).format();

      const data = await Train.create({
        trainName,
        idTrainClass,
        departureDate: departureDates,
        departureTime,
        idFrom,
        arrivalDate: arrivalDates,
        arrivalTime,
        idTo,
        price,
        quantity
      });

      if (data) {
        res.send({ message: "Data created", data: data });
      } else {
        res.send({ message: "Data not created" });
      }
    } else {
      res.send({ message: "Only Admin has Authorization for this action" });
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};
