import axiosClient from './axiosClient';

//định nghĩa theo api trả về
export interface Booking {
    malich: string;
    ngayhen: string;
    giohen: string;
    trangthai: string;
    machinhanh: string;
    makh: string;
};
export interface BookingDetails {
    malich: string;
    madv: string;
    manv: string;
    soluong: number;
    giA_DUKIEN: number;
    ghichu: string;
};
const BookingApi = {
    getAll() {
        const url = '/api-admin/LichHen_/get-all-lichhen';
        return axiosClient.get<{ success: boolean; message: string; data: Booking[] }>(url);
    },
     getAllCT() {
        const url = '/api-admin/LichHen_/get-all-CTlichhen';
        return axiosClient.get<{ success: boolean; message: string; data: BookingDetails[] }>(url);
    },
    getAllByIdNV(id: string) {
        const url = `/api-admin/LichHen_/get-allbyIdNV-lichhen?manv=${id}`;
        return axiosClient.get<{ success: boolean; message: string; data: Booking }>(url);
    },
    getById(id: string) {
        const url = `/api-admin/LichHen_/get-byId-lichhen?ma=${id}`;
        return axiosClient.get<{ success: boolean; message: string; data: Booking }>(url);
    },
    getByIdCT(id: string) {
        const url = `/api-admin/LichHen_/get-byId-CTlichhen?ma=${id}`;
        return axiosClient.get<{ success: boolean; message: string; data: BookingDetails }>(url);
    },
    create(data: FormData) {
        const url = '/api-admin/LichHen_/insert-lichhen';
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    createCT(data: FormData) {
        const url = '/api-admin/LichHen_/insert-CTlichhen';
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(id: string, trangthai: string) {
        const url = `/api-admin/LichHen_/update-lichhen?ma=${id}&trangthai=${trangthai}`;
        return axiosClient.put(url); 
    },
    delete(id: string) {
        const url = `/api-admin/LichHen_/delete-lichhen?ma=${id}&sdt=${id}`;
        return axiosClient.delete(url); 
    },
    deleteCT(id: string) {
        const url = `/api-admin/LichHen_/delete-CTlichhen?ma=${id}&sdt=${id}`;
        return axiosClient.delete(url); 
    }
};

export default BookingApi;