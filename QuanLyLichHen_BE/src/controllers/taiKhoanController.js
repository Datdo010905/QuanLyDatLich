const taiKhoanService = require('../services/taiKhoanService');

const getAll = async (req, res) => {
    try {
        const data = await taiKhoanService.getAllTaiKhoan();
        return res.status(200).json({ success: true, message: "Lấy danh sách tài khoản thành công!", data: data });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi: " + error.message });
    }
};

const getByID = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await taiKhoanService.checkTaiKhoanTonTai(id);

        if (data) {
            return res.status(200).json({ success: true, message: "Tìm thấy tài khoản thành công!", data: data });
        } else {
            return res.status(404).json({ success: false, message: `Không tìm thấy tài khoản có mã: '${id}'` });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi: " + error.message });
    }
};

const create = async (req, res) => {
    try {
        // Lấy dữ liệu từ body
        const data = req.body;
        const isExist = await taiKhoanService.checkTaiKhoanTonTai(data.MATK);

        if (!isExist) {
            const newData = await taiKhoanService.createTaiKhoan(data);
            return res.status(201).json({ success: true, message: "Thêm thông tin tài khoản thành công!", data: newData });
        } else {
            return res.status(400).json({ success: false, message: `Đã tồn tại tài khoản có mã: '${data.MATK}'` });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi: " + error.message });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id; // Lấy ID từ URL
        const data = req.body;

        const isExist = await taiKhoanService.checkTaiKhoanTonTai(id);
        if (isExist) {
            const updatedData = await taiKhoanService.updateTaiKhoan(id, data);
            return res.status(200).json({ success: true, message: "Thay đổi thông tin tài khoản thành công!", data: updatedData });
        } else {
            return res.status(404).json({ success: false, message: `Không tồn tại tài khoản có mã: '${id}' để thay đổi` });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi: " + error.message });
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const isExist = await taiKhoanService.checkTaiKhoanTonTai(id);

        if (isExist) {
            await taiKhoanService.deleteTaiKhoan(id);
            return res.status(200).json({ success: true, message: "Xoá thông tin tài khoản thành công!" });
        } else {
            return res.status(404).json({ success: false, message: `Không tồn tại tài khoản có mã: '${id}' để xoá` });
        }
    } catch (error) {
        // Bắt lỗi khóa ngoại nếu tài khoản đang dính tới Khách Hàng hoặc Thợ
        if (error.message.includes('Foreign key constraint failed') || error.code === 'P2003') {
            return res.status(400).json({ success: false, message: "Tài khoản này đang được sử dụng, không thể xóa!" });
        }
        return res.status(500).json({ success: false, message: "Lỗi: " + error.message });
    }
};

module.exports = { getAll, getByID, create, update, remove };