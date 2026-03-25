import React from 'react';
// Định nghĩa cấu trúc của một Cột
export interface Column<T> {
  tieude: string; // Tên hiển thị trên tiêu đề bảng
  cotnhandulieu: keyof T; // Tên trường tương ứng trong dữ liệu API trả về 
  
  // Tùy chọn: Hàm tự custom cách hiển thị (Dùng khi muốn format tiền, ngày tháng, hoặc thêm nút Sửa/Xóa)
  render?: (row: T) => React.ReactNode; 
}

// Định nghĩa Props mà DataTable sẽ nhận vào
interface DataTableProps<T> {
  columns: Column<T>[]; // Danh sách các cột
  data: T[];            // Mảng dữ liệu từ API
  isLoading?: boolean;  // Trạng thái đang tải
}

//Component DataTable sử dụng Generic <T>
const DataTable = <T extends object>({ columns, data, isLoading }: DataTableProps<T>) => {
  if (isLoading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Đang tải dữ liệu...</div>;
  }
  if (!data || data.length === 0) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Không có dữ liệu.</div>;
    
  }
  return (
    <>
      <table className='table'>  
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>
                {col.tieude}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {/* Nếu cột này có cấu hình 'render' custom thì dùng, không thì in thẳng dữ liệu text ra */}
                  {col.render ? col.render(row) : (row[col.cotnhandulieu] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DataTable;

