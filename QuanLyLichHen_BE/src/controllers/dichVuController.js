const dichVuService = require('../services/dichVuService');

const getDichVuToc = async (req, res) => {
    try {
        const data = await dichVuService.getAllDichVuToc();
        //trả về dữ liệu cho client
        res.status(200).json({
            success: true,
            data: data,
            message: 'Lấy danh sách dịch vụ tóc thành công!'
        });
    } catch (error) {
        console.error("Lỗi Controller Dịch Vụ:", error);
        res.status(500).json({ success: false, message: 'Lỗi kết nối với server!' });
    }
};

const getDichVuCSD = async (req, res) => {
    try {
        const data = await dichVuService.getAllDichVuCSD();
        //trả về dữ liệu cho client
        res.status(200).json({
            success: true,
            data: data,
            message: 'Lấy danh sách dịch vụ chăm sóc da thành công!'
        });
    } catch (error) {
        console.error("Lỗi Controller Dịch Vụ:", error);
        res.status(500).json({ success: false, message: 'Lỗi kết nối với server!' });
    }
};

module.exports = {
    getDichVuToc,
    getDichVuCSD
};