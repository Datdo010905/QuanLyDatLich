window.addEventListener("DOMContentLoaded", () => {
    checkdangnhap();
    renderBookingsForCustomer();
});

// LẤY THÔNG TIN KHÁCH HÀNG ĐĂNG NHẬP
const mataikhoan = localStorage.getItem("loggedInUser");
const khachHangLocal = JSON.parse(localStorage.getItem("KhachHang")) || [];
const lichHenLocal = JSON.parse(localStorage.getItem('LichHen')) || [];
const chitietLichHenLocal = JSON.parse(localStorage.getItem('ChiTietLichHen')) || [];
const dichVuLocal = JSON.parse(localStorage.getItem("DichVu")) || DICHVU;
const chamSocDaLocal = JSON.parse(localStorage.getItem("ChamSocDa")) || CHAMSOCDA;

const khachhang = khachHangLocal.find(
    kh => kh.MATK === mataikhoan || kh.SDT === mataikhoan
);

if (!khachhang) {
    window.location.href = "login.html";
}


// LỊCH HẸN
function renderBookingsForCustomer() {
    const tbody = document.querySelector(".lichsu-table tbody");

    //console.log(khachhang);
    //console.log(lichHenLocal);

    const LICHHEN_KH = lichHenLocal.filter(lh => lh.MAKH === khachhang.MAKH);
    console.log(LICHHEN_KH);
    if (!tbody) {
        return;
    }
    const lichdangcho = LICHHEN_KH.find(lh => lh.TRANGTHAI === "Đang chờ");
    if (lichdangcho) {
        alert("Lịch hẹn của bạn đã được duyệt, mau đến cắt tóc thôi nào!!");
    }
    if (LICHHEN_KH.length === 0) {
        // Xử lý khi không có lịch hẹn
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Bạn chưa có lịch hẹn nào. Hãy tiếp tục đặt lịch!</td></tr>';
        return;
    }
    tbody.innerHTML = LICHHEN_KH.map(lh => {
        const TENCHINHANH = CHINHANH.find(cn => cn.MACHINHANH === lh.MACHINHANH)?.TENCHINHANH || "Chưa rõ";
        const TENNV = NHANVIEN.find(nv => nv.MANV === lh.MANV)?.HOTEN || "Chưa rõ";
        const trangThaiClass = (lh.TRANGTHAI || "").toLowerCase()
            .replace(/ /g, '-') // thay ' ' bằng '-'
        //console.log("Trạng thái lớp:", trangThaiClass);
        return `
      <tr>
        <td>${lh.MALICH}</td>
        <td>${TENCHINHANH}</td> 
        <td>${TENNV}</td>     
        <td>${lh.NGAYHEN}</td>
        <td>${lh.GIOHEN}</td>
        <td class="status ${trangThaiClass}">
          ${lh.TRANGTHAI}
        </td>
        
        <td class="actions">
          <button class="btn small view" onclick = "xemChiTiet('${lh.MALICH}')"><i class="fas fa-eye"></i></button>
          <button class="btn small delete" onclick = "HuyLich('${lh.MALICH}')"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
    }).join("");
}

// CHI TIẾT LỊCH HẸN
function closeviewCT() {
    document.getElementById('booking-details').style.display = 'none';
}

// Format tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}
// CHI TIẾT LỊCH HẸN
function xemChiTiet(malich) {
    const chitiet = chitietLichHenLocal.filter(ct => ct.MALICH === malich);
    if (!chitiet || chitiet.length === 0) {
        alert("Không tìm thấy chi tiết lịch hẹn.");
        return;
    }
    console.log(chitiet);
    const h3 = document.getElementById("tieudechitiet");
    h3.innerHTML = `Chi tiết lịch hẹn ${malich}
                    <button class="btn small delete" onclick="closeviewCT()">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </button>`;

    const tableBody = document.getElementById("detail-table-body");
    tableBody.innerHTML = "";

    chitiet.forEach(ct => {
        const allServices = [...dichVuLocal, ...chamSocDaLocal];
        const TENDV = allServices.find(dv => dv.MADV === ct.MADV)?.TENDV || "Chưa rõ";
        const dongia = allServices.find(dv => dv.MADV === ct.MADV)?.GIADV || 0;
        const thanhtien = dongia * ct.SOLUONG;
        const row = `
                <tr>
                  <td>${TENDV}</td>
                  <td>${ct.SOLUONG}</td>
                  <td>${formatCurrency(dongia)}</td>
                  <td>${formatCurrency(thanhtien)}</td>
                  <td>${ct.GHICHU}</td>
                </tr>`;
        tableBody.innerHTML += row;
    });



    document.getElementById('booking-details').style.display = 'block';
}


//HỦY LỊCH HẸN
function HuyLich(malich) {
    const lichHenCanHuy = lichHenLocal.find(lh => lh.MALICH === malich);
    if (!lichHenCanHuy) {
        alert("Không tìm thấy lịch hẹn.");
        return;
    }
    //check trạng thái khác đã đặt rồi thì không được huỷ
    if (lichHenCanHuy.TRANGTHAI !== "Đã đặt") {
        alert(`Không thể hủy lịch hẹn ở trạng thái "${lichHenCanHuy.TRANGTHAI}".`);
        return;
    }
    else if (confirm(`Bạn có chắc chắn muốn hủy lịch hẹn ${malich} không?`)) {
        lichHenCanHuy.TRANGTHAI = "Đã huỷ";

        localStorage.setItem('LichHen', JSON.stringify(lichHenLocal));
        alert(`Lịch hẹn ${malich} đã được hủy.`);
        renderBookingsForCustomer();
    }
}