const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllDichVuToc = async () => {
    //const danhSach = await prisma.DICHVU.findMany();
    const danhSachDV = await prisma.$queryRaw`SELECT * FROM DICHVU WHERE LOAI = 'CT' AND TRANGTHAI = N'Đang cung cấp'`;
    return danhSachDV;
};
const getAllDichVuCSD = async () => {
    const danhSachDV = await prisma.$queryRaw`SELECT * FROM DICHVU WHERE LOAI = 'CSD' AND TRANGTHAI = N'Đang cung cấp'`;
    return danhSachDV;
};
module.exports = {
    getAllDichVuToc,
    getAllDichVuCSD
};