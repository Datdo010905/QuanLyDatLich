import React, { useState } from "react";
import Modal from "../../components/ui/Modal";
import StatCard from "../../components/ui/StatCard";

const ReportPage = () => {
    return (
        <>
            <div id="reports" className="section">
                <div className="panel header-actions">
                    <h2>Báo cáo thống kê</h2>
                </div>
                <div className="panel">
                    <div className="reportDate-form">
                        <div className="form-group reportDate">
                            <label>Từ ngày:</label>
                            <input type="date" id="reportDateStart" />
                        </div>
                        <div className="form-group reportDate">
                            <label>Đến ngày:</label>
                            <input type="date" id="reportDateEnd" />
                        </div>
                        <button className="btn primary">
                            <i className="fas fa-filter"></i> Xem thống kê
                        </button>
                        <button className="btn secondary">
                            <i className="fas fa-sync"></i> Làm mới
                        </button>
                    </div>
                </div>

                <div className="cards">
                    <div className="card">
                        <h3>Tổng Doanh Thu</h3>
                        <p id="reportRevenue" style={{ "color": "#2ecc71" }}>999.999.999₫</p>
                    </div>
                    <div className="card">
                        <h3>Tổng Lịch Hẹn</h3>
                        <p id="reportBookings">342</p>
                        <small id="reportBookingsDone">Thành công: 310</small>
                    </div>
                </div>

                <div className="panel" style={{ "marginTop": "20px" }}>
                    <div className="report-filter">
                        <h3>Top Dịch Vụ hay dùng</h3>
                        <button className="btn primary">
                            <i className="fas fa-download"></i> Xuất Excel
                        </button>
                    </div>
                    <div className="panel">
                        <div className="table-wrapper">
                            <table className="table" id="ServicesTop">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Ảnh</th>
                                        <th>Tên Dịch Vụ</th>
                                        <th>Thời Gian (phút)</th>
                                        <th>Giá (VND)</th>
                                        <th>Số lần</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="panel" style={{ "marginTop": "20px" }}>
                    <div className="report-filter">
                        <h3>Top Nhân Viên Xuất Sắc</h3>
                        <button className="btn primary">
                            <i className="fas fa-download"></i> Xuất Excel</button>
                    </div>
                    <table className="table" id="staffTop">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Họ Tên</th>
                                <th>Chức Vụ</th>
                                <th>Số điện thoại</th>
                                <th>Ngày Sinh</th>
                                <th>Chi nhánh</th>
                                <th>Số lịch hẹn</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>

            </div>
        </>
    );
};

export default ReportPage;