const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');
const { sendJwtToClient } = require('../helpers/authorization/TokenHelper');

const register = asyncErrorWrapper(async (req, res, next) => {
  
  const { name, email, password, role } = req.body

  const user = await User.create({
    name,
    email,
    password,
    role
  })

  // const token = user.generateJwtFromUser();
  // console.log(token)

  // res.status(200).json({
  //   success: true,
  //   data: user
  // })

  sendJwtToClient(user, res)
});

const errorTest = (req, res, next) => {
  // throw new Error("Bir hata oluştu")

  // return next(new Error("Bir hata oluştu"))

  // return next(new CustomError("Custom Error Message", 400))

  return next(new TypeError("Type Error"))
}

const tokenTest = (req, res, next) => {
  res.json({
    success: true,
    message: "Welcome"
  })
}

module.exports = {
  register,
  errorTest,
  tokenTest
}