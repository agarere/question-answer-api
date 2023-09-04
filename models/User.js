const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

UserSchema.pre("save", function (next) {

  if (!this.isModified("password")) {
    next();
  }

  bcrypt.genSalt(10, (err, salt) => {

    if (err) next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      
      if (err) next(err);
      
      this.password = hash;
      next();
    });
  });

});

module.exports = mongoose.model("User", UserSchema);