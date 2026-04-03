import React, { useEffect, useState, useMemo } from "react";
import Modal from "../../components/ui/Modal";
import { useSearch } from '../../context/SearchContext';
import { toast } from 'react-toastify';
import DataTable, { Column } from '../../components/ui/DataTable';
import bookingApi, { Booking, BookingDetails } from "../../api/bookingApi";
import hoadonApi, { HoaDon, HoaDonDetails } from "../../api/hoadonApi";
import { BookingSchema } from "../../utils/bookingSchema";
import customerApi, { Customer } from "../../api/customerApi";
import dichVuApi, { DichVu } from "../../api/dichvuApi";
import staffApi, { NhanVien } from "../../api/staffApi";
import { record } from "zod";

const HoaDonPage = () => {
    //khởi tạo state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [modalType, setModalType] = useState<'add' | 'addDetails' | 'edit' | 'none'>('none');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null); // Lưu ID cần xóa
    const [IDtoView, setIDtoView] = useState<string | null>(null); // Lưu ID cần xem chi tiết
    //State dùng chung cho tìm kiếm
    const { searchTerm } = useSearch();
    //Dữ liệu
    const [hoadonList, setHoadonList] = useState<HoaDon[]>([]);
    const [hoadonDetailsList, setHoadonDetailsList] = useState<HoaDonDetails[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    //const [bookingList, setBookingList] = useState<Booking[]>([]);
    //const [bookingDetailsList, setBookingDetailsList] = useState<BookingDetails[]>([]);
    const [customerList, setCustomerList] = useState<Customer[]>([]);
    const [dichVuList, setDichVuList] = useState<DichVu[]>([]);
    const [nhanVienList, setNhanVienList] = useState<NhanVien[]>([]);
    const [viewDetailsList, setViewDetailsList] = useState<HoaDonDetails[]>([]);
    const filteredHoadonList = hoadonList.filter(hd =>
        hd.malich?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hd.makh?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hd.trangthai?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hd.manv?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hd.mahd?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //up data từ api lên bảng
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const resHoadon = await hoadonApi.getAll();
            const resNhanVien = await staffApi.getAll();
            const resKH = await customerApi.getAll();
            const resDichVu = await dichVuApi.getAll();
            //const resBooking = await bookingApi.getAll();
            const resHoaDonDetails = await hoadonApi.getAllCT();

            if (resHoadon.data.success) {
                setHoadonList(resHoadon.data.data);
            }
            if (resHoaDonDetails.data.success) {
                setHoadonDetailsList(resHoaDonDetails.data.data);
            }

            if (resKH.data.success) {
                setCustomerList(resKH.data.data);
            }
            if (resDichVu.data.success) {
                setDichVuList(resDichVu.data.data);
            }
            if (resNhanVien.data.success) {
                setNhanVienList(resNhanVien.data.data);
            }

        } catch (err) {
            setError("Không thể tải dữ liệu từ máy chủ.");
        } finally {
            setIsLoading(false);
        }
    };
    // Tải dữ liệu khi component mount
    useEffect(() => {
        fetchData();
    }, []);
    const handleDeleteClick = (row: HoaDon) => {
    };
    const handleDeleteConfirm = async () => {

    };

    const handleViewClick = async (row: HoaDon) => {
        try {
            setIDtoView(row.mahd || null);

            const view = await hoadonApi.getByIdCT(row.mahd || '');
            if (view.data.success) {
                const responseData = view.data.data;
                // Nếu là mảng thì giữ nguyên, không thì bọc []
                const formattedData = Array.isArray(responseData) ? responseData : [responseData];
                setViewDetailsList(formattedData);

            } else {
                toast.error("Không tìm thấy chi tiết hoá đơn!");
                setViewDetailsList([]); // Xóa rỗng bảng nếu không có data
            }
        } catch (error) {
            console.error("Lỗi xem chi tiết:", error);
            toast.error("Xem chi tiết thất bại!");
            setViewDetailsList([]); // Xóa rỗng bảng nếu không có data
        }
    };
    const handleEditClick = async (row: HoaDon) => {

    };
    const handleAddDetailsClick = async (row: HoaDon) => {

    }

    //CSS cho hình thức thanh toán
    const MethodPayment: Record<string, React.CSSProperties> = {
        "Tiền mặt": {
            backgroundColor: '#f6ffed',
            color: '#389e0d',
            border: '1px solid #b7eb8f'
        },
        "Thẻ tín dụng": {
            backgroundColor: '#e6f7ff',
            color: '#096dd9',
            border: '1px solid #91d5ff'
        },
        "Chuyển khoản": {
            backgroundColor: '#e6fffe',
            color: '#08a4d4',
            border: '1px solid #91ccff'
        },
        "Ví điện tử": {
            backgroundColor: '#f9f0ff',
            color: '#531dab',
            border: '1px solid #d3adf7'
        },
        "Không xác định": {
            backgroundColor: '#fafafa',
            color: '#595959',
            border: '1px solid #d9d9d9'
        },
    };


    //css cho trạng thái
    //Định nghĩa cột cho DataTable theo api trả về
    const hoadonColumns: Column<HoaDon>[] = [
        { tieude: "ID", cotnhandulieu: "mahd" },
        {
            tieude: "Khách hàng", cotnhandulieu: "makh", render: (row) => {
                const tenkh = customerList.find(kh => kh.makh === row.makh)?.hoten;
                return `${row.makh} - ${tenkh ? tenkh : "Khách vãng lai"}`;
            }
        },
        {
            tieude: "Khuyến mại", cotnhandulieu: "makm", render: (row) => {
                return row.makm ? row.makm : "Không có";
            }
        },
        {
            tieude: "Lịch hẹn", cotnhandulieu: "malich", render: (row) => {
                return row.malich ? row.malich : "Không có";
            }
        },
        {
            tieude: "Thu ngân", cotnhandulieu: "manv", render: (row) => {
                const tennv = nhanVienList.find(nv => nv.manv === row.manv)?.hoten;
                return `${row.manv} - ${tennv ? tennv : "Không xác định"}`;
            }
        },
        {
            tieude: "Tổng tiền", cotnhandulieu: "tongtien", render(row) {
                const value = parseFloat(row.tongtien as any);
                return value ? value.toLocaleString('vi-VN') + '₫' : "0₫";
            }
        },
        {
            tieude: "Hình thức thanh toán", cotnhandulieu: "hinhthucthanhtoan", render: (row) => {
                const method = row.hinhthucthanhtoan || "Không xác định";
                const style = MethodPayment[method] || MethodPayment["Không xác định"];
                return <span style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                    ...style
                }}>
                    {style ? row.hinhthucthanhtoan : "Không xác định"}
                </span>;
            }
        },
        { tieude: "Trạng thái", cotnhandulieu: "trangthai" },
        {
            tieude: "Hành động", cotnhandulieu: "malich", render: (row) => (
                <>
                    <button className="btn small view" onClick={() => handleViewClick(row)}><i className="fas fa-eye"></i></button>
                    <button className="btn small addDetail" onClick={() => handleAddDetailsClick(row)}><i className="fa-regular fa-calendar-plus"></i></button>
                    <button className="btn small edit" onClick={() => handleEditClick(row)}><i className="fas fa-edit"></i></button>
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
    const hoadonDetailsColumns: Column<HoaDonDetails>[] = [
        { tieude: "ID", cotnhandulieu: "mahd" },
        {
            tieude: "Mã dịch vụ", cotnhandulieu: "madv", render(row) {
                const dichVu = dichVuList.find(dv => dv.madv === row.madv);
                return dichVu ? dichVu.tendv : "Không xác định";
            }
        },
        { tieude: "Số lượng", cotnhandulieu: "soluong" },
        {
            tieude: "Đơn giá", cotnhandulieu: "dongia", render(row) {
                const value = parseFloat(row.dongia as any);
                return value ? value.toLocaleString('vi-VN') + '₫' : "0₫";
            },
        },
        {
            tieude: "Thành tiền", cotnhandulieu: "thanhtien", render(row) {
                const value = parseFloat(row.thanhtien as any);
                return value ? value.toLocaleString('vi-VN') + '₫' : "0₫";
            }
        },
    ];



    // thêm mới
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault(); // Ngăn submit form
        alert("Đã lưu thành công!");
        setIsAddModalOpen(false);
    };


    // cập nhật
    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Đã cập nhật thành công!");
        setIsEditModalOpen(false);
    };

    // xoá bỏ
    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Đã xóa thành công!");
        setIsDeleteModalOpen(false);
    };
    return (
        <>
            <div id="invoices" className="section">
                <div className="panel header-actions">
                    <h2>Hoá đơn</h2>
                    <button id="addInvoiceBtn" className="btn primary" onClick={() => setIsAddModalOpen(true)}>Thêm hoá
                        đơn</button>
                </div>
                {/* <div className="panel">
                    <DataTable<HoaDonDetails> columns={hoadonDetailsColumns} data={hoadonDetailsList} isLoading={isLoading} />
                </div> */}
                {/* CHỈ RENDER KHU VỰC NÀY NẾU IDtoView CÓ GIÁ TRỊ */}
                {IDtoView && (
                    <div id="booking-details" className="booking-details" style={{ display: 'block' }}>
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <h3 id="tieudechitiet">Chi tiết hoá đơn {IDtoView}</h3>
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

                        <DataTable<HoaDonDetails>
                            columns={hoadonDetailsColumns}
                            data={viewDetailsList}
                            isLoading={isLoading}
                        />

                    </div>
                )}
                <div className="panel">
                    <DataTable<HoaDon> columns={hoadonColumns} data={filteredHoadonList} isLoading={isLoading} />
                </div>
                {/* Modal thêm */}
                <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Thêm mới">
                    <form onSubmit={handleAdd}>

                        <button type="submit" className="btn primary">Lưu</button>
                    </form>
                </Modal>
                {/* Modal sửa */}
                <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Sửa">
                    <form onSubmit={handleEdit}>
                        <button type="submit" className="btn primary">Lưu</button>
                    </form>
                </Modal>

                {/* Modal xóa */}
                <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Xóa">
                    <p>Bạn có chắc chắn muốn xóa không?</p><br />
                    <button className="btn small delete" onClick={handleDelete}><i className="fas fa-trash"></i></button>
                </Modal>
            </div>
        </>
    );
};

export default HoaDonPage;