const nhanVienService = require('../services/nhanVienService');

const getAll = async (req, res) => {
    try {
        const data = await nhanVienService.getAllNhanVien();
        return res.status(200).json({ success: true, data: data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getByID = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await nhanVienService.getNhanVienByID(id);
        if (data) return res.status(200).json({ success: true, data: data });
        return res.status(404).json({ success: false, message: "Không tìm thấy!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const create = async (req, res) => {
    try {
        const data = req.body;
        const maNV = data.MANV || data.manv;
        const maTK = data.MATK || data.matk;
        const sdt = data.SDT || data.sdt;

        const dt = await nhanVienService.getNhanVienByID(maNV);
        if (dt) return res.status(400).json({ success: false, message: `Mã ${maNV} đã tồn tại!` });

        const dtcheck = await nhanVienService.checkAccTonTai(maNV, maTK);
        if (dtcheck) return res.status(400).json({ success: false, message: `Tài khoản ${maTK} đã có người dùng!` });

        const dtchecksdt = await nhanVienService.checkSDTTonTai(maNV, sdt);
        if (dtchecksdt) return res.status(400).json({ success: false, message: `SĐT ${sdt} đã có người dùng!` });

        const newData = await nhanVienService.createNhanVien(data);
        return res.status(201).json({ success: true, message: "Thêm thành công!", data: newData });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const maTK = data.MATK || data.matk;
        const sdt = data.SDT || data.sdt;

        const dtcheck = await nhanVienService.checkAccTonTai(id, maTK);
        if (dtcheck) return res.status(400).json({ success: false, message: `Tài khoản ${maTK} đã có người dùng!` });

        const dtchecksdt = await nhanVienService.checkSDTTonTai(id, sdt);
        if (dtchecksdt) return res.status(400).json({ success: false, message: `SĐT ${sdt} đã có người dùng!` });

        const updatedData = await nhanVienService.updateNhanVien(id, data);
        return res.status(200).json({ success: true, message: "Cập nhật thành công!", data: updatedData });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await nhanVienService.deleteNhanVien(id);
        return res.status(200).json({ success: true, message: "Xóa thành công!" });
    } catch (error) {
        if (error.code === 'P2003') return res.status(400).json({ success: false, message: "Nhân viên đang có lịch hẹn, không thể xóa!" });
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAll, getByID, create, update, remove };