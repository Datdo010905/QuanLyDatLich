import axiosClient from './axiosClient';

//định nghĩa theo api trả về
export interface HoaDon {
    mahd: string;
    makh: string;
    makm: string;
    malich: string;
    manv: string;
    tongtien: number;
    hinhthucthanhtoan: string;
    trangthai: string;
};
export interface HoaDonDetails {
    mahd: string;
    madv: string;
    soluong: number;
    dongia: number;
    thanhtien: string;
};
const HoaDonApi = {
    getAll() {
        const url = '/api-admin/HoaDon_/get-all-HoaDon';
        return axiosClient.get<{ success: boolean; message: string; data: HoaDon[] }>(url);
    },
     getAllCT() {
        const url = '/api-admin/HoaDon_/get-all-CTHoaDon';
        return axiosClient.get<{ success: boolean; message: string; data: HoaDonDetails[] }>(url);
    },
    getAllByIdNV(id: string) {
        const url = `/api-admin/HoaDon_/get-allbyIdNV-HoaDon?manv=${id}`;
        return axiosClient.get<{ success: boolean; message: string; data: HoaDon }>(url);
    },
    getById(id: string) {
        const url = `/api-admin/HoaDon_/get-byId-HoaDon?ma=${id}`;
        return axiosClient.get<{ success: boolean; message: string; data: HoaDon }>(url);
    },
    getByIdCT(id: string) {
        const url = `/api-admin/HoaDon_/get-byId-CTHoaDon?ma=${id}`;
        return axiosClient.get<{ success: boolean; message: string; data: HoaDonDetails }>(url);
    },
    create(data: FormData) {
        const url = '/api-admin/HoaDon_/insert-HoaDon';
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    createCT(data: FormData) {
        const url = '/api-admin/HoaDon_/insert-CTHoaDon';
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(data: FormData) {
        const url = `/api-admin/HoaDon_/update-HoaDon`;
        return axiosClient.put(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id: string) {
        const url = `/api-admin/HoaDon_/delete-HoaDon?ma=${id}`;
        return axiosClient.delete(url); 
    },
    deleteCT(id: string) {
        const url = `/api-admin/HoaDon_/delete-CTHoaDon?ma=${id}`;
        return axiosClient.delete(url); 
    }
};

export default HoaDonApi;