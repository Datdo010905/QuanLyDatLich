// BẢNG TÀI KHOẢN
const TAIKHOAN = [
  { MATK: "TK001", PASS: "123456", PHANQUYEN: 2, TRANGTHAI: "Hoạt động" },
  { MATK: "TK002", PASS: "abc123", PHANQUYEN: 1, TRANGTHAI: "Hoạt động" },
  { MATK: "TK003", PASS: "client1", PHANQUYEN: 0, TRANGTHAI: "Hoạt động" },
  { MATK: "TK004", PASS: "client2", PHANQUYEN: 0, TRANGTHAI: "Hoạt động" },
  { MATK: "TK005", PASS: "stylist", PHANQUYEN: 1, TRANGTHAI: "Tạm khóa" },
  { MATK: "TK006", PASS: "client6", PHANQUYEN: 0, TRANGTHAI: "Hoạt động" },
  { MATK: "TK007", PASS: "client7", PHANQUYEN: 0, TRANGTHAI: "Hoạt động" },
  { MATK: "TK008", PASS: "client8", PHANQUYEN: 0, TRANGTHAI: "Tạm khóa" },
  { MATK: "TK009", PASS: "datdo", PHANQUYEN: 1, TRANGTHAI: "Hoạt động" },
  { MATK: "TK010", PASS: "tiendat", PHANQUYEN: 1, TRANGTHAI: "Hoạt động" },
];


// BẢNG KHÁCH HÀNG
const KHACHHANG = [
  { MAKH: "KH001", HOTEN: "Nguyễn Văn An", SDT: "0912345678", MATK: "TK003" },
  { MAKH: "KH002", HOTEN: "Trần Thị Bình", SDT: "0987654321", MATK: "TK004" },
  { MAKH: "KH003", HOTEN: "Lê Văn Cường", SDT: "0909123456", MATK: "TK006" },
  { MAKH: "KH004", HOTEN: "Phạm Thị Dung", SDT: "0911987654", MATK: "TK007" },
  { MAKH: "KH005", HOTEN: "Đỗ Hữu Phúc", SDT: "0978123456", MATK: "TK008" },
];

// BẢNG NHÂN VIÊN
const NHANVIEN = [
  { MANV: "NV001", HOTEN: "Hoàng Quốc Việt", CHUCVU: "Quản lý", SDT: "0911111111", DIACHI: "Hà Nội", NGAYSINH: "1985-06-10", MATK: "TK001" },
  { MANV: "NV002", HOTEN: "Lê Thị Mai", CHUCVU: "Lễ tân", SDT: "0911222333", DIACHI: "Hưng Yên", NGAYSINH: "1997-09-25", MATK: "TK002" },
  { MANV: "NV003", HOTEN: "Nguyễn Văn Dũng", CHUCVU: "Stylist", SDT: "0912333444", DIACHI: "Hải Dương", NGAYSINH: "1995-01-15", MATK: "TK005" },
  { MANV: "NV004", HOTEN: "Đỗ Thành Đạt", CHUCVU: "Stylist", SDT: "0913444555", DIACHI: "Hà Nam", NGAYSINH: "1996-08-30", MATK: "TK009" },
  { MANV: "NV005", HOTEN: "Nguyễn Tiến Đạt", CHUCVU: "Thu ngân", SDT: "0914555666", DIACHI: "Hà Nội", NGAYSINH: "1998-04-12", MATK: "TK010" },
];

// BẢNG DỊCH VỤ
const DICHVU = [
  { MADV: "DV001", TENDV: "Cắt tóc nam", MOTA: "Stylist tư vấn và tạo kiểu tóc phù hợp", THOIGIAN: 30, GIADV: 80000, TRANGTHAI: "Đang cung cấp" },
  { MADV: "DV002", TENDV: "Gội đầu dưỡng sinh", MOTA: "Sử dụng tinh dầu thiên nhiên", THOIGIAN: 25, GIADV: 120000, TRANGTHAI: "Đang cung cấp" },
  { MADV: "DV003", TENDV: "Nhuộm tóc thời trang", MOTA: "Sử dụng thuốc nhuộm cao cấp", THOIGIAN: 90, GIADV: 300000, TRANGTHAI: "Đang cung cấp" },
  { MADV: "DV004", TENDV: "Uốn tóc tạo kiểu", MOTA: "Uốn tóc nhẹ nhàng, giữ nếp lâu", THOIGIAN: 100, GIADV: 350000, TRANGTHAI: "Đang cung cấp" },
  { MADV: "DV005", TENDV: "Cạo mặt", MOTA: "Dịch vụ chăm sóc da mặt, cạo râu", THOIGIAN: 20, GIADV: 50000, TRANGTHAI: "Ngừng cung cấp" },
];

// BẢNG KHUYẾN MÃI
const KHUYENMAI = [
  { MAKM: "KM001", TENKM: "Giảm giá khai trương", MOTA: "Giảm 20% tất cả dịch vụ", NGAYBD: "2025-01-01", NGAYKT: "2025-02-01", GIATRI: 0.2, TRANGTHAI: "Hết hạn", DIEUKIENAPDUNG: "Áp dụng cho mọi khách hàng" },
  { MAKM: "KM002", TENKM: "Thứ 4 vui vẻ", MOTA: "Giảm 15% dịch vụ cắt tóc", NGAYBD: "2025-03-01", NGAYKT: "2025-12-31", GIATRI: 0.15, TRANGTHAI: "Đang áp dụng", DIEUKIENAPDUNG: "Áp dụng thứ 4 hàng tuần" },
  { MAKM: "KM003", TENKM: "Sinh nhật khách hàng", MOTA: "Giảm 30% cho khách có sinh nhật trong tháng", NGAYBD: "2025-01-01", NGAYKT: "2025-12-31", GIATRI: 0.3, TRANGTHAI: "Đang áp dụng", DIEUKIENAPDUNG: "Theo tháng sinh" },
  { MAKM: "KM004", TENKM: "Mùa hè sôi động", MOTA: "Combo cắt + gội chỉ 150k", NGAYBD: "2025-05-01", NGAYKT: "2025-08-31", GIATRI: 0.25, TRANGTHAI: "Hết hạn", DIEUKIENAPDUNG: "Áp dụng combo DV001 và DV002" },
  { MAKM: "KM005", TENKM: "Khách hàng thân thiết", MOTA: "Giảm 10% tổng hóa đơn", NGAYBD: "2025-01-01", NGAYKT: "2025-12-31", GIATRI: 0.1, TRANGTHAI: "Đang áp dụng", DIEUKIENAPDUNG: "Khách hàng có >=5 lượt hẹn" },
];

// BẢNG LỊCH HẸN
const LICHHEN = [
  { MALICH: "LH001", NGAYHEN: "2025-10-05 09:00", TRANGTHAI: "Đã đặt", MANV: "NV003", MAKH: "KH001" },
  { MALICH: "LH002", NGAYHEN: "2025-10-06 14:00", TRANGTHAI: "Hoàn thành", MANV: "NV004", MAKH: "KH002" },
  { MALICH: "LH003", NGAYHEN: "2025-10-07 10:30", TRANGTHAI: "Đang thực hiện", MANV: "NV003", MAKH: "KH003" },
  { MALICH: "LH004", NGAYHEN: "2025-10-08 16:00", TRANGTHAI: "Hủy", MANV: "NV004", MAKH: "KH004" },
  { MALICH: "LH005", NGAYHEN: "2025-10-09 13:00", TRANGTHAI: "Đã đặt", MANV: "NV002", MAKH: "KH005" },
];

// BẢNG CHI TIẾT LỊCH HẸN
const CHITIETLICHHEN = [
  { MALICH: "LH001", MADV: "DV001", SOLUONG: 1, GHICHU: "Thích kiểu undercut" },
  { MALICH: "LH001", MADV: "DV002", SOLUONG: 1, GHICHU: "Thêm massage đầu" },
  { MALICH: "LH002", MADV: "DV004", SOLUONG: 1, GHICHU: "Uốn nhẹ phần mái" },
  { MALICH: "LH003", MADV: "DV003", SOLUONG: 1, GHICHU: "Nhuộm highlight xanh" },
  { MALICH: "LH005", MADV: "DV001", SOLUONG: 1, GHICHU: "Tóc ngắn nam" },
];

// BẢNG HÓA ĐƠN
const HOADON = [
  { MAHD: "HD001", MAKM: "KM002", TONGTIEN: 170000, HINHTHUCTHANHTOAN: "Tiền mặt", MANV: "NV005", MALICH: "LH001", TRANGTHAI: "Đã thanh toán" },
  { MAHD: "HD002", MAKM: "KM004", TONGTIEN: 350000, HINHTHUCTHANHTOAN: "Chuyển khoản", MANV: "NV005", MALICH: "LH002", TRANGTHAI: "Đã thanh toán" },
  { MAHD: "HD003", MAKM: null, TONGTIEN: 300000, HINHTHUCTHANHTOAN: "Tiền mặt", MANV: "NV002", MALICH: "LH003", TRANGTHAI: "Đang xử lý" },
  { MAHD: "HD004", MAKM: null, TONGTIEN: 0, HINHTHUCTHANHTOAN: "Không áp dụng", MANV: "NV002", MALICH: "LH004", TRANGTHAI: "Đã hủy" },
  { MAHD: "HD005", MAKM: "KM005", TONGTIEN: 72000, HINHTHUCTHANHTOAN: "Momo", MANV: "NV005", MALICH: "LH005", TRANGTHAI: "Đã thanh toán" },
];
