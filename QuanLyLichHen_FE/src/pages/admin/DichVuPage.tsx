import React, { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal";
import DataTable, { Column } from '../../components/ui/DataTable';
import dichVuApi, { DichVu } from "../../api/dichvuApi";


const DichVuPage: React.FC = () => {
    //khởi tạo state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [dichVuList, setDichVuList] = useState<DichVu[]>([]); // State lưu mảng dịch vụ từ API
    const [dichVuCSDList, setDichVuCSDList] = useState<DichVu[]>([]); // State lưu mảng dịch vụ CSD từ API

    const [isLoading, setIsLoading] = useState(false); // State để quản lý trạng thái loading
    const [error, setError] = useState<string | null>(null);

    //định nghĩa cấu trúc cột cho DataTable
    const dichVuColumns: Column<DichVu>[] = [
        { tieude: "ID", cotnhandulieu: "madv" },
        { tieude: "Tên dịch vụ", cotnhandulieu: "tendv" },
        { tieude: "Mô tả", cotnhandulieu: "mota" },
        { tieude: "Thời gian", cotnhandulieu: "thoigian" },
        { tieude: "Giá", cotnhandulieu: "giadv", render: (row) => <strong>{row.giadv.toLocaleString()} VNĐ</strong> },
        { tieude: "Trạng thái", cotnhandulieu: "trangthai" },
        { tieude: "Ảnh", cotnhandulieu: "hinh" },
        { tieude: "Quy trình", cotnhandulieu: "quytrinh" },
        {
            tieude: "Hành động", cotnhandulieu: "madv", render: (row) => (
                <>
                    <button className="btn small edit" onClick={() => setIsEditModalOpen(true)}><i className="fas fa-edit"></i></button>
                    <button className="btn small delete" onClick={() => setIsDeleteModalOpen(true)}><i className="fas fa-trash"></i></button>
                </>
            )
        },
    ];

    //dùng api khi load xong trang
    useEffect(() => {
        const fetchDichVu = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await dichVuApi.getAll();
                setDichVuList(response.data.data); // Cập nhật state với mảng dịch vụ từ API
            } catch (err) {
                setError("Không thể tải dữ liệu từ máy chủ.");
            } finally {
                setIsLoading(false);
            }
        };
        const fetchDichVuCSD = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await dichVuApi.getAllCSD();
                setDichVuCSDList(response.data.data); // Cập nhật state với mảng dịch vụ từ API
            } catch (err) {
                setError("Không thể tải dữ liệu từ máy chủ.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDichVu();
        fetchDichVuCSD();
    }, []); // Chỉ chạy 1 lần khi component mount

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
            <div id="services" className="section">
                <div className="panel header-actions">
                    <h2>Dịch vụ</h2>
                    <button id="addServiceBtn" className="btn primary" onClick={() => setIsAddModalOpen(true)}>Thêm dịch
                        vụ</button>
                </div>

                <div className="panel">
                    <h3>Tóc</h3>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <DataTable<DichVu>
                        columns={dichVuColumns}
                        data={dichVuList}
                        isLoading={isLoading}
                    />

                </div>

                <div className="panel">
                    <h3>Chăm sóc da & Thư giãn</h3>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <DataTable<DichVu>
                        columns={dichVuColumns}
                        data={dichVuCSDList}
                        isLoading={isLoading}
                    />
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

export default DichVuPage;