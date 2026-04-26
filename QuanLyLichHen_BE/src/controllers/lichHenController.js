const lichHenService = require('../services/lichHenService');


//API (LỊCH HẸN)
const getAll = async (req, res) => {
    try {
        const data = await lichHenService.getAllLichHen();
        return res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getByID = async (req, res) => {
    try {
        const data = await lichHenService.getLichHenByID(req.params.id);
        if (data) return res.status(200).json({
            success: true,
            data: data
        });
        return res.status(404).json({
            success: false,
            message: "Không tìm thấy!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getByIDKH = async (req, res) => {
    try {
        const data = await lichHenService.getLichHenByIDKH(req.params.id);
        if (data) return res.status(200).json({
            success: true,
            data: data
        });
        return res.status(404).json({
            success: false,
            message: "Không tìm thấy!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const create = async (req, res) => {
    try {
        const data = req.body;
        const exist = await lichHenService.getLichHenByID(data.MALICH || data.malich);
        if (exist) return res.status(400).json({
            success: false,
            message: "Mã lịch hẹn đã tồn tại!"
        });

        const newData = await lichHenService.createLichHen(data);
        return res.status(201).json({
            success: true,
            message: "Thêm thành công!",
            data: newData
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateStatus = async (req, res) => {
    try {
        // Lấy ID từ URL, lấy Trạng thái từ Body JSON
        const id = req.params.id;
        const trangThai = req.body.TRANGTHAI || req.body.trangthai;

        const updatedData = await lichHenService.updateTrangThai(id, trangThai);
        return res.status(200).json({
            success: true,
            message: "Cập nhật trạng thái thành công!",
            data: updatedData
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const remove = async (req, res) => {
    try {
        await lichHenService.deleteLichHen(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Xóa thành công!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllTheoNgay = async (req, res) => {
    try {
        const { ngaybd, ngaykt } = req.query; // Hứng từ URL (VD: ?ngaybd=...&ngaykt=...)
        if (!ngaybd || !ngaykt) {
            return res.status(400).json({ success: false, message: "Thiếu ngày bắt đầu hoặc kết thúc!" });
        }

        const data = await lichHenService.getLichHenTheoNgay(ngaybd, ngaykt);
        return res.status(200).json({ success: true, data: data });
    } catch (error) { 
        return res.status(500).json({ success: false, message: error.message }); 
    }
};



//API (CHI TIẾT LỊCH HẸN)
const getAllCT = async (req, res) => {
    try {
        const data = await lichHenService.getAllCT();
        return res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getCTByID = async (req, res) => {
    try {
        const data = await lichHenService.getCTByID(req.params.id);
        return res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createCT = async (req, res) => {
    try {
        const newData = await lichHenService.createCT(req.body);
        return res.status(201).json({
            success: true,
            message: "Thêm chi tiết thành công!",
            data: newData
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const updateCT = async (req, res) => {
    try {
        const id = req.params.id;
        // Hứng cục JSON { "GHICHU": "..." } từ React gửi lên
        const ghichu = req.body.GHICHU || req.body.ghichu || 'Không có ghi chú';

        await lichHenService.updateCT(id, ghichu);
        return res.status(200).json({ success: true, message: "Cập nhật ghi chú thành công!" });
    } catch (error) { 
        return res.status(500).json({ success: false, message: error.message }); 
    }
};

// Nhớ xuất cái updateCT này ra ở module.exports nhé
const removeCT = async (req, res) => {
    try {
        await lichHenService.deleteCT(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Xóa chi tiết thành công!"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { getAll, getByID, getByIDKH, create, updateStatus, remove, getAllTheoNgay, getAllCT, getCTByID, createCT, updateCT, removeCT };