const models = require("../models");

const Train = models.train;
const TrainClass = models.trainClass;
const Ticket = models.ticket;
const User = models.user;

exports.orderTicket = async (req, res) => {
  try {
    const id_user = req.user;

    if (id_user) {
      const {
        id_train,
        id_trainClass,
        totalTicket,
        totalPrice,
        status,
        attachment
      } = req.body;

      const createData = await Ticket.create({
        id_user: id_user,
        id_train,
        id_trainClass,
        totalTicket,
        totalPrice,
        status,
        attachment
      });

      if (createData) {
        const data = await Ticket.findOne({
          where: { id_user, status: "pending" },
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
          include: [
            {
              model: Train,
              attributes: [
                "trainName",
                "dateStart",
                "from",
                "departure",
                "to",
                "arrival",
                "price"
              ],
              as: "ticketTrain"
            },
            {
              model: TrainClass,
              attributes: ["className"],
              as: "ticketTrainClass"
            },
            {
              model: User,
              attributes: ["username", "gender", "phone", "address"],
              as: "owned"
            }
          ]
        });
        res.send({ message: "ticket ordered", data });
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

exports.getOrders = async res => {
  try {
    const data = await Ticket.findAll();
    if (data) {
      res.send({ data: data });
    } else {
      res.send({ message: "No Tickets Ordered Today" });
    }
  } catch (error) {
    res.send({ message: "There are some erros", error });
    console.log(error);
  }
};

// exports.getOrder = async (req, res) => {
//   try {
//     const id_user = req.user;

//     const data = await Ticket.findOne({
//       where: { id_user }
//     });

//     if(data){

//     }
//   } catch (error) {
//     res.send({ message: "There are some erros", error });
//     console.log(error);
//   }
// };

exports.getMax = async id_user => {
  try {
    const max = await Ticket.findOne(
      {
        where: { id_user }
      },
      {
        attributes: [
          [sequelize.fn("max", sequelize.col("updatedAt")), "updatedAt"]
        ],

        raw: true
      }
    );

    if (max) {
      return max;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { id_user } = req.params;

    const { status } = req.body;

    const update = await Ticket.update(
      {
        status
      },
      {
        where: {
          id_user,
          status: "pending",
          updatedAt: this.getMax(id_user)
        }
      }
    );

    if (update) {
      const data = await Ticket.findOne({
        where: {
          id_user,
          updatedAt: this.getMax(id_user)
        }
      });

      res.send({ message: "Ticket updated", data: data });
    } else {
      res.send({ message: "Updating ticket failed" });
    }
  } catch (error) {
    res.send({ message: "There are some erros", error });
    console.log(error);
  }
};
