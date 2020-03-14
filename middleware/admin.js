const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.user;

exports.admin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); //biar dapet tokennya
    const data = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      where: { id: data.user_id }
    });
    if (!user) {
      throw new Error();
    }

    if (user.name == "Admin") {
      req.user = user.id;
      // req.user - data.user_id;
      req.token = token;
      next(); // biar lanjut ke selanjutnya controller
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
