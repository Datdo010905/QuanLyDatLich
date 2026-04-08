
import StatCard from "../../components/ui/StatCard";
import React, { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal";
import CustomerApi from "../../api/customerApi";
import BookingApi, { Booking } from "../../api/bookingApi";
import StaffApi from "../../api/staffApi"
import dichVuApi from "../../api/dichvuApi";
import TaiKhoanApi from "../../api/taikhoanApi";
import KhuyenMaiApi from "../../api/khuyenmaiApi";
import HoaDonApi, { HoaDon } from "../../api/hoadonApi";

const ReportPage = () => {

    const [totalLichHen, setTotalLichHen] = useState(0);
    const [bookingList, setbookingList] = useState<Booking[]>([]);
    const [lichTC, setLTC] = useState(0);

    const [totalHoaDon, setTotalHoaDon] = useState(0);
    const [HoaDonList, setHoaDonList] = useState<HoaDon[]>([]);
    const [HoaDonDTT, setHoaDonDTT] = useState(0);

    const fetchData = async () => {

        const resBooking = await BookingApi.getAll();
        const resHD = await HoaDonApi.getAll();
        if (resBooking.data.success) {
            setTotalLichHen(resBooking.data.data.length);
            setbookingList(resBooking.data.data);
        }
        if (resHD.data.success) {
            setTotalHoaDon(resHD.data.data.length);
            setHoaDonList(resHD.data.data);
        }

    }
    const checkOK = () => {
        //lọc
        const ltc = bookingList.filter(lh => lh.trangthai === "Hoàn thành");
        const hdtt = HoaDonList.filter(hd => hd.trangthai === "Đã thanh toán");
        setLTC(ltc.length);
        setHoaDonDTT(hdtt.length);
    }

    //có data thì chạy
    useEffect(() => {
        if (bookingList.length > 0 || HoaDonList.length > 0) {
            checkOK();
        }
    }, [bookingList, HoaDonList]);

    //CHẠY KHI ĐC MOUNT
    useEffect(() => {
        fetchData();
    }, [])

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
                    <StatCard
                        title="Tổng Doanh Thu"
                        icon="fa-solid fa-hand-holding-dollar"
                        valueColor="#2ecc71"
                        value={'999.999.999₫'}
                    />
                    <StatCard
                        title="Tổng Lịch Hẹn"
                        icon="fas fa-calendar-check"
                        value={totalLichHen}
                        subText={"Thành công: " + lichTC}
                    />
                    <StatCard
                        title="Tổng Hoá Đơn"
                        icon="fas fa-file-invoice-dollar"
                        value={totalHoaDon}
                        subText={"Đã thanh toán: " + HoaDonDTT}
                    />
                </div>

                <div className="panel" style={{ "marginTop": "20px" }}>
                    <div className="report-filter">
                        <h3>Top Dịch Vụ hay dùng</h3>
                        <button className="btn primary">
                            <i className="fas fa-download"></i> Xuất Excel
                        </button>
                    </div>
                    {/* <div className="panel">
                        <div className="table-wrapper"> */}
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
                        <tbody>

                        </tbody>
                    </table>
                    {/* </div>
                    </div> */}
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