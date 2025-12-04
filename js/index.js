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
  });
  
  if (!localStorage.getItem("KhachHang") || !localStorage.getItem("TaiKhoan")) {
    localStorage.setItem("KhachHang", JSON.stringify(KHACHHANG));
    localStorage.setItem("TaiKhoan", JSON.stringify(TAIKHOAN));
  };
  
}
  






  
function luusodienthoai() {
  const sdt = document.getElementById("input-sdt").value.trim();
  if (!sdt) {
    alert("Vui lòng nhập số điện thoại!");
    return;
  }
  const checksdt = /^(03|05|07|08|09)[0-9]{8}$/;

  if (!checksdt.test(sdt)) {
    alert("Số điện thoại không hợp lệ!");
    return;
  }

  localStorage.setItem("sodienthoai-datlich", sdt);

  let khList = JSON.parse(localStorage.getItem("KhachHang")) || [];
  const logged = localStorage.getItem("loggedInUser"); // MATK đang đăng nhập
  let kh;

  // Nếu đang đăng nhập, kiểm tra xem MATK này có SDT trùng với số nhập hay không
  let khDangNhap = khList.find(k => k.MATK === logged);

  if (logged && khDangNhap && khDangNhap.SDT !== sdt) {
    // ĐANG ĐĂNG NHẬP SỐ A nhưng NHẬP SỐ B
    // => Chuyển sang tài khoản B
    let khTheoSDT = khList.find(k => k.SDT === sdt);

    if (khTheoSDT) {
      kh = khTheoSDT; // Dùng KH đã có
    } else {
      // Tạo KH mới nếu số B chưa từng có
      kh = {
        MAKH: "KH" + Date.now(),
        HOTEN: "Khách hàng mới",
        SDT: sdt,
        MATK: sdt
      };
      khList.push(kh);
      localStorage.setItem("KhachHang", JSON.stringify(khList));
    }

  } else if (logged) {
    // ĐANG ĐĂNG NHẬP & số nhập trùng thì giữ nguyên
    kh = khDangNhap;

  } else {
    // KHÔNG ĐĂNG NHẬP
    kh = khList.find(k => k.SDT === sdt);

    if (!kh) {
      kh = {
        MAKH: "KH" + Date.now(),
        HOTEN: "Khách hàng mới",
        SDT: sdt,
        MATK: sdt
      };
      khList.push(kh);
      localStorage.setItem("KhachHang", JSON.stringify(khList));
    }
  }

  // TẠO TÀI KHOẢN NẾU CHƯA CÓ
  let dsUser = JSON.parse(localStorage.getItem("TaiKhoan")) || [];
  let tk = dsUser.find(u => u.MATK === kh.MATK);

  if (!tk) {
    dsUser.push({
      MATK: kh.MATK,
      PASS: sdt,
      PHANQUYEN: 0,
      TRANGTHAI: "Hoạt động"
    });
    localStorage.setItem("TaiKhoan", JSON.stringify(dsUser));
    alert("Tạo tài khoản tự động cho khách hàng mới. Vui lòng đăng nhập bằng số điện thoại và mật khẩu là chính số điện thoại.");
  }

  // ĐĂNG NHẬP TÀI KHOẢN TƯƠNG ỨNG VỚI SỐ ĐANG NHẬP
  localStorage.setItem("loggedInUser", kh.MATK);

  window.location.href = "lichhen.html";
}








//dang nhap api
// function dangNhap(event) { 
  
//   event.preventDefault(); // chặn hành vi reload trang 

//   const user = document.getElementById('username').value.trim(); 
//   const pass = document.getElementById('password').value.trim(); 

//   axios.get(`https:localhost:7259/api/TaiKhoan_/dangnhap?username=${user}&pass=${pass}`) 
//   .then(res => {
//       console.log("Kết quả API:", res.data);

//       if (res.data.success) {
//         alert(res.data.message || "Đăng nhập thành công!");
//         // Có thể lưu token nếu API trả về
//         // localStorage.setItem('token', res.data.token);
//         window.location.href = "admin.html";
//       } else {
//         alert(res.data.message || "Sai thông tin đăng nhập!");
//       }
//     })
//     .catch(err => {
//       console.error("Lỗi khi gọi API:", err);
//       alert("Không thể kết nối đến API hoặc lỗi mạng!");
//     });
// }

// // kiêm tra trạng thái đăng nhập khi tải trang
// window.addEventListener('DOMContentLoaded', () => {
//     checkdangnhap();
// });



