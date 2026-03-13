import React from "react";

const HoaDonPage = () => {
    return (
        <>
            <div id="invoices" className="section">
                <div className="panel header-actions">
                    <h2>Hoá đơn</h2>
                    <button id="addInvoiceBtn" className="btn primary" >Thêm hoá
                        đơn</button>
                </div>
                <div className="panel">
                    <table className="table" id="invoicesTable">
                        <thead>
                            <tr>
                                <th>Mã hoá đơn</th>
                                <th>Mã khuyến mại</th>
                                <th>Tổng Tiền</th>
                                <th>Hình Thức Thanh toán</th>
                                <th>Nhân viên</th>
                                <th>Lịch Hẹn</th>
                                <th>Trạng Thái</th>
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

export default HoaDonPage;