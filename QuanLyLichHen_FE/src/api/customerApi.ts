import axiosClient from './axiosClient';

export interface Customer {
    MAKH: string;
    HOTEN: string;
    SDT: string;
    MATK: string;
};

const CustomerApi = {
    getAll() {
        return axiosClient.get('/api/khachhang/get-all-khachhang');
    },
    getById(id: string) {
        return axiosClient.get(`/api/khachhang/get-byId-khachhang/${id}`);
    },
    create(data: Customer) {
        return axiosClient.post('/api/khachhang/insert-khachhang', data);
    },
    update(id: string, data: Customer) {
        return axiosClient.put(`/api/khachhang/update-khachhang/${id}`, data);
    },
    delete(id: string) {
        return axiosClient.delete(`/api/khachhang/delete-khachhang/${id}`);
    }
};
export default CustomerApi;