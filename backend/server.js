const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const dotenv = require("dotenv");


dotenv.config();

const app = express();
const PORT = process.env.port || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());


app.use('/api', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);



mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

