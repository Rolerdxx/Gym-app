const Login = require("../models/Login.mongo");
const bcryptjs = require("bcryptjs");

const LoginCheck = async (req, res) => {
  const user = await Login.findOne({ email: req.body.email });
  //const secret = process.env.secret;
  if (!user) {
    return res.status(400).send("user not found");
  }
  if (user && bcryptjs.compareSync(req.body.password, user.passwordHash)) {
    // const token = jwt.sign(
    //   {
    //     userId: user.id,
    //     isAdmin: user.isAdmin,
    //   },
    //   secret,
    //   { expiresIn: "1d" }
    // );
    return res
      .status(200)
      .send({ user: user.name, id: user.id /*, token: token */ });
  } else {
    return res.status(200).send("Password wrong");
  }
};

const LoginAdd = async (req, res) => {
  let user;
  user = new Login({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcryptjs.hashSync(req.body.password, 10)
  });
  user = await user.save();
  if (!user) {
    return res.status(500).json({ error: "user cannot be created" });
  }
  return res.status(200).json(user);
};

module.exports = { LoginCheck, LoginAdd };
