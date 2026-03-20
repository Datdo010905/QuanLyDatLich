import React, { useState } from "react";
import Modal from "../../components/ui/Modal";

const BookingPage = () => {
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
            <div id="bookings" className="section">
                <div className="panel header-actions">
                    <h2>Lịch hẹn</h2>
                    <button id="addBookingBtn" className="btn primary" onClick={() => setIsAddModalOpen(true)}>Thêm lịch
                        hẹn</button>
                </div>
                <div id="booking-details" className="booking-details" style={{ "display": "none;" }}>
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
                <div className="panel">
                    <table className="table" id="bookingsTable">
                        <thead>
                            <tr>
                                <th>Mã Lịch Hẹn</th>
                                <th>Ngày Hẹn</th>
                                <th>Giờ Hẹn</th>
                                <th>Trạng Thái</th>
                                <th>Nhân viên</th>
                                <th>Khách Hàng</th>
                                <th>Chi Nhánh</th>
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

export default BookingPage;