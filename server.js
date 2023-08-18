const express = require('express');
const routers = require('./routers');

// Environment variables
const dotenv = require('dotenv');
dotenv.config({
  path: './config/env/config.env'
})

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api", routers);

app.listen(PORT, () => {
  console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`);
})

