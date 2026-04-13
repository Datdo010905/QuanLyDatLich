import axiosClient from './axiosClient';

//định nghĩa theo api trả về
export interface TaiKhoan {
    matk: string;
    pass: string;
    phanquyen: number;
    trangthai: string;
};

const TaiKhoanApi = {
    getAll() {
        const url = '/api-admin/TaiKhoan_/get-all-taikhoan';
        return axiosClient.get<{ success: boolean; message: string; data: TaiKhoan[] }>(url);
    },
    getById(id: string) {
        const url = `/api-admin/TaiKhoan_/get-byId-taikhoan?ma=${id}`;
        return axiosClient.get<{ success: boolean; message: string; data: TaiKhoan[] }>(url);
    },
    create(data: FormData) {
        const url = '/api-admin/TaiKhoan_/insert-taikhoan';
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(data: FormData) {
        const url = '/api-admin/TaiKhoan_/update-taikhoan';
        return axiosClient.put(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id: string) {
        const url = `/api-admin/TaiKhoan_/delete-taikhoan?ma=${id}`;
        return axiosClient.delete(url); 
    }
};

export default TaiKhoanApi;