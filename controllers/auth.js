const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');

const register = async (req, res, next) => {
  const name = "Ediz Ağarer"
  const email = "edizagarer@gmail.com"
  const password = "1234"


  try {
    const user = await User.create({
      name,
      email,
      password
    })

    res.status(200).json({
      success: true,
      data: user
    })
  } catch (err) {
    return next(err)
  }


}

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