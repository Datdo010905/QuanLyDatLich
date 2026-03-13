import React from 'react';
import DataTable, { Column } from '../../components/ui/DataTable';
import { KHACHHANG, IKhachHang } from '../../data/static_content';

const CustomerPage: React.FC = () => {
    
    // 1. CHỈ ĐỊNH CÁCH HIỂN THỊ CÁC CỘT CHO BẢNG KHÁCH HÀNG
    const customerColumns: Column<IKhachHang>[] = [
        { header: 'Mã KH', render: (kh) => kh.MAKH },
        { header: 'Họ và tên', render: (kh) => <strong>{kh.HOTEN}</strong> },
        { header: 'Số điện thoại', render: (kh) => kh.SDT },
        { header: 'Tài khoản', render: (kh) => kh.MATK },
        { 
            header: 'Hành động', 
            // Cột này ta không in chữ mà in ra cái nút bấm
            render: (kh) => (
                <button 
                    className="btn primary" 
                    onClick={() => console.log("Mở modal sửa khách:", kh.HOTEN)}
                >
                    Sửa
                </button>
            ) 
        }
    ];

    return (
        <div id="customers" className="section active-section">
            <div className="panel header-actions">
                <h2>Khách hàng</h2>
                <button className="btn primary">Thêm khách</button>
            </div>
            
            <div className="panel">
                {/* 2. GỌI CỖ MÁY DATATABLE VÀ NÉM DỮ LIỆU VÀO */}
                <DataTable 
                    columns={customerColumns} 
                    data={KHACHHANG} 
                />
            </div>
        </div>
    );
};

export default CustomerPage;