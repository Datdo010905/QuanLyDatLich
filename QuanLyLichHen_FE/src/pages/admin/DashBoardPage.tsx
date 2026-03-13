import React from "react";

const DashboardPage = () => {
    return (
        <>
            <div id="dashboard" className="section active-section">
                <div className="cards">
                    <div className="card">
                        <h3>Tổng khách</h3>
                        <p id="totalUsers">0</p>
                    </div>
                    <div className="card">
                        <h3>Đặt lịch hôm nay</h3>
                        <p id="todayBookings">0</p>
                    </div>
                </div>
                <div className="panel">
                    <h2>Hoạt động gần đây</h2>
                    <table className="table" id="recentTable">
                        <thead>
                            <tr>
                                <th>Thời gian</th>
                                <th>Sự kiện</th>
                                <th>Người dùng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Thời gian</td>
                                <td>Sự kiện</td>
                                <td>Người dùng</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;