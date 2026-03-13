import React from "react";

const StaffPage = () => {
    return (
        <>
            <div id="staff" className="section">
                <div className="panel header-actions">
                    <h2>Nhân viên</h2>
                    <button id="addStaffBtn" className="btn primary">Thêm nhân
                        viên</button>
                </div>
                <div className="panel">
                    <table className="table" id="staffTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Họ Tên</th>
                                <th>Chức Vụ</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Ngày Sinh</th>
                                <th>Tài khoản</th>
                                <th>Chi nhánh</th>
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

export default StaffPage;