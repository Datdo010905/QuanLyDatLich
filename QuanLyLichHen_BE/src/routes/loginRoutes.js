const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/login-taikhoan', loginController.dangNhap);
router.post('/signup-taikhoan', loginController.dangKy);
router.post('/insert-khachhang', loginController.themKhachHang);

module.exports = router;