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

  const taiKhoan = TAIKHOAN.find(tk => tk.MATK === loggedInUser);
  if (!taiKhoan) {
    //alert("Tài khoản không tồn tại!");
    window.location.href = "login.html";
    return;
  }
  if (taiKhoan.PHANQUYEN !== 2 && taiKhoan.PHANQUYEN !== 1) {
    alert("Bạn không có quyền truy cập trang này!");
    window.location.href = "login.html";
    return;
  }
  //check nếu là nhân viên thì ẩn mục quản lý tài khoản, khuyến mãi, hoá đơn
  if (taiKhoan.PHANQUYEN === 2) {
    document.querySelector("a[data-section='dashboard']").style.display = "none";
    document.querySelector("a[data-section='accounts']").style.display = "none";
    document.querySelector("a[data-section='promotions']").style.display = "none";
    document.querySelector("a[data-section='invoices']").style.display = "none";
    document.querySelector("a[data-section='reports']").style.display = "none";
  }

  document.getElementById("login-hello").textContent = loggedInUser;

  loadDashboard();
  renderAllTables();
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

// ================== DASHBOARD ==================
function loadDashboard() {
  const khachhangLocal = JSON.parse(localStorage.getItem("KhachHang", JSON.stringify(TAIKHOAN)));
  document.getElementById("totalUsers").textContent = khachhangLocal.length;

  const lichHenLocal = JSON.parse(localStorage.getItem("LichHen", JSON.stringify(LICHHEN)));
  lichHenLocal.forEach(lh => {
    if (new Date(lh.NGAYHEN).toDateString() === new Date().toDateString()) {
      document.getElementById("todayBookings").textContent = (parseInt(document.getElementById("todayBookings").textContent) || 0) + 1;
    }
  });

  const hoadonLocal = JSON.parse(localStorage.getItem("HoaDon", JSON.stringify(HOADON)));
  const tongDoanhThu = hoadonLocal.reduce((sum, hd) => sum + hd.TONGTIEN, 0);
  document.getElementById("revenue").textContent = tongDoanhThu.toLocaleString("vi-VN") + "₫";

  // Thêm sự kiện mới nhất vào bảng hoạt động
  const recentTable = document.querySelector("#recentTable tbody");
  if (!recentTable) return;
  if (recentTable) {
    recentTable.innerHTML = `
      <tr>
        <td>${new Date().toLocaleString()}</td>
        <td>Đăng nhập hệ thống</td>
        <td>${loggedInUser}</td>
      </tr>
    `;
  }
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
  const taiKhoanLocal = JSON.parse(localStorage.getItem("TaiKhoan", JSON.stringify(TAIKHOAN)));
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

// // CHI NHÁNH
// function renderBranches() {
//   const tbody = document.querySelector("#branchesTable tbody");
//   const ChiNhanhLocal = JSON.parse(localStorage.getItem("ChiNhanh", JSON.stringify(CHINHANH)));
//   if (!tbody) return;
//   tbody.innerHTML = ChiNhanhLocal.map(cn => `
//     <tr>
//       <td>${cn.MACHINHANH}</td>
//       <td>${cn.TENCHINHANH}</td>
//       <td>${cn.DIACHI}</td>
//       <td>${cn.SDT}</td>
//       <td class="actions">
//         <button class="btn small edit" data-id="${cn.MACHINHANH}" ><i class="fas fa-edit"></i></button>
//         <button class="btn small delete" data-id="${cn.MACHINHANH}"><i class="fas fa-trash"></i></button>
//       </td>
//     </tr>
//   `).join("");
// }

// KHÁCH HÀNG
function renderCustomers() {
  const tbody = document.querySelector("#customersTable tbody");
  const khachhangLocal = JSON.parse(localStorage.getItem("KhachHang", JSON.stringify(KHACHHANG)));
  if (!tbody) return;
  tbody.innerHTML = khachhangLocal.map(kh => `
    <tr>
      <td>${kh.MAKH}</td>
      <td>${kh.HOTEN}</td>
      <td>${kh.SDT}</td>
      <td>${kh.MATK}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${kh.MAKH}"  onclick="openModal('editCustomerModal')"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${kh.MAKH}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// NHÂN VIÊN
function renderStaff() {
  const tbody = document.querySelector("#staffTable tbody");
  const NhanVienLocal = JSON.parse(localStorage.getItem("NhanVien", JSON.stringify(NHANVIEN)));
  if (!tbody) return;
  tbody.innerHTML = NhanVienLocal.map(nv => `
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
        <button class="btn small edit" data-id="${nv.MANV}"  onclick="openModal('editStaffModal')"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${nv.MANV}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

//DỊCH VỤ TÓC
function renderServices() {
  const tbody = document.querySelector("#hairServicesTable tbody");
  const DichVuTocLocal = JSON.parse(localStorage.getItem("DichVu", JSON.stringify(DICHVU)));
  if (!tbody) return;
  tbody.innerHTML = DichVuTocLocal.map(dv => `
    <tr>
      <td>${dv.MADV}</td>
      <td>${dv.TENDV}</td>
      <td>${dv.MOTA}</td>
      <td>${dv.THOIGIAN} phút</td>
      <td>${dv.GIADV.toLocaleString("vi-VN")}₫</td>
      <td>${dv.TRANGTHAI}</td>
      <td><img src="${dv.ANH}" alt="${dv.TENDV}" width="60"></td>
      <td>${dv.QUYTRINH}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${dv.MADV}"  onclick="openModal('editServiceModal')"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${dv.MADV}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// DỊCH VỤ CHĂM SÓC DA
function renderSkincare() {
  const tbody = document.querySelector("#skinCareServicesTable tbody");
  const ChamSocDaLocal = JSON.parse(localStorage.getItem("ChamSocDa", JSON.stringify(CHAMSOCDA)));
  if (!tbody) return;
  tbody.innerHTML = ChamSocDaLocal.map(cs => `
    <tr>
      <td>${cs.MADV}</td>
      <td>${cs.TENDV}</td>
      <td>${cs.MOTA}</td>
      <td>${cs.THOIGIAN} phút</td>
      <td>${cs.GIADV.toLocaleString("vi-VN")}₫</td>
      <td>${cs.TRANGTHAI}</td>
      <td><img src="${cs.ANH}" alt="${cs.TENDV}" width="60"></td>
      <td>${cs.QUYTRINH}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${cs.MADV}"  onclick="openModal('editServiceModal')"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${cs.MADV}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// KHUYẾN MÃI
function renderPromotions() {
  const tbody = document.querySelector("#promotionsTable tbody");
  const KhuyenMaiLocal = JSON.parse(localStorage.getItem("KhuyenMai", JSON.stringify(KHUYENMAI)));
  if (!tbody) return;
  tbody.innerHTML = KhuyenMaiLocal.map(km => `
    <tr>
      <td>${km.MAKM}</td>
      <td>${km.TENKM}</td>
      <td>${km.MOTA}</td>
      <td>${km.NGAYBD}</td>
      <td>${km.NGAYKT}</td>
      <td>${(km.GIATRI * 100).toFixed(0)}%</td>
      <td>${km.TRANGTHAI}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${km.MAKM}" onclick="openModal('editPromotionModal')"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${km.MAKM}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// LỊCH HẸN
function renderBookings() {
  const tbody = document.querySelector("#bookingsTable tbody");
  const lichHenLocal = JSON.parse(localStorage.getItem("LichHen", JSON.stringify(LICHHEN)));
  if (!tbody) return;
  tbody.innerHTML = lichHenLocal.map(lh => `
    <tr>
      <td>${lh.MALICH}</td>
      <td>${lh.NGAYHEN}</td>
      <td>${lh.TRANGTHAI}</td>
      <td>${lh.MANV}</td>
      <td>${lh.MAKH}</td>
      <td>${lh.MACHINHANH}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${lh.MALICH}"  onclick="openModal('editBookingModal')" ><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${lh.MALICH}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// CHI TIẾT LỊCH HẸN
function renderBookingDetails() {
  const tbody = document.querySelector("#bookingDetailsTable tbody");
  const ChiTietLichHenLocal = JSON.parse(localStorage.getItem("ChiTietLichHen", JSON.stringify(CHITIETLICHHEN)));
  if (!tbody) return;
  tbody.innerHTML = ChiTietLichHenLocal.map(ct => `
    <tr>
      <td>${ct.MALICH}</td>
      <td>${ct.MADV}</td>
      <td>${ct.SOLUONG}</td>
      <td>${ct.GHICHU}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${ct.MALICH}-${ct.MADV}"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${ct.MALICH}-${ct.MADV}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// HÓA ĐƠN
function renderInvoices() {
  const tbody = document.querySelector("#invoicesTable tbody");
  if (!tbody) return;
  const hoadonLocal = JSON.parse(localStorage.getItem("HoaDon", JSON.stringify(HOADON)));
  tbody.innerHTML = hoadonLocal.map(hd => `
    <tr>
      <td>${hd.MAHD}</td>
      <td>${hd.MAKM ?? "Không có"}</td>
      <td>${hd.TONGTIEN.toLocaleString("vi-VN")}₫</td>
      <td>${hd.HINHTHUCTHANHTOAN}</td>
      <td>${hd.MANV}</td>
      <td>${hd.MALICH}</td>
      <td>${hd.TRANGTHAI}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${hd.MAHD}"  onclick="openModal('editInvoiceModal')"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${hd.MAHD}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}


//TÀI KHOẢN
// Mở modal
function openAccountModal() {
  const modal = document.getElementById("addAccountModal");
  modal.style.display = "block";
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
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}