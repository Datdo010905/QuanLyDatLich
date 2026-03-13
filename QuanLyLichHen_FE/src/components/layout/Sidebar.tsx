import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
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
                    <span id="login-helloADMIN-span">Admin </span>
                    <strong id="login-helloADMIN"> Do Dat</strong>
                </div>

                <div className="sidebar-footer">
                    <button id="logoutBtn" onClick={() => { }}><i className="fas fa-sign-out-alt"></i> Đăng xuất</button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;