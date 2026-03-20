import axiosClient from './axiosClient';

export interface DichVu {
    madv: string;
    tendv: string;
    mota: string;
    thoigian: number;
    giadv: number;
    trangthai: string;
    hinh: string;
    quytrinh: string;
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
};

export default dichVuApi;