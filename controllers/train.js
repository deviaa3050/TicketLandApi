const models = require("../models");
const moment = require("moment");

const Train = models.train;
const TrainClass = models.trainClass;

exports.showTrains = async (req, res) => {
  try {
    const { dateStart } = req.query;
    console.log(dateStart);
    const data = await Train.findAll({
      where: { dateStart },
      include: [
        {
          model: TrainClass,
          as: "type",
          attributes: ["id", "className"]
        }
      ],
      exclude: ["id_trainCLass"]
    });

    if (data) {
      res.send({ message: "data found", data: data });
    } else {
      console.log(data);
      res.send({ message: "data not found", data: data });
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.showTrain = async (req, res) => {
  try {
    const { dateStart, from, to } = req.body;
    console.log(req.body);
    const data = await Train.findAll({
      where: { dateStart, from, to }
    });
    res.send({ message: "Show", data });

    if (data) {
      res.send({ message: "Show", data });
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
    const { from, to, dateStart } = req.body;
    const data = await Train.findAll({
      include: [
        {
          model: TrainClass,
          as: "type",
          attributes: ["id", "className"]
        }
      ],
      exclude: ["id_trainCLass"]
    });

    if (data) {
      res.send({ message: "data found", data: data });
    } else {
      console.log(data);
      res.send({ message: "data not found", data: data });
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.addTrain = async (req, res) => {
  try {
    const {
      trainName,
      id_trainClass,
      dateStart,
      departure,
      arrival,
      from,
      to,
      price,
      quantity
    } = req.body;

    const dates = moment(dateStart).format("DD/MM/YYYY");

    const data = await Train.create({
      trainName,
      id_trainClass,
      dateStart: dates,
      departure,
      arrival,
      from,
      to,
      price,
      quantity
    });

    if (data) {
      res.send({ message: "Data created", data: data });
    } else {
      res.send({ message: "Data not created" });
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};
