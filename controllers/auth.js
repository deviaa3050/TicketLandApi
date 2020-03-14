const jwt = require("jsonwebtoken");
const models = require("../models");
const bcrypt = require("bcrypt");

const User = models.user;

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await User.findOne({
      where: { username }
    });
    console.log(data);
    if (data) {
      let verify = bcrypt.compareSync(password, data.password);
      if (verify) {
        const token = jwt.sign({ user_id: data.id }, process.env.SECRET_KEY);
        res.send({
          message: "Success",
          data: data,
          status: true,
          username,
          token
        });
      } else {
        res.send({ message: "Username or Password is Invalid" });
      }
    } else {
      res.send({ message: "Invalid Login" });
    }
  } catch (error) {
    console.log(error);
    res.send("salah");
  }
};

exports.register = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      gender,
      phone,
      address
    } = req.body;

    const findMail = await User.findOne({
      where: { email }
    });

    if (findMail) {
      res.send({ message: "Email Exist" });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const data = await User.create({
        name,
        username,
        email,
        password: hash,
        gender,
        phone,
        address
      });
      if (data) {
        const token = jwt.sign({ user_id: data.id }, process.env.SECRET_KEY);
        res.send({
          message: "Register Success",
          data: { username, email },
          token: token
        });
      } else {
        res.send({ message: "Register Failed" });
      }
    }
  } catch (error) {
    res.send("Catched");
    console.log(error);
  }
};
