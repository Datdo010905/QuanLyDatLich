import React, { useState } from "react";
import "../../assets/css/lichhen.css";
const DatLichPage = () => {

	const [phone, setPhone] = useState("");

	const themlichhen = (e: React.FormEvent) => {
		e.preventDefault();
		// Xử lý logic đặt lịch ở đây
		console.log("Đặt lịch thành công!");
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		// chỉ cho nhập số
		const value = e.target.value.replace(/[^0-9]/g, "");
		setPhone(value);
	};

	return (
		<>
			<div className="datlich-page">
				<div className="datlich-form">
					<h1>ĐẶT LỊCH GIỮ CHỖ</h1>
					<form onSubmit={themlichhen}>
						<span>Họ và tên:<span style={{ color: "red" }}>*</span></span><br />
						<input id="hoten-dat" className="input-field" maxLength={50} type="text"
							placeholder="Nhập họ và tên của bạn" required /><br />

						<span>Số điện thoại:<span style={{ color: "red" }}>*</span></span><br />
						<input type="text" readOnly maxLength={10} id="sdt-dat" className="input-field" placeholder="Nhập số"
							value={phone}
							onChange={handleInput}
							required />
						<br />
						<span>Chi nhánh:<span style={{ color: "red" }}>*</span></span><br />
						<select id="chinhanh" className="input-field" required>
						</select><br />
						<span>Dịch vụ:<span style={{ color: "red" }}>*</span></span><br />
						<select id="dichvu" className="input-field" required>
						</select><br />
						<span>Thợ cắt tóc:<span style={{ color: "red" }}>*</span></span><br />
						<select id="nhanvien" className="input-field" required>
						</select><br />

						<span>Ngày hẹn:<span style={{ color: "red" }}>*</span></span><br />
						<input id="ngayhen" className="input-field" type="date" required /><br />

						<span>Giờ hẹn:<span style={{ color: "red" }}>*</span></span><br />
						<select id="giohen" className="input-field" required></select>
						<br /><br />

						
						<input id="btn-datlichpage" type="submit" value="ĐẶT LỊCH NGAY" />
					</form>
					<br />
					<p style={{ "textAlign": "center" }}>📅 Cắt xong trả tiền – Huỷ lịch không sao</p>
				</div>
			</div>
		</>
	);
};

export default DatLichPage;