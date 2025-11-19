
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


function dangNhapLocal(event) {
  event.preventDefault();

  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  // Tìm tài khoản trong data.js
  let account = TAIKHOAN.find(acc => acc.MATK.toLowerCase() === user.toLowerCase() && acc.PASS === pass);

  //tìm tài khoản new USER đăng ký
  const registeredUsers = JSON.parse(localStorage.getItem("registeredUser")) || [];
  const exists = registeredUsers.find(u => u.MATK.toLowerCase() === user.toLowerCase());

  if (!account && exists) {
    if (
      exists.MATK.toLowerCase() === user.toLowerCase() &&
      exists.PASS === pass
    ) {
      account = {
        MATK: exists.MATK,
        PASS: exists.PASS,
        PHANQUYEN: 0,
        TRANGTHAI: "Hoạt động"
      };
    }
  }

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
  localStorage.removeItem("sdt");
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

  const taikhoan = TAIKHOAN.find(acc => acc.MATK.toLowerCase() === user.toLowerCase());

  const registeredUsers = JSON.parse(localStorage.getItem("registeredUser")) || [];
  const exists = registeredUsers.some(u => u.MATK.toLowerCase() === user.toLowerCase());//some trả về true/false

  if (taikhoan || exists) {
    alert("Tài khoản đã tồn tại. Vui lòng chọn tên đăng nhập khác.");
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
      SDT: "",
      MATK: user
    };

    // Thêm vào mảng registeredUser
    registeredUsers.push(newUser);
    localStorage.setItem("registeredUser", JSON.stringify(registeredUsers));

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
