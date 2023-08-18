const express = require('express');

// Environment variables
const dotenv = require('dotenv');
dotenv.config({
  path: './config/env/config.env'
})

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req,res) => {
  res.send("Welcome Question Answer API");
})

app.listen(PORT, () => {
  console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`);
})

