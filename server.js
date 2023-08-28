const express = require('express');
const routers = require('./routers');
const connectDatabase = require('./helpers/database/ConnectDatabase');
const customErrorHandler = require('./middlewares/errors/CustomErrorHandler')

// Environment variables
const dotenv = require('dotenv');
dotenv.config({
  path: './config/env/config.env'
})

// MongoDB Connection
connectDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api", routers);

app.use(customErrorHandler)

app.listen(PORT, () => {
  console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`);
})

