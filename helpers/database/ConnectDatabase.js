const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB Connection Successful')
    })
    .catch((error) => {
      console.error(error)
    })
}

module.exports = connectDatabase;