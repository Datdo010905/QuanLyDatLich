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

module.exports = { getAll, getByID, create, updateStatus, remove, getAllCT, getCTByID, createCT, removeCT };