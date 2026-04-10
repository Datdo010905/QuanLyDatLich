import axiosClient from './axiosClient';

//định nghĩa theo api trả về
export interface Customer {
    makh: string;
    hoten: string;
    sdt: string;
    matk: string;
};

const CustomerApi = {
    getAll() {
        const url = '/api-admin/KhachHang_/get-all-khachhang';
        return axiosClient.get<{ success: boolean; message: string; data: Customer[] }>(url);
    },
    getById(id: string) {
        const url = `/api-admin/KhachHang_/get-byId-khachhang?ma=${id}`;
        return axiosClient.get<{ success: boolean; message: string; data: Customer }>(url);
    },
    getBySDT(SDT: string) {
        const url = `/api-common/Login_/get-bySDT-khachhang?SDT=${SDT}`;
        return axiosClient.get<{ success: boolean; message: string; data: Customer }>(url);
    },
    create(data: FormData) {
        const url = '/api-admin/KhachHang_/insert-khachhang';
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(data: FormData) {
        const url = '/api-admin/KhachHang_/update-khachhang';
        return axiosClient.put(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id: string) {
        const url = `/api-admin/KhachHang_/delete-khachhang?ma=${id}&sdt=${id}`;
        return axiosClient.delete(url);
    }
};

export default CustomerApi;