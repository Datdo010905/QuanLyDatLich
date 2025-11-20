window.onload = function () {
    const sdt = localStorage.getItem("sodienthoai-datlich"); // Lấy dữ liệu
    //localStorage.setItem("KhachHang", JSON.stringify(KHACHHANG));
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

    const allServicesOption = [...DICHVU, ...CHAMSOCDA];

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

        const nvTheoChiNhanh = NHANVIEN.filter(nv => nv.MACHINHANH === machinhanh);
        nvTheoChiNhanh.forEach(nv => {
            const opt = document.createElement("option");
            opt.value = nv.MANV;
            opt.textContent = nv.HOTEN;
            nhanvienSelect.appendChild(opt);
        });
    });
};

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
    // Trường hợp tên bị mặc định
    if (hoten === "Khách hàng mới" ||
        khList.find(k => k.HOTEN === "Khách hàng mới" && k.SDT === sdt)) 
    {
        alert("Vui lòng đổi tên khác tên mặc định 'Khách hàng mới' để đặt lịch hẹn!");
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

    // Tạo lịch hẹn
    const newLichHen = {
        MALICH: "LH" + Date.now(),
        NGAYHEN: ngayhen,
        GIOHEN: giohen,
        TRANGTHAI: "Đã đặt",
        MANV: nhanvien,
        MAKH: kh.MAKH,
        MACHINHANH: chinhanh,
        MADICHVU: dichvu
    };

    let dsLichHen = JSON.parse(localStorage.getItem("danhSachLichHen")) || [];
    dsLichHen.push(newLichHen);
    localStorage.setItem("danhSachLichHen", JSON.stringify(dsLichHen));

    alert("Đặt lịch hẹn thành công!");
}