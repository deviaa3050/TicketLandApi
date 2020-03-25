const models = require("../models");
const moment = require("moment");

const Train = models.train;
const TrainClass = models.trainClass;
const Station = models.station;

exports.addStation = async (req, res) => {
  try {
    const { code, stationName, city } = req.body;

    const finding = await Station.findOne({
      where: { code, stationName }
    });
    if (finding) {
      res.send({ message: "Code or Station already exist" });
    } else {
      const data = await Station.create({
        code,
        stationName,
        city
      });
      if (data) {
        res.send(data);
      } else {
        res.send({ message: "Data created failed" });
      }
    }
  } catch (error) {
    res.send("There are some errors");
    console.log(error);
  }
};
