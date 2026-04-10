import axiosClient from './axiosClient';

export interface DichVu {
    madv: string;
    loaidv: string;
    tendv: string;
    mota: string;
    thoigian: number;
    giadv: number;
    trangthai: string;
    hinh: string;
    quytrinh: string;
};
export interface TopDVData {
    madv: string;
    tendv: string;
    mota: string;
    thoigian: number;
    giadv: number;
    trangthai: string;
    hinh: string;
    quytrinh: string;
    solan: number;
};

const dichVuApi = {
    // Hàm lấy danh sách tất cả dịch vụ
    getAll() {
        const url = '/api-admin/DichVu_/get-all-DichVuToc';
        return axiosClient.get<{ success: boolean; message: string; data: DichVu[] }>(url);
    },
    // Hàm lấy danh sách tất cả dịch vụ
    getAllCSD() {
        const url = '/api-admin/DichVu_/get-all-DichVuCSD';
        return axiosClient.get<{ success: boolean; message: string; data: DichVu[] }>(url);
    },
    // Hàm lấy danh sách tất cả dịch vụ
    getAllClient() {
        const url = '/api-common/DichVu_/get-all-DichVuToc';
        return axiosClient.get<{ success: boolean; message: string; data: DichVu[] }>(url);
    },
    // Hàm lấy danh sách tất cả dịch vụ
    getAllDichVuClient() {
        const url = '/api-common/DichVu_/get-all-DichVu';
        return axiosClient.get<{ success: boolean; message: string; data: DichVu[] }>(url);
    },
    // Hàm lấy danh sách tất cả dịch vụ
    getAllCSDClient() {
        const url = '/api-common/DichVu_/get-all-DichVuCSD';
        return axiosClient.get<{ success: boolean; message: string; data: DichVu[] }>(url);
    },
    // Hàm lấy dịch vụ theo ID
    getById(id: string) {
        const url = `/api-common/DichVu_/get-byId-DichVu?ma=${id}`;
        return axiosClient.get<{ success: boolean; message: string; data: DichVu }>(url);
    },
    // Hàm thêm dịch vụ
    create(data: FormData) {
        const url = '/api-admin/DichVu_/insert-DichVu';
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    // Hàm sửa dịch vụ
    update(data: FormData) {
        const url = '/api-admin/DichVu_/update-DichVu';
        return axiosClient.put(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    // Hàm xoá dịch vụ
    delete(id: string) { // Đổi FormData thành id (string)
        const url = `/api-admin/DichVu_/delete-DichVu?ma=${id}`;
        return axiosClient.delete(url); 
    }
};

export default dichVuApi;