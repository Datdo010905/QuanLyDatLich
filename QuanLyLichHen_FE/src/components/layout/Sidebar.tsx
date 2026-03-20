import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext'; // Lấy hook ra để sử dụng trong component
const Sidebar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // Lấy biến user và hàm logout từ context

    const handleLogout = () => {
        const isConfirm = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
        if (isConfirm) {
            logout(); // Xóa sạch dữ liệu trong vùng nhớ chung
            navigate('/login', { replace: true });
        }
    }

    return (
        <>
            <aside className="sidebar" id="sidebar">
                <div className="brand">
                    <Link to="/admin/dashboard"><img src="/img/logoTo.png" alt="logo" /></Link>
                </div>
                <nav>
                    <NavLink to="/admin/dashboard"><i className="fas fa-tachometer-alt"></i> Tổng quan</NavLink>
                    <NavLink to="/admin/accounts"><i className="fas fa-user-shield"></i> Tài khoản</NavLink>
                    <NavLink to="/admin/promotions"><i className="fas fa-tags"></i> Khuyến mại</NavLink>
                    <NavLink to="/admin/services"><i className="fas fa-concierge-bell"></i> Dịch vụ</NavLink>
                    <NavLink to="/admin/customers"><i className="fas fa-users"></i> Khách hàng</NavLink>
                    <NavLink to="/admin/staff"><i className="fas fa-user-tie"></i> Nhân viên</NavLink>
                    <NavLink to="/admin/bookings"><i className="fas fa-calendar-check"></i> Lịch hẹn</NavLink>
                    <NavLink to="/admin/invoices"><i className="fas fa-file-invoice-dollar"></i> Hoá đơn</NavLink>
                    <NavLink to="/admin/reports"><i className="fas fa-chart-line"></i> Báo cáo</NavLink>
                </nav>

                <div className="accounts">
                    {user ? (<span id="login-helloADMIN-span">User: </span>) :
                            (<span id="login-helloADMIN-span">Chưa đăng nhập</span>)}
                    
                    <strong style={{ marginLeft: '50px' }} id="login-helloADMIN"> {user ? user.username : ''}</strong>
                </div>

                <div className="sidebar-footer">
                    <button id="logoutBtn" onClick={() => { handleLogout() }}><i className="fas fa-sign-out-alt"></i> Đăng xuất</button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;