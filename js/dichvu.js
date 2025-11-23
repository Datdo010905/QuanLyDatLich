function formatCurrency(number) {
    return number.toLocaleString('vi-VN') + ' VNĐ';
}

//đưa dịch vụ lên index
window.onload = function () {

    const dsdv = document.getElementById("ds-dichvu");
    const dscs = document.getElementById("ds-chamsoc");
    if (!localStorage.getItem("DichVu")) {
        localStorage.setItem("DichVu", JSON.stringify(DICHVU));
    }
    if (!localStorage.getItem("ChamSocDa")) {
        localStorage.setItem("ChamSocDa", JSON.stringify(CHAMSOCDA));
    }
    let dichVuLocal = JSON.parse(localStorage.getItem("DichVu")) || DICHVU;
    let chamSocDaLocal = JSON.parse(localStorage.getItem("ChamSocDa")) || CHAMSOCDA;

    const dsDVcungcap = dichVuLocal.filter(dv => dv.TRANGTHAI === "Đang cung cấp");
    const dsCSDcungcap = chamSocDaLocal.filter(dv => dv.TRANGTHAI === "Đang cung cấp");

    let danhsachdv = "";
    let danhsachcs = "";

    dsDVcungcap.forEach(dv => {
        danhsachdv += `
                <div class="col-s-6 col-m-4 col-x-3">
                    <div class="item">
                        <br />
                        <img class="pic_item" title="${dv.TENDV}" src="${dv.ANH}" />
                        <br /><br />
                        
                        <a class="product-name" href="javascript:void(0);" onclick="xemChiTiet('${dv.MADV}')">
                            ${dv.TENDV}
                        </a><br /><br />
                        
                        <span class="giamgia">${dv.THOIGIAN} phút</span>
                        <br />
                        <div class="gia">
                            <span class="product-price">${formatCurrency(dv.GIADV)}</span>
                        </div>
                    </div>
                </div>
        `;
        dsdv.innerHTML = danhsachdv;
    });
    
    dsCSDcungcap.forEach(cs => {
        danhsachcs += `
                <div class="col-s-6 col-m-4 col-x-3">
				<div class="item">
					<br />
					<img class="pic_item" title="${cs.TENDV}" src="${cs.ANH}" /> <br /><br />
					<a class="product-name" href="javascript:void(0);" onclick="xemChiTiet('${cs.MADV}')">
                            ${cs.TENDV}
                        </a><br /><br />
					<span class="giamgia">${cs.THOIGIAN} phút</span>
					<br />
					<div class="gia"><span class="product-price">${formatCurrency(cs.GIADV)}</span></div>
				</div>
			</div>
        `;
        dscs.innerHTML = danhsachcs;
    });
}
// javascript:void(0); link giả

function xemChiTiet(maDichVu) {
    localStorage.setItem('madichvuCanXem', maDichVu);
    window.location.href = 'chitietdichvu.html';
}