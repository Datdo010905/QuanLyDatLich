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

const HoaDonPage = () => {
    //khởi tạo state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    //State dùng chung cho tìm kiếm
    const { searchTerm } = useSearch();
    //Dữ liệu
    const [hoadonList, setHoadonList] = useState<HoaDon[]>([]);
    const [hoadonDetailsList, setHoadonDetailsList] = useState<HoaDonDetails[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            setHoadonList(resHoadon.data.data);
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

    };
    const handleEditClick = async (row: HoaDon) => {

    };
    const handleAddDetailsClick = async (row: HoaDon) => {

    }

    //Định nghĩa cột cho DataTable theo api trả về
    const hoadonColumns: Column<HoaDon>[] = [
        { tieude: "ID", cotnhandulieu: "mahd" },
        {
            tieude: "Khách hàng", cotnhandulieu: "makh", render: (row) => {
                return row.makh ? row.makh : "Khách vãng lai";
            }
        },
        {
            tieude: "Khuyến mại", cotnhandulieu: "makm", render: (row) => {
                return row.makm ? row.makm : "Không có";
            }
        },
        { tieude: "Lịch hẹn", cotnhandulieu: "malich", render: (row) => {
            return row.malich ? row.malich : "Không có";
        }},
        { tieude: "Thu ngân", cotnhandulieu: "manv", render: (row) => {
            return row.manv ? row.manv : "Chưa có thu ngân";
        }},
        { tieude: "Tổng tiền", cotnhandulieu: "tongtien" },
        { tieude: "Hình thức thanh toán", cotnhandulieu: "hinhthucthanhtoan", render: (row) => {
            return row.hinhthucthanhtoan ? row.hinhthucthanhtoan : "Chưa xác định";
        }},
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