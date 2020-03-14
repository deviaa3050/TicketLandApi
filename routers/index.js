const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/index");
const { admin } = require("../middleware/admin");

const train = require("../controllers/train");
const user = require("../controllers/auth");
const ticket = require("../controllers/ticket");

router.get("/showtrains", train.showTrains);

router.get("/trains", train.showTrainsAll);

router.post("/train", train.showTrain);

router.post("/addtrain", train.addTrain);

router.post("/login", user.login);

router.post("/register", user.register);

router.post("/order", auth, ticket.orderTicket);

router.get("/my_ticket", auth, ticket.myTicket);

router.get("/getOrders", ticket.getOrders);

router.put("/changeStatus/:id", admin, ticket.changeStatus);

module.exports = router;
