var n=8;
var i=1;


function next(){
	if(i==n)
		i=1;
	else
		i++;
        var img = document.getElementById("slideshow_img");
            img.setAttribute("src", "img/SLIDE/slideshow_" + i + ".jpg");
}

function autoplay(){
	setInterval(next, 3000)
}


window.onload = function() {
// Lấy tên file hiện tại (ví dụ: "about.html")
  const currentPage = window.location.pathname.split("/").pop();

  // Lấy tất cả link trong menu
  const menuLinks = document.querySelectorAll("#menu-item .me_item");

  menuLinks.forEach(link => {
    const linkPage = link.getAttribute("href");

    // Nếu href trùng với trang hiện tại → tô màu
    if (linkPage === currentPage) {
      link.classList.add("active");
      link.parentElement.classList.add("active"); // tô luôn <li>
    }
  });}


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


//border password input
function checklength() {
    const passwordInput = document.getElementById('pwd1');
    if (passwordInput.value.length < 8) {
        passwordInput.style.boxShadow = '0 0 8px #ff3002ff';
    } else {
        passwordInput.style.boxShadow = '0 0 8px #00e5ff';
    }
}

//dang nhap 
function dangNhap(event) { 
  
  event.preventDefault(); // chặn hành vi reload trang 

  const user = document.getElementById('username').value.trim(); 
  const pass = document.getElementById('password').value.trim(); 

  axios.get(`https:localhost:7259/api/TaiKhoan_/dangnhap?username=${user}&pass=${pass}`) 
  .then(res => {
      console.log("Kết quả API:", res.data);

      if (res.data.success) {
        alert(res.data.message || "Đăng nhập thành công!");
        // Có thể lưu token nếu API trả về
        // localStorage.setItem('token', res.data.token);
        window.location.href = "admin.html";
      } else {
        alert(res.data.message || "Sai thông tin đăng nhập!");
      }
    })
    .catch(err => {
      console.error("Lỗi khi gọi API:", err);
      alert("Không thể kết nối đến API hoặc lỗi mạng!");
    });
}

// kiêm tra trạng thái đăng nhập khi tải trang
window.addEventListener('DOMContentLoaded', () => {
    checkdangnhap();
});
//kiếm tra trạng thái đăng nhập
function checkdangnhap() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const loginElement = document.getElementById("login-hello");
    
    if (loggedInUser && loginElement) {
        loginElement.innerHTML = ` Xin chào, ${loggedInUser} <button onclick="dangXuat()" class="logout-btn">Đăng xuất</button>`;
    }
}
//dang nhập local
function dangNhapLocal(event) {
    event.preventDefault();

    const loginUser = localStorage.getItem("registeredUser");
    if (!loginUser) {
        alert("Tài khoản không tồn tại! Vui lòng đăng ký.");
        return;
    }

    const registeredUser = JSON.parse(loginUser);

    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (user === registeredUser.username && pass === registeredUser.password) {
        // Save login state
        localStorage.setItem("loggedInUser", user);
        localStorage.setItem("isLoggedIn", "true");
        
        // Update UI
        const loginElement = document.getElementById("login-hello");
        if (loginElement) {
            loginElement.innerHTML = `Xin chào ${user} <button onclick="dangXuat()" class="logout-btn">Đăng xuất</button>`;
        }

        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
    } else {
        alert("Sai thông tin đăng nhập!");

        const loginElement = document.getElementById("login-hello");
        if (loginElement) {
            loginElement.innerHTML = " Login";
        }
    }
}
//đăng xuất
function dangXuat() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isLoggedIn");
    
    const loginElement = document.getElementById("login-hello");
    if (loginElement) {
        loginElement.innerHTML = " Login";
    }

    window.location.href = "index.html";
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



//chuyển ảnh chi tiết dịch vụ
function slide(i) {
  document.getElementById("slide_dv").src = `img/catgoicombo1_/cat-goi-combo-1-${i}.png`;
}