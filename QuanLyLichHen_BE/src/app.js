const express = require('express');
const cors = require('cors');
const dichVuRoutes = require('./routes/dichVuRoutes');

const app = express();

// Middleware
app.use(cors()); //không bị lỗi domain
app.use(express.json()); 

// kết nối Route vào App
app.use('/api/dichvu', dichVuRoutes);

module.exports = app;