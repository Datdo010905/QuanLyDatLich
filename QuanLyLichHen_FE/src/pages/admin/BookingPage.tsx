import React from "react";

const BookingPage = () => {
    return (
        <>
            <div id="bookings" className="section">
                <div className="panel header-actions">
                    <h2>Lịch hẹn</h2>
                    <button id="addBookingBtn" className="btn primary">Thêm lịch
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
            </div>
        </>
    );
};

export default BookingPage;