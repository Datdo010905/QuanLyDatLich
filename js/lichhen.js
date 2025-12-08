window.onload = function () {
    const sdt = localStorage.getItem("sodienthoai-datlich"); // Lấy dữ liệu
    const logged = localStorage.getItem("loggedInUser"); 


    if (!localStorage.getItem("DichVu")) {
        localStorage.setItem("DichVu", JSON.stringify(DICHVU));
    }
    if (!localStorage.getItem("ChamSocDa")) {
        localStorage.setItem("ChamSocDa", JSON.stringify(CHAMSOCDA));
    }
    if (!localStorage.getItem("NhanVien")) {
        localStorage.setItem("NhanVien", JSON.stringify(NHANVIEN));
    }
    let dichVuLocal = JSON.parse(localStorage.getItem("DichVu")) || DICHVU;
    let chamSocDaLocal = JSON.parse(localStorage.getItem("ChamSocDa")) || CHAMSOCDA;
    let nhanVienLocal = JSON.parse(localStorage.getItem("NhanVien")) || NHANVIEN;
    let chiNhanhLocal = JSON.parse(localStorage.getItem("ChiNhanh")) || CHINHANH;
    if (sdt) {
        document.getElementById("sdt-dat").value = sdt;
    }else{
        document.getElementById("sdt-dat").value = logged;
    }

    const chinhanhSelect = document.getElementById("chinhanh");
    const dichvuSelect = document.getElementById("dichvu");
    const nhanvienSelect = document.getElementById("nhanvien");
    // --- Load chi nhánh ---
    chiNhanhLocal.forEach(cn => {
        const opt = document.createElement("option");
        opt.value = cn.MACHINHANH;
        opt.textContent = cn.TENCHINHANH;
        chinhanhSelect.appendChild(opt);
    });

    const allServicesOption = [...dichVuLocal, ...chamSocDaLocal];

    const dichvuXem = this.localStorage.getItem("madichvuCanXem");
    // --- Load dịch vụ ---
    allServicesOption.filter(dv => dv.TRANGTHAI === "Đang cung cấp").forEach(dv => {
        const opt = document.createElement("option");
        opt.value = dv.MADV;
        opt.textContent = `${dv.TENDV} - ${dv.THOIGIAN.toLocaleString()} phút - ${dv.GIADV.toLocaleString()} VNĐ`;
        dichvuSelect.appendChild(opt);

        if (dichvuXem) {
            dichvuSelect.value = dichvuXem;
        }
    });


    // --- Khi chọn chi nhánh, load thợ theo chi nhánh ---
    chinhanhSelect.addEventListener("change", function () {
        const machinhanh = this.value;
        nhanvienSelect.innerHTML = "<option value=''>-- Chọn thợ --</option>";

        const nvTheoChiNhanh = nhanVienLocal.filter(nv => nv.MACHINHANH === machinhanh && nv.CHUCVU === "Stylist");
        nvTheoChiNhanh.forEach(nv => {
            const opt = document.createElement("option");
            opt.value = nv.MANV;
            opt.textContent = nv.HOTEN;
            nhanvienSelect.appendChild(opt);
        });
    });

    document.getElementById("nhanvien").addEventListener("change", loadHours);
    document.getElementById("ngayhen").addEventListener("change", loadHours);
    loadHours();
};


function loadHours() {
    const select = document.getElementById("giohen");
    const nhanvien = document.getElementById("nhanvien").value;
    const ngayhen = document.getElementById("ngayhen").value;

    select.innerHTML = "";
    if (!nhanvien || !ngayhen) {
        return;
    }

    //check trùng lịch hẹn
    let dsLichHenCheck = JSON.parse(localStorage.getItem("LichHen")) || [];

    const trunglich = dsLichHenCheck.filter(lh => lh.MANV === nhanvien && lh.NGAYHEN === ngayhen && lh.TRANGTHAI !== "Hủy");

    // Lấy danh sách GIOHEN trùng
    bookedHours = trunglich.map(lh => lh.GIOHEN);

    for (let h = 8; h <= 22; h++) {
        for (let m of [0, 30]) { // chia 30 phút/lần
            let hh = h.toString().padStart(2, "0");
            let mm = m.toString().padStart(2, "0");
            let time = `${hh}:${mm}`;

            // chỉ thêm giờ chưa bị trùng
            if (!bookedHours.includes(time)) {
                const option = document.createElement("option");
                option.value = time;
                option.textContent = time;
                select.appendChild(option);
            }
        }
    }
}



if (!localStorage.getItem("KhachHang")) {
    localStorage.setItem("KhachHang", JSON.stringify(KHACHHANG));
}

function themlichhen(event) {
    event.preventDefault(); // Ngăn chặn submit form mặc định
    const hoten = document.getElementById("hoten-dat").value.trim();
    const chinhanh = document.getElementById("chinhanh").value;
    const dichvu = document.getElementById("dichvu").value;
    const nhanvien = document.getElementById("nhanvien").value;
    const ngayhen = document.getElementById("ngayhen").value;
    const giohen = document.getElementById("giohen").value;
    const sdt = document.getElementById("sdt-dat").value.trim();

    let khList = JSON.parse(localStorage.getItem("KhachHang")) || [];

    if (!hoten || !chinhanh || !dichvu || !nhanvien || !ngayhen || !giohen || !sdt) {
        alert("Vui lòng điền đầy đủ thông tin để đặt lịch hẹn!");
        return;
    }

    // Cập nhật tên khách nếu đã tồn tại
    let kh = khList.find(k => k.SDT === sdt);
    if (kh) {
        kh.HOTEN = hoten;
        localStorage.setItem("KhachHang", JSON.stringify(khList));
    } else {
        alert("Không tìm thấy khách hàng từ số điện thoại! Vui lòng quay lại bước trước.");
        return;
    }
    if (new Date(ngayhen + ' ' + giohen) < new Date()) {
        alert("Ngày hẹn phải là ngày trong tương lai!");
        return;
    }
    if (nhanvien === "") {
        alert("Vui lòng chọn chi nhánh -> thợ (nhân viên) để đặt lịch hẹn!");
        return;
    }
    //check trùng lịch hẹn
    let dsLichHenCheck = JSON.parse(localStorage.getItem("LichHen")) || [];
    const isConflict = dsLichHenCheck.some(lh => lh.MANV === nhanvien && lh.NGAYHEN === ngayhen && lh.GIOHEN === giohen && lh.TRANGTHAI !== "Hủy");
    if (isConflict) {
        alert("Lịch hẹn bị trùng! Vui lòng chọn ngày giờ khác.");
        return;
    }
    const tam = {
        hoten,
        chinhanh,
        dichvu,
        nhanvien,
        ngayhen,
        giohen,
        sdt,
        makh: kh.MAKH
    };
    localStorage.setItem("TamLichHen", JSON.stringify(tam));
    openModal('checkpass');
}

function DatLich(event) {
    event.preventDefault();
    let taikhoanLocal = JSON.parse(localStorage.getItem("TaiKhoan")) || TAIKHOAN;
    const matkhauCanCheck = document.getElementById('password').value;

    const loggedInUser = localStorage.getItem("loggedInUser");

    const taikhoandangnhap = taikhoanLocal.find(tk => tk.MATK === loggedInUser);
    //console.log(taikhoandangnhap);
    if (!taikhoandangnhap) {
        alert("Không tìm thấy tài khoản đăng nhập!");
        return;
    }
    if (matkhauCanCheck !== taikhoandangnhap.PASS) {
        alert("Mật khẩu không đúng!");
        return;
    }
    //alert("Xác nhận mật khẩu thành công!");

    const t = JSON.parse(localStorage.getItem("TamLichHen"));
    if (!t) {
        alert("Không có dữ liệu lịch hẹn!");
        return;
    }
    const malich = "LH" + Date.now();
    const newLichHen = {
        MALICH: malich,
        NGAYHEN: t.ngayhen,
        GIOHEN: t.giohen,
        TRANGTHAI: "Đã đặt",
        MANV: t.nhanvien,
        MAKH: t.makh,
        MACHINHANH: t.chinhanh,
    };
    const newCTLichHen = {
        MALICH: malich,
        MADV: t.dichvu,
        SOLUONG: 1,
        GHICHU: "Không"
    };

    let dsLichHen = JSON.parse(localStorage.getItem("LichHen")) || [];
    dsLichHen.push(newLichHen);
    localStorage.setItem("LichHen", JSON.stringify(dsLichHen));
    //thêm chi tiết
    let chitietlichhen = JSON.parse(localStorage.getItem("ChiTietLichHen")) || [];
    chitietlichhen.push(newCTLichHen);
    localStorage.setItem("ChiTietLichHen", JSON.stringify(chitietlichhen));

    // Xóa dữ liệu tạm
    localStorage.removeItem("TamLichHen");

    alert("Đặt lịch hẹn thành công!");
    window.location.href = "lichsu.html";
    const hoatDongMoi = {
      thoigian: new Date().toLocaleString(),
      noidung: `Đặt lịch hẹn: ${malich}`,
      taikhoan: loggedInUser
    };  
    let hoatDongLocal = JSON.parse(localStorage.getItem("HoatDong")) || [];
    hoatDongLocal.push(hoatDongMoi);
    localStorage.setItem("HoatDong", JSON.stringify(hoatDongLocal));
}

//TÌM KIẾM DỊCH VỤ
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("indexSearch");
    const resultsBox = document.getElementById("searchResults");

    let allServices = [];
    
    if (localStorage.getItem("DichVu")) {
        allServices = JSON.parse(localStorage.getItem("DichVu"));
    } else if (typeof DICHVU !== 'undefined') {
        allServices = DICHVU;
    } 
    //gộp cả Dịch vụ Tóc và Chăm sóc da
    if (localStorage.getItem("ChamSocDa")) {
        const skinCare = JSON.parse(localStorage.getItem("ChamSocDa"));
        allServices = allServices.concat(skinCare);
    }

    // 2. Sự kiện khi gõ vào ô tìm kiếm
    if (searchInput && resultsBox) {
        searchInput.addEventListener("input", function (e) {
            const keyword = e.target.value.toLowerCase().trim();
            resultsBox.innerHTML = ""; // Xóa kết quả cũ

            if (keyword.length === 0) {
                resultsBox.style.display = "none";
                return;
            }

            // Lọc dịch vụ theo tên
            const filteredServices = allServices.filter(dv => 
                dv.TENDV.toLowerCase().includes(keyword)
            );

            if (filteredServices.length > 0) {
                resultsBox.style.display = "block";
                
                filteredServices.forEach(dv => {
                    const li = document.createElement("li");
                    
                    // Format giá tiền
                    const gia = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dv.GIADV);
                    li.innerHTML = `
                        <img src="${dv.ANH || 'img/logo.png'}" alt="img">
                        <div>
                            <b>${dv.TENDV}</b><br>
                            <i style="line-height: 22px; margin-right: 20px">${gia}</i>
                            <span style="color: #0a2a78">${dv.THOIGIAN} phút</span>
                        </div>
                    `;

                    //click vào kết quả
                    li.addEventListener("click", function () {
                        searchInput.value = dv.TENDV;
                        resultsBox.style.display = "none";
                        localStorage.setItem('madichvuCanXem', dv.MADV);
                        window.location.href = "chitietdichvu.html"; 
                    });
                    //thêm lên 
                    resultsBox.appendChild(li);
                });
            } else {
                resultsBox.style.display = "none";
            }
        });

        //Ẩn dropdown khi click ra ngoài
        document.addEventListener("click", function (e) {
            if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
                resultsBox.style.display = "none";
            }
        });
    }
});