import React, { useState, useEffect, useMemo } from "react";
import "../../assets/css/lichhen.css";
import { toast } from "react-toastify";
import dichVuApi, { DichVu } from "../../api/dichvuApi";
import Modal from "../../components/ui/Modal";
import { useSearch } from '../../context/SearchContext';
import DataTable, { Column } from '../../components/ui/DataTable';
import bookingApi, { Booking, BookingDetails } from "../../api/bookingApi";
import { BookingSchema } from "../../utils/bookingSchema";
import customerApi, { Customer } from "../../api/customerApi";
import staffApi, { NhanVien } from "../../api/staffApi";

const DatLichPage = () => {

	const getSDT = localStorage.getItem("username");
	const getName = localStorage.getItem("tenkhach");

	//dùng dv cần xem bằng state
	const [selectedDichVu, setSelectedDichVu] = useState<string>(localStorage.getItem("madvCanXem") || "");

	//state lựa chọn


	const [dichVuList, setDichVuList] = useState<DichVu[]>([]);
	const [nhanVienList, setNhanVienList] = useState<NhanVien[]>([]); // Dữ liệu nhân viên để đổ vào select
	const [bookingList, setBookingList] = useState<Booking[]>([]);
	const [bookingDetailsList, setBookingDetailsList] = useState<BookingDetails[]>([]);
	const [gioHenList, setGioHenList] = useState<string[]>([]);

	const [formData, setFormData] = useState({
		bookingID: '',
		customerID: '',
		branchID: '',
		bookingDate: '',
		bookingTime: '',
		status: '',
		dichvu: '',
		soluong: '',
		nhanvien: '',
	});

	const [formDataDetails, setFormDataDetails] = useState({
		bookingID: '',
		branchID: '',
		dichvu: '',
		soluong: '',
		giadukien: '',
		nhanvien: '',
		ghichu: '',
	});
	//up data từ api
	const fetchDichVu = async () => {
		try {
			const resToc = await dichVuApi.getAllDichVuClient();
			setDichVuList(resToc.data.data);
		} catch (err) {
			toast.error("Không thể tải dữ liệu từ máy chủ.");
		}
	};

	const fetchData = async () => {
		try {
			const resNhanVien = await staffApi.getAll();
			const resBookingDetails = await bookingApi.getAllCT();
			if (resNhanVien.data.success) {
				setNhanVienList(resNhanVien.data.data);
			}
			if (resBookingDetails.data.success) {
				setBookingDetailsList(resBookingDetails.data.data);
			}

			const resBooking = await bookingApi.getAll();
			setBookingList(resBooking.data.data);

		} catch (err) {
			toast.error("Không thể tải dữ liệu từ máy chủ.");
		}
	};

	// Tải dữ liệu khi component mount
	useEffect(() => {
		fetchDichVu();
		fetchData();
	}, []);

	//xử lý thay đổi form
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		// Cập nhật dữ liệu người dùng nhập vào formData
		setFormData((prev) => ({ ...prev, [id]: value }));
	};
	// TỰ ĐỘNG TÍNH TOÁN GIỜ TRỐNG
	const availableHours = useMemo(() => {
		if (!formData.nhanvien || !formData.bookingDate) {
			return [];
		}
		//tìm lịch đã được khách chọn nhân viên thực hiện trong ngày đó
		const bookedIdsForStaff = bookingDetailsList
			.filter(detail => detail.manv === formData.nhanvien)
			.map(detail => detail.malich?.trim());

		//lọc ra những lịch ngày đó, chưa huỷ hoặc chưa hoàn thành và có nhân viên thực hiện trùng với nhân viên đang chọn
		const lichDabook = bookingList.filter(booking => {
			const trungNgay = booking.ngayhen && booking.ngayhen.split('T')[0] === formData.bookingDate;
			const chuahuy = booking.trangthai !== "Đã huỷ";
			const chuahoanthanh = booking.trangthai !== "Đã hoàn thành";
			//iclude kiểm tra mã lịch của booking có nằm trong danh sách mã lịch đã được chọn nhân viên thực hiện hay không
			const NVDuocChon = bookedIdsForStaff.includes(booking.malich?.trim());

			return trungNgay && chuahuy && chuahoanthanh && NVDuocChon;
		});

		//giờ hẹn từ API
		//Chỉ lấy 5 ký tự đầu (HH:mm) để bỏ qua giây (nếu có)
		const bookedHours = lichDabook.map(b => {
			return b.giohen ? b.giohen.substring(0, 5) : "";
		});
		//tạo danh sách giờ trống từ 8h đến 22h với khoảng cách 30 phút
		const hours: string[] = [];
		for (let h = 8; h <= 22; h++) {
			for (let m of [0, 30]) {
				//Định dạng giờ thành HH:mm
				const time = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
				//thêm vào select
				if (!bookedHours.includes(time)) {
					hours.push(time);
				}
			}
		}
		return hours;
	}, [formData.nhanvien, formData.bookingDate, bookingList, bookingDetailsList]);

	const themlichhen = (e: React.FormEvent) => {
		e.preventDefault();
		// Xử lý logic đặt lịch ở đây

		toast.info("Đặt lịch sắp thành công!");
	};

	return (
		<>
			<div className="datlich-page">
				<div className="datlich-form">
					<h1>ĐẶT LỊCH GIỮ CHỖ</h1>
					<form>
						<span>Họ và tên:<span style={{ color: "red" }}>*</span></span><br />
						<input readOnly id="hoten-dat" className="input-field" maxLength={50} type="text"
							placeholder="Nhập họ và tên của bạn"
							value={getName || ''} /><br />

						<span>Số điện thoại:<span style={{ color: "red" }}>*</span></span><br />
						<input type="text" readOnly maxLength={10} id="sdt-dat" className="input-field" placeholder="Nhập số"
							value={getSDT || ''}
						/>
						<br />
						<span>Dịch vụ:<span style={{ color: "red" }}>*</span></span><br />
						<select id="dichvu" className="input-field" value={selectedDichVu}
							onChange={(e) => setSelectedDichVu(e.target.value)}
						>
							<option value="" disabled>-- Chọn dịch vụ --</option>
							{dichVuList.map((dv) => (
								<option key={dv.madv} value={dv.madv}>
									{dv.tendv} - {dv.thoigian} phút - {dv.giadv.toLocaleString()} VNĐ
								</option>
							))}
						</select>
						<br />
						<span>Chi nhánh:<span style={{ color: "red" }}>*</span></span><br />
						<select id="branchID" value={formData.branchID} onChange={handleChange} className="input-field">
							<option value="">-- Chọn chi nhánh --</option>
							<option value="CN001">30Shine - Nguyễn Trãi</option>
							<option value="CN002">30Shine - Cầu Giấy</option>
							<option value="CN003">30Shine - Tân Bình</option>
							<option value="CN004">30Shine - Đà Nẵng</option>
						</select>
						<br />


						<span>Thợ cắt tóc:<span style={{ color: "red" }}>*</span></span><br />
						<select id="nhanvien" className="input-field" value={formData.nhanvien} disabled={!formData.branchID} onChange={handleChange}>
							<option value="">-- Chọn nhân viên --</option>
							{/* lọc nhân viên theo chi nhánh đã chọn và chức vụ */}
							{nhanVienList.filter((nv) => nv.machinhanh === formData.branchID && nv.chucvu === "Stylist").map((nv) => (
								<option key={nv.manv} value={nv.manv}>
									{nv.manv} - {nv.hoten} {`(${nv.sdt})`}
								</option>
							))}
						</select><br />



						<span>Ngày hẹn:<span style={{ color: "red" }}>*</span></span><br />
						<input id="bookingDate" className="input-field" type="date" value={formData.bookingDate} onChange={handleChange} /><br />

						<span>Giờ hẹn:<span style={{ color: "red" }}>*</span></span><br />
						<select
							id="bookingTime"
							className="input-field"
							value={formData.bookingTime}
							onChange={handleChange}
							disabled={!formData.nhanvien || !formData.bookingDate}
						>
							<option value="">-- Chọn giờ hẹn --</option>
							{/* Đổ danh sách giờ trống */}
							{availableHours.map((time) => (
								<option key={time} value={time}>
									{time}
								</option>
							))}
						</select>
						<br /><br />


						<input id="btn-datlichpage" onClick={themlichhen} type="submit" value="ĐẶT LỊCH NGAY" />
					</form>
					<br />
					<p style={{ "textAlign": "center" }}>📅 Cắt xong trả tiền – Huỷ lịch không sao</p>
				</div>
			</div>
		</>
	);
};

export default DatLichPage;