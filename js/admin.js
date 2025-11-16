// Kiểm tra quyền admin
window.onload = function () {
  const loggedInUser = localStorage.getItem("loggedInUser");
  // if (!userLogin) {
  //   alert("Bạn không có quyền truy cập trang này!");
  //   window.location.href = "login.html";
  //   return;
  // }

  document.getElementById("login-hello").textContent = loggedInUser;

  loadDashboard();
  renderAllTables();
};

// Đăng xuất
function dangXuat() {
  localStorage.removeItem("userLogin");
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

// ================== DASHBOARD ==================
function loadDashboard() {
  document.getElementById("totalUsers").textContent = KHACHHANG.length;
  document.getElementById("todayBookings").textContent = LICHHEN.length;
  const tongDoanhThu = HOADON.reduce((sum, hd) => sum + hd.TONGTIEN, 0);
  document.getElementById("revenue").textContent = tongDoanhThu.toLocaleString("vi-VN") + "₫";
}

// ================== HIỂN THỊ DỮ LIỆU ==================
function renderAllTables() {
  renderAccounts();
  renderBranches();
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
  tbody.innerHTML = TAIKHOAN.map(tk => `
    <tr>
      <td>${tk.MATK}</td>
      <td>${tk.PASS}</td>
      <td>${tk.PHANQUYEN}</td>
      <td>${tk.TRANGTHAI}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${tk.MATK}"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${tk.MATK}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// CHI NHÁNH
function renderBranches() {
  const tbody = document.querySelector("#branchesTable tbody");
  if (!tbody) return;
  tbody.innerHTML = CHINHANH.map(cn => `
    <tr>
      <td>${cn.MACHINHANH}</td>
      <td>${cn.TENCHINHANH}</td>
      <td>${cn.DIACHI}</td>
      <td>${cn.SDT}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${cn.MACHINHANH}"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${cn.MACHINHANH}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// KHÁCH HÀNG
function renderCustomers() {
  const tbody = document.querySelector("#customersTable tbody");
  if (!tbody) return;
  tbody.innerHTML = KHACHHANG.map(kh => `
    <tr>
      <td>${kh.MAKH}</td>
      <td>${kh.HOTEN}</td>
      <td>${kh.SDT}</td>
      <td>${kh.MATK}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${kh.MAKH}"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${kh.MAKH}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// NHÂN VIÊN
function renderStaff() {
  const tbody = document.querySelector("#staffTable tbody");
  if (!tbody) return;
  tbody.innerHTML = NHANVIEN.map(nv => `
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
        <button class="btn small edit" data-id="${nv.MANV}"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${nv.MANV}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

//DỊCH VỤ TÓC
function renderServices() {
  const tbody = document.querySelector("#hairServicesTable tbody");
  if (!tbody) return;
  tbody.innerHTML = DICHVU.map(dv => `
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
        <button class="btn small edit" data-id="${dv.MADV}"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${dv.MADV}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// DỊCH VỤ CHĂM SÓC DA
function renderSkincare() {
  const tbody = document.querySelector("#skinCareServicesTable tbody");
  if (!tbody) return;
  tbody.innerHTML = CHAMSOCDA.map(cs => `
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
        <button class="btn small edit" data-id="${cs.MADV}"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${cs.MADV}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// KHUYẾN MÃI
function renderPromotions() {
  const tbody = document.querySelector("#promotionsTable tbody");
  if (!tbody) return;
  tbody.innerHTML = KHUYENMAI.map(km => `
    <tr>
      <td>${km.MAKM}</td>
      <td>${km.TENKM}</td>
      <td>${km.MOTA}</td>
      <td>${km.NGAYBD}</td>
      <td>${km.NGAYKT}</td>
      <td>${(km.GIATRI * 100).toFixed(0)}%</td>
      <td>${km.TRANGTHAI}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${km.MAKM}"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${km.MAKM}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// LỊCH HẸN
function renderBookings() {
  const tbody = document.querySelector("#bookingsTable tbody");
  if (!tbody) return;
  tbody.innerHTML = LICHHEN.map(lh => `
    <tr>
      <td>${lh.MALICH}</td>
      <td>${lh.NGAYHEN}</td>
      <td>${lh.TRANGTHAI}</td>
      <td>${lh.MANV}</td>
      <td>${lh.MAKH}</td>
      <td>${lh.MACHINHANH}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${lh.MALICH}"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${lh.MALICH}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

// CHI TIẾT LỊCH HẸN
function renderBookingDetails() {
  const tbody = document.querySelector("#bookingDetailsTable tbody");
  if (!tbody) return;
  tbody.innerHTML = CHITIETLICHHEN.map(ct => `
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
  tbody.innerHTML = HOADON.map(hd => `
    <tr>
      <td>${hd.MAHD}</td>
      <td>${hd.MAKM ?? "Không có"}</td>
      <td>${hd.TONGTIEN.toLocaleString("vi-VN")}₫</td>
      <td>${hd.HINHTHUCTHANHTOAN}</td>
      <td>${hd.MANV}</td>
      <td>${hd.MALICH}</td>
      <td>${hd.TRANGTHAI}</td>
      <td class="actions">
        <button class="btn small edit" data-id="${hd.MAHD}"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${hd.MAHD}"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}
