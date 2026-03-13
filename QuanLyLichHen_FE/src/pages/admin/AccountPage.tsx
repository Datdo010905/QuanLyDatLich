import React, { useState } from "react";
import Modal from "../../components/ui/Modal";
import { TAIKHOAN, ITaiKhoan } from '../../data/static_content';

const AccountPage: React.FC = () => {
    //khởi tạo state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    //state từ dữ liệu tĩnh
    const [accounts, setAccounts] = useState<ITaiKhoan[]>(TAIKHOAN);

    // thêm tài khoản mới
    const handleAddAccount = (e: React.FormEvent) => {
        e.preventDefault(); // Ngăn submit form
        alert("Đã lưu tài khoản thành công!");
        setIsAddModalOpen(false);
    };


    // sửa tài khoản
    const handleEditAccount = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Đã cập nhật tài khoản!");
        setIsEditModalOpen(false);
    };

    // xoá tài khoản
    const handleDeleteAccount = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Đã xóa tài khoản!");
        setIsDeleteModalOpen(false);
    };

    // Hàm tiện ích: Trả về chữ "Quản lý", "Nhân viên"... dựa theo mã PHANQUYEN
    const getRoleName = (roleCode: number) => {
        switch (roleCode) {
            case 1: return "Admin";
            case 2: return "Quản lý";
            case 3: return "Stylist";
            case 4: return "Thu ngân";
            case 5: return "Lễ tân";
            case 0: return "Khách hàng";
            default: return "Không xác định";
        }
    };

    return (
        <>
            <div id="accounts" className="section">
                <div className="panel header-actions">
                    <h2>Tài khoản</h2>
                    <button id="addAccountBtn" className="btn primary" onClick={() => setIsAddModalOpen(true)}>
                        Thêm tài khoản
                    </button>
                </div>
                <div className="panel">
                    <table className="table" id="accountsTable">
                        <thead>
                            <tr>
                                <th>Tên đăng nhập</th>
                                <th>Mật khẩu</th>
                                <th>Quyền hạn</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 3. DÙNG .MAP() DUYỆT QUA MẢNG DỮ LIỆU THẬT */}
                            {accounts.map((acc, index) => (
                                <tr key={acc.MATK}>
                                    <td>{acc.MATK}</td>
                                    <td>{acc.PASS}</td>
                                    <td>
                                        {/* Hàm getRoleName giúp hiển thị tên quyền dễ hiểu hơn */}
                                        <span className={`badge ${acc.PHANQUYEN === 1 || acc.PHANQUYEN === 2 ? 'admin' : ''}`}>
                                            {getRoleName(acc.PHANQUYEN)}
                                        </span>
                                    </td>
                                    <td>
                                        {/* Đổi màu chữ xanh/đỏ tùy theo trạng thái */}
                                        <span style={{ color: acc.TRANGTHAI === 'Hoạt động' ? 'green' : 'red', fontWeight: 'bold' }}>
                                            {acc.TRANGTHAI}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn small edit" onClick={() => setIsEditModalOpen(true)}><i className="fas fa-edit"></i>
                                    </button>
                                    
                                    <button className="btn small delete" onClick={() => setIsDeleteModalOpen(true)}><i className="fas fa-trash"></i>
                                    </button>
                                    </td>
                                </tr>
                            ))}

                            {/* Nếu không có dữ liệu */}
                            {accounts.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center' }}>Không có dữ liệu</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Modal thêm tài khoản */}
                <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Thêm tài khoản mới">
                    <form onSubmit={handleAddAccount}>
                        <div className="form-group">
                            <label htmlFor="accUsername">Tên đăng nhập:</label>
                            <input type="text" id="accUsername" name="accUsername" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="accPassword">Mật khẩu:</label>
                            <input type="password" id="accPassword" name="accPassword" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="accRole">Quyền hạn:</label>
                            <select id="accRole">
                                <option value="0">Khách hàng</option>
                                <option value="2">Quản lý</option>
                                <option value="3">Stylist</option>
                                <option value="4">Thu ngân</option>
                                <option value="5">Lễ tân</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="accStatus">Trạng thái:</label>
                            <select id="accStatus">
                                <option value="Hoạt động">Hoạt động</option>
                                <option value="Đã khóa">Đã khóa</option>
                            </select>
                        </div>
                        <button type="button" className="btn secondary" onClick={() => setIsAddModalOpen(false)}>Hủy</button>
                        <button type="submit" className="btn primary">Lưu tài khoản</button>
                    </form>
                </Modal>

                {/* Modal sửa tài khoản */}
                <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Sửa tài khoản">
                    <form onSubmit={handleEditAccount}>
                        <div className="form-group">
                            <label htmlFor="editUsername">Tên đăng nhập:</label>
                            <input type="text" id="editUsername" name="editUsername" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editPassword">Mật khẩu:</label>
                            <input type="password" id="editPassword" name="editPassword" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="editRole">Quyền hạn:</label>
                            <select id="editRole">
                                <option value="0">Khách hàng</option>
                                <option value="2">Quản lý</option>
                                <option value="3">Stylist</option>
                                <option value="4">Thu ngân</option>
                                <option value="5">Lễ tân</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="editStatus">Trạng thái:</label>
                            <select id="editStatus">
                                <option value="Hoạt động">Hoạt động</option>
                                <option value="Đã khóa">Đã khóa</option>
                            </select>
                        </div>
                        <button type="button" className="btn secondary" onClick={() => setIsEditModalOpen(false)}>Hủy</button>
                        <button type="submit" className="btn primary">Lưu tài khoản</button>
                    </form>
                </Modal>

                {/* Modal xóa tài khoản */}
                <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Xóa tài khoản">
                    <p>Bạn có chắc chắn muốn xóa tài khoản này không?</p><br />
                    <button className="btn small delete" onClick={handleDeleteAccount}><i className="fas fa-trash"></i></button>
                </Modal>
            </div>
        </>
    );
};

export default AccountPage;