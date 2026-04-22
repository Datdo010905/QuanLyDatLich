const taiKhoanService = require('../services/taiKhoanService');
const khachHangService = require('../services/khachHangService');

// Import package JWT để tạo token
const jwt = require('jsonwebtoken'); 

const dangNhap = async (req, res) => {
    try {
        // Lấy data từ Body
        const { username, pass } = req.body;

        if (!username || !pass) {
            return res.status(400).json({ success: false, message: "Thiếu username hoặc password!" });
        }

        // Kiểm tra đăng nhập
        const user = await taiKhoanService.checkLogin(username, pass);

        if (!user) {
            return res.status(401).json({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu!" });
        }

        //thành công, Sinh Token
        const payload = {
            MaTK: user.MATK,
            PhanQuyen: user.PHANQUYEN
        };

        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, // Lấy khóa bí mật từ .env
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Trả về cho Client
        return res.status(200).json({
            success: true,
            message: "Đăng nhập thành công!",
            token: token,
            data: {
                MATK: user.MATK.trim(),
                PASS: user.PASS.trim(),
                PHANQUYEN: user.PHANQUYEN,
                TRANGTHAI: user.TRANGTHAI.trim()
            }
        });

    } catch (error) {
        console.error("Lỗi Đăng Nhập:", error);
        return res.status(500).json({ success: false, message: "Lỗi hệ thống: " + error.message });
    }
};
const dangKy = async (req, res) => {
    try {
        const data = req.body;
        
        const isExist = await taiKhoanService.checkTaiKhoanTonTai(data.MaTK);
        if (isExist) {
            return res.status(400).json({ 
                success: false, 
                message: `Đã tồn tại tài khoản có mã: '${data.MaTK}'` 
            });
        }

        const newAccount = await taiKhoanService.createTaiKhoan(data);
        
        return res.status(201).json({ 
            success: true, 
            message: "Thêm thông tin tài khoản thành công!", 
            data: newAccount 
        });

    } catch (error) {
        console.error("Lỗi Đăng Ký:", error);
        return res.status(500).json({ success: false, message: "Lỗi hệ thống: " + error.message });
    }
};

const themKhachHang = async (req, res) => {
    try {
        const data = req.body;

        const isKHExist = await khachHangService.checkKhachHangTonTai(data.MaKH);
        if (isKHExist) {
            return res.status(400).json({ 
                success: false, 
                message: `Đã tồn tại khách hàng có mã: '${data.MaKH}'` 
            });
        }

        const isSDTExist = await khachHangService.checkSDTTonTai(data.SDT);
        if (isSDTExist) {
            return res.status(400).json({ 
                success: false, 
                message: `Đã tồn tại khách hàng dùng số điện thoại: '${data.SDT}'` 
            });
        }

        const newKhachHang = await khachHangService.createKhachHang(data);
        
        return res.status(201).json({ 
            success: true, 
            message: "Thêm thông tin khách hàng thành công!", 
            data: newKhachHang 
        });

    } catch (error) {
        console.error("Lỗi Thêm Khách Hàng:", error);
        return res.status(500).json({ success: false, message: "Lỗi hệ thống: " + error.message });
    }
};
module.exports = {
    dangNhap,
    dangKy,
    themKhachHang
};