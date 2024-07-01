
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  mobile: String,
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
});

module.exports = mongoose.model('User', UserSchema);


