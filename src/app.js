const express = require('express');
const taskRoutes = require('./routes/task');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:8080', // Your React frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
  }));

app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/tasks', taskRoutes);

module.exports = app;