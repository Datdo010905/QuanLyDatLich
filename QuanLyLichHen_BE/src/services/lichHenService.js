const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//LỊCH HẸN
const getAllLichHen = async () => await prisma.lICHHEN.findMany();

const getLichHenByID = async (ma) => await prisma.lICHHEN.findUnique({ where: { MALICH: ma } });


const createLichHen = async (model) => {
    const gioGoc = model.GIOHEN || model.giohen;
    
    // tạo thành chuỗi chuẩn ISO
    const gioHenChuanISO = new Date(`1970-01-01T${gioGoc}:00.000Z`);

    const maKH = (model.MAKH || model.makh).trim();

    return await prisma.lICHHEN.create({
        data: {
            MALICH: model.MALICH || model.malich,
            NGAYHEN: new Date(model.NGAYHEN || model.ngayhen),
            GIOHEN: gioHenChuanISO,
            TRANGTHAI: model.TRANGTHAI || model.trangthai,
            MACHINHANH: model.MACHINHANH || model.machinhanh,
            MAKH: maKH // Đã được gọt sạch khoảng trắng
        }
    });
};
const updateTrangThai = async (ma, trangthai) => {
    return await prisma.lICHHEN.update({
        where: { MALICH: ma },
        data: { TRANGTHAI: trangthai }
    });
};

const deleteLichHen = async (ma) => await prisma.lICHHEN.delete({ where: { MALICH: ma } });




//CHI TIẾT LỊCH HẸN
const getAllCT = async () => await prisma.cHITIETLICHHEN.findMany();

const getCTByID = async (ma) => {

    // Dùng findMany thay unique
    return await prisma.cHITIETLICHHEN.findMany({ where: { MALICH: ma } });
};

const createCT = async (model) => {
    return await prisma.cHITIETLICHHEN.create({
        data: {
            MALICH: model.MALICH || model.malich,
            MADV: model.MADV || model.madv,
            MANV: model.MANV || model.manv,
            SOLUONG: Number(model.SOLUONG || model.soluong),
            GIA_DUKIEN: Number(model.GIA_DUKIEN || model.giA_DUKIEN || 0),
            GHICHU: model.GHICHU || model.ghichu || 'Không có ghi chú'
        }
    });
};

const deleteCT = async (ma) => {
    //deleteMany xoá những lịch liên quan "ma"
    return await prisma.cHITIETLICHHEN.deleteMany({ where: { MALICH: ma } });
};

module.exports = {
    getAllLichHen, getLichHenByID, createLichHen, updateTrangThai, deleteLichHen,
    getAllCT, getCTByID, createCT, deleteCT
};