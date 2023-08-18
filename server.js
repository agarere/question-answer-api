const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT;

app.get("/", (req,res) => {
  res.send("Welcome Question Answer API");
})

app.listen(PORT, () => {
  console.log(`App Started on ${PORT}`);
})

