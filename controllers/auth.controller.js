const createError = require('http-errors');
const { authSchema } = require('../joi/auth.validation');
const User = require('../models/user.model');

module.exports = {
  register: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
      const isExist = await User.findOne({ email: result.email });
      if (isExist) throw createError.Conflict(`${result.email} is already exist`);

      const newUser = new User(result);
      const savedUser = await newUser.save();
      res.send(savedUser);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
};
