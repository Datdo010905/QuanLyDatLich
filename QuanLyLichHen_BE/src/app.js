const express = require('express');
const cors = require('cors');
const dichVuRoutes = require('./routes/dichVuRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();

// Middleware
app.use(cors()); //không bị lỗi domain
app.use(express.json()); 

//CẤU HÌNH STATIC FILE CHO ẢNH
app.use('/img/product', express.static('uploads'));

// kết nối Route vào App
app.use('/api/dichvu', dichVuRoutes);
app.use('/api/login', loginRoutes);

module.exports = app;