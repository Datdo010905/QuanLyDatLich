import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


// Định nghĩa prop để nhận vào danh sách các quyền hợp lệ
interface PrivateRouteProps {
  allowedRoles?: number[]; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('phanquyen'); // Lấy quyền đang lưu

  // Kiểm tra xem người dùng có token và quyền hợp lệ không
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && role && !allowedRoles.includes(Number(role))) {
    return <Navigate to="/" replace />;
  }
  //đúng
  return <Outlet />;
};

export default PrivateRoute;