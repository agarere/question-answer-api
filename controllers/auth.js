const User = require('../models/User');
const Token = require('../models/Token');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');
const {
  sendJwtToClient,
  isTokenIncluded,
  getAccessTokenFromHeader } = require('../helpers/authorization/TokenHelper');

const { validateUserInput, comparePassword } = require('../helpers/input/InputHelpers');

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

const getUser = (req, res, next) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name
    }
  })
}

const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body
  
  if (!validateUserInput(email, password)) {
    return next(new CustomError("Please check your inputs", 400))
  }

  const user = await User.findOne({ email }).select("+password");

  if (!comparePassword(password, user.password)) {
    return next(new CustomError("Please check your credentials", 400))
  }

  sendJwtToClient(user, res)
})

const logout = asyncErrorWrapper(async (req, res, next) => {
  const {NODE_ENV} = process.env

  if (!isTokenIncluded(req)) {
    return next(new CustomError("You are not authorized to access this route", 401));
  }

  // todo: try - catch
  const accessToken = getAccessTokenFromHeader(req);
  const isToken = await Token.findOne({ token: accessToken })
  if (isToken) {
    const deleted = await Token.deleteOne({ token: accessToken})
  }

  return res.status(200).cookie({
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: NODE_ENV === "development" ? false : true
  })
  .json({
    success: true,
    message: "Logout Successfully"
  })
})

module.exports = {
  register,
  errorTest,
  getUser,
  login,
  logout
}