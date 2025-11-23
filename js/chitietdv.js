
function formatCurrency(number) {
    return number.toLocaleString('vi-VN') + ' VNĐ';
}


function taoDanhSachMoTa(motaString) {
    const moTaArray = motaString.split(','); // Tách bằng dấu ,
    let listHTML = "";
    moTaArray.forEach(item => {
        listHTML += `<li>${item.trim()}</li>`;
    });
    return listHTML;
}


function taoDanhSachQuyTrinh(quyTrinhString) {
    const buocArray = quyTrinhString.split('-'); // Tách bằng dấu gạch ngang
    let listHTML = "";
    buocArray.forEach(buoc => {
        listHTML += `<li>${buoc.trim()}</li>`;
    });
    return listHTML;
}


window.addEventListener('DOMContentLoaded', function () {

    const maDichVu = localStorage.getItem('madichvuCanXem');
    const ctdv = document.getElementById("chitietdichvu");
    if (!localStorage.getItem("DichVu")) {
        localStorage.setItem("DichVu", JSON.stringify(DICHVU));
    }
    if (!localStorage.getItem("ChamSocDa")) {
        localStorage.setItem("ChamSocDa", JSON.stringify(CHAMSOCDA));
    }
    let dichVuLocal = JSON.parse(localStorage.getItem("DichVu")) || DICHVU;
    let chamSocDaLocal = JSON.parse(localStorage.getItem("ChamSocDa")) || CHAMSOCDA;

    if (maDichVu) {
        const dv = dichVuLocal.find(item => item.MADV === maDichVu);
        const cs = chamSocDaLocal.find(item => item.MADV === maDichVu);

        if (dv) {
            let chitietdvHTML = `
                <div class="product-title-3" style="margin-top: 20px;">
                    <a href="index.html">Dịch vụ tóc</a> > ${dv.TENDV}
                </div>

                <div class="col-s-6 col-m-5 col-x-4">
                    <div class="item" style="border: none;">
                        <img id="slide_dv" class="pic_itemchitiet" title="${dv.TENDV}" src="${dv.ANH}" />
                    </div>
                </div>

                <div class="col-s-6 col-x-4 col-m-7">
                    <div class="name_itemchitiet">
                        ${dv.TENDV}
                    </div>
                    <div class="react">
						<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512"
							height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
							</path>
						</svg>
						<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512"
							height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
							</path>
						</svg>
						<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512"
							height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
							</path>
						</svg>
						<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512"
							height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
							</path>
						</svg>
						<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512"
							height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
							</path>
						</svg>

						<a href="https://www.facebook.com/toladatdo" style="margin-top: 10px; color: #00a2ff;">(${dv.THOIGIAN} đánh
							giá
							của khách hàng)</a>
					</div>
                    <div class="phut-gia">
                        <div class="phut">${dv.THOIGIAN} phút</div>
                        <div class="giachitiet"><span>${formatCurrency(dv.GIADV)}</span></div>
                    </div>
                    <div class="btn-datlichchitiet">
                        <button id="btn-datlich" onclick = "datlich()"style="margin-top: 10px; width: 100%;">ĐẶT LỊCH NGAY</button>
                    </div>
                    
                    <div class="mota-dv">
                        <div class="title_quytrinh">MÔ TẢ</div>
                        <div class="quytrinh_content">
                            <ul> ${taoDanhSachMoTa(dv.MOTA)}
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-s-12 col-x-4 col-m-12">
                    <div class="mota-dv">
                        <div class="title_quytrinh">QUY TRÌNH DỊCH VỤ</div>
                        <div class="quytrinh_content">
                            <ul> ${taoDanhSachQuyTrinh(dv.QUYTRINH)}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            ctdv.innerHTML = chitietdvHTML;
        }
        else if (cs) {
            let chitietdvHTML = `
                <div class="product-title-3" style="margin-top: 20px;">
                    <a href="index.html">Thư giãn và chăm sóc da</a> > ${cs.TENDV}
                </div>

                <div class="col-s-6 col-m-5 col-x-4">
                    <div class="item" style="border: none;">
                        <img id="slide_dv" class="pic_itemchitiet" title="${cs.TENDV}" src="${cs.ANH}" />
                    </div>
                </div>

                <div class="col-s-6 col-x-4 col-m-7">
                    <div class="name_itemchitiet">
                        ${cs.TENDV}
                    </div>
                    <div class="react">
						<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512"
							height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
							</path>
						</svg>
						<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512"
							height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
							</path>
						</svg>
						<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512"
							height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
							</path>
						</svg>
						<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512"
							height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
							</path>
						</svg>
						<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512"
							height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">
							</path>
						</svg>

						<a href="https://www.facebook.com/toladatdo" style="margin-top: 10px; color: #00a2ff;">(${cs.THOIGIAN} đánh
							giá
							của khách hàng)</a>
					</div>
                    <div class="phut-gia">
                        <div class="phut">${cs.THOIGIAN} phút</div>
                        <div class="giachitiet"><span>${formatCurrency(cs.GIADV)}</span></div>
                    </div>
                    <div class="btn-datlichchitiet">
                        <button id="btn-datlich" onclick = "datlich()"style="margin-top: 10px; width: 100%;">ĐẶT LỊCH NGAY</button>
                    </div>
                    
                    <div class="mota-dv">
                        <div class="title_quytrinh">MÔ TẢ</div>
                        <div class="quytrinh_content">
                            <ul> ${taoDanhSachMoTa(cs.MOTA)}
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-s-12 col-x-4 col-m-12">
                    <div class="mota-dv">
                        <div class="title_quytrinh">QUY TRÌNH DỊCH VỤ</div>
                        <div class="quytrinh_content">
                            <ul> ${taoDanhSachQuyTrinh(cs.QUYTRINH)}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            ctdv.innerHTML = chitietdvHTML;
        }
    } else {
        alert("Vui lòng chọn dịch vụ cần xem!");
        window.location.href = "index.html";
    }
});

function datlich()
{
    window.location.href = "lichhen.html";
}