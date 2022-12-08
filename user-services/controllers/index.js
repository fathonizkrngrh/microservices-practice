const { user } = require("../db/models");
const bcrypt = require("bcrypt");

module.exports = {
  findOne: async (req, res, next) => {
    try {
      const where = {};
      const { id, email } = req.body;
      if (id) {
        where.id = id;
      }
      if (email) {
        where.email = email;
      }

      const findUser = await user.findOne({ where });
      if (!findUser) {
        return res.status(400).json({
          status: false,
          message: "not found!",
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
          password: findUser.password,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  createUser: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      console.log(user);
      const exist = await user.findOne({ where: { email: email } });
      if (exist) {
        return res.status(500).json({
          status: false,
          message: "email already used!",
          data: null,
        });
      }

      const encryptedPass = await bcrypt.hash(password, 10);
      const createdUser = await user.create({
        name,
        email,
        password: encryptedPass,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: {
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
