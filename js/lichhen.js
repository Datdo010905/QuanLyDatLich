

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


function themlichhen() {
    const hoten = document.getElementById("hoten-dat").value.trim();
    const chinhanh = document.getElementById("chinhanh").value;
    const dichvu = document.getElementById("dichvu").value;
    const nhanvien = document.getElementById("nhanvien").value;
    const ngayhen = document.getElementById("ngayhen").value;
    const giohen = document.getElementById("giohen").value;
    const sdt = document.getElementById("sdt-dat").value.trim();
    if (!hoten || !chinhanh || !dichvu || !nhanvien || !ngayhen || !giohen || !sdt) {
        alert("Vui lòng điền đầy đủ thông tin để đặt lịch hẹn!");
        return;
    }
    const newLichHen = {
        MALICH: "LH" + Date.now(),
        NGAYHEN: NGAYHEN,
        GIOHEN: GIOHEN,
        TRANGTHAI: "Đã đặt",
        MANV: NHANVIEN,
        MAKH: "KH001",
        MACHINHANH: CHINHANH
    };
    let dsLichHen = JSON.parse(localStorage.getItem("danhSachLichHen")) || [];
    dsLichHen.push(newLichHen);
    localStorage.setItem("danhSachLichHen", JSON.stringify(dsLichHen));
    alert("Đặt lịch hẹn thành công!");
}