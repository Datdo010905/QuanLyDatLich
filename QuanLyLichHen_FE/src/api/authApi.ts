
import axiosClient from './axiosClient';

export interface LoginPayload {
  username: string;
  password: string;
}
export interface SignupPayload {
  username: string;
  password: string;
}
// Định nghĩa kiểu dữ liệu API trả về khi thành công
export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  data: {
    matk: string;
    pass: string;
    phanquyen: number;
    trangthai: string;
  };
}
const authApi = {
  login(data: LoginPayload) {
    const url = '/api-common/Login_/login-taikhoan';
    // Truyền interface vào để TypeScript biết response trả về có cấu trúc như thế nào
    return axiosClient.get<LoginResponse>(url, {
      params: {
        username: data.username,
        pass: data.password
      }
    });
  },
  signup(data: FormData) {
    const url = '/api-common/Login_/signup-taikhoan';
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  themKH(data: FormData) {
    const url = '/api-common/Login_/insert-khachhang';
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
};

export default authApi;