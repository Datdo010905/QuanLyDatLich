

window.onload = function () {
    const sdt = localStorage.getItem("sdt"); // Lấy dữ liệu
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

    // --- Load dịch vụ ---
    DICHVU.filter(dv => dv.TRANGTHAI === "Đang cung cấp").forEach(dv => {
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

function themlichhen()
{
    alert("Đặt lịch hẹn thành công!");
}