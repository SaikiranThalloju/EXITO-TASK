const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthUser = require('../models/AuthUser');
const User = require('../models/User');


const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await AuthUser.findOne({ email }).exec();

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AuthUser({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('SignUp error:', err);
    return res.status(500).json({ message: 'Failed to sign up. Please try again later.' });
  }
};

// Sign-in function
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const authUser = await AuthUser.findOne({ email }).exec();
    const user = await User.findOne({ email }).exec();

    if (!authUser || !user) {
      return res.status(401).json({ message: 'Invalid credentials or Access Denied' });
    }

    const passwordMatch = await bcrypt.compare(password, authUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ email: authUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', accessToken });
  } catch (err) {
    console.error('Sign-in error:', err);
    return res.status(500).json({ message: 'Failed to sign in. Please try again later.' });
  }
};

module.exports = {
  signUp,
  signIn,
};
