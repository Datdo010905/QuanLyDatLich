// BẢNG TÀI KHOẢN
const TAIKHOAN = [
  { MATK: "admin", PASS: "1", PHANQUYEN: 1, TRANGTHAI: "Hoạt động" },
  { MATK: "nhanvien", PASS: "1", PHANQUYEN: 2, TRANGTHAI: "Hoạt động" },
  { MATK: "0352512556", PASS: "1", PHANQUYEN: 0, TRANGTHAI: "Hoạt động" },
  { MATK: "0912345678", PASS: "1", PHANQUYEN: 0, TRANGTHAI: "Khoá" },
  { MATK: "0987654321", PASS: "1", PHANQUYEN: 0, TRANGTHAI: "Hoạt động" },
  { MATK: "0352512557", PASS: "1", PHANQUYEN: 0, TRANGTHAI: "Hoạt động" },
];
// BẢNG CHI NHÁNH
const CHINHANH = [
  { MACHINHANH: "CN001", TENCHINHANH: "30Shine - Nguyễn Trãi", DIACHI: "123 Nguyễn Trãi, Hà Nội", SDT: "0911001100" },
  { MACHINHANH: "CN002", TENCHINHANH: "30Shine - Cầu Giấy", DIACHI: "45 Cầu Giấy, Hà Nội", SDT: "0911222333" },
  { MACHINHANH: "CN003", TENCHINHANH: "30Shine - Tân Bình", DIACHI: "56 Trường Chinh, TP.HCM", SDT: "0911444555" },
  { MACHINHANH: "CN004", TENCHINHANH: "30Shine - Đà Nẵng", DIACHI: "12 Nguyễn Văn Linh, Đà Nẵng", SDT: "0911666777" },
];

// BẢNG KHÁCH HÀNG
const KHACHHANG = [
  { MAKH: "KH001", HOTEN: "Nguyễn Văn An", SDT: "0912345678", MATK: "0912345678" },
  { MAKH: "KH002", HOTEN: "Trần Thị Bình", SDT: "0987654321", MATK: "0987654321" },
  { MAKH: "KH003", HOTEN: "Lê Văn Cường", SDT: "0909123456", MATK: "0909123456" },
  { MAKH: "KH004", HOTEN: "Phạm Thị Dung", SDT: "0911987654", MATK: "0911987654" },
  { MAKH: "KH005", HOTEN: "Đỗ Hữu Phúc", SDT: "0978123456", MATK: "0978123456" },
  { MAKH: "KH006", HOTEN: "Đỗ Tiến Đạt", SDT: "0352512556", MATK: "0352512556" },
  { MAKH: "KH007", HOTEN: "Đỗ Tiến Đạt", SDT: "0352512557", MATK: "0352512557" },
];

const NHANVIEN = [
  { MANV: "NV001", HOTEN: "Hoàng Quốc Việt", CHUCVU: "Quản lý", SDT: "0911111111", DIACHI: "Hà Nội", NGAYSINH: "1985-06-10", MATK: "TK001", MACHINHANH: "CN001" },
  { MANV: "NV002", HOTEN: "Lê Thị Mai", CHUCVU: "Lễ tân", SDT: "0911222333", DIACHI: "Hưng Yên", NGAYSINH: "1997-09-25", MATK: "TK002", MACHINHANH: "CN001" },
  { MANV: "NV003", HOTEN: "Nguyễn Văn Dũng", CHUCVU: "Stylist", SDT: "0912333444", DIACHI: "Hải Dương", NGAYSINH: "1995-01-15", MATK: "TK005", MACHINHANH: "CN002" },
  { MANV: "NV004", HOTEN: "Đỗ Thành Đạt", CHUCVU: "Stylist", SDT: "0913444555", DIACHI: "Hà Nam", NGAYSINH: "1996-08-30", MATK: "TK009", MACHINHANH: "CN003" },
  { MANV: "NV005", HOTEN: "Nguyễn Tiến Đạt", CHUCVU: "Thu ngân", SDT: "0914555666", DIACHI: "Hà Nội", NGAYSINH: "1998-04-12", MATK: "TK010", MACHINHANH: "CN004" },
];


// BẢNG DỊCH VỤ TÓC
const DICHVU = [
  {
    MADV: "DV001",
    TENDV: "Cắt gội combo 1",
    MOTA: "Gói cắt tóc tiêu chuẩn 10 bước, Kết hợp gội đầu thư giãn, Làm sạch sâu và massage cơ bản.",
    THOIGIAN: 45,
    GIADV: 122000,
    TRANGTHAI: "Đang cung cấp",
    ANH: 'img/product/cat-goi-combo-1-1.jpg',
    QUYTRINH: "Tư vấn kiểu tóc-Cắt tóc tạo kiểu-Gội đầu làm sạch-Massage thư giãn vùng đầu-Rửa mặt-Xả tóc-Sấy khô-Vuốt sáp tạo kiểu"
  },
  {
    MADV: "DV002",
    TENDV: "Cắt gội combo 2",
    MOTA: "Gói dịch vụ nâng cao bao gồm cắt tạo kiểu, Gội đầu thảo dược và thêm bước chăm sóc da mặt, Hút mụn.",
    THOIGIAN: 55,
    GIADV: 199000,
    TRANGTHAI: "Đang cung cấp",
    ANH: 'img/product/cat-goi-combo-2.png',
    QUYTRINH: "Tư vấn kiểu tóc-Cắt tóc-Rửa mặt & Tẩy tế bào chết-Hút mụn cám-Gội đầu thảo dược-Massage đầu-Xả tóc-Sấy khô-Tạo kiểu"
  },
  {
    MADV: "DV003",
    TENDV: "Cắt gội combo 3",
    MOTA: "Gói dịch vụ cao cấp nhất, Kết hợp cắt tạo kiểu, Gội dưỡng sinh chuyên sâu và massage cổ vai gáy.",
    THOIGIAN: 65,
    GIADV: 299000,
    TRANGTHAI: "Đang cung cấp",
    ANH: 'img/product/cat-goi-combo-3.png',
    QUYTRINH: "Tư vấn kiểu tóc-Cắt tóc-Gội đầu dưỡng sinh-Bấm huyệt đầu-Massage chuyên sâu cổ vai gáy-Đắp mặt nạ-Xả tóc-Sấy khô-Tạo kiểu cao cấp"
  },
  {
    MADV: "DV004",
    TENDV: "Cắt xả tạo kiểu",
    MOTA: "Dịch vụ cắt tóc nhanh gọn, Xả sạch tóc con và sấy khô, Tạo kiểu cơ bản. Phù hợp cho người bận rộn.",
    THOIGIAN: 30,
    GIADV: 80000,
    TRANGTHAI: "Đang cung cấp",
    ANH: 'img/product/cat-xa-tao-kieu.png',
    QUYTRINH: "Tư vấn kiểu tóc-Cắt tóc-Xả nhanh (không gội)-Sấy khô-Tạo kiểu bằng sáp/gôm"
  },
];
// BẢNG DỊCH VỤ THƯ GIÃN VÀ CHĂM SÓC DA
const CHAMSOCDA = [
  { 
    MADV: "CSD001", 
    TENDV: "Chăm sóc da cơ bản", 
    MOTA: "Gói chăm sóc da mặt tiêu chuẩn, Giúp làm sạch sâu, Cấp ẩm và thư giãn da mặt.", 
    THOIGIAN: 50, 
    GIADV: 250000, 
    TRANGTHAI: "Đang cung cấp" , 
    ANH: 'img/product/goi-thu-gian-3.png',
    QUYTRINH: "Tẩy trang-Rửa mặt-Tẩy tế bào chết-Xông hơi-Hút bã nhờn-Massage mặt-Đắp mặt nạ-Thoa kem dưỡng"
  },
  { 
    MADV: "CSD002", 
    TENDV: "Lấy mụn chuyên sâu", 
    MOTA: "Dịch vụ làm sạch mụn ẩn, Mụn viêm bằng dụng cụ vô trùng, Kết hợp mặt nạ làm dịu da, giảm sưng.", 
    THOIGIAN: 70, 
    GIADV: 350000, 
    TRANGTHAI: "Đang cung cấp" , 
    ANH: 'img/product/goi-thu-gian-2.png',
    QUYTRINH: "Tẩy trang-Rửa mặt-Xông hơi-Lấy mụn-Sát khuẩn-Điện tím-Đắp mặt nạ-Chiếu đèn sinh học-Thoa thuốc"
  },
  { 
    MADV: "CSD003", 
    TENDV: "Massage body tinh dầu", 
    MOTA: "Liệu pháp massage toàn thân với tinh dầu thiên nhiên, Giúp giảm căng cơ, Xả stress và cải thiện lưu thông máu.", 
    THOIGIAN: 60, 
    GIADV: 300000, 
    TRANGTHAI: "Đang cung cấp" , 
    ANH: 'img/product/goi-thu-gian.png',
    QUYTRINH: "Khởi động-Ấn huyệt lưng-Massage chân-Massage tay-Massage lưng vai gáy-Massage đầu-Lau khăn nóng"
  },
  { 
    MADV: "CSD004", 
    TENDV: "Gội đầu dưỡng sinh", 
    MOTA: "Gội đầu kết hợp massage, Bấm huyệt vùng đầu - cổ - vai gáy giúp thư giãn, Giảm đau nhức và ngủ ngon.", 
    THOIGIAN: 60, 
    GIADV: 200000, 
    TRANGTHAI: "Đang cung cấp" , 
    ANH: 'img/product/goi-thu-gian-1.png', 
    QUYTRINH: "Rửa mặt-Massage mặt-Gội đầu lần 1-Bấm huyệt đầu-Massage cổ vai gáy-Gội đầu lần 2-Xả tóc-Sấy khô"
  }
];
// BẢNG KHUYẾN MÃI
const KHUYENMAI = [
  { MAKM: "KM001", TENKM: "Giảm giá khai trương", MOTA: "Giảm 20% tất cả dịch vụ", NGAYBD: "2025-01-01", NGAYKT: "2025-02-01", GIATRI: 0.2, TRANGTHAI: "Hết hạn"},
  { MAKM: "KM002", TENKM: "Thứ 4 vui vẻ", MOTA: "Giảm 15% dịch vụ cắt tóc", NGAYBD: "2025-03-01", NGAYKT: "2025-12-31", GIATRI: 0.15, TRANGTHAI: "Đang áp dụng"},
  { MAKM: "KM003", TENKM: "Sinh nhật khách hàng", MOTA: "Giảm 30% cho khách", NGAYBD: "2025-01-01", NGAYKT: "2025-12-31", GIATRI: 0.3, TRANGTHAI: "Đang áp dụng" },
  { MAKM: "KM004", TENKM: "Mùa hè sôi động", MOTA: "Combo cắt + gội chỉ 150k", NGAYBD: "2025-05-01", NGAYKT: "2025-08-31", GIATRI: 0.25, TRANGTHAI: "Hết hạn" },
  { MAKM: "KM005", TENKM: "Khách hàng thân thiết", MOTA: "Giảm 10% tổng hóa đơn", NGAYBD: "2025-01-01", NGAYKT: "2025-12-31", GIATRI: 0.1, TRANGTHAI: "Đang áp dụng" },
];

const LICHHEN = [
  { MALICH: "LH001", NGAYHEN: "2025-10-05", GIOHEN:"09:00", TRANGTHAI: "Đã đặt", MANV: "NV003", MAKH: "KH001", MACHINHANH: "CN002" },
  { MALICH: "LH002", NGAYHEN: "2025-10-06", GIOHEN:"14:00", TRANGTHAI: "Hoàn thành", MANV: "NV004", MAKH: "KH002", MACHINHANH: "CN003" },
  { MALICH: "LH003", NGAYHEN: "2025-10-07", GIOHEN:"10:30", TRANGTHAI: "Đang thực hiện", MANV: "NV003", MAKH: "KH003", MACHINHANH: "CN002" },
  { MALICH: "LH004", NGAYHEN: "2025-10-08", GIOHEN:"16:00", TRANGTHAI: "Hủy", MANV: "NV004", MAKH: "KH004", MACHINHANH: "CN003" },
  { MALICH: "LH005", NGAYHEN: "2025-10-09", GIOHEN:"13:00", TRANGTHAI: "Đã đặt", MANV: "NV002", MAKH: "KH005", MACHINHANH: "CN001" },
  { MALICH: "LH006", NGAYHEN: "2025-10-09", GIOHEN:"13:00", TRANGTHAI: "Đã đặt", MANV: "NV002", MAKH: "KH006", MACHINHANH: "CN001" },
  { MALICH: "LH007", NGAYHEN: "2025-10-09", GIOHEN:"13:00", TRANGTHAI: "Đang chờ", MANV: "NV003", MAKH: "KH006", MACHINHANH: "CN002" },
  { MALICH: "LH008", NGAYHEN: "2025-10-08", GIOHEN:"13:00", TRANGTHAI: "Đang thực hiện", MANV: "NV004", MAKH: "KH006", MACHINHANH: "CN003" },
  { MALICH: "LH009", NGAYHEN: "2025-10-07", GIOHEN:"13:00", TRANGTHAI: "Hoàn thành", MANV: "NV005", MAKH: "KH006", MACHINHANH: "CN004" },
  { MALICH: "LH010", NGAYHEN: "2025-10-06", GIOHEN:"13:00", TRANGTHAI: "Đã huỷ", MANV: "NV005", MAKH: "KH006", MACHINHANH: "CN004" },
];


// BẢNG CHI TIẾT LỊCH HẸN
const CHITIETLICHHEN = [
  { MALICH: "LH001", MADV: "DV001", SOLUONG: 1, GHICHU: "Thích kiểu undercut" },
  { MALICH: "LH001", MADV: "DV002", SOLUONG: 1, GHICHU: "Thêm massage đầu" },
  { MALICH: "LH002", MADV: "DV004", SOLUONG: 1, GHICHU: "Uốn nhẹ phần mái" },
  { MALICH: "LH003", MADV: "DV003", SOLUONG: 1, GHICHU: "Nhuộm highlight xanh" },
  { MALICH: "LH005", MADV: "DV001", SOLUONG: 1, GHICHU: "Tóc ngắn nam" },
  { MALICH: "LH006", MADV: "DV001", SOLUONG: 2, GHICHU: "Tóc ngắn nam" },
  { MALICH: "LH007", MADV: "DV002", SOLUONG: 4, GHICHU: "Không" },
  { MALICH: "LH008", MADV: "CSD003", SOLUONG: 3, GHICHU: "Không" },
  { MALICH: "LH009", MADV: "CSD004", SOLUONG: 1, GHICHU: "Không" },
];

// BẢNG HÓA ĐƠN
const HOADON = [
  { MAHD: "HD001", MAKM: "KM002", TONGTIEN: 170000, HINHTHUCTHANHTOAN: "Tiền mặt", MANV: "NV005", MALICH: "LH001", TRANGTHAI: "Đã thanh toán" },
  { MAHD: "HD002", MAKM: "KM004", TONGTIEN: 350000, HINHTHUCTHANHTOAN: "Chuyển khoản", MANV: "NV005", MALICH: "LH002", TRANGTHAI: "Đã thanh toán" },
  { MAHD: "HD003", MAKM: null, TONGTIEN: 300000, HINHTHUCTHANHTOAN: "Tiền mặt", MANV: "NV002", MALICH: "LH003", TRANGTHAI: "Đang xử lý" },
  { MAHD: "HD004", MAKM: null, TONGTIEN: 0, HINHTHUCTHANHTOAN: "Không áp dụng", MANV: "NV002", MALICH: "LH004", TRANGTHAI: "Đã hủy" },
  { MAHD: "HD005", MAKM: "KM005", TONGTIEN: 72000, HINHTHUCTHANHTOAN: "Momo", MANV: "NV005", MALICH: "LH005", TRANGTHAI: "Đã thanh toán" },
];
