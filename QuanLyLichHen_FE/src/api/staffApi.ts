import axiosClient from './axiosClient';

//định nghĩa theo api trả về
export interface NhanVien {
    manv: string;
    hoten: string;
    chucvu: string;
    sdt: string;
    diachi: string;
    machinhanh: string;
    ngaysinh: string;
    matk: string;
};

const NhanVienApi = {
    getAll() {
        const url = '/api-admin/NhanVien_/get-all-nhanvien';
        return axiosClient.get<{ success: boolean; message: string; data: NhanVien[] }>(url);
    },
    getById(id: string) {
        const url = `/api-admin/NhanVien_/get-byId-nhanvien?ma=${id}`;
        return axiosClient.get<{ success: boolean; message: string; data: NhanVien }>(url);
    },
    create(data: FormData) {
        const url = '/api-admin/NhanVien_/insert-nhanvien';
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(data: FormData) {
        const url = '/api-admin/NhanVien_/update-nhanvien';
        return axiosClient.put(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id: string) {
        const url = `/api-admin/NhanVien_/delete-nhanvien?ma=${id}`;
        return axiosClient.delete(url); 
    }
};

export default NhanVienApi;