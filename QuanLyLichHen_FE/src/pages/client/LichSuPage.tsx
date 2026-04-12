import "../../assets/css/lichsu.css";
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import React, { useEffect, useState, useMemo } from "react";
import Modal from "../../components/ui/Modal";
import { useSearch } from '../../context/SearchContext';
import { toast } from 'react-toastify';
import DataTable, { Column } from '../../components/ui/DataTable';
import bookingApi, { Booking, BookingDetails } from "../../api/bookingApi";
import { BookingSchema } from "../../utils/bookingSchema";
import customerApi, { Customer } from "../../api/customerApi";
import dichVuApi, { DichVu } from "../../api/dichvuApi";
import staffApi, { NhanVien } from "../../api/staffApi";

const LichSuPage = () => {

	//check đã đăng nhập
	const user = localStorage.getItem("username");
	const role = localStorage.getItem("phanquyen");

	const [modalType, setModalType] = useState<'add' | 'addDetails' | 'edit' | 'none'>('none');
	const [IDtoView, setIDtoView] = useState<string | null>(null); // Lưu ID cần xem chi tiết
	const [viewDetailsList, setViewDetailsList] = useState<BookingDetails[]>([]);

	//Dữ liệu
	const [bookingList, setBookingList] = useState<Booking[]>([]);
	const [bookingDetailsList, setBookingDetailsList] = useState<BookingDetails[]>([]);
	const [dichVuList, setDichVuList] = useState<DichVu[]>([]);
	const [nhanVienList, setNhanVienList] = useState<NhanVien[]>([]);

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

	//up data từ api lên bảng
	const fetchData = async () => {
		try {
			if (user) {
				const resBooking = await bookingApi.getAllByIdKH(user);
				;
				setBookingList(resBooking.data.data);

				const resBookingDetails = await bookingApi.getAllCT();
				if (resBookingDetails.data.success) {
					setBookingDetailsList(resBookingDetails.data.data);
				}
				const resDichVu = await dichVuApi.getAll();
				const resNhanVien = await staffApi.getAll();
				if (resDichVu.data.success) {
					setDichVuList(resDichVu.data.data);
				}
				if (resNhanVien.data.success) {
					setNhanVienList(resNhanVien.data.data);
				}
			}
		} catch (err) {
			toast.error("Không thể tải dữ liệu lịch sử lịch hẹn.");
		}
	};
	// Tải dữ liệu khi component mount
	useEffect(() => {
		if (user || role) {
			fetchData();
		}
	}, []);

	if (!user && !role) {
		return <Navigate to="/login" replace />;
	}

	const handleViewClick = async (row: Booking) => {
		try {
			setIDtoView(row.malich || null);

			const view = await bookingApi.getByIdCT(row.malich || '');
			if (view.data.success) {
				const responseData = view.data.data;
				// Nếu là mảng thì giữ nguyên, không thì bọc []
				const formattedData = Array.isArray(responseData) ? responseData : [responseData];

				setViewDetailsList(formattedData);
				//toast.info(`Xem chi tiết lịch hẹn: ${row.malich}`);

			} else {
				toast.error("Không tìm thấy chi tiết lịch hẹn!");
				setViewDetailsList([]); // Xóa rỗng bảng nếu không có data
			}
		} catch (error) {
			console.error("Lỗi xem chi tiết:", error);
			toast.error("Xem chi tiết thất bại!");
			setViewDetailsList([]); // Xóa rỗng bảng nếu không có data
		}
	};
	const getChiNhanhName = (branchCode: string) => {
		switch (branchCode) {
			case "CN001": return "30Shine - Nguyễn Trãi";
			case "CN002": return "30Shine - Cầu Giấy";
			case "CN003": return "30Shine - Tân Bình";
			case "CN004": return "30Shine - Đà Nẵng";
			default: return "Không xác định";
		}
	};
	const branchStyles: Record<string, React.CSSProperties> = {
		"CN001": { backgroundColor: '#fff1f0', color: '#f5222d' },
		"CN002": { backgroundColor: '#e6f7ff', color: '#1890ff' },
		"CN003": { backgroundColor: '#f6ffed', color: '#52c41a' },
		"CN004": { backgroundColor: '#fff7e6', color: '#fa8c16' },
	};

	//lấy theo trạng thái
	//<option value="Đã đặt">Đã đặt</option>
	// <option value="Đang chờ">Đang chờ</option>
	// <option value="Đang thực hiện">Đang thực hiện</option>
	// <option value="Hoàn thành">Hoàn thành</option>
	// <option value="Đã huỷ">Đã huỷ</option>
	const statusStyles: Record<string, React.CSSProperties> = {
		"Đã đặt": { backgroundColor: '#e6f7ff', color: '#1890ff', border: '1px solid #91d5ff' },
		"Đang chờ": { backgroundColor: '#f9f0ff', color: '#722ed1', border: '1px solid #d3adf7' },
		"Đang thực hiện": { backgroundColor: '#fff7e6', color: '#fa8c16', border: '1px solid #ffd591' },
		"Hoàn thành": { backgroundColor: '#f6ffed', color: '#52c41a', border: '1px solid #b7eb8f' },
		"Đã huỷ": { backgroundColor: '#fff1f0', color: '#f5222d', border: '1px solid #ffa39e' },
	};

	const handleDeleteClick = (row: Booking) => {
		setFormData({
			bookingID: row.malich || '',
			customerID: row.makh || '',
			branchID: row.machinhanh || '',
			bookingTime: row.giohen || '',
			bookingDate: row.ngayhen ? row.ngayhen.split('T')[0] : '',
			status: row.trangthai || '',
			dichvu: '', //tạm để trống
			soluong: '', //tạm để trống
			nhanvien: '' //tạm để trống
		});
		setModalType('edit');
	};

	// huỷ lịch
	const handleDeleteConfirm = async (e: React.FormEvent) => {
		e.preventDefault();
		//tạo FormData theo swagger
        const submitData = new FormData();

		const trangthaiHienTai = bookingList.find(b => b.malich === formData.bookingID)?.trangthai;
		try {
			if (modalType === 'edit') {
				if (trangthaiHienTai !== "Đã đặt" && trangthaiHienTai !== "Đang chờ") {
					toast.error("Chỉ có thể huỷ lịch khi lịch hẹn ở trạng thái 'Đã đặt' hoặc 'Đang chờ'!");
					return;
				}
				await bookingApi.update(formData.bookingID, "Đã huỷ");
				toast.success("Huỷ lịch hẹn thành công!");
			}
			setModalType('none'); // Đóng form
			fetchData(); // Tải lại dữ liệu
		} catch (error) {
			console.error("Lỗi:", error);
			toast.error("Thao tác thất bại, vui lòng kiểm tra lại!");
		}
	};


	//Định nghĩa cột cho DataTable theo api trả về
	const bookingColumns: Column<Booking>[] = [
		{ tieude: "ID", cotnhandulieu: "malich" },
		{ tieude: "Ngày hẹn", cotnhandulieu: "ngayhen", render: (row) => row.ngayhen ? new Date(row.ngayhen).toLocaleDateString('vi-VN') : '' },
		{
			tieude: "Giờ hẹn", cotnhandulieu: "giohen"
		},
		{
			tieude: "Trạng thái", cotnhandulieu: "trangthai", render: (row) => {
				const style = statusStyles[row.trangthai || ''] || {};
				return (
					<span style={{
						padding: '4px 10px',
						borderRadius: '6px',
						fontSize: '13px',
						fontWeight: '600',
						whiteSpace: 'nowrap',
						...style
					}}>
						{style ? row.trangthai : "Không xác định"}
					</span>
				)
			}
		},
		{
			tieude: "Chi nhánh", cotnhandulieu: "machinhanh", render: (row) => {
				const style = branchStyles[row.machinhanh || ''] || {};
				return (
					<span style={style}>
						{getChiNhanhName(row.machinhanh || '')}
					</span>
				);
			}

		},
		{ tieude: "Khách hàng", cotnhandulieu: "makh" },
		{
			tieude: "Hành động", cotnhandulieu: "malich", render: (row) => (
				<>
					<button className="btn small view" onClick={() => handleViewClick(row)}><i className="fas fa-eye"></i></button>
					<button
						className="btn small delete"
						onClick={() => handleDeleteClick(row)}
					>
						<i className="fas fa-trash"></i>
					</button>
				</>
			)
		},
	];
	//Định nghĩa cột cho DataTable theo api trả về
	const bookingDetailsColumns: Column<BookingDetails>[] = [
		{ tieude: "ID", cotnhandulieu: "malich" },
		{
			tieude: "Dịch vụ", cotnhandulieu: "madv", render(row) {
				const dichVu = dichVuList.find(dv => dv.madv === row.madv);
				return dichVu ? dichVu.tendv : "Không xác định";

			}
		},
		{
			tieude: "Nhân viên", cotnhandulieu: "manv", render(row) {
				const nv = nhanVienList.find(nv => nv.manv === row.manv);
				return nv ? `${nv.hoten} (${nv.sdt})` : "Không xác định";
			}
		},
		{ tieude: "Số lượng", cotnhandulieu: "soluong" },
		{
			tieude: "Giá dự kiến", cotnhandulieu: "giA_DUKIEN", render(row) {
				const value = parseFloat(row.giA_DUKIEN as any);
				return value ? value.toLocaleString('vi-VN') + '₫' : "0₫";
			},
		},
		{ tieude: "Ghi chú", cotnhandulieu: "ghichu" },
	];
	return (
		<>
			<div id="lichsu-container">
				<div className="lichsu-box">
					<h1>LỊCH SỬ LỊCH HẸN CỦA BẠN</h1>

					<table className="lichsu-table">
						<DataTable<Booking> columns={bookingColumns} data={bookingList} />
					</table>

					{/* CHỈ RENDER KHU VỰC NÀY NẾU IDtoView CÓ GIÁ TRỊ */}
					{IDtoView && (
						<div id="booking-details" className="booking-details" style={{ display: 'block' }}>

							<h3 id="tieudechitiet">Chi tiết lịch hẹn {IDtoView}</h3>
							<button
								type="button"
								className="btn small delete"
								onClick={() => {
									setIDtoView(null); //ẩn bảng
									setViewDetailsList([]); //Xóa data
								}}
							>
								<i className="fa-solid fa-circle-xmark"></i> Đóng
							</button>

							<DataTable<BookingDetails>
								columns={bookingDetailsColumns}
								data={viewDetailsList}
							/>

						</div>
					)}
				</div>
				<Modal isOpen={modalType === 'edit'} onClose={() => setModalType('none')} title="Huỷ lịch hẹn?">
					<form className="service-form" onSubmit={handleDeleteConfirm}>
						<p>Bạn có chắc chắn muốn huỷ lịch hẹn này không?</p><br />
						<button className="btn small delete" onClick={handleDeleteConfirm}><i className="fas fa-trash"></i> Xác nhận</button>
					</form>
				</Modal>
			</div >
		</>
	);
}


export default LichSuPage;