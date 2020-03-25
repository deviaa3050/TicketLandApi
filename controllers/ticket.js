const models = require("../models");

const Train = models.train;
const TrainClass = models.trainClass;
const Ticket = models.payment;
const User = models.user;
const Station = models.station;

exports.orderTicket = async (req, res) => {
  try {
    const id_user = req.user;

    if (id_user) {
      const {
        train_id,
        trainClass_id,
        totalTicket,
        totalPrice,
        attachment,
        status
      } = req.body;

      const createData = await Ticket.create({
        user_id: id_user,
        train_id,
        trainClass_id,
        totalTicket,
        totalPrice,
        attachment,
        status
      });

      if (createData) {
        const data = await Ticket.findOne({
          where: { id: createData.id },
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
          include: [
            {
              model: Train,
              as: "paymentTrain",
              attributes: [
                "departureDate",
                "arrivalDate",
                "trainName",
                "departureTime",
                "arrivalTime"
              ],
              include: [
                {
                  model: Station,
                  as: "trainFrom",
                  attributes: ["code", "city", "stationName"]
                },
                {
                  model: Station,
                  as: "trainTo",
                  attributes: ["code", "city", "stationName"]
                }
              ]
            },
            {
              model: TrainClass,
              as: "paymentTrainClass",
              attributes: ["className"]
            },
            {
              model: User,
              as: "paymentUser",
              attributes: ["username", "phone", "email"]
            }
          ]
        });

        res.send({ message: "Success", data: data });
      } else {
        res.send("Ordering Failed");
      }
    } else {
      res.send("Login First");
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

exports.myTicket = async (req, res) => {
  try {
    const id_user = req.user;

    if (id_user) {
      const data = await Ticket.findAll({
        where: { id_user },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [
          {
            model: TrainClass,
            attributes: ["className"],
            as: "ticketTrainClass"
          },
          {
            model: User,
            attributes: ["name", "gender", "phone", "address"],
            as: "owned"
          }
        ]
      });

      if (data) {
        res.send({ data: data });
      } else {
        res.send({ message: "No tickets ordered" });
      }
    } else {
      res.send("Login first");
    }
  } catch (error) {
    res.send({ message: "There are some errors", error });
    console.log(error);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const data = await Ticket.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: [
        {
          model: Train,
          as: "paymentTrain",
          attributes: [
            "departureDate",
            "arrivalDate",
            "trainName",
            "departureTime",
            "arrivalTime"
          ],
          include: [
            {
              model: Station,
              as: "trainFrom",
              attributes: ["code", "city", "stationName"]
            },
            {
              model: Station,
              as: "trainTo",
              attributes: ["code", "city", "stationName"]
            }
          ]
        },
        {
          model: TrainClass,
          as: "paymentTrainClass",
          attributes: ["className"]
        },
        {
          model: User,
          as: "paymentUser",
          attributes: ["username", "phone", "email"]
        }
      ]
    });

    res.send({ data });
  } catch (error) {
    // res.send({ message: "There are some erros" });
    console.log(error);
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const id_user = req.user;
    const id = req.params.id;
    console.log("ini id", id);

    const admin = await User.findOne({
      where: { id: id_user }
    });

    if (admin.role == "admin") {
      const drop = await Ticket.destroy({
        where: { id }
      });

      if (drop) {
        const data = await Ticket.findAll({
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
          include: [
            {
              model: Train,
              as: "paymentTrain",
              attributes: [
                "departureDate",
                "arrivalDate",
                "trainName",
                "departureTime",
                "arrivalTime"
              ],
              include: [
                {
                  model: Station,
                  as: "trainFrom",
                  attributes: ["code", "city", "stationName"]
                },
                {
                  model: Station,
                  as: "trainTo",
                  attributes: ["code", "city", "stationName"]
                }
              ]
            },
            {
              model: TrainClass,
              as: "paymentTrainClass",
              attributes: ["className"]
            },
            {
              model: User,
              as: "paymentUser",
              attributes: ["username", "phone", "email"]
            }
          ]
        });
        res.send({ message: "Deleting Success", data: data });
      } else {
        res.send({ message: "Deleting failed" });
      }
    } else {
      res.send({ message: "Only Admin has Authorization for this action" });
    }
  } catch (error) {
    res.send({ message: "Catched" });
    console.log(error);
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const id_user = req.user;
    const id = req.params.id;

    const { status } = req.body;

    const admin = await User.findOne({
      where: { id: id_user }
    });

    if (admin.role == "admin") {
      const update = await Ticket.update(
        {
          status,
          updatedAt: new Date()
        },
        {
          where: {
            id
          }
        }
      );

      if (update) {
        const data = await Ticket.findOne({
          where: {
            id
          }
        });

        res.send({ message: "Ticket updated", data });
      } else {
        res.send({ message: "Updating ticket failed" });
      }
    } else {
      res.send({ message: "Only Admin has Authorization for this action" });
    }
  } catch (error) {
    res.send({ message: "There are some erros", error });
    console.log(error);
  }
};
