const Token = require('../../models/Token');

const sendJwtToClient = async (user, res) => {

  const token = user.generateJwtFromUser();

  const { JWT_COOKIE_EXPIRE, NODE_ENV } = process.env

  const expireAt = new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE) * 1000)

  const createdToken = await Token.create({
    token,
    expireAt
  })

  return res.status(200).cookie("access_token", token, {
    httpOnly: true,
    expires: expireAt,
    secure: NODE_ENV === "development" ? false : true
  })
  .json({
    success: true,
    access_token: token,
    createdToken,
    data: {
      name: user.name,
      email: user.email
    }
  })
}

const isTokenIncluded = (req) => {
  return req.headers.authorization && req.headers.authorization.startsWith('Bearer:')
}

const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;
  const access_token = authorization.split(" ")[1];
  return access_token;
}

module.exports = {
  sendJwtToClient,
  isTokenIncluded,
  getAccessTokenFromHeader
}