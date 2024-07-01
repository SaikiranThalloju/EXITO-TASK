const mongoose = require('mongoose');

const AuthUserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password : {type : String}
});

module.exports = mongoose.model('AuthUser', AuthUserSchema);
