const User = require('../models/User');
const Role = require('../models/Role');

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, mobile, roles } = req.body;

  try {
    const user = new User({ firstName, lastName, email, mobile, roles });
    await user.save();
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('roles');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, mobile, roles } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { firstName, lastName, email, mobile, roles }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
