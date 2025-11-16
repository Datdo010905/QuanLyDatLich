
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
  const account = TAIKHOAN.find(
    acc => acc.MATK.toLowerCase() === user.toLowerCase() && acc.PASS === pass
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

  return false;
}

function checkdangnhap() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const loginElement = document.getElementById("login-hello");
    const isLoginPage = window.location.pathname.includes("login.html");

    if (isLoginPage) return;
    
    if (!loggedInUser) {
        window.location.href = "login.html";
        return;
    }
    if (loginElement) {
        loginElement.innerHTML = ` ${loggedInUser} 
            <button onclick="dangXuat()" class="logout-btn">
                <i class="fas fa-right-from-bracket"></i>
            </button>`;
    }
}
window.addEventListener("DOMContentLoaded", checkdangnhap);

//đăng xuất
function dangXuat() {
    localStorage.removeItem("loggedInUser");
    
    const loginElement = document.getElementById("login-hello");
    if (loginElement) {
        loginElement.innerHTML = " Login";
    }
    window.location.href = "login.html";
}

//đăng ký
function dangKyLocal(event) {
    event.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const user = document.getElementById('username').value.trim();
    const pass1 = document.getElementById('pwd1').value.trim();
    const pass2 = document.getElementById('pwd2').value.trim();

    if (pass1 !== pass2) {
        alert("Mật khẩu không khớp. Vui lòng thử lại.");
        return;
    }
    if (pass1.length < 8) {
        alert('Mật khẩu phải có ít nhất 8 ký tự!');
        return false;
    }

    try {
      localStorage.setItem("registeredUser", JSON.stringify
        ({
            fullname: fullname,
            username: user,
            password: pass1
        }));
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        window.location.href = "login.html";
      }
    catch (e) {
        console.error('Lỗi đăng ký:', e);
        alert('Có lỗi xảy ra khi đăng ký!');
        return false; 
    }
}
