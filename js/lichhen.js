window.onload = function () {
    const sdt = localStorage.getItem("sodienthoai-datlich"); // Lấy dữ liệu



    if (!localStorage.getItem("DichVu")) {
        localStorage.setItem("DichVu", JSON.stringify(DICHVU));
    }
    if (!localStorage.getItem("ChamSocDa")) {
        localStorage.setItem("ChamSocDa", JSON.stringify(CHAMSOCDA));
    }
    if (!localStorage.getItem("NhanVien")) {
        localStorage.setItem("NhanVien", JSON.stringify(DICHVU));
    }
    let dichVuLocal = JSON.parse(localStorage.getItem("DichVu")) || DICHVU;
    let chamSocDaLocal = JSON.parse(localStorage.getItem("ChamSocDa")) || CHAMSOCDA;
    let nhanVienLocal = JSON.parse(localStorage.getItem("NhanVien")) || NHANVIEN;
    if (sdt) {
        document.getElementById("sdt-dat").value = sdt;
    }

    const chinhanhSelect = document.getElementById("chinhanh");
    const dichvuSelect = document.getElementById("dichvu");
    const nhanvienSelect = document.getElementById("nhanvien");
    // --- Load chi nhánh ---
    CHINHANH.forEach(cn => {
        const opt = document.createElement("option");
        opt.value = cn.MACHINHANH;
        opt.textContent = cn.TENCHINHANH;
        chinhanhSelect.appendChild(opt);
    });

    const allServicesOption = [...dichVuLocal, ...chamSocDaLocal];

    // --- Load dịch vụ ---
    allServicesOption.filter(dv => dv.TRANGTHAI === "Đang cung cấp").forEach(dv => {
        const opt = document.createElement("option");
        opt.value = dv.MADV;
        opt.textContent = `${dv.TENDV} - ${dv.THOIGIAN.toLocaleString()} phút - ${dv.GIADV.toLocaleString()} VNĐ`;
        dichvuSelect.appendChild(opt);
    });

    // --- Khi chọn chi nhánh, load thợ (nhân viên) theo chi nhánh ---
    chinhanhSelect.addEventListener("change", function () {
        const machinhanh = this.value;
        nhanvienSelect.innerHTML = "<option value=''>-- Chọn thợ --</option>";

        const nvTheoChiNhanh = nhanVienLocal.filter(nv => nv.MACHINHANH === machinhanh);
        nvTheoChiNhanh.forEach(nv => {
            const opt = document.createElement("option");
            opt.value = nv.MANV;
            opt.textContent = nv.HOTEN;
            nhanvienSelect.appendChild(opt);
        });
    });
    loadHours();
    document.getElementById("nhanvien").addEventListener("change", loadHours);
    document.getElementById("ngayhen").addEventListener("change", loadHours);
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

    // Tạo lịch hẹn
    const newLichHen = {
        MALICH: "LH" + Date.now(),
        NGAYHEN: ngayhen,
        GIOHEN: giohen,
        TRANGTHAI: "Đã đặt",
        MANV: nhanvien,
        MAKH: kh.MAKH,
        MACHINHANH: chinhanh,
    };
    const newCTLichHen = {
        MALICH: "LH" + Date.now(),
        MADV: dichvu,
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

    alert("Đặt lịch hẹn thành công!");
    window.location.href = "lichsu.html";
}