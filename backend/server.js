const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://your-frontend-production-url.com'], // add your frontend URL here
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // allow credentials like cookies
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // apply the CORS middleware with options
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
