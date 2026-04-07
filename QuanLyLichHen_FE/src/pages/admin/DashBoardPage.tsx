
import StatCard from "../../components/ui/StatCard";
import React, { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal";
import CustomerApi from "../../api/customerApi";
import BookingApi, { Booking } from "../../api/bookingApi";
const DashboardPage: React.FC = () => {

    //lưu state để dùng
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [bookingsToday, setTotalBookingsToday] = useState(0);

    const today = new Date().toISOString().split('T')[0];



    const fetchData = async () => {
        const resKH = await CustomerApi.getAll();

        if (resKH.data.success) {
            setTotalCustomers(resKH.data.data.length);
        }
        const resBooking = await BookingApi.getAll();
        if (resBooking.data.success) {
            const homnay = resBooking.data.data;
            const Todaybookings = homnay.filter(
                lich => lich.ngayhen.split('T')[0] === today
            );
            setTotalBookingsToday(Todaybookings.length);
        }
    };
    // Tải dữ liệu khi component mount
    useEffect(() => {
        fetchData();
    }, []);
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
                        value={bookingsToday}
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