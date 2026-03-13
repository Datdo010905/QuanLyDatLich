import React, { useState } from "react";
import "../assets/css/style.css";
import { Link } from "react-router-dom";
const DichVuDetailsPage = () => {
    const slide = (index: number) => {
        const slideImg = document.getElementById("slide_dv") as HTMLImageElement;
        slideImg.src = `img/catgoicombo1_/cat-goi-combo-1-${index}.png`;
    }
    return (
        <>
        <div className="product" id = "chitietdichvu">
			<div className="product-title-3" style={{ marginTop: '20px' }}><Link to="/home">Dịch vụ tóc</Link> - Cắt gội combo 1
			</div>

				<div className="col-s-6 col-m-5 col-x-4">
					<div className="itemchitiet" style={{ border: 'none' }}>
						<img id="slide_dv" className="pic_itemchitiet" title="cat-goi-combo-1"
							src="img/catgoicombo1_/cat-goi-combo-1-9.png" /> <br /><br /><br /><br />
						<img className="slide_item" onClick={() => slide(9)} src="img/catgoicombo1_/cat-goi-combo-1-9.png"/>
						<img className="slide_item" onClick={() => slide(5)} src="img/catgoicombo1_/cat-goi-combo-1-5.png"/>
						<img className="slide_item" onClick={() => slide(6)} src="img/catgoicombo1_/cat-goi-combo-1-6.png"/>
						<img className="slide_item" onClick={() => slide(7)} src="img/catgoicombo1_/cat-goi-combo-1-7.png"/>
						<img className="slide_item" onClick={() => slide(10)} src="img/catgoicombo1_/cat-goi-combo-1-10.png"/>

					</div>
				</div>
				<div className="col-s-6 col-x-4 col-m-7">
					<div className="name_itemchitiet">
						Cắt gội combo 1
					</div>
					<div className="react">
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

						<a href="https://www.facebook.com/toladatdo" style={{ marginTop: '10px', color: '#00a2ff' }}>(
							12 đánh giá của khách hàng)</a>
					</div>
					<div className="phut-gia">
						<div className="phut">45 phút</div>
						<div className="giachitiet"><span>122.000 VNĐ</span></div>
					</div>
					<div className="btn-datlichchitiet">
						<button id="btn-datlich" style={{ marginTop: '10px', width: '100%' }}>ĐẶT LỊCH NGAY</button>
					</div>
					<div className="mota-dv">
						<div className="title_quytrinh">MÔ TẢ</div>
						<div className="quytrinh_content">
							<li>Combo cắt kỹ</li>
							<li>Combo gội dưỡng sinh</li>
						</div>
					</div>

				</div>
				<div className="col-s-12 col-x-4 col-m-12">
					<div className="mota-dv">
						<div className="title_quytrinh">QUY TRÌNH DỊCH VỤ</div>
						<div className="quytrinh_content">
							<li>Thư giãn cơ mặt</li>
							<li>Rửa mặt & Chăm sóc da mặt</li>
							<li>Hút mụn & Phun hoa hồng</li>
							<li>Gội đầu & Thư giãn vùng đầu</li>
							<li>Rửa tai bọt & Ngoáy tai</li>
							<li>Thư giãn cổ + xối nước thác đổ</li>
							<li>Đấm lưng</li>
							<li>Cắt tóc</li>
							<li>Sấy tóc</li>
						</div>
					</div>
				</div>
		</div>
        <div className="clear"></div>
        </>
    );
};

export default DichVuDetailsPage;