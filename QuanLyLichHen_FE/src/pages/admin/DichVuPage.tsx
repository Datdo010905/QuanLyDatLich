import React from "react";

const DichVuPage = () => {
    return (
        <>
            <div id="services" className="section">
                <div className="panel header-actions">
                    <h2>Dịch vụ</h2>
                    <button id="addServiceBtn" className="btn primary">Thêm dịch
                        vụ</button>
                </div>

                <div className="panel">
                    <h3>Tóc</h3>
                    <div className="table-wrapper">
                        <table className="table" id="hairServicesTable">
                            <thead>
                                <tr>
                                    <th>Hành Động</th>
                                    <th>ID</th>
                                    <th>Ảnh</th>
                                    <th>Tên Dịch Vụ</th>
                                    <th>Thời Gian (phút)</th>
                                    <th>Giá (VND)</th>
                                    <th>Trạng Thái</th>
                                    <th>Mô Tả</th>
                                    <th>Quy Trình</th>
                                </tr>
                            </thead>
                            <tbody id="hairServicesTbody"></tbody>
                        </table>
                    </div>
                </div>

                <div className="panel">
                    <h3>Chăm sóc da & Thư giãn</h3>
                    <div className="table-wrapper">
                        <table className="table" id="skinCareServicesTable">
                            <thead>
                                <tr>
                                    <th>Hành Động</th>
                                    <th>ID</th>
                                    <th>Ảnh</th>
                                    <th>Tên Dịch Vụ</th>
                                    <th>Thời Gian (phút)</th>
                                    <th>Giá (VND)</th>
                                    <th>Trạng Thái</th>
                                    <th>Mô Tả</th>
                                    <th>Quy Trình</th>
                                </tr>
                            </thead>
                            <tbody id="skinCareServicesTbody"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DichVuPage;