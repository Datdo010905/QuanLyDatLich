import React, { useState } from "react";
import "../assets/css/lichsu.css";
const LichSuPage = () => {

    return (
        <>
            <div id="lichsu-container">
		<div className="lichsu-box">
			<h1>LỊCH SỬ LỊCH HẸN CỦA BẠN</h1>

			<table className="lichsu-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Chi nhánh</th>
						<th>Thợ cắt tóc</th>
						<th>Ngày hẹn</th>
						<th>Giờ hẹn</th>
						<th>Trạng thái</th>
						<th>Hành động</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>

			<div id="booking-details" className="booking-details" style={{ display: "none" }}>
				<h3 id="tieudechitiet">Chi tiết lịch hẹn</h3>
				<table className="lichsu-table">
					<thead>
						<tr>
							<th>Dịch vụ</th>
							<th>Số lượng sử dụng</th>
							<th>Đơn giá</th>
							<th>Thành tiền</th>
							<th>Ghi chú</th>
						</tr>
					</thead>
					<tbody id="detail-table-body">
					</tbody>
				</table>
			</div>

		</div>
	</div>
        </>
    );
};

export default LichSuPage;