import React, { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal";
import DataTable, { Column } from '../../components/ui/DataTable';
import dichVuApi, { DichVu } from "../../api/dichvuApi";

const DichVuPage: React.FC = () => {
    //Gộp state
    const [modalType, setModalType] = useState<'add' | 'edit' | 'none'>('none');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null); // Lưu ID cần xóa

    const [dichVuList, setDichVuList] = useState<DichVu[]>([]);
    const [dichVuCSDList, setDichVuCSDList] = useState<DichVu[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        serviceID: '', serviceName: '', serviceType: 'CT',
        serviceDesc: '', serviceTime: '', servicePrice: '',
        serviceStatus: 'Đang cung cấp', serviceProcedure: '',
    });
    const [previewImg, setPreviewImg] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    //up data từ api lên bảng
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [resToc, resCSD] = await Promise.all([
                dichVuApi.getAll(),
                dichVuApi.getAllCSD()
            ]);
            setDichVuList(resToc.data.data);
            setDichVuCSDList(resCSD.data.data);
        } catch (err) {
            setError("Không thể tải dữ liệu từ máy chủ.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewImg(URL.createObjectURL(file));
        }
    };

    // Chuẩn bị form rỗng khi Thêm 
    const handleOpenAdd = () => {
        setFormData({
            serviceID: '', serviceName: '', serviceType: 'CT',
            serviceDesc: '', serviceTime: '', servicePrice: '',
            serviceStatus: 'Đang cung cấp', serviceProcedure: '',
        });
        setPreviewImg('');
        setImageFile(null);
        setModalType('add');
    };

    //click nút sửa
    const handleEditClick = (row: DichVu) => {
        setFormData({
            serviceID: row.madv || '',
            serviceName: row.tendv || '',
            serviceType: row.loaidv || 'CT',
            serviceDesc: row.mota || '',
            serviceTime: row.thoigian ? String(row.thoigian) : '',
            servicePrice: row.giadv ? String(row.giadv) : '',
            serviceStatus: row.trangthai || 'Đang cung cấp',
            serviceProcedure: row.quytrinh || '',
        });
        setPreviewImg(row.hinh ? (row.hinh.startsWith('/') ? row.hinh : `/${row.hinh}`) : '');
        //setImageFile(null); // Giữ nguyên file cũ nếu không chọn ảnh mới
        setModalType('edit');
    };

    // Mở modal xóa và lưu ID
    const handleDeleteClick = (id: string) => {
        setIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    //HÀM SUBMIT CHO CẢ THÊM VÀ SỬA
    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = new FormData();
        submitData.append('maDV', formData.serviceID);
        submitData.append('tenDV', formData.serviceName);
        submitData.append('moTa', formData.serviceDesc);
        submitData.append('thoiGian', String(formData.serviceTime));
        submitData.append('giaDV', String(formData.servicePrice));
        submitData.append('trangThai', formData.serviceStatus);
        submitData.append('quyTrinh', formData.serviceProcedure);
        submitData.append('loai', formData.serviceType);

        if (imageFile) submitData.append('fileAnh', imageFile);

        try {
            if (modalType === 'add') {
                await dichVuApi.create(submitData);
                alert("Đã thêm thành công!");
            } else {
                await dichVuApi.update(submitData);
                alert("Đã cập nhật thành công!");
            }
            setModalType('none'); // Đóng form
            fetchData(); // Tải lại dữ liệu
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Thao tác thất bại, vui lòng kiểm tra lại!");
        }
    };

    // Xoá
    const handleDeleteConfirm = async () => {
        if (!idToDelete) return;
        try {
            await dichVuApi.delete(idToDelete);
            alert("Đã xóa thành công!");
            setIsDeleteModalOpen(false);
            fetchData(); // Load lại bảng
        } catch (error) {
            console.error("Lỗi xóa:", error);
            alert("Xóa thất bại!");
        }
    };

    const dichVuColumns: Column<DichVu>[] = [
        { tieude: "ID", cotnhandulieu: "madv" },
        { tieude: "Tên dịch vụ", cotnhandulieu: "tendv" },
        { tieude: "Thời gian", cotnhandulieu: "thoigian" },
        { tieude: "Giá", cotnhandulieu: "giadv", render: (row) => `${row.giadv.toLocaleString("vi-VN")} ₫` },
        { tieude: "Trạng thái", cotnhandulieu: "trangthai" },
        {
            tieude: "Ảnh", cotnhandulieu: "hinh", render: (row) => {
                const imgPath = row.hinh?.startsWith('/') ? row.hinh : `/${row.hinh}`;
                return row.hinh ? <img src={imgPath} alt={row.tendv} height="60" width="70" style={{ objectFit: 'cover', borderRadius: '4px' }} /> : <span style={{ color: '#999', fontSize: '12px' }}>Không có ảnh</span>;
            }
        },
        {
            tieude: "Hành động", cotnhandulieu: "madv", render: (row) => (
                <>
                    <button className="btn small edit" onClick={() => handleEditClick(row)}><i className="fas fa-edit"></i></button>
                    <button className="btn small delete" onClick={() => handleDeleteClick(row.madv)}><i className="fas fa-trash"></i></button>
                </>
            )
        },
    ];

    //HÀM RENDER FORM CHUNG CHO CẢ THÊM VÀ SỬA
    const renderFormContent = () => (
        <>
            <div className="form-group">
                <label htmlFor="serviceID">Mã dịch vụ:</label>
                {/* Khóa input ID nếu đang sửa */}
                <input type="text" id="serviceID" required disabled={modalType === 'edit'} placeholder="VD: CSD001" value={formData.serviceID} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="serviceName">Tên dịch vụ:</label>
                <input type="text" id="serviceName" required value={formData.serviceName} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="serviceType">Loại dịch vụ:</label>
                <select id="serviceType" value={formData.serviceType} onChange={handleChange}>
                    <option value="CT">Dịch vụ tóc</option>
                    <option value="CSD">Chăm sóc da</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="serviceDesc">Mô tả:</label>
                <textarea id="serviceDesc" rows={3} value={formData.serviceDesc} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="serviceTime">Thời gian (phút):</label>
                <input type="number" id="serviceTime" required value={formData.serviceTime} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="servicePrice">Giá (VND):</label>
                <input type="number" id="servicePrice" required value={formData.servicePrice} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="serviceStatus">Trạng thái:</label>
                <select id="serviceStatus" value={formData.serviceStatus} onChange={handleChange}>
                    <option value="Đang cung cấp">Đang cung cấp</option>
                    <option value="Ngừng cung cấp">Ngừng cung cấp</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="serviceImg">Ảnh (Chọn để thay đổi):</label>
                <input type="file" accept="image/*" id="serviceImg" onChange={handleImageChange} />
                {previewImg && <img src={previewImg} alt="Preview" style={{ marginTop: '10px', maxWidth: '200px' }} />}
            </div>
            <div className="form-group">
                <label htmlFor="serviceProcedure">Quy trình:</label>
                <textarea id="serviceProcedure" rows={3} value={formData.serviceProcedure} onChange={handleChange} />
            </div>
            <button type="submit" className="btn primary">{modalType === 'add' ? 'Lưu mới' : 'Cập nhật'}</button>
        </>
    );

    return (
        <div id="services" className="section">
            <div className="panel header-actions">
                <h2>Dịch vụ</h2>
                <button className="btn primary" onClick={handleOpenAdd}>Thêm dịch vụ</button>
            </div>

            <div className="panel">
                <h3>Tóc</h3>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <DataTable<DichVu> columns={dichVuColumns} data={dichVuList} isLoading={isLoading} />
            </div>

            <div className="panel">
                <h3>Chăm sóc da & Thư giãn</h3>
                <DataTable<DichVu> columns={dichVuColumns} data={dichVuCSDList} isLoading={isLoading} />
            </div>

            {/* DÙNG CHUNG MODAL CHO CẢ THÊM VÀ SỬA */}
            <Modal isOpen={modalType !== 'none'} onClose={() => setModalType('none')} title={modalType === 'add' ? "Thêm mới dịch vụ" : "Sửa thông tin dịch vụ"}>
                <form className="service-form" onSubmit={handleSubmitForm}>
                    {renderFormContent()}
                </form>
            </Modal>

            {/* Modal xóa */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Xác nhận Xóa">
                <p>Bạn có chắc chắn muốn xóa dịch vụ mã <strong>{idToDelete}</strong> không?</p><br />
                <button className="btn small delete" onClick={handleDeleteConfirm}><i className="fas fa-trash"></i> Xóa ngay</button>
            </Modal>
        </div>
    );
};

export default DichVuPage;