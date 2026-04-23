import axiosClient from './axiosClient';

export interface Booking {
    MALICH: string;
    NGAYHEN: string;
    GIOHEN: string;
    TRANGTHAI: string;
    MACHINHANH: string;
    MAKH: string;
}
export interface BookingDetails {
    MALICH: string;
    MADV: string;
    MANV: string;
    SOLUONG: number;
    GIA_DUKIEN: number;
    GHICHU: string;
}

const BookingApi = {
    // ===== LỊCH HẸN =====
    getAll() {
        return axiosClient.get('/api/lichhen/get-all-lichhen');
    },

    getById(id: string) {
        return axiosClient.get(`/api/lichhen/get-byId-lichhen/${id}`);
    },

    create(data: Booking) {
        return axiosClient.post('/api/lichhen/insert-lichhen', data);
    },

    update(id: string, trangthai: string) {
        return axiosClient.put(`/api/lichhen/update-lichhen/${id}`, {
            TRANGTHAI: trangthai
        });
    },

    delete(id: string) {
        return axiosClient.delete(`/api/lichhen/delete-lichhen/${id}`);
    },

    // ===== CHI TIẾT LỊCH HẸN =====
    getAllCT() {
        return axiosClient.get('/api/lichhen/get-all-CTlichhen');
    },

    getByIdCT(id: string) {
        return axiosClient.get(`/api/lichhen/get-byId-CTlichhen/${id}`);
    },

    createCT(data: BookingDetails) {
        return axiosClient.post('/api/lichhen/insert-CTlichhen', data);
    },

    deleteCT(id: string) {
        return axiosClient.delete(`/api/lichhen/delete-CTlichhen/${id}`);
    }
};
export default BookingApi;