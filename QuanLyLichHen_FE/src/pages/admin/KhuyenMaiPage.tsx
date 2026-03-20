import React, { useState } from "react";
import Modal from "../../components/ui/Modal";
import { KHUYENMAI, IKhuyenMai } from "../../data/static_content";

const KhuyenMaiPage = () => {

    //khởi tạo state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    //state từ dữ liệu tĩnh
    const [khuyenmai, setKM] = useState<IKhuyenMai[]>(KHUYENMAI);

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
            <div id="promotions" className="section">
                <div className="panel header-actions">
                    <h2>Khuyến mại</h2>
                    <button id="addPromotionBtn" className="btn primary" onClick={() => setIsAddModalOpen(true)}>Thêm khuyến mại</button>
                </div>
                <div className="panel">
                    <table className="table" id="promotionsTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên Khuyến Mãi</th>
                                <th>Mô Tả</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Giá Trị</th>
                                <th>Trạng Thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 3. DÙNG .MAP() DUYỆT QUA MẢNG DỮ LIỆU */}
                            {khuyenmai.map((obj, index) => (
                                <tr key={obj.MAKM}>
                                    <td>{obj.MAKM}</td>
                                    <td>{obj.TENKM}</td>
                                    <td>{obj.MOTA}</td>
                                    <td>{obj.NGAYBD}</td>
                                    <td>{obj.NGAYKT}</td>
                                    <td>{obj.GIATRI}</td>
                                    <td>
                                        {/* Đổi màu chữ xanh/đỏ tùy theo trạng thái */}
                                        <span style={{ color: obj.TRANGTHAI === 'Đang áp dụng' ? 'green' : 'red', fontWeight: 'bold' }}>
                                            {obj.TRANGTHAI}
                                        </span>
                                    </td>
                                    <td>
                                        <button style={{ "marginRight": "20px" }} className="btn small edit" onClick={() => setIsEditModalOpen(true)}><i className="fas fa-edit"></i>
                                        </button>

                                        <button className="btn small delete" onClick={() => setIsDeleteModalOpen(true)}><i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {/* Nếu không có dữ liệu */}
                            {khuyenmai.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center' }}>Không có dữ liệu</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
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

export default KhuyenMaiPage;