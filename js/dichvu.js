function formatCurrency(number) {
    return number.toLocaleString('vi-VN') + ' VNĐ';
}

//đưa dịch vụ lên index
window.onload = function () {

    const dsdv = document.getElementById("ds-dichvu");
    const dscs = document.getElementById("ds-chamsoc");
    let danhsachdv = "";
    let danhsachcs = "";

    DICHVU.forEach(dv => {
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
    
    CHAMSOCDA.forEach(cs => {
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