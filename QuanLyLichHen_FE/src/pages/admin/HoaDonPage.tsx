import React, { useState } from "react";
import Modal from "../../components/ui/Modal";

const HoaDonPage = () => {
    //khởi tạo state
            const [isAddModalOpen, setIsAddModalOpen] = useState(false);
            const [isEditModalOpen, setIsEditModalOpen] = useState(false);
            const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
                    <table className="table" id="invoicesTable">
                        <thead>
                            <tr>
                                <th>Mã hoá đơn</th>
                                <th>Mã khuyến mại</th>
                                <th>Tổng Tiền</th>
                                <th>Hình Thức Thanh toán</th>
                                <th>Nhân viên</th>
                                <th>Lịch Hẹn</th>
                                <th>Trạng Thái</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
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

export default HoaDonPage;