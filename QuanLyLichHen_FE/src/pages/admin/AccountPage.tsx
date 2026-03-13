import React from "react";

const AccountPage = () => {
    return (
        <>
            <div id="accounts" className="section">
                <div className="panel header-actions">
                    <h2>Tài khoản</h2>
                    <button id="addAccountBtn" className="btn primary" onClick={() => { }}>
                        Thêm tài khoản
                    </button>
                </div>
                <div className="panel">
                    <table className="table" id="accountsTable">
                        <thead>
                            <tr>
                                <th>Tên đăng nhập</th>
                                <th>Mật khẩu</th>
                                <th>Quyền hạn</th>
                                <th>Trạng thái</th>
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

export default AccountPage;