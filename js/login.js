
//toggle password
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const icon = document.getElementById('show-password');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}


if (!localStorage.getItem("KhachHang") || !localStorage.getItem("TaiKhoan")) {
  localStorage.setItem("KhachHang", JSON.stringify(KHACHHANG));
  localStorage.setItem("TaiKhoan", JSON.stringify(TAIKHOAN));
}



function dangNhapLocal(event) {
  event.preventDefault();

  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  // LẤY DANH SÁCH TÀI KHOẢN TỪ LOCALSTORAGE
  const dsTaiKhoan = JSON.parse(localStorage.getItem("TaiKhoan")) || [];

  // Tìm tài khoản
  const account = dsTaiKhoan.find(
    acc =>
      acc.MATK.toLowerCase() === user.toLowerCase() &&
      acc.PASS === pass
  );

  // Không tồn tại tài khoản
  if (!account) {
    alert("Sai thông tin đăng nhập hoặc tài khoản không tồn tại!");
    return false;
  }

  // Kiểm tra trạng thái
  if (account.TRANGTHAI !== "Hoạt động") {
    alert("Tài khoản đang bị tạm khóa, vui lòng liên hệ quản trị viên!");
    return false;
  }

  localStorage.setItem("loggedInUser", account.MATK);
  localStorage.setItem("phanQuyen", account.PHANQUYEN);

  if (account.PHANQUYEN === 1 || account.PHANQUYEN === 2) {
    alert("Đăng nhập thành công!");
    window.location.href = "admin.html";
  } else {
    alert("Đăng nhập thành công!");
    window.location.href = "index.html";
  }
  localStorage.removeItem("sodienthoai-datlich");
  localStorage.removeItem("danhSachLichHen");
  return false;
}

function checkdangnhap() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const loginElement = document.getElementById("login-hello");

  if (!loginElement) return;

  if (loggedInUser) {
    loginElement.innerHTML = ` ${loggedInUser} <button onclick="dangXuat()" class="logout-btn"><i class="fas fa-right-from-bracket"></i></button>`;
  } else {
    loginElement.innerHTML = `<a href="login.html"> Login</a>`;
  }
}
window.addEventListener("DOMContentLoaded", checkdangnhap);

//đăng xuất
function dangXuat() {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("sodienthoai-datlich");
  localStorage.removeItem("danhSachLichHen");

  const loginElement = document.getElementById("login-hello");
  if (loginElement) {
    loginElement.innerHTML = " Login";
  }
  window.location.href = "login.html";
}

function dangKyLocal(event) {
  event.preventDefault();

  const fullname = document.getElementById('fullname').value.trim();
  const user = document.getElementById('username').value.trim();
  const pass1 = document.getElementById('password').value.trim();
  const pass2 = document.getElementById('repassword').value.trim();

  if (pass1 !== pass2) {
    alert("Mật khẩu không khớp. Vui lòng thử lại.");
    return;
  }
  if (pass1.length < 8) {
    alert('Mật khẩu phải có ít nhất 8 ký tự!');
    return false;
  }
  const checksdt = /^(03|05|07|08|09)[0-9]{8}$/;

  if (!checksdt.test(user)) {
    alert("Số điện thoại không hợp lệ!");
    return;
  }

  // LẤY DANH SÁCH TÀI KHOẢN TỪ LOCALSTORAGE
  const dsTaiKhoan = JSON.parse(localStorage.getItem("TaiKhoan")) || [];

  // Tìm tài khoản
  const taikhoan = dsTaiKhoan.find(
    acc =>
      acc.MATK.toLowerCase() === user.toLowerCase()
  );

  //tồn tại tài khoản
  if (taikhoan) {
    alert("Tài khoản đã tồn tại. Vui lòng chọn tài khoản khác.");
    return;
  }

  try {
    // Tạo user mới
    const newUser = {
      MATK: user,
      PASS: pass1,
      PHANQUYEN: 0,
      TRANGTHAI: "Hoạt động"
    };

    const newKH = {
      MAKH: "KH" + Date.now(), // mã khách hàng theo timestamp
      HOTEN: fullname,
      SDT: user,
      MATK: user
    };

    // Thêm vào mảng tài khoản và lưu vào localStorage
    dsTaiKhoan.push(newUser);
    localStorage.setItem("TaiKhoan", JSON.stringify(dsTaiKhoan));

    // Thêm khách hàng mới
    const khachhangList = JSON.parse(localStorage.getItem("KhachHang")) || [];
    khachhangList.push(newKH);
    localStorage.setItem("KhachHang", JSON.stringify(khachhangList));

    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    window.location.href = "login.html";
  }
  catch (e) {
    console.error('Lỗi đăng ký:', e);
    alert('Có lỗi xảy ra khi đăng ký!');
    return false;
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


function quenMatKhauLocal(event) {
  event.preventDefault();

  const sdt = document.getElementById("emailOrPhone").value;
  let taiKhoanLocal = JSON.parse(localStorage.getItem("TaiKhoan"));
  if (sdt === "") {
    alert("Vui lòng số điện thoại!");
    return;
  }
  const checksdt = /^(03|05|07|08|09)[0-9]{8}$/;

  if (!checksdt.test(sdt)) {
    alert("Số điện thoại không hợp lệ!");
    return;
  }
  const trungSDTYeuCau = taiKhoanLocal.find(tk => tk.MATK === sdt);
  if (trungSDTYeuCau) {
    alert("Yêu cầu khôi phục mật khẩu đã được gửi!\nVui lòng kiểm tra email hoặc tin nhắn của bạn.");
    alert(`Mật khẩu của bạn là: ${trungSDTYeuCau.PASS}`);
  }

  // 
  // return true;
}