const CustomError = require('../../helpers/error/CustomError')

const customErrorHandler = (err, req, res, next) => {
  console.log("Custom Error Handling, Error.name:", err.name);

  let customError = err

  if (err.name === "SyntaxError") {
    customError = new CustomError("Unexpected syntax error", 400)
  }

  if (err.name === "ValidationError") {
    customError = new CustomError(err.message, 400)
  }

  if (err.code === 11000) {
    customError = new CustomError("Duplicate Key Found", 400)
  }

  console.log(customError.message, customError.status)


  res.status(customError.status || 500).json({
    success: false,
    message: customError.message
  })
}

module.exports = customErrorHandler;