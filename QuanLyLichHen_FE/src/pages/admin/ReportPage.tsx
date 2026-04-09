
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
import { toast } from "react-toastify";

const ReportPage = () => {

    // const [totalLichHen, setTotalLichHen] = useState(0);
    // const [totalHoaDon, setTotalHoaDon] = useState(0);

    const [bookingList, setbookingList] = useState<Booking[]>([]);
    const [HoaDonList, setHoaDonList] = useState<HoaDon[]>([]);

    const [lichTC, setLTC] = useState(0);
    const [tongDT, settongDT] = useState(0);
    const [HoaDonDTT, setHoaDonDTT] = useState(0);

    const fetchData = async () => {

        const resBooking = await BookingApi.getAll();
        const resHD = await HoaDonApi.getAll();

        if (resBooking.data.success) {
            //setTotalLichHen(resBooking.data.data.length);
            setbookingList(resBooking.data.data);
        }
        if (resHD.data.success) {
            //setTotalHoaDon(resHD.data.data.length);
            setHoaDonList(resHD.data.data);
        }

    }
    const checkOK = () => {
        //lọc
        const ltc = bookingList.filter(lh => lh.trangthai === "Hoàn thành");
        const hdtt = HoaDonList.filter(hd => hd.trangthai === "Đã thanh toán");

        setLTC(ltc.length);
        setHoaDonDTT(hdtt.length);
        //reduce duyệt
        //number tránh cộng chuỗi
        const total = hdtt.reduce((sum, hd) => sum + Number(hd.tongtien), 0);
        settongDT(total);
        //console.log(total)
    }

    useEffect(() => {
        checkOK();
    }, [bookingList, HoaDonList]);

    //CHẠY KHI ĐC MOUNT
    useEffect(() => {
        fetchData();
    }, [])

    const [formData, setFormData] = useState({
        start: '',
        end: ''
    });
    //xử lý thay đổi
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        // Cập nhật dữ liệu người dùng nhập vào formData
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleClickReport = async () => {
        //e.preventDefault();
        try {
            if (!formData.start || !formData.end) {
                toast.warn("Hãy chọn ngày cần xem báo cáo thống kê!");
                return;
            }
            const ngaybd = formData.start.toString();
            const ngaykt = formData.end.toString();
            //console.log(ngaybd);
            //console.log(ngaykt);
            if (ngaybd > ngaykt) {
                toast.warn("Ngày bắt đầu xem phải nhỏ hơn ngày kết thúc!");
                return;
            }
            const [resLichByNgay, resHoaDonByNgay] = await Promise.all([
                BookingApi.getByNgay(formData.start, formData.end),
                HoaDonApi.getByNgay(formData.start, formData.end)
            ]);

            if (resLichByNgay.data.success && resLichByNgay.data.data) {
                setbookingList(resLichByNgay.data.data);
            } else {
                setbookingList([]); // Không có reset về rỗng
                //setTotalLichHen(0);
            }

            if (resHoaDonByNgay.data.success && resHoaDonByNgay.data.data) {
                setHoaDonList(resHoaDonByNgay.data.data);
            } else {
                setHoaDonList([]);
                //setTotalHoaDon(0);
            }

            toast.success('Xem báo cáo thành công!');
        }
        catch (error) {
            console.error("Lỗi khi xem báo cáo:", error);
            toast.error("Có lỗi xảy ra khi tải báo cáo!");
        }
    }
    const handleClickRefresh = async () => {
        setFormData({
            start: '',
            end: ''
        })
        await fetchData();
        toast.info('Làm mới thành công!');
    }

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
                            <input value={formData.start} onChange={handleChange} type="date" id="start" />
                        </div>
                        <div className="form-group reportDate">
                            <label>Đến ngày:</label>
                            <input value={formData.end} onChange={handleChange} type="date" id="end" />
                        </div>
                        <button onClick={handleClickReport} className="btn primary">
                            <i className="fas fa-filter"></i> Xem thống kê
                        </button>
                        <button onClick={handleClickRefresh} className="btn secondary">
                            <i className="fas fa-sync"></i> Làm mới
                        </button>
                    </div>
                </div>

                <div className="cards">
                    <StatCard
                        title="Tổng Doanh Thu"
                        icon="fa-solid fa-hand-holding-dollar"
                        valueColor="#2ecc71"
                        value={tongDT.toLocaleString('vi-VN') + ' ₫'}
                    />
                    <StatCard
                        title="Tổng Lịch Hẹn"
                        icon="fas fa-calendar-check"
                        value={bookingList.length}
                        subText={"Thành công: " + lichTC}
                    />
                    <StatCard
                        title="Tổng Hoá Đơn"
                        icon="fas fa-file-invoice-dollar"
                        value={HoaDonList.length}
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