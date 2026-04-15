import axiosClient from './axiosClient';

//định nghĩa theo api trả về
export interface KhuyenMai {
    makm: string,
    tenkm: string,
    mota: string,
    ngaybd: string,
    ngaykt: string,
    giatri: number,
    trangthai: string,
};

const KhuyenMaiApi = {
    getAll() {
        const url = '/api-admin/KhuyenMai_/get-all-KhuyenMai';
        return axiosClient.get<{ success: boolean; message: string; data: KhuyenMai[] }>(url);
    },
    getById(id: string) {
        const url = `/api-admin/KhuyenMai_/get-byId-KhuyenMai?ma=${id}`;
        return axiosClient.get<{ success: boolean; message: string; data: KhuyenMai }>(url);
    },
    create(data: FormData) {
        const url = '/api-admin/KhuyenMai_/insert-KhuyenMai';
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    update(data: FormData) {
        const url = '/api-admin/KhuyenMai_/update-KhuyenMai';
        return axiosClient.put(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete(id: string) {
        const url = `/api-admin/KhuyenMai_/delete-KhuyenMai?ma=${id}`;
        return axiosClient.delete(url);
    }
};

export default KhuyenMaiApi;