const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkKhachHangTonTai = async (maKH) => {
    return await prisma.kHACHHANG.findUnique({ where: { MAKH: maKH } });
};

const checkSDTTonTai = async (sdt) => {
    return await prisma.kHACHHANG.findFirst({ where: { SDT: sdt } });
};

const createKhachHang = async (model) => {
    return await prisma.kHACHHANG.create({
        data: {
            MAKH: model.MaKH,
            HOTEN: model.HoTen,
            SDT: model.SDT,
            MATK: model.MaTK || null // Nếu không có MaTK thì cho null
        }
    });
};

module.exports = {
    checkKhachHangTonTai,
    checkSDTTonTai,
    createKhachHang
};