import React from "react";

const KhuyenMaiPage = () => {
    return (
        <>
            <div id="promotions" className="section">
                <div className="panel header-actions">
                    <h2>Khuyến mại</h2>
                    <button id="addPromotionBtn" className="btn primary">Thêm
                        khuyến mại</button>
                </div>
                <div className="panel">
                    <table className="table" id="promotionsTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên Khuyến Mãi</th>
                                <th>Mô Tả</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Giá Trị</th>
                                <th>Trạng Thái</th>
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

export default KhuyenMaiPage;