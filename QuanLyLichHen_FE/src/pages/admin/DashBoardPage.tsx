import React from "react";
import StatCard from "../../components/ui/StatCard";
// Import mảng dữ liệu
import { KHACHHANG, LICHHEN } from '../../data/static_content';

const DashboardPage: React.FC = () => {

    const totalCustomers = KHACHHANG.length;
    const today = "2025-10-09";
    const bookingsToday = LICHHEN.filter(lich => lich.NGAYHEN === today);
    const totalBookingsToday = bookingsToday.length;
    return (
        <>
            <div id="dashboard" className="section active-section">
                <div className="cards">
                    <StatCard
                        title="Tổng khách"
                        value={totalCustomers}
                    />
                    <StatCard
                        title="Đặt lịch hôm nay"
                        value={totalBookingsToday}
                        subText={`Cập nhật ngày: ${today}`}
                    />
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