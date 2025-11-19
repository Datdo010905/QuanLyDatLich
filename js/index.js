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

  
function luusodienthoai() {
  const sdt = document.getElementById("input-sdt").value.trim();

  if (!sdt) {
    alert("Vui lòng nhập số điện thoại!");
    return;
  }

  // Tìm khách hàng đã tồn tại
  const khachhang = KHACHHANG.find(kh => kh.MATK === sdt || kh.SDT === sdt);

  if (khachhang) {
    // Đăng nhập tự động
    localStorage.setItem("loggedInUser", khachhang.MATK);
    localStorage.removeItem("danhSachLichHen");

    window.location.href = "lichhen.html";
  } else {
    //Tạo tài khoản nếu chưa có
    const newUser = {
      MATK: sdt,
      PASS: sdt,
      PHANQUYEN: 0,
      TRANGTHAI: "Hoạt động"
    };

    localStorage.setItem("registeredUser", JSON.stringify(newUser));

    //Tạo khách hàng mới
    const newKH = {
      MAKH: "KH" + Date.now(),
      HOTEN: "Khách hàng " + Date.now(),
      SDT: sdt,
      MATK: sdt
    };

    // Lưu vào localStorage
    let dsKH = JSON.parse(localStorage.getItem("KhachHang")) || [];
    dsKH.push(newKH);
    localStorage.setItem("KhachHang", JSON.stringify(dsKH));

    // Đăng nhập tự động
    localStorage.setItem("loggedInUser", sdt);

    window.location.href = "lichhen.html";
  }
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



