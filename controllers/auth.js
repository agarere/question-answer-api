const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const register = asyncErrorWrapper(async (req, res, next) => {
  
  const { name, email, password, role } = req.body

  const user = await User.create({
    name,
    email,
    password,
    role
  })

  res.status(200).json({
    success: true,
    data: user
  })
});

const errorTest = (req, res, next) => {
  // throw new Error("Bir hata oluştu")

  // return next(new Error("Bir hata oluştu"))

  // return next(new CustomError("Custom Error Message", 400))

  return next(new TypeError("Type Error"))
}

module.exports = {
  register,
  errorTest
}