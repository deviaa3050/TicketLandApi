require("dotenv").config(); //ambil .ENV

const express = require("express"); //ambil modul express
const app = express(); //taruh di app

const routes = require("./routers"); //ambil router

const cors = require("cors");

const port = process.env.PORT; //port dr .ENV

app.use(cors());

app.use(express.json());

app.use("/api/v1", routes);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "You are not authorized." });
  } else {
    next(err);
  }
});

app.listen(port, () => console.log(`Server is running in port ${port}`));
