const User = require('../models/User');

const register = async (req, res, next) => {
  const name = "Ediz Ağarer"
  const email = "edizagarer@gmail.com"
  const password = "123456"
  // todo:
  const user = await User.create({
    name,
    email,
    password
  })

  res.status(200).json({
    success: true,
    data: user
  })
}

module.exports = {
  register
}