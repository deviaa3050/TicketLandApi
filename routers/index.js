const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/index");

const train = require("../controllers/train");
const user = require("../controllers/auth");
const ticket = require("../controllers/ticket");
const station = require("../controllers/station");

router.get("/searchtrainbydate", train.searchTrainByDate);

router.get("/trains", train.showTrainsAll);

// router.post("/train", train.showTrain);

router.post("/searchTrain", train.searchTrain);

router.post("/addTrain", auth, train.addTrain);

router.post("/login", user.login);

router.post("/register", user.register);

router.get("/checkUser", auth, user.checkUser);

router.post("/order", auth, ticket.orderTicket);

router.get("/my_ticket", auth, ticket.myTicket);

router.get("/getOrders", ticket.getOrders);

router.put("/changeStatus/:id", auth, ticket.changeStatus);

router.post("/addStation", station.addStation);

router.delete("/deleteOrder/:id", auth, ticket.deleteTicket);

module.exports = router;
