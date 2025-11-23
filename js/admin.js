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
  document.getElementById("totalUsers").textContent = khachHangLocal.length;
  lichHenLocal.forEach(lh => {
    if (new Date(lh.NGAYHEN).toDateString() === new Date().toDateString()) {
      document.getElementById("todayBookings").textContent = (parseInt(document.getElementById("todayBookings").textContent) || 0) + 1;
    }
  });
  const tongDoanhThu = hoaDonLocal.reduce((sum, hd) => sum + hd.TONGTIEN, 0);
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
        <button class="btn small edit" data-id="${dv.MADV}" onclick="chuanBiSuaDichVu('${dv.MADV}')"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${dv.MADV}" onclick="xoaDichVu('${dv.MADV}')"><i class="fas fa-trash"></i></button>
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
        <button class="btn small edit" data-id="${cs.MADV}" onclick="chuanBiSuaDichVu('${cs.MADV}')"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${cs.MADV}" onclick="xoaDichVu('${cs.MADV}')"><i class="fas fa-trash"></i></button>
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
        <button class="btn small edit" data-id="${km.MAKM}" onclick="chuanBiSuaKhuyenMai('${km.MAKM}')"><i class="fas fa-edit"></i></button>
        <button class="btn small delete" data-id="${km.MAKM}" onclick = "xoaKhuyenMai('${km.MAKM}')"><i class="fas fa-trash"></i></button>
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
  // Regex mô tả
  const motaPattern = /^[a-zA-Z0-9]+(?:,\s*[a-zA-Z0-9]+)*$/;
  if (!motaPattern.test(mota)) {
    alert("Mô tả phải là các mục cách nhau bởi dấu phẩy, không có mục trống!");
    return;
  }

  // Regex quy trình
  const quytrinhPattern = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
  if (!quytrinhPattern.test(quytrinh)) {
    alert("Quy trình phải ngăn cách bằng dấu - !");
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
  const fileInput = document.getElementById("editServiceImg");
  const anhFile = fileInput.files.length > 0 ? fileInput.files[0] : null;
  const quytrinh = document.getElementById("editServiceProcedure").value;

  if (!confirm("Bạn có chắc chắn muốn sửa dịch vụ này không?")) {
    return;
  }

  if (madichvu.trim() === "" || tendichvu.trim() === "" || isNaN(thoigian) || isNaN(giadv) || mota.trim() === "" || anh.trim() === "" || quytrinh.trim() === "") {
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
  // Regex mô tả
  const motaPattern = /^[a-zA-Z0-9]+(?:,\s*[a-zA-Z0-9]+)*$/;
  if (!motaPattern.test(mota)) {
    alert("Mô tả phải là các mục cách nhau bởi dấu phẩy, không có mục trống!");
    return;
  }

  // Regex quy trình
  const quytrinhPattern = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
  if (!quytrinhPattern.test(quytrinh)) {
    alert("Quy trình phải ngăn cách bằng dấu - !");
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
      ANH: anhFile,
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
  document.getElementById("editStaffBranch").value= canSua.MACHINHANH;
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
  if(isAdmin){
    alert("Không thể chỉnh quyền chủ shop!");
    return;
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
  if(isAdmin){
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
