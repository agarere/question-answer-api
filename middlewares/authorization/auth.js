const CustomError = require('../../helpers/error/CustomError');
const jwt = require('jsonwebtoken');

const Token = require('../../models/Token');

const {
  isTokenIncluded,
  getAccessTokenFromHeader
} = require('../../helpers/authorization/TokenHelper');

const getAccessToRoute = async (req, res, next) => {

  const { JWT_SECRET_KEY } = process.env
  
  if (!isTokenIncluded(req)) {
    return next(new CustomError("You are not authorized to access this route", 401));
  }

  const accessToken = getAccessTokenFromHeader(req);

  const isToken = await Token.findOne({ token: accessToken })
  if (!isToken) {
    console.log('token not found!, token:', accessToken)
    return next(new CustomError("You are not authorized to access this route", 401))
  }

  jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(new CustomError("You are not authorized to access this route", 401))
    }

    req.user = {
      id: decoded.id,
      name: decoded.name
    }

    console.log(decoded);
    next();
  })
}

module.exports = {
  getAccessToRoute
}