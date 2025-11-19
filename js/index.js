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
  })
};
  



if (!localStorage.getItem("KhachHang") || !localStorage.getItem("TaiKhoan")) {
    localStorage.setItem("KhachHang", JSON.stringify(KHACHHANG));
    localStorage.setItem("TaiKhoan", JSON.stringify(TAIKHOAN));
}


let list_KH = JSON.parse(localStorage.getItem("KhachHang")) || [];

  function luusodienthoai() {

  const sdt = document.getElementById("input-sdt").value.trim();
  if(!sdt) { alert("Vui lòng nhập số điện thoại!"); return; }

  localStorage.setItem("sodienthoai-datlich", sdt);

  let khList = JSON.parse(localStorage.getItem("KhachHang")) || [];
  let kh = khList.find(k => k.SDT === sdt);

  if(!kh) {
    // tạo khách hàng mới
    kh = {
      MAKH: "KH" + Date.now(),
      HOTEN: "Khách hàng mới",
      SDT: sdt,
      MATK: sdt
    };
    list_KH.push(kh);
    localStorage.setItem("KhachHang", JSON.stringify(list_KH));
  }

  // tạo tài khoản nếu chưa có
  let dsUser = JSON.parse(localStorage.getItem("TaiKhoan")) || [];
  if(!dsUser.find(u => u.MATK === sdt)) {
    dsUser.push(
      { MATK: sdt,
         PASS: sdt, 
         PHANQUYEN: 0, 
         TRANGTHAI: "Hoạt động" });
    localStorage.setItem("TaiKhoan", JSON.stringify(dsUser));
  }

  localStorage.setItem("loggedInUser", sdt);
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



