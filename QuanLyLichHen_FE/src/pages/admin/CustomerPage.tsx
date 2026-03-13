import React from "react";

const CustomerPage = () => {
    return (
        <>
            <div id="customers" className="section">
                <div className="panel header-actions">
                    <h2>Khách hàng</h2>
                    <button id="addCustomerBtn" className="btn primary">Thêm
                        khách</button>
                </div>
                <div className="panel">
                    <table className="table" id="customersTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Họ và tên</th>
                                <th>Số điện thoại</th>
                                <th>Tài khoản</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CustomerPage;