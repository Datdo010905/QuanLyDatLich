// Toggle sidebar khi bấm nút menu (mobile)
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.getElementById("toggleSidebar");
  const navLinks = document.querySelectorAll(".sidebar nav a");
  const sections = document.querySelectorAll(".section");

  // Toggle sidebar khi bấm nút menu (mobile)
  if (toggleBtn) {
    toggleBtn.addEventListener("click", (e) => {
      sidebar.classList.toggle("open");
      e.stopPropagation(); // tránh kích hoạt listener document
    });
  }

  // Đóng sidebar khi click ra ngoài (chỉ trên mobile)
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      if (!sidebar.contains(e.target) && e.target !== toggleBtn) {
        sidebar.classList.remove("open");
      }
    }
  });

  // Khi bấm 1 mục menu: chuyển section và đóng sidebar (mobile)
  navLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      // active class cho nav
      navLinks.forEach(n => n.classList.remove("active"));
      a.classList.add("active");

      // bật section tương ứng
      const targetId = a.getAttribute("data-section");
      if (targetId && sections.length) {
        sections.forEach(s => {
          if (s.id === targetId) s.classList.add("active-section");
          else s.classList.remove("active-section");
        });
      }

      // nếu mobile thì đóng sidebar
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("open");
      }
    });
  });

  // Reset khi resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) sidebar.classList.remove("open");
  });
});


// Kiểm tra quyền admin
window.onload = function () {
  const loggedInUser = localStorage.getItem("loggedInUser");

  const taiKhoan = taiKhoanLocal.find(tk => tk.MATK === loggedInUser);
  if (!taiKhoan) {
    //alert("Tài khoản không tồn tại!");
    window.location.href = "login.html";
    return;
  }

  const nhanVien = nhanVienLocal.find(nv => nv.MATK === loggedInUser)
  //console.log(nhanVien);
  const loginElement = document.getElementById("login-helloADMIN");
  const loginElement2 = document.getElementById("login-helloADMIN-span");
  loginElement.innerHTML = `${nhanVien.HOTEN}`;
  loginElement2.innerHTML = `${nhanVien.MATK}: `;

  if (taiKhoan.PHANQUYEN !== 5 && taiKhoan.PHANQUYEN !== 4 && taiKhoan.PHANQUYEN !== 3 && taiKhoan.PHANQUYEN !== 2 && taiKhoan.PHANQUYEN !== 1) {
    alert("Bạn không có quyền truy cập trang này!");
    window.location.href = "login.html";
    return;
  }
  //check quản lý
  if (taiKhoan.PHANQUYEN === 2) {
    document.querySelector("a[data-section='accounts']").style.display = "none";
    document.querySelector("a[data-section='promotions']").style.display = "none";
    document.querySelector("a[data-section='reports']").style.display = "none";
  }
  //check lễ tân
  if (taiKhoan.PHANQUYEN === 5) {
    document.querySelector("a[data-section='dashboard']").style.display = "none";
    document.querySelector("a[data-section='accounts']").style.display = "none";
    document.querySelector("a[data-section='promotions']").style.display = "none";
    document.querySelector("a[data-section='services']").style.display = "none";
    document.querySelector("a[data-section='customers']").style.display = "none";
    document.querySelector("a[data-section='staff']").style.display = "none";
    document.querySelector("a[data-section='invoices']").style.display = "none";
    document.querySelector("a[data-section='reports']").style.display = "none";
  }
  //check stylist
  if (taiKhoan.PHANQUYEN === 3) {
    document.querySelector("a[data-section='accounts']").style.display = "none";
    document.querySelector("a[data-section='promotions']").style.display = "none";
    document.querySelector("a[data-section='services']").style.display = "none";
    document.querySelector("a[data-section='customers']").style.display = "none";
    document.querySelector("a[data-section='staff']").style.display = "none";
    document.querySelector("a[data-section='invoices']").style.display = "none";
    document.querySelector("a[data-section='reports']").style.display = "none";
  }
  //check thu ngân
  if (taiKhoan.PHANQUYEN === 4) {
    document.querySelector("a[data-section='dashboard']").style.display = "none";
    document.querySelector("a[data-section='accounts']").style.display = "none";
    document.querySelector("a[data-section='promotions']").style.display = "none";
    document.querySelector("a[data-section='services']").style.display = "none";
    document.querySelector("a[data-section='customers']").style.display = "none";
    document.querySelector("a[data-section='staff']").style.display = "none";
    document.querySelector("a[data-section='bookings']").style.display = "none";
    document.querySelector("a[data-section='reports']").style.display = "none";
  }

  loadDashboard();
  renderAllTables();
  loadBookingOptions();
  loadHours();
  loadLichHenHoanThanh();
  document.getElementById("bookingStaffId").addEventListener("change", loadHours);
  document.getElementById("bookingDate").addEventListener("change", loadHours);


  document.getElementById("invoiceBookingId").addEventListener('change', tudongtinhtien);
  document.getElementById("invoicePromoId").addEventListener('change', tudongtinhtien);
  document.getElementById("invoicePromoId").addEventListener('input', tudongtinhtien);
};

// Đăng xuất
function dangXuat() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
//chuyển nav
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".sidebar nav a");
  const sections = document.querySelectorAll(".section");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      // Bỏ active cũ
      navLinks.forEach(l => l.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active-section"));

      // Gán active mới
      link.classList.add("active");
      const targetId = link.getAttribute("data-section");
      const target = document.getElementById(targetId);
      if (target) target.classList.add("active-section");
    });
  });
});

// KHỞI TẠO DỮ LIỆU LOCALSTORAGE 
const loggedInUser = localStorage.getItem("loggedInUser");
const role = localStorage.getItem("role");

// Kiểm tra nếu là admin mới khởi tạo dữ liệu
if (loggedInUser === "admin" || role === 1) {

  function saveToLocal(key, data) {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  saveToLocal("TaiKhoan", TAIKHOAN);
  saveToLocal("ChiNhanh", CHINHANH);
  saveToLocal("KhachHang", KHACHHANG);
  saveToLocal("NhanVien", NHANVIEN);
  saveToLocal("DichVu", DICHVU);
  saveToLocal("ChamSocDa", CHAMSOCDA);
  saveToLocal("KhuyenMai", KHUYENMAI);
  saveToLocal("LichHen", LICHHEN);
  saveToLocal("ChiTietLichHen", CHITIETLICHHEN);
  saveToLocal("HoaDon", HOADON);

}
let taiKhoanLocal = JSON.parse(localStorage.getItem("TaiKhoan")) || TAIKHOAN;
let chiNhanhLocal = JSON.parse(localStorage.getItem("ChiNhanh")) || CHINHANH;
let khachHangLocal = JSON.parse(localStorage.getItem("KhachHang")) || KHACHHANG;
let nhanVienLocal = JSON.parse(localStorage.getItem("NhanVien")) || NHANVIEN;
let dichVuLocal = JSON.parse(localStorage.getItem("DichVu")) || DICHVU;
let chamSocDaLocal = JSON.parse(localStorage.getItem("ChamSocDa")) || CHAMSOCDA;
let khuyenMaiLocal = JSON.parse(localStorage.getItem("KhuyenMai")) || KHUYENMAI;
let lichHenLocal = JSON.parse(localStorage.getItem("LichHen")) || LICHHEN;
let chiTietLichHenLocal = JSON.parse(localStorage.getItem("ChiTietLichHen")) || CHITIETLICHHEN;
let hoaDonLocal = JSON.parse(localStorage.getItem("HoaDon")) || HOADON;
let hoatDongLocal = JSON.parse(localStorage.getItem("HoatDong")) || [];

// ================== DASHBOARD ==================
function loadDashboard() {
  document.getElementById("totalUsers").textContent = khachHangLocal.length;
  lichHenLocal.forEach(lh => {
    if (new Date(lh.NGAYHEN).toDateString() === new Date().toDateString()) {
      document.getElementById("todayBookings").textContent = (parseInt(document.getElementById("todayBookings").textContent) || 0) + 1;
    }
    document.getElementById("reportBookings").textContent = (parseInt(lichHenLocal.length) || 0);

    const doneBooking = lichHenLocal.filter(lh => lh.TRANGTHAI === "Hoàn thành");
    if (doneBooking) {
      document.getElementById("reportBookingsDone").textContent = `Thành công: ` + doneBooking.length;
    }
  });

  const hoadonDaThanhToan = hoaDonLocal.filter(hd => hd.TRANGTHAI === "Đã thanh toán")
  const tongDoanhThu = hoadonDaThanhToan.reduce((sum, hd) => sum + hd.TONGTIEN, 0);
  document.getElementById("reportRevenue").textContent = tongDoanhThu.toLocaleString("vi-VN") + "₫";

  const recentTable = document.querySelector("#recentTable tbody");
  if (recentTable) {
    recentTable.innerHTML = hoatDongLocal.map(hd => `
      <tr>
        <td>${hd.thoigian}</td>
        <td>${hd.noidung}</td>
        <td>${hd.taikhoan}</td>
      </tr>
    `).join("");
  }


  //báo cáo thống kê
  //lấy nhân viên xuất hiện nhiều nhất trong các lịch hẹn
  let count = {};
  lichHenLocal.forEach(lh => {
    count[lh.MANV] = (count[lh.MANV] || 0) + 1;//tìm nv nếu chưa có thì = 0, có thì + 1
  });


  let max = 0;

  for (const manv in count) {
    if (count[manv] > max) {
      max = count[manv];
    }
  }
  // ORDER BY DESC
  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  const top5 = sorted.slice(0, 10);
  // Giữ thứ tự và lấy thông tin NV
  const topNhanVien = top5.map(item => {
    const manv = item[0];
    const soLich = item[1];
    const nv = nhanVienLocal.find(n => n.MANV === manv);
    return {
      ...nv,//ghép obj
      soLich: soLich
    };
  });
  console.log(topNhanVien);


  const tbodyTopStaff = document.querySelector("#staffTop tbody");
  if (!tbodyTopStaff) return;
  tbodyTopStaff.innerHTML = topNhanVien.map(nv => `
    <tr>
      <td>${nv.MANV}</td>
      <td>${nv.HOTEN}</td>
      <td>${nv.CHUCVU}</td>
      <td>${nv.SDT}</td>
      <td>${nv.NGAYSINH}</td>
      <td>${nv.MACHINHANH}</td>
      <td>${nv.soLich}</td>
    </tr>
  `).join("");

  //lấy dịch vụ xuất hiện nhiều nhất trong chi tiết lịch hẹn
  let countDV = {};
  chiTietLichHenLocal.forEach(ct => {
    countDV[ct.MADV] = (countDV[ct.MADV] || 0) + 1;//tìm dv nếu chưa có thì = 0, có thì + 1
  });


  let maxDV = 0;

  for (const madv in countDV) {
    if (countDV[madv] > maxDV) {
      maxDV = countDV[madv];
    }
  }
  // ORDER BY DESC
  const sortedDV = Object.entries(countDV).sort((a, b) => b[1] - a[1]);
  const top5DV = sortedDV.slice(0, 10);
  // Giữ thứ tự và lấy thông tin
  const allServices = [...dichVuLocal, ...chamSocDaLocal];
  const topDichVu = top5DV.map(item => {
    const madv = item[0];
    const soLan = item[1];
    const dv = allServices.find(dv => dv.MADV === madv);
    return {
      ...dv,//ghép obj
      solan: soLan
    };
  });
  console.log(topDichVu);


  const tbodyTopDV = document.querySelector("#ServicesTop tbody");
  if (!tbodyTopDV) return;
  tbodyTopDV.innerHTML = topDichVu.map(dv => `
    <tr>
      <td>${dv.MADV}</td>
      <td><img src="${dv.ANH}" alt="${dv.TENDV}" height="60" width="70"></td>
      <td>${dv.TENDV}</td>
      <td>${dv.THOIGIAN} phút</td>
      <td>${dv.GIADV.toLocaleString("vi-VN")}₫</td>
      <td>${dv.solan}</td>
    </tr>
  `).join("");

}

// ================== HIỂN THỊ DỮ LIỆU ==================
function renderAllTables() {
  renderAccounts();
  // renderBranches();
  renderCustomers();
  renderStaff();
  renderServices();
  renderSkincare();
  renderPromotions();
  renderInvoices();
  renderBookings();
}


// TÀI KHOẢN
function renderAccounts() {
  const tbody = document.querySelector("#accountsTable tbody");
  if (!tbody) return;
  tbody.innerHTML = taiKhoanLocal.map(tk => `
    <tr>
      <td>${tk.MATK}</td>
      <td>${tk.PASS}</td>
      <td>${tk.PHANQUYEN}</td>
      <td>${tk.TRANGTHAI}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${tk.MATK}" onclick = "openEditModal('${tk.MATK}')"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${tk.MATK}" onclick = "xoaTaiKhoan('${tk.MATK}')" ><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// KHÁCH HÀNG
function renderCustomers() {
  const tbody = document.querySelector("#customersTable tbody");
  if (!tbody) return;
  tbody.innerHTML = khachHangLocal.map(kh => `
    <tr>
      <td>${kh.MAKH}</td>
      <td>${kh.HOTEN}</td>
      <td>${kh.SDT}</td>
      <td>${kh.MATK}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${kh.MAKH}"  onclick="chuanbiSuaKhachHang('${kh.MAKH}')"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${kh.MAKH}" onclick="xoaKhachHang('${kh.MAKH}')"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// NHÂN VIÊN
function renderStaff() {
  const tbody = document.querySelector("#staffTable tbody");
  if (!tbody) return;
  tbody.innerHTML = nhanVienLocal.map(nv => `
    <tr>
      <td>${nv.MANV}</td>
      <td>${nv.HOTEN}</td>
      <td>${nv.CHUCVU}</td>
      <td>${nv.SDT}</td>
      <td>${nv.DIACHI}</td>
      <td>${nv.NGAYSINH}</td>
      <td>${nv.MATK}</td>
      <td>${nv.MACHINHANH}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${nv.MANV}" onclick="chuanbiSuaNhanVien('${nv.MANV}')"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${nv.MANV}" onclick="xoaNhanVien('${nv.MANV}')"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

//DỊCH VỤ TÓC
function renderServices() {
  const tbody = document.querySelector("#hairServicesTable tbody");
  if (!tbody) return;
  tbody.innerHTML = dichVuLocal.map(dv => `
    <tr>
    <td class="actions">
      <button class="btn small edit" data-id="${dv.MADV}" onclick="chuanBiSuaDichVu('${dv.MADV}')"><i class="fas fa-edit"></i></button>
      <button class="btn small delete" data-id="${dv.MADV}" onclick="xoaDichVu('${dv.MADV}')"><i class="fas fa-trash"></i></button>
    </td>
      <td>${dv.MADV}</td>
      <td><img src="${dv.ANH}" alt="${dv.TENDV}" height="60" width="70"></td>
      <td>${dv.TENDV}</td>
      <td>${dv.THOIGIAN} phút</td>
      <td>${dv.GIADV.toLocaleString("vi-VN")}₫</td>
      <td>${dv.TRANGTHAI}</td>
      <td>${dv.MOTA}</td>
      <td>${dv.QUYTRINH}</td>
    </tr>
  `).join("");
}

// DỊCH VỤ CHĂM SÓC DA
function renderSkincare() {
  const tbody = document.querySelector("#skinCareServicesTable tbody");
  if (!tbody) return;
  tbody.innerHTML = chamSocDaLocal.map(cs => `
    <tr>
    <td class="actions">
      <button class="btn small edit" data-id="${cs.MADV}" onclick="chuanBiSuaDichVu('${cs.MADV}')"><i class="fas fa-edit"></i></button>
      <button class="btn small delete" data-id="${cs.MADV}" onclick="xoaDichVu('${cs.MADV}')"><i class="fas fa-trash"></i></button>
    </td>
      <td>${cs.MADV}</td>
      <td><img src="${cs.ANH}" alt="${cs.TENDV}" height="60" width="70"></td>
      <td>${cs.TENDV}</td>
      <td>${cs.THOIGIAN} phút</td>
      <td>${cs.GIADV.toLocaleString("vi-VN")}₫</td>
      <td>${cs.TRANGTHAI}</td>
      <td>${cs.MOTA}</td>
      <td>${cs.QUYTRINH}</td>
    </tr>
  `).join("");
}

// KHUYẾN MÃI
function renderPromotions() {
  const tbody = document.querySelector("#promotionsTable tbody");
  if (!tbody) return;
  tbody.innerHTML = khuyenMaiLocal.map(km => `
    <tr>
      <td>${km.MAKM}</td>
      <td>${km.TENKM}</td>
      <td>${km.MOTA}</td>
      <td>${km.NGAYBD}</td>
      <td>${km.NGAYKT}</td>
      <td>${(km.GIATRI * 100).toFixed(0)}%</td>
      <td>${km.TRANGTHAI}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${km.MAKM}" onclick="chuanBiSuaKhuyenMai('${km.MAKM}')"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${km.MAKM}" onclick = "xoaKhuyenMai('${km.MAKM}')"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// LỊCH HẸN
function getStatusPriority(status) {
  switch (status) {
    case "Đã đặt":
    case "Đang chờ":
      return 1; // Ưu tiên cao nhất: Cần xử lý/xác nhận
    case "Đang thực hiện": case "Đang xử lý":
      return 2; // Ưu tiên trung bình: Đang làm
    case "Huỷ": case "Đã huỷ":
      return 3; // Trạng thái kết thúc (không cần hành động ngay)
    case "Hoàn thành": case "Đã thanh toán":
      return 4; // Trạng thái kết thúc (đã xong)
    default:
      return 99; // Trạng thái không xác định
  }
}
function renderBookings() {
  const tbody = document.querySelector("#bookingsTable tbody");

  if (!tbody) return;

  const sortedBookings = [...lichHenLocal].sort((a, b) => {
    const priorityA = getStatusPriority(a.TRANGTHAI);
    const priorityB = getStatusPriority(b.TRANGTHAI);

    // Sắp xếp chính: Theo độ ưu tiên trạng thái (tăng dần)
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // Sắp xếp phụ: Nếu cùng trạng thái, sắp xếp theo Ngày và Giờ (sắp đến trước)
    const dateA = new Date(`${a.NGAYHEN} ${a.GIOHEN}`);
    const dateB = new Date(`${b.NGAYHEN} ${b.GIOHEN}`);
    return dateA - dateB;
  });

  tbody.innerHTML = sortedBookings.map(lh => {

    //Lấy Tên Nhân Viên
    const nvObj = nhanVienLocal.find(nv => nv.MANV === lh.MANV);
    const tenNV = nvObj ? nvObj.HOTEN : lh.MANV;

    //Lấy Tên Khách Hàng
    const khObj = khachHangLocal.find(kh => kh.MAKH === lh.MAKH);
    const tenKH = khObj ? khObj.HOTEN : lh.MAKH;
    const sdtKH = khObj ? khObj.SDT : lh.MAKH;

    //Lấy Tên Chi Nhánh
    const cnObj = chiNhanhLocal.find(cn => cn.MACHINHANH === lh.MACHINHANH);
    const tenCN = cnObj ? cnObj.TENCHINHANH : lh.MACHINHANH;

    const trangThaiClass = (lh.TRANGTHAI || "").toLowerCase()
      .replace(/ /g, '-') // thay ' ' bằng '-'
    //console.log("Trạng thái lớp:", trangThaiClass);
    return `
      <tr>
        <td>${lh.MALICH}</td>
        <td>${lh.NGAYHEN}</td>
        <td>${lh.GIOHEN}</td>
        
        <td><span class="status ${trangThaiClass}">${lh.TRANGTHAI}</span></td>
        
        <td>${tenNV}</td>
        <td>${tenKH} - ${sdtKH}</td>
        <td>${tenCN}</td>
        
        <td class="actions">
          <button class="btn small view" onclick="xemChiTiet('${lh.MALICH}')"><i class="fas fa-eye"></i></button>
          <button class="btn small edit" data-id="${lh.MALICH}" onclick="chuanBiSuaLichHen('${lh.MALICH}')" ><i class="fas fa-edit"></i></button>
          <button class="btn small delete" data-id="${lh.MALICH}" onclick="xoaLichHen('${lh.MALICH}')" ><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  }).join(""); // Đóng map và nối chuỗi
}
function closeviewCT() {
  document.getElementById('booking-details').style.display = 'none';
}

// CHI TIẾT LỊCH HẸN
function xemChiTiet(malich) {
  const chitiet = chiTietLichHenLocal.filter(ct => ct.MALICH === malich);
  if (!chitiet || chitiet.length === 0) {
    alert("Không tìm thấy chi tiết lịch hẹn.");
    return;
  }
  const h3 = document.getElementById("tieudechitiet");
  h3.innerHTML = `Chi tiết lịch hẹn ${malich}
                    <button class="btn small delete" onclick="closeviewCT()">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </button>`;

  const tableBody = document.getElementById("detail-table-body");
  tableBody.innerHTML = "";

  chitiet.forEach(ct => {
    const allServices = [...DICHVU, ...CHAMSOCDA];
    const TENDV = allServices.find(dv => dv.MADV === ct.MADV)?.TENDV || "Chưa rõ";
    const dongia = allServices.find(dv => dv.MADV === ct.MADV)?.GIADV || 0;
    const thanhtien = dongia * ct.SOLUONG;
    const row = `
                <tr>
                  <td>${TENDV}</td>
                  <td>${ct.SOLUONG}</td>
                  <td>${formatCurrency(dongia)}</td>
                  <td>${formatCurrency(thanhtien)}</td>
                  <td>${ct.GHICHU}</td>
                </tr>`;
    tableBody.innerHTML += row;
  });



  document.getElementById('booking-details').style.display = 'block';
}// CHI TIẾT LỊCH HẸN
function closeviewCT() {
  document.getElementById('booking-details').style.display = 'none';
}

// Format tiền tệ
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

// HÓA ĐƠN
function renderInvoices() {
  const tbody = document.querySelector("#invoicesTable tbody");
  if (!tbody) return;

  const sortedHoaDon = [...hoaDonLocal].sort((a, b) => {
    const priorityA = getStatusPriority(a.TRANGTHAI);
    const priorityB = getStatusPriority(b.TRANGTHAI);

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
  });

  tbody.innerHTML = sortedHoaDon.map(hd => {

    const trangThaiClass = (hd.TRANGTHAI || "").toLowerCase()
      .replace(/ /g, '-') // thay ' ' bằng '-'
    //console.log("Trạng thái lớp:", trangThaiClass);
    return `
    <tr>
      <td>${hd.MAHD}</td>
      <td>${hd.MAKM ?? "Không có"}</td>
      <td>${hd.TONGTIEN.toLocaleString("vi-VN")}₫</td>
      <td>${hd.HINHTHUCTHANHTOAN}</td>
      <td>${hd.MANV}</td>
      <td>${hd.MALICH}</td>
      <td class="status ${trangThaiClass}">${hd.TRANGTHAI}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${hd.MAHD}"  onclick="chuanBiSuaHoaDon('${hd.MAHD}')"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${hd.MAHD}" onclick="xoaHoaDon('${hd.MAHD}')"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `}).join("");
}


//TÀI KHOẢN
// Mở modal
function openAccountModal() {
  const modal = document.getElementById("addAccountModal");
  modal.style.display = "block";
  // reset form
  const form = document.getElementById("addAccountForm");
  if (form) form.reset();
}

// Đóng modal
function closeAccountModal() {
  const modal = document.getElementById("addAccountModal");
  modal.style.display = "none";
}
// Mở modal sửa
function openEditModal(mataikhoan) {
  document.getElementById("editAccountModal").style.display = "block";
  const taiKhoanLocal = JSON.parse(localStorage.getItem("TaiKhoan")) || TAIKHOAN;
  const tk = taiKhoanLocal.find(tk => tk.MATK === mataikhoan);
  if (!tk) {
    alert("Tài khoản không tồn tại!");
    return;
  }
  document.getElementById("editUsername").value = tk.MATK;
  document.getElementById("editPassword").value = tk.PASS;
  document.getElementById("editRole").value = tk.PHANQUYEN;
  document.getElementById("editStatus").value = tk.TRANGTHAI;
}

// Đóng modal sửa
function closeEditModal() {
  document.getElementById("editAccountModal").style.display = "none";
}

//quản lý tài khoản
function themTaiKhoan(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form
  const mataikhoan = document.getElementById("accUsername").value;
  const matkhau = document.getElementById("accPassword").value;
  const phanquyen = parseInt(document.getElementById("accRole").value);
  const trangthai = document.getElementById("accStatus").value;

  if (mataikhoan.trim() === "" || matkhau.trim() === "") {
    alert("Vui lòng điền đầy đủ thông tin tài khoản!");
    return;
  }
  if (!confirm("Bạn có chắc chắn muốn thêm tài khoản này không?")) {
    return;
  }


  const taikhoanExists = taiKhoanLocal.some(tk => tk.MATK === mataikhoan);
  if (taikhoanExists) {
    alert("Tài khoản đã tồn tại!");
    return;
  }
  try {
    const newAccount = {
      MATK: mataikhoan,
      PASS: matkhau,
      PHANQUYEN: phanquyen,
      TRANGTHAI: trangthai
    };

    taiKhoanLocal.push(newAccount);
    localStorage.setItem("TaiKhoan", JSON.stringify(taiKhoanLocal));
    renderAccounts();

    alert("Thêm tài khoản thành công!");
    closeAccountModal();
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi thêm tài khoản: " + error.message);
  }

}
function suaTaiKhoan(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form
  const mataikhoan = document.getElementById("editUsername").value;
  const matkhau = document.getElementById("editPassword").value;
  const phanquyen = parseInt(document.getElementById("editRole").value);
  const trangthai = document.getElementById("editStatus").value;

  if (!mataikhoan) return;
  if (mataikhoan.trim() === "" || matkhau.trim() === "") {
    alert("Vui lòng điền đầy đủ thông tin tài khoản!");
    return;
  }
  if (!confirm("Bạn có chắc chắn muốn sửa tài khoản này không?")) {
    return;
  }
  if (mataikhoan === "admin") {
    alert("Không thể sửa tài khoản admin!");
    return;
  }
  // Tìm index của tài khoản cần sửa
  const index = taiKhoanLocal.findIndex(tk => tk.MATK === mataikhoan);
  if (index === -1) {
    alert("Tài khoản không tồn tại!");
    return;
  }
  try {
    // cập nhật thông tin
    taiKhoanLocal[index].PASS = matkhau;
    taiKhoanLocal[index].PHANQUYEN = phanquyen;
    taiKhoanLocal[index].TRANGTHAI = trangthai;

    localStorage.setItem("TaiKhoan", JSON.stringify(taiKhoanLocal));
    renderAccounts();

    alert("Sửa tài khoản thành công!");
    closeEditModal();
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi sửa tài khoản: " + error.message);
  }

}
function xoaTaiKhoan(mataikhoan) {
  if (!mataikhoan) return;
  if (!confirm("Bạn có chắc chắn muốn xoá tài khoản này không?")) {
    return;
  }
  // Không được xoá admin
  if (mataikhoan === "admin") {
    alert("Không thể xoá tài khoản admin!");
    return;
  }
  try {
    // Lọc bỏ tài khoản cần xoá
    taiKhoanLocal = taiKhoanLocal.filter(tk => tk.MATK !== mataikhoan);
    localStorage.setItem("TaiKhoan", JSON.stringify(taiKhoanLocal));
    renderAccounts();
    alert("Xoá tài khoản thành công!");
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi xoá tài khoản: " + error.message);
  }
}


// Hàm mở Modal bất kỳ theo ID
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "block";
    // Reset form bên trong nếu có
    const form = modal.querySelector("form");
    if (form) form.reset();
  }
}

// Hàm đóng Modal bất kỳ theo ID
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}

// Đóng modal khi click ra ngoài vùng content (cho tất cả modal)
window.onclick = function (event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = "none";
  }
}



//KHUYẾN MẠI
function themKhuyenMai(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form
  const makhuyenmai = document.getElementById("promoID").value;
  const tenkhuyenmai = document.getElementById("promoName").value;
  const mota = document.getElementById("promoDesc").value;
  const ngaybatdau = document.getElementById("promoStart").value;
  const ngayketthuc = document.getElementById("promoEnd").value;
  const giatri = parseFloat(document.getElementById("promoValue").value) / 100;
  let trangthai = "";


  if (makhuyenmai.trim() === "" || tenkhuyenmai.trim() === "" || ngaybatdau.trim() === "" || ngayketthuc.trim() === "" || isNaN(giatri) || mota.trim() === "") {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }
  if (!confirm("Bạn có chắc chắn muốn thêm khuyến mại này không?")) {
    return;
  }


  const khuyenmaiExits = khuyenMaiLocal.some(km => km.MAKM === makhuyenmai);
  if (khuyenmaiExits) {
    alert("Khuyến mại đã tồn tại!");
    return;
  }
  if (new Date(ngaybatdau) >= new Date(ngayketthuc)) {
    alert("Ngày kết thúc phải sau ngày bắt đầu!");
    return;
  }
  if (giatri <= 0 || giatri > 1) {
    alert("Giá trị khuyến mãi phải lớn hơn 0 và nhỏ hơn hoặc bằng 100%");
    return;
  }
  try {
    if (ngayketthuc < new Date().toISOString().split('T')[0]) {
      trangthai = "Hết hạn";
    } else if (ngaybatdau > new Date().toISOString().split('T')[0]) {
      trangthai = "Chưa áp dụng";
    } else {
      trangthai = "Đang áp dụng";
    }
    const newKM = {
      MAKM: makhuyenmai,
      TENKM: tenkhuyenmai,
      MOTA: mota,
      NGAYBD: ngaybatdau,
      NGAYKT: ngayketthuc,
      GIATRI: giatri,
      TRANGTHAI: trangthai
    };

    khuyenMaiLocal.push(newKM);
    localStorage.setItem("KhuyenMai", JSON.stringify(khuyenMaiLocal));
    renderPromotions();

    alert("Thêm khuyến mại thành công!");
    closeModal('addPromotionModal');
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi thêm khuyến mại: " + error.message);
  }

}
function chuanBiSuaKhuyenMai(maKM) {
  const kmCanSua = khuyenMaiLocal.find(km => km.MAKM === maKM);

  if (!kmCanSua) {
    alert("Không tìm thấy khuyến mại!");
    return;
  }
  openModal('editPromotionModal');
  document.getElementById("editPromoId").value = kmCanSua.MAKM;
  document.getElementById("editPromoName").value = kmCanSua.TENKM;
  document.getElementById("editPromoDesc").value = kmCanSua.MOTA;
  document.getElementById("editPromoStart").value = kmCanSua.NGAYBD;
  document.getElementById("editPromoEnd").value = kmCanSua.NGAYKT;
  document.getElementById("editPromoValue").value = kmCanSua.GIATRI * 100;


}
function suaKhuyenMai(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form
  const makhuyenmai = document.getElementById("editPromoId").value;
  const tenkhuyenmai = document.getElementById("editPromoName").value;
  const mota = document.getElementById("editPromoDesc").value;
  const ngaybatdau = document.getElementById("editPromoStart").value;
  const ngayketthuc = document.getElementById("editPromoEnd").value;
  const giatri = parseFloat(document.getElementById("editPromoValue").value) / 100;
  let trangthai = "";

  if (makhuyenmai.trim() === "" || tenkhuyenmai.trim() === "" || ngaybatdau.trim() === "" || ngayketthuc.trim() === "" || isNaN(giatri) || mota.trim() === "") {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }
  if (!confirm("Bạn có chắc chắn muốn sửa khuyến mại này không?")) {
    return;
  }
  if (new Date(ngaybatdau) >= new Date(ngayketthuc)) {
    alert("Ngày kết thúc phải sau ngày bắt đầu!");
    return;
  }
  if (giatri <= 0 || giatri > 1) {
    alert("Giá trị khuyến mãi phải lớn hơn 0 và nhỏ hơn hoặc bằng 100%");
    return;
  }
  // Tìm index cần sửa
  const index = khuyenMaiLocal.findIndex(km => km.MAKM === makhuyenmai);
  if (index === -1) {
    alert("Khuyến mại không tồn tại!");
    return;
  }
  try {
    // cập nhật thông tin
    khuyenMaiLocal[index].TENKM = tenkhuyenmai;
    khuyenMaiLocal[index].MOTA = mota;
    khuyenMaiLocal[index].NGAYBD = ngaybatdau;
    khuyenMaiLocal[index].NGAYKT = ngayketthuc;
    khuyenMaiLocal[index].GIATRI = giatri;
    if (ngayketthuc < new Date().toISOString().split('T')[0]) {
      trangthai = "Hết hạn";
    }
    else if (ngaybatdau > new Date().toISOString().split('T')[0]) {
      trangthai = "Chưa áp dụng";
    }
    else {
      trangthai = "Đang áp dụng";
    }
    khuyenMaiLocal[index].TRANGTHAI = trangthai;

    localStorage.setItem("KhuyenMai", JSON.stringify(khuyenMaiLocal));
    renderPromotions();

    alert("Sửa khuyến mại thành công!");
    closeModal('editPromotionModal');
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi sửa khuyến mại: " + error.message);
  }

}
function xoaKhuyenMai(makhuyenmai) {
  if (!makhuyenmai) return;
  if (!confirm("Bạn có chắc chắn muốn xoá khuyến mại này không?")) {
    return;
  }
  // Không được xoá khuyến mại đang áp dụng
  let km = khuyenMaiLocal.find(km => km.MAKM === makhuyenmai);
  if (km.TRANGTHAI === "Đang áp dụng") {
    alert("Không thể xoá khuyến mại đang áp dụng!");
    return;
  }
  try {
    // Lọc bỏ đối tượng cần xoá
    khuyenMaiLocal = khuyenMaiLocal.filter(km => km.MAKM !== makhuyenmai);
    localStorage.setItem("KhuyenMai", JSON.stringify(khuyenMaiLocal));
    renderPromotions();
    alert("Xoá khuyến mại thành công!");
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi xoá khuyến mại: " + error.message);
  }
}


//DỊCH VỤ
function themDichVu(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form
  const madichvu = document.getElementById("serviceID").value;
  const tendichvu = document.getElementById("serviceName").value;
  const mota = document.getElementById("serviceDesc").value;
  const thoigian = parseInt(document.getElementById("serviceTime").value);
  const giadv = parseFloat(document.getElementById("servicePrice").value);
  const trangthai = document.getElementById("serviceStatus").value;
  const anh = document.getElementById("serviceImg").value;
  const quytrinh = document.getElementById("serviceProcedure").value;
  const loaidichvu = document.getElementById("serviceType").value;



  if (madichvu.trim() === "" || tendichvu.trim() === "" || isNaN(thoigian) || isNaN(giadv) || mota.trim() === "" || anh.trim() === "" || quytrinh.trim() === "") {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }
  if (!confirm("Bạn có chắc chắn muốn thêm dịch vụ này không?")) {
    return;
  }


  const dichvuExits = dichVuLocal.some(dv => dv.MADV === madichvu);
  if (dichvuExits) {
    alert("Dịch vụ đã tồn tại!");
    return;
  }
  if (giadv <= 0) {
    alert("Giá dịch vụ phải lớn hơn 0");
    return;
  }
  if (thoigian <= 0) {
    alert("Thời gian dịch vụ phải lớn hơn 0");
    return;
  }
  // Regex ảnh
  const imgPattern = /\.(png|jpg|jpeg|gif|webp)$/i;
  if (!imgPattern.test(anh)) {
    alert("Ảnh phải kết thúc bằng .png, .jpg, .jpeg, .gif, .webp!");
    return;
  }


  try {
    const newDV = {
      MADV: madichvu,
      TENDV: tendichvu,
      MOTA: mota,
      THOIGIAN: thoigian,
      GIADV: giadv,
      TRANGTHAI: trangthai,
      ANH: anh,
      QUYTRINH: quytrinh,
    };
    if (loaidichvu === "skin") {
      chamSocDaLocal.push(newDV);
      localStorage.setItem("ChamSocDa", JSON.stringify(chamSocDaLocal));
      renderSkincare();
      alert("Thêm dịch vụ chăm sóc da thành công!");
      closeModal('addServiceModal');
      return;
    }
    else if (loaidichvu === "hair") {

      dichVuLocal.push(newDV);
      localStorage.setItem("DichVu", JSON.stringify(dichVuLocal));
      renderServices();

      alert("Thêm dịch vụ tóc thành công!");
      closeModal('addServiceModal');
    }
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi thêm dịch vụ: " + error.message);
  }

}
function chuanBiSuaDichVu(maDVu) {
  const dvCanSua = dichVuLocal.find(dv => dv.MADV === maDVu);
  const csCanSua = chamSocDaLocal.find(cs => cs.MADV === maDVu);

  let kmCanSua = dvCanSua || csCanSua;

  if (!kmCanSua) {
    alert("Không tìm thấy dịch vụ cần sửa!");
    return;
  }
  openModal('editServiceModal');

  document.getElementById("editServiceId").value = kmCanSua.MADV;
  document.getElementById("editServiceName").value = kmCanSua.TENDV;
  document.getElementById("editServiceDesc").value = kmCanSua.MOTA;
  document.getElementById("editServiceTime").value = kmCanSua.THOIGIAN;
  document.getElementById("editServicePrice").value = kmCanSua.GIADV;
  document.getElementById("editServiceStatus").value = kmCanSua.TRANGTHAI;
  document.getElementById("editServiceImg").value = kmCanSua.ANH;
  document.getElementById("editServiceProcedure").value = kmCanSua.QUYTRINH;

}
function suaDichVu(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form
  const madichvu = document.getElementById("editServiceId").value;
  const tendichvu = document.getElementById("editServiceName").value;
  const mota = document.getElementById("editServiceDesc").value;
  const thoigian = parseInt(document.getElementById("editServiceTime").value);
  const giadv = parseFloat(document.getElementById("editServicePrice").value);
  const trangthai = document.getElementById("editServiceStatus").value;
  const anh = document.getElementById("editServiceImg").value;
  const quytrinh = document.getElementById("editServiceProcedure").value;

  if (!confirm("Bạn có chắc chắn muốn sửa dịch vụ này không?")) {
    return;
  }


  if (tendichvu.trim() === "" || isNaN(thoigian) || isNaN(giadv) || mota.trim() === "" || anh.trim() === "" || quytrinh.trim() === "") {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }
  if (giadv <= 0) {
    alert("Giá dịch vụ phải lớn hơn 0");
    return;
  }
  if (thoigian <= 0) {
    alert("Thời gian dịch vụ phải lớn hơn 0");
    return;
  }
  // Regex ảnh
  const imgPattern = /\.(png|jpg|jpeg|gif|webp)$/i;
  if (!imgPattern.test(anh)) {
    alert("Ảnh phải kết thúc bằng .png, .jpg, .jpeg, .gif, .webp!");
    return;
  }

  // Kiểm tra dịch vụ thuộc bảng nào
  let index = dichVuLocal.findIndex(dv => dv.MADV === madichvu);
  let indexCS = chamSocDaLocal.findIndex(cs => cs.MADV === madichvu);

  let targetList = null;
  let targetIndex = -1;

  if (index !== -1) {
    targetList = dichVuLocal;
    targetIndex = index;
  }
  else if (indexCS !== -1) {
    targetList = chamSocDaLocal;
    targetIndex = indexCS;
  }
  else {
    alert("Không tìm thấy dịch vụ!");
    return;
  }
  try {
    // Cập nhật
    targetList[targetIndex] = {
      ...targetList[targetIndex],
      TENDV: tendichvu,
      MOTA: mota,
      THOIGIAN: thoigian,
      GIADV: giadv,
      TRANGTHAI: trangthai,
      ANH: anh,
      QUYTRINH: quytrinh
    };

    // Lưu đúng bảng
    localStorage.setItem("DichVu", JSON.stringify(dichVuLocal));
    localStorage.setItem("ChamSocDa", JSON.stringify(chamSocDaLocal));

    renderServices();
    renderSkincare();

    alert("Sửa dịch vụ thành công!");
    closeModal('editServiceModal');
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi sửa dịch vụ: " + error.message);
  }

}
function xoaDichVu(madichvu) {
  if (!madichvu) return;
  if (!confirm("Bạn có chắc chắn muốn xoá dịch vụ này không?")) {
    return;
  }
  // Không được xoá dịch vụ đang hoạt động
  const dvCanXoa = dichVuLocal.find(dv => dv.MADV === madichvu);
  const csCanXoa = chamSocDaLocal.find(cs => cs.MADV === madichvu);

  let dichVuCanXoa = dvCanXoa || csCanXoa;

  if (!dichVuCanXoa) {
    alert("Dịch vụ không tồn tại!");
    return;
  }
  if (dichVuCanXoa.TRANGTHAI === "Đang cung cấp") {
    alert("Không thể xoá dịch vụ đang cung cấp!");
    return;
  }
  try {
    // Lọc bỏ đối tượng cần xoá
    dichVuLocal = dichVuLocal.filter(dv => dv.MADV !== madichvu);
    chamSocDaLocal = chamSocDaLocal.filter(cs => cs.MADV !== madichvu);

    localStorage.setItem("ChamSocDa", JSON.stringify(chamSocDaLocal));
    localStorage.setItem("DichVu", JSON.stringify(dichVuLocal));

    renderSkincare();
    renderServices();
    alert("Xoá dịch vụ thành công!");
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi xoá dịch vụ: " + error.message);
  }
}



//quản lý khách hàng
function themKhachHang(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form

  const makhachhang = document.getElementById("custID").value;
  const tenkhachhang = document.getElementById("custName").value;
  const sodienthoai = document.getElementById("custPhone").value;


  if (makhachhang.trim() === "" || tenkhachhang.trim() === "" || sodienthoai.trim() === "") {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }
  if (!confirm("Bạn có chắc chắn muốn thêm khách hàng này không?")) {
    return;
  }

  const exits = khachHangLocal.some(kh => kh.MAKH === makhachhang);
  if (exits) {
    alert("Khách hàng đã tồn tại!");
    return;
  }
  const checksdt = /^(03|05|07|08|09)[0-9]{8}$/;

  if (!checksdt.test(sodienthoai)) {
    alert("Số điện thoại không hợp lệ!");
    return;
  }
  try {
    const newKH = {
      MAKH: makhachhang,
      HOTEN: tenkhachhang,
      SDT: sodienthoai,
      MATK: "",
    };

    khachHangLocal.push(newKH);
    localStorage.setItem("KhachHang", JSON.stringify(khachHangLocal));
    renderCustomers();

    alert("Thêm khách hàng thành công!");
    closeModal('addCustomerModal');
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi thêm khách hàng: " + error.message);
  }

}


function chuanbiSuaKhachHang(makhachhang) {
  const khcanSua = khachHangLocal.find(kh => kh.MAKH === makhachhang);

  if (!khcanSua) {
    alert("Không tìm thấy khách hàng!");
    return;
  }
  openModal('editCustomerModal');
  document.getElementById("editCustID").value = khcanSua.MAKH;
  document.getElementById("editCustName").value = khcanSua.HOTEN;
  document.getElementById("editCustPhone").value = khcanSua.SDT;
}
function suaKhachHang(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form
  const makhachhang = document.getElementById("editCustID").value;
  const tenkhachhang = document.getElementById("editCustName").value;
  const sodienthoai = document.getElementById("editCustPhone").value;

  if (tenkhachhang.trim() === "" || sodienthoai.trim() === "") {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }
  if (!confirm("Bạn có chắc chắn muốn sửa khách hàng này không?")) {
    return;
  }
  const checksdt = /^(03|05|07|08|09)[0-9]{8}$/;


  // Tìm index cần sửa
  const index = khachHangLocal.findIndex(kh => kh.MAKH === makhachhang);
  if (index === -1) {
    alert("Khách hàng không tồn tại!");
    return;
  }
  if (!checksdt.test(sodienthoai)) {
    alert("Số điện thoại không hợp lệ!");
    return;
  }
  try {
    // cập nhật thông tin
    khachHangLocal[index].HOTEN = tenkhachhang;
    khachHangLocal[index].SDT = sodienthoai;

    localStorage.setItem("KhachHang", JSON.stringify(khachHangLocal));
    renderCustomers();

    alert("Sửa khách hàng thành công!");
    closeModal('editCustomerModal');
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi sửa khách hàng: " + error.message);
  }

}
function xoaKhachHang(makhachhang) {
  if (!makhachhang) return;
  if (!confirm("Bạn có chắc chắn muốn xoá khách hàng này không?")) {
    return;
  }
  try {
    // Lọc bỏ cần xoá
    khachHangLocal = khachHangLocal.filter(kh => kh.MAKH !== makhachhang);
    localStorage.setItem("KhachHang", JSON.stringify(khachHangLocal));
    renderCustomers();
    alert("Xoá khách hàng thành công!");
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi xoá khách hàng: " + error.message);
  }
}

//quản lý nhân viên
function themNhanVien(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form

  const manhanvien = document.getElementById("staffID").value;
  const tennhanvien = document.getElementById("staffName").value;
  const chucvu = document.getElementById("staffRole").value;
  const sodienthoai = document.getElementById("staffPhone").value;
  const diachi = document.getElementById("staffAddress").value;
  const ngaysinh = document.getElementById("staffBirth").value;
  const taikhoan = document.getElementById("staffAccount").value;
  const chinhanh = document.getElementById("staffBranch").value;


  if (manhanvien.trim() === "" || tennhanvien.trim() === "" || sodienthoai.trim() === "" || diachi.trim() === "") {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }
  if (!confirm("Bạn có chắc chắn muốn thêm nhân viên này không?")) {
    return;
  }

  const exits = nhanVienLocal.some(nv => nv.MANV === manhanvien);
  if (exits) {
    alert("Nhân viên đã tồn tại!");
    return;
  }
  const exitsSDT = nhanVienLocal.some(nv => nv.SDT === sodienthoai && nv.MANV !== manhanvien);
  if (exitsSDT) {
    alert("Số điện thoại đã trùng với nhân viên khác!");
    return;
  }
  const checksdt = /^(03|05|07|08|09)[0-9]{8}$/;

  if (!checksdt.test(sodienthoai)) {
    alert("Số điện thoại không hợp lệ!");
    return;
  }
  const year = parseInt(ngaysinh.split("-")[0]); // Lấy năm sinh VD:"2001-05-12"
  if (year > 2005 || year < 1980) {
    alert("Năm sinh không hợp lệ!");
    return;
  }
  // Nếu tài khoản rỗng, KHÔNG kiểm tra trùng, cho phép bỏ qua
  if (taikhoan.trim() !== "") {
    const exitsTAIKHOAN = nhanVienLocal.some(nv => nv.MATK === taikhoan && nv.MANV !== manhanvien);
    if (exitsTAIKHOAN) {
      alert("Tài khoản đã trùng với nhân viên khác!");
      return;
    }
  }

  try {
    const newNV = {
      MANV: manhanvien,
      HOTEN: tennhanvien,
      CHUCVU: chucvu,
      SDT: sodienthoai,
      DIACHI: diachi,
      NGAYSINH: ngaysinh,
      MATK: taikhoan,
      MACHINHANH: chinhanh
    };

    nhanVienLocal.push(newNV);
    localStorage.setItem("NhanVien", JSON.stringify(nhanVienLocal));
    renderStaff();

    alert("Thêm nhân viên thành công!");
    closeModal('addStaffModal');
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi thêm nhân viên: " + error.message);
  }

}


function chuanbiSuaNhanVien(manhanvien) {
  const canSua = nhanVienLocal.find(nv => nv.MANV === manhanvien);

  if (!canSua) {
    alert("Không tìm thấy nhân viên!");
    return;
  }
  openModal('editStaffModal');
  document.getElementById("editStaffId").value = canSua.MANV;
  document.getElementById("editStaffName").value = canSua.HOTEN;
  document.getElementById("editStaffRole").value = canSua.CHUCVU;
  document.getElementById("editStaffPhone").value = canSua.SDT;
  document.getElementById("editStaffAddress").value = canSua.DIACHI;
  document.getElementById("editStaffBirth").value = canSua.NGAYSINH;
  document.getElementById("editStaffAccount").value = canSua.MATK;
  document.getElementById("editStaffBranch").value = canSua.MACHINHANH;
}
function suaNhanVien(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form
  const manhanvien = document.getElementById("editStaffId").value;
  const tennhanvien = document.getElementById("editStaffName").value;
  const chucvu = document.getElementById("editStaffRole").value;
  const sodienthoai = document.getElementById("editStaffPhone").value;
  const diachi = document.getElementById("editStaffAddress").value;
  const ngaysinh = document.getElementById("editStaffBirth").value;
  const taikhoan = document.getElementById("editStaffAccount").value;
  const chinhanh = document.getElementById("editStaffBranch").value;

  if (manhanvien.trim() === "" || tennhanvien.trim() === "" || sodienthoai.trim() === "" || diachi.trim() === "") {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }
  if (!confirm("Bạn có chắc chắn muốn sửa nhân viên này không?")) {
    return;
  }
  const checksdt = /^(03|05|07|08|09)[0-9]{8}$/;


  // Tìm index cần sửa
  const index = nhanVienLocal.findIndex(nv => nv.MANV === manhanvien);
  if (index === -1) {
    alert("Nhân viên không tồn tại!");
    return;
  }
  if (!checksdt.test(sodienthoai)) {
    alert("Số điện thoại không hợp lệ!");
    return;
  }
  const exitsSDT = nhanVienLocal.some(nv => nv.SDT === sodienthoai && nv.MANV !== manhanvien);
  if (exitsSDT) {
    alert("Số điện thoại đã trùng với nhân viên khác!");
    return;
  }
  const year = parseInt(ngaysinh.split("-")[0]); // Lấy năm sinh VD:"2001-05-12"
  if (year > 2005 || year < 1980) {
    alert("Năm sinh không hợp lệ!");
    return;
  }
  const isAdmin = nhanVienLocal.some(nv => nv.MANV === manhanvien && nv.CHUCVU === "Admin")
  if (isAdmin) {
    alert("Không thể chỉnh quyền chủ shop!");
    return;
  }
  // Nếu tài khoản rỗng => KHÔNG kiểm tra trùng, cho phép bỏ qua
  if (taikhoan.trim() !== "") {
    const exitsTAIKHOAN = nhanVienLocal.some(nv => nv.MATK === taikhoan && nv.MANV !== manhanvien);
    if (exitsTAIKHOAN) {
      alert("Tài khoản đã trùng với nhân viên khác!");
      return;
    }
  }

  try {
    // cập nhật thông tin
    nhanVienLocal[index].HOTEN = tennhanvien;
    nhanVienLocal[index].CHUCVU = chucvu;
    nhanVienLocal[index].SDT = sodienthoai;
    nhanVienLocal[index].DIACHI = diachi;
    nhanVienLocal[index].NGAYSINH = ngaysinh;
    nhanVienLocal[index].MATK = taikhoan;
    nhanVienLocal[index].MACHINHANH = chinhanh;


    localStorage.setItem("NhanVien", JSON.stringify(nhanVienLocal));
    renderStaff();

    alert("Sửa nhân viên thành công!");
    closeModal('editStaffModal');
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi sửa nhân viên: " + error.message);
  }

}
function xoaNhanVien(manhanvien) {
  if (!manhanvien) return;
  if (!confirm("Bạn có chắc chắn muốn xoá nhân viên này không?")) {
    return;
  }
  const isAdmin = nhanVienLocal.some(nv => nv.MANV === manhanvien && nv.CHUCVU === "Admin")
  if (isAdmin) {
    alert("Không thể xoá chủ shop!");
    return;
  }
  try {
    // Lọc bỏ cần xoá
    nhanVienLocal = nhanVienLocal.filter(nv => nv.MANV !== manhanvien);
    localStorage.setItem("NhanVien", JSON.stringify(nhanVienLocal));
    renderStaff();
    alert("Xoá nhân viên thành công!");
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi xoá nhân viên: " + error.message);
  }
}



//quản lý hoá đơn

function loadLichHenHoanThanh() {
  //lấy lịch hẹn đã hoàn thành để chọn thêm hoá đơn
  const LichHenHoanThanh = lichHenLocal.filter(lh => lh.TRANGTHAI === "Hoàn thành");
  const lichHenSelect = document.getElementById("invoiceBookingId");

  lichHenSelect.innerHTML = '<option value="">-- Chọn lịch hẹn --</option>' +
    LichHenHoanThanh.map(lhht => `<option value="${lhht.MALICH}">${lhht.MALICH} | ${lhht.NGAYHEN} | ${lhht.GIOHEN} | ${lhht.MAKH}</option>`).join("");

  const NVSelect = document.getElementById("invoiceStaffId");
  //Khi chọn lịch hẹn có chi nhánh đi kèm thì load thu ngân tại chi nhánh đó
  lichHenSelect.addEventListener("change", function () {
    const malich = this.value;
    NVSelect.innerHTML = "<option value=''>-- Chọn thu ngân--</option>";
    // tìm lịch hẹn theo MALICH
    const lich = LichHenHoanThanh.find(lh => lh.MALICH === malich);
    if (!lich) return;
    const machinhanh = lich.MACHINHANH;

    const nvthunganTheoChiNhanh = nhanVienLocal.filter(nv => nv.MACHINHANH === machinhanh && nv.CHUCVU === "Thu ngân");
    nvthunganTheoChiNhanh.forEach(nv => {
      const opt = document.createElement("option");
      opt.value = nv.MANV;
      opt.textContent = `${nv.MANV} - ${nv.HOTEN}`;
      NVSelect.appendChild(opt);
    });
  });


  const KMSelect = document.getElementById("invoicePromoId");
  const khuyenMaiConHan = khuyenMaiLocal.filter(km => km.TRANGTHAI === "Đang áp dụng");

  KMSelect.innerHTML = '<option value="">-- Chọn khuyến mại --</option>' +
    khuyenMaiConHan.map(km => `<option value="${km.MAKM}">${km.MAKM} - ${km.MOTA}</option>`).join("");
}
function tudongtinhtien() {
  const maLH = document.getElementById("invoiceBookingId").value;
  const maKM = document.getElementById("invoicePromoId").value;
  const totalInput = document.getElementById("invoiceTotal");

  if (!maLH) {
    totalInput.value = 0;
    return;
  }

  //lấy giá dịch vụ từ lịch hẹn đã chọn
  const hoaDonTheoCTLichHen = chiTietLichHenLocal.filter(hdct => hdct.MALICH === maLH);

  const allServices = [...dichVuLocal, ...chamSocDaLocal]
  //LẤY GIÁ TỪ DỊCH VỤ
  let tongTien = 0;
  hoaDonTheoCTLichHen.forEach(ct => {
    const dichvu = allServices.find(dv => dv.MADV === ct.MADV)
    if (dichvu) {
      tongTien += Number(ct.SOLUONG) * Number(dichvu.GIADV);
    }
  })

  let giatriKM = 0;

  if (maKM) {
    const khuyenmai = khuyenMaiLocal.find(km => km.MAKM === maKM);
    if (khuyenmai) {
      giatriKM = Number(khuyenmai.GIATRI);
    }
  }

  tongTien = tongTien - (tongTien * giatriKM);

  totalInput.value = tongTien;
  return tongTien;
}

function themHoaDon(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form

  const maHD = document.getElementById("invoiceId").value;
  const maKM = document.getElementById("invoicePromoId").value;
  const hinhThuc = document.getElementById("invoicePaymentMethod").value;
  const maNV = document.getElementById("invoiceStaffId").value;
  const maLH = document.getElementById("invoiceBookingId").value;

  if (!maHD.trim() || maNV.length === 0 || maLH.length === 0 || maKM.length === 0) {
    alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
    return;
  }

  // Kiểm tra trùng mã hoá đơn
  const exits = hoaDonLocal.some(hd => hd.MAHD === maHD);
  if (exits) {
    alert("Mã hoá đơn đã tồn tại!");
    return;
  }
  if (!confirm("Bạn có chắc chắn muốn thêm hoá đơn này không?")) {
    return;
  }
  const exitsLichHen = hoaDonLocal.some(hd => hd.MALICH === maLH && hd.MAHD !== maHD);
  if (exitsLichHen) {
    alert("Lịch hẹn này đã nằm trong hoá đơn khác!");
    return;
  }

  const tongTien = tudongtinhtien();

  try {
    const newHD = {
      MAHD: maHD,
      MAKM: maKM,
      TONGTIEN: tongTien,
      HINHTHUCTHANHTOAN: hinhThuc,
      MANV: maNV,
      MALICH: maLH,
      TRANGTHAI: "Đang xử lý"
    };

    hoaDonLocal.push(newHD);
    localStorage.setItem("HoaDon", JSON.stringify(hoaDonLocal));

    renderInvoices();
    alert("Thêm hoá đơn thành công!");
    closeModal('addInvoiceModal');
    const hoatDongMoi = {
      thoigian: new Date().toLocaleString(),
      noidung: `Thêm hoá đơn: ${maHD}`,
      taikhoan: loggedInUser
    };

    hoatDongLocal.push(hoatDongMoi);
    localStorage.setItem("HoatDong", JSON.stringify(hoatDongLocal));
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi thêm hoá đơn: " + error.message);
  }

}

function chuanBiSuaHoaDon(mahoadon) {
  const hd = hoaDonLocal.find(h => h.MAHD === mahoadon);
  if (!hd) {
    alert("Không tìm thấy hoá đơn!");
    return;
  }

  openModal("editInvoiceModal");

  document.getElementById("editInvoiceId").value = hd.MAHD;
  document.getElementById("editInvoicePaymentMethod").value = hd.HINHTHUCTHANHTOAN;
  document.getElementById("editInvoiceStatus").value = hd.TRANGTHAI;
}

function suaHoaDon(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form
  const maHD = document.getElementById("editInvoiceId").value;
  const hinhThuc = document.getElementById("editInvoicePaymentMethod").value;
  const trangThai = document.getElementById("editInvoiceStatus").value;


  // Tìm index cần sửa
  const index = hoaDonLocal.findIndex(h => h.MAHD === maHD);
  if (index === -1) {
    alert("Không tìm thấy hoá đơn!");
    return;
  }
  const trangThaiCu = hoaDonLocal[index].TRANGTHAI;
  if (trangThai === trangThaiCu) {
    closeModal("editInvoiceModal");
    return;
  }
  if (trangThaiCu === "Đã thanh toán" || trangThaiCu === "Đã huỷ") {
    alert(`Hoá đơn đã "${trangThaiCu}", không thể thay đổi trạng thái nữa!`);
    return;
  }

  if (!confirm(`Bạn có chắc chắn muốn chuyển từ "${trangThaiCu}" sang "${trangThai}" không?`)) return;

  try {
    hoaDonLocal[index].HINHTHUCTHANHTOAN = hinhThuc;
    hoaDonLocal[index].TRANGTHAI = trangThai;

    localStorage.setItem("HoaDon", JSON.stringify(hoaDonLocal));
    renderInvoices();

    alert("Cập nhật hoá đơn thành công!");
    closeModal('editInvoiceModal');
    const hoatDongMoi = {
      thoigian: new Date().toLocaleString(),
      noidung: `Sửa hoá đơn: ${maHD}`,
      taikhoan: loggedInUser
    };

    hoatDongLocal.push(hoatDongMoi);
    localStorage.setItem("HoatDong", JSON.stringify(hoatDongLocal));
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi sửa hoá đơn: " + error.message);
  }

}
function xoaHoaDon(mahoadon) {
  if (!mahoadon) return;
  if (!confirm("Bạn có chắc chắn muốn xoá hoá đơn này không?")) return;
  const loggedInUser = localStorage.getItem("loggedInUser");
  const thungan = taiKhoanLocal.find(tk => tk.MATK === loggedInUser && tk.PHANQUYEN === 4);
  if (thungan) {
    alert("Bạn không có quyền xoá!");
    return;
  }
  const isDaThanhToan = hoaDonLocal.some(hd => hd.MAHD === mahoadon && hd.TRANGTHAI !== "Đã huỷ")
  if (isDaThanhToan) {
    alert("Chỉ có thể xoá hoá đơn đã huỷ!");
    return;
  }

  try {
    // Lọc bỏ cần xoá
    hoaDonLocal = hoaDonLocal.filter(h => h.MAHD !== mahoadon);
    localStorage.setItem("HoaDon", JSON.stringify(hoaDonLocal));
    renderInvoices();
    alert("Xoá hoá đơn thành công!");
    const hoatDongMoi = {
      thoigian: new Date().toLocaleString(),
      noidung: `Xoá hoá đơn: ${mahoadon}`,
      taikhoan: loggedInUser
    };

    hoatDongLocal.push(hoatDongMoi);
    localStorage.setItem("HoatDong", JSON.stringify(hoatDongLocal));
  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi xoá hoá đơn: " + error.message);
  }
}


//quản lý lịch hẹn
function xoaLichHen(malich) {
  if (!malich) return;
  if (!confirm("Bạn có chắc chắn muốn xoá lịch hẹn này không?")) return;
  const lichHenCanXoa = lichHenLocal.find(lh => lh.MALICH === malich);

  const loggedInUser = localStorage.getItem("loggedInUser");
  const letan = taiKhoanLocal.find(tk => tk.MATK === loggedInUser && tk.PHANQUYEN === 5);
  if (letan) {
    alert("Bạn không có quyền xoá!");
    return;
  }

  if (!lichHenCanXoa) {
    alert("Lịch hẹn không tồn tại!");
    return;
  }
  if (lichHenCanXoa.TRANGTHAI !== "Đã huỷ") {
    alert("Chỉ có thể xoá lịch hẹn có trạng thái huỷ! (Trạng thái hiện tại: " + lichHenCanXoa.TRANGTHAI + ")");
    return;
  }
  try {
    // Lọc bỏ cần xoá
    //xoá chi tiết trước
    chiTietLichHenLocal = chiTietLichHenLocal.filter(h => h.MALICH !== malich);
    localStorage.setItem("ChiTietLichHen", JSON.stringify(chiTietLichHenLocal));

    lichHenLocal = lichHenLocal.filter(h => h.MALICH !== malich);
    localStorage.setItem("LichHen", JSON.stringify(lichHenLocal));
    renderBookings();

    alert("Xoá lịch hẹn thành công!");
    const hoatDongMoi = {
      thoigian: new Date().toLocaleString(),
      noidung: `Xoá lịch hẹn: ${malich}`,
      taikhoan: loggedInUser
    };

    hoatDongLocal.push(hoatDongMoi);
    localStorage.setItem("HoatDong", JSON.stringify(hoatDongLocal));

  }
  catch (error) {
    alert("Đã có lỗi xảy ra khi xoá lịch hẹn: " + error.message);
  }
}

function loadBookingOptions() {
  // Load Chi Nhánh
  const branchSelect = document.getElementById("bookingBranchId");

  branchSelect.innerHTML = '<option value="">-- Chọn chi nhánh --</option>' +
    chiNhanhLocal.map(cn => `<option value="${cn.MACHINHANH}">${cn.TENCHINHANH}</option>`).join("");

  // Load Nhân Viên
  const staffSelect = document.getElementById("bookingStaffId");

  // Khi chọn chi nhánh, load thợ (nhân viên) theo chi nhánh
  branchSelect.addEventListener("change", function () {
    const machinhanh = this.value;

    staffSelect.innerHTML = '<option value="">-- Chọn nhân viên --</option>';
    if (!machinhanh) return;
    //Lọc nhân viên thuộc chi nhánh đó
    const nvTheoChiNhanh = nhanVienLocal.filter(nv => nv.MACHINHANH === machinhanh && nv.CHUCVU === "Stylist");
    staffSelect.innerHTML += nvTheoChiNhanh.map(nv =>
      `<option value="${nv.MANV}">${nv.HOTEN} (${nv.MANV})</option>`
    ).join("");
  });
  const dichvuSelect = document.getElementById("dichvu");
  const allServicesOption = [...dichVuLocal, ...chamSocDaLocal];

  // --- Load dịch vụ ---
  allServicesOption.filter(dv => dv.TRANGTHAI === "Đang cung cấp").forEach(dv => {
    const opt = document.createElement("option");
    opt.value = dv.MADV;
    opt.textContent = `${dv.TENDV} - ${dv.THOIGIAN.toLocaleString()} phút - ${dv.GIADV.toLocaleString()} VNĐ`;
    dichvuSelect.appendChild(opt);
  });
  //Load Khách Hàng
  const customerSelect = document.getElementById("bookingCustomerId");

  customerSelect.innerHTML = '<option value="">-- Chọn khách hàng --</option>' +
    khachHangLocal.map(kh => `<option value="${kh.MAKH}">${kh.HOTEN} - ${kh.SDT}</option>`).join("");
}

function loadHours() {
  const select = document.getElementById("giohen");
  const nhanvien = document.getElementById("bookingStaffId").value;
  const ngayhen = document.getElementById("bookingDate").value;

  select.innerHTML = "";
  if (!nhanvien || !ngayhen) {
    return;
  }

  const trunglich = lichHenLocal.filter(lh => lh.MANV === nhanvien && lh.NGAYHEN === ngayhen && lh.TRANGTHAI !== "Hủy");

  // Lấy danh sách GIOHEN trùng
  bookedHours = trunglich.map(lh => lh.GIOHEN);

  for (let h = 8; h <= 22; h++) {
    for (let m of [0, 30]) { // chia 30 phút/lần
      let hh = h.toString().padStart(2, "0");
      let mm = m.toString().padStart(2, "0");
      let time = `${hh}:${mm}`;

      // chỉ thêm giờ chưa bị trùng
      if (!bookedHours.includes(time)) {
        const option = document.createElement("option");
        option.value = time;
        option.textContent = time;
        select.appendChild(option);
      }
    }
  }
}
function themLichHen(event) {
  event.preventDefault();

  const bookingId = document.getElementById("bookingId").value.trim();
  const chiNhanh = document.getElementById("bookingBranchId").value;
  const nhanVien = document.getElementById("bookingStaffId").value;
  const ngayHen = document.getElementById("bookingDate").value;
  const gioHen = document.getElementById("giohen").value;
  const khachHang = document.getElementById("bookingCustomerId").value;
  const dichvu = document.getElementById("dichvu").value;
  const soLuong = parseInt(document.getElementById("bookingQuantity").value);

  if (!bookingId || !chiNhanh || !nhanVien || !ngayHen || !gioHen || !khachHang || !dichvu || !soLuong) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }
  if (!confirm("Bạn có chắc chắn muốn thêm lịch hẹn này không?")) return;
  const existed = lichHenLocal.some(lh => lh.MALICH === bookingId);
  if (existed) {
    alert("Mã lịch hẹn đã tồn tại! Vui lòng nhập mã khác.");
    return;
  }

  // Check ngày giờ phải trong tương lai
  if (new Date(ngayHen + " " + gioHen) < new Date()) {
    alert("Ngày hẹn phải là ngày trong tương lai!");
    return;
  }

  // Check trùng lịch (nhân viên, ngày, giờ, không phải trạng thái Huỷ)
  let dsLichHenCheck = JSON.parse(localStorage.getItem("LichHen")) || [];
  const isConflict = dsLichHenCheck.some(
    lh => lh.MANV === nhanVien && lh.NGAYHEN === ngayHen && lh.GIOHEN === gioHen && lh.TRANGTHAI !== "Huỷ"
  );

  if (isConflict) {
    alert("Nhân viên đã có lịch tại thời điểm này. Vui lòng chọn giờ khác.");
    return;
  }

  // Tạo lịch hẹn (dùng bookingId do bạn nhập)
  const newLichHen = {
    MALICH: bookingId,
    NGAYHEN: ngayHen,
    GIOHEN: gioHen,
    TRANGTHAI: "Đã đặt",
    MANV: nhanVien,
    MAKH: khachHang,
    MACHINHANH: chiNhanh,
  };

  // Chi tiết lịch hẹn
  const newCTLichHen = {
    MALICH: bookingId,
    MADV: dichvu,
    SOLUONG: soLuong,
    GHICHU: "Không"
  };

  // Lưu lịch hẹn
  let dsLichHen = JSON.parse(localStorage.getItem("LichHen")) || [];
  dsLichHen.push(newLichHen);
  localStorage.setItem("LichHen", JSON.stringify(dsLichHen));

  // Lưu chi tiết lịch hẹn
  let dsCT = JSON.parse(localStorage.getItem("ChiTietLichHen")) || [];
  dsCT.push(newCTLichHen);
  localStorage.setItem("ChiTietLichHen", JSON.stringify(dsCT));

  alert("Thêm lịch hẹn thành công!");
  closeModal("addBookingModal");
  const hoatDongMoi = {
      thoigian: new Date().toLocaleString(),
      noidung: `Thêm lịch hẹn: ${bookingId}`,
      taikhoan: loggedInUser
    };

    hoatDongLocal.push(hoatDongMoi);
    localStorage.setItem("HoatDong", JSON.stringify(hoatDongLocal));
}
//cập nhật trạng thái lịch hẹn
function chuanBiSuaLichHen(malich) {
  const lh = lichHenLocal.find(l => l.MALICH === malich);
  if (!lh) {
    alert("Không tìm thấy lịch hẹn!");
    return;
  }
  openModal("editBookingModal");

  document.getElementById("editBookingId").value = lh.MALICH;
  document.getElementById("editBookingStatus").value = lh.TRANGTHAI;
}

function suaLichHen(event) {
  event.preventDefault();
  const maLich = document.getElementById("editBookingId").value;
  const trangThaiMoi = document.getElementById("editBookingStatus").value;

  // Tìm vị trí trong mảng
  const index = lichHenLocal.findIndex(lh => lh.MALICH === maLich);
  if (index === -1) {
    alert("Lỗi: Không tìm thấy lịch hẹn gốc.");
    return;
  }
  //check thứ tự trạng thái
  const trangThaiCu = lichHenLocal[index].TRANGTHAI;
  if (trangThaiMoi === trangThaiCu) {
    closeModal("editBookingModal");
    return;
  }
  //check thứ tự trạng thái 
  //QUY TRÌNH 5 BƯỚC

  if (trangThaiCu === "Hoàn thành" || trangThaiCu === "Đã huỷ") {
    alert(`Lịch hẹn đã "${trangThaiCu}", không thể thay đổi trạng thái nữa!`);
    return;
  }

  if (trangThaiCu === "Đã đặt") {
    // Từ "Đã đặt" chỉ được sang "Đang chờ" hoặc "Đã huỷ"
    if (trangThaiMoi === "Đang thực hiện" || trangThaiMoi === "Hoàn thành") {
      alert("Lỗi quy trình: Từ 'Đã đặt' phải chuyển sang 'Đang chờ' trước!");
      return;
    }
  }
  else if (trangThaiCu === "Đang chờ") {
    // Từ "Đang chờ" chỉ được sang "Đang thực hiện" hoặc "Đã huỷ"
    if (trangThaiMoi === "Hoàn thành") {
      alert("Lỗi quy trình: Phải chuyển sang 'Đang thực hiện' trước khi 'Hoàn thành'!");
      return;
    }
    if (trangThaiMoi === "Đã đặt") {
      alert("Không thể quay ngược trạng thái về 'Đã đặt'!");
      return;
    }
  }
  else if (trangThaiCu === "Đang thực hiện") {
    // Từ "Đang thực hiện" chỉ được sang "Hoàn thành" (hoặc "Huỷ" nếu có sự cố)
    if (trangThaiMoi === "Đã đặt" || trangThaiMoi === "Đang chờ") {
      alert("Lỗi: Dịch vụ đang thực hiện, không thể quay về trạng thái trước!");
      return;
    }
  }

  if (!confirm(`Bạn có chắc chắn muốn chuyển từ "${trangThaiCu}" sang "${trangThaiMoi}" không?`)) return;

  try {
    lichHenLocal[index].TRANGTHAI = trangThaiMoi;

    localStorage.setItem("LichHen", JSON.stringify(lichHenLocal));
    renderBookings();
    alert("Cập nhật lịch hẹn thành công!");
    closeModal("editBookingModal");
    const hoatDongMoi = {
      thoigian: new Date().toLocaleString(),
      noidung: `Sửa lịch hẹn: ${maLich}`,
      taikhoan: loggedInUser
    };

    hoatDongLocal.push(hoatDongMoi);
    localStorage.setItem("HoatDong", JSON.stringify(hoatDongLocal));
  } catch (error) {
    alert("Có lỗi xảy ra: " + error.message);
  }
}
