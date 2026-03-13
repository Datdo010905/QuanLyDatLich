import React from 'react';

// Định nghĩa cấu trúc của 1 Cột
export interface Column<T> {
    header: string; // Tên hiển thị trên tiêu đề bảng (VD: "Họ và tên")
    // Render: Hàm nhận vào 1 dòng dữ liệu và trả ra giao diện của ô đó
    render: (item: T) => React.ReactNode; 
}

// Định nghĩa Props truyền vào DataTable
interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
}

// Chữ <T> đại diện cho một kiểu dữ liệu bất kỳ (như ITaiKhoan, IKhachHang...)
function DataTable<T>({ columns, data }: DataTableProps<T>) {
    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        {/* 1. Tự động vẽ tiêu đề cột */}
                        {columns.map((col, index) => (
                            <th key={index}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* 2. Kiểm tra nếu mảng rỗng */}
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                                Không có dữ liệu
                            </td>
                        </tr>
                    ) : (
                        /* 3. Tự động duyệt mảng data để vẽ các hàng */
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {/* Mỗi hàng lại duyệt qua mảng columns để vẽ các ô <td> */}
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex}>
                                        {col.render(row)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;