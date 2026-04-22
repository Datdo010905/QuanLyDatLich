const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkLogin = async (username, password) => {
    //Prisma ORM tìm tài khoản
    const user = await prisma.tAIKHOAN.findFirst({
        where: {
            MATK: username,
            PASS: password
        }
    });
    return user;
};
// Hàm check xem mã tài khoản đã tồn tại chưa
const checkTaiKhoanTonTai = async (maTK) => {
    return await prisma.tAIKHOAN.findUnique({
        where: { MATK: maTK }
    });
};

// Hàm thêm tài khoản mới
const createTaiKhoan = async (model) => {
    return await prisma.tAIKHOAN.create({
        data: {
            MATK: model.MaTK,
            PASS: model.Pass,
            PHANQUYEN: Number(model.PhanQuyen),
            TRANGTHAI: model.TrangThai
        }
    });
};

module.exports = {
    checkLogin,
    checkTaiKhoanTonTai, 
    createTaiKhoan     
};