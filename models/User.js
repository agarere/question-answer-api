const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

  name: {
    type: String,
    required: [true, "Please provide a name"]
  },

  email: {
    type: String,
    required: [true, "Please provide a email address"],
    unique: [true, "Please try a differenct email address"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a valid email address"
    ]
  },

  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"]
  },

  password: {
    type: String,
    minlength: 6,
    required: [true, "Please provide a password"],
    select: false // user çektiğin zaman bu alan görülmemesi için
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

  title: {
    type: String
  },

  about: {
    type: String
  },

  place: {
    type: String
  },

  website: {
    type: String
  },

  profile_image: {
    type: String,
    default: "default.jpg"
  },

  blocked: {
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model("User", UserSchema);