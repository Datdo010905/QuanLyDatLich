
import React, { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal";
import { useSearch } from '../../context/SearchContext';
import { toast } from 'react-toastify';
import DataTable, { Column } from '../../components/ui/DataTable';
import customerApi, { Customer } from "../../api/customerApi";
import taikhoanApi, { TaiKhoan } from "../../api/taikhoanApi";
import { customerSchema } from "../../utils/customerSchema";

const CustomerPage: React.FC = () => {
    //khởi tạo state
    //Gộp state
    const [modalType, setModalType] = useState<'add' | 'edit' | 'none'>('none');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null); // Lưu ID cần xóa
    const [sdtToDelete, setSdtToDelete] = useState<string | null>(null); // Lưu SĐT cần xóa (cho tài khoản)

    //State dùng chung cho tìm kiếm
    const { searchTerm } = useSearch();

    //Dữ liệu khách hàng
    const [customerList, setCustomerList] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    //Form data và lỗi
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        cusID: '',
        cusName: '',
        cusPhone: '',
        cusAcc: ''
    });
    const filteredCustomerList = customerList.filter(customer =>
        customer.makh?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.matk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.sdt?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //up data từ api lên bảng
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const resCustomer = await customerApi.getAll();

            setCustomerList(resCustomer.data.data);
        } catch (err) {
            setError("Không thể tải dữ liệu từ máy chủ.");
        } finally {
            setIsLoading(false);
        }
    };
    // Tải dữ liệu khi component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Chuẩn bị form rỗng khi Thêm 
    const handleOpenAdd = () => {
        setFormData({
            cusID: '',
            cusName: '',
            cusPhone: '',
            cusAcc: ''
        });
        setFormErrors({}); // Xóa lỗi cũ
        setModalType('add');
    };

    //click nút sửa
    const handleEditClick = (row: Customer) => {
        setFormData({
            cusID: row.makh || '',
            cusName: row.hoten || '',
            cusPhone: row.sdt || '',
            cusAcc: row.matk || ''
        });
        setFormErrors({}); // Xóa lỗi cũ
        setModalType('edit');
    };
    //xử lý thay đổi form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        // Cập nhật dữ liệu người dùng nhập vào formData
        setFormData((prev) => ({ ...prev, [id]: value }));

        //Tự động xóa lỗi của chính field đang được gõ
        if (formErrors[id]) {
            setFormErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[id]; // Xóa thông báo lỗi của field này
                return newErrors;
            });
        }
    };
    const handleDeleteClick = (row: Customer) => {
        setIdToDelete(row.makh || null); // Lưu ID của khách hàng cần xóa
        setSdtToDelete(row.sdt || null); // Lưu SĐT của khách hàng cần xóa
        setIsDeleteModalOpen(true);
    };
    //HÀM SUBMIT CHO CẢ THÊM VÀ SỬA
    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        //Kiểm tra dữ liệu với Zod
        const validationResult = customerSchema.safeParse(formData);

        //có lỗi
        if (!validationResult.success) {
            const fieldErrors = validationResult.error.flatten().fieldErrors;
            const newErrors: Record<string, string> = {};

            // Lấy thông báo lỗi đầu tiên của mỗi trường
            for (const key in fieldErrors) {
                newErrors[key] = fieldErrors[key as keyof typeof fieldErrors]?.[0] || '';
            }

            setFormErrors(newErrors);
            return; // Dừng hàm lại, không gọi API
        }
        //hợp lệ
        setFormErrors({});

        //tạo FormData theo swagger
        const submitData = new FormData();
        submitData.append('MaKH', formData.cusPhone);
        submitData.append('HoTen', formData.cusName);
        submitData.append('SDT', formData.cusPhone);
        submitData.append('MaTK', formData.cusPhone);

        const submitDataTK = new FormData();
        submitDataTK.append('MaTK', formData.cusPhone);
        submitDataTK.append('Pass', formData.cusPhone);
        submitDataTK.append('PhanQuyen', "0");
        submitDataTK.append('TrangThai', "Hoạt động");

        try {
            if (modalType === 'add') {
                const ex = await customerApi.getById(formData.cusPhone);
                if (ex && ex.data.data) {
                    toast.error("Khách hàng đã tồn tại!");
                    return;
                }
                const checkExistTK = await taikhoanApi.getById(formData.cusPhone);
                if (checkExistTK && checkExistTK.data.data) {
                    toast.error("Tài khoản đã tồn tại!");
                    return;
                }
                await Promise.all([
                    taikhoanApi.create(submitDataTK),
                    customerApi.create(submitData)
                ]);
                toast.success("Thêm khách hàng thành công!");
            } else {
                await customerApi.update(submitData);
                toast.success("Cập nhật khách hàng thành công!");
            }
            setModalType('none'); // Đóng form
            fetchData(); // Tải lại dữ liệu
        } catch (error) {
            console.error("Lỗi:", error);
            toast.error("Thao tác thất bại, vui lòng kiểm tra lại!");

        }
    };
    // xoá
    const handleDeleteConfirm = async () => {
        if (!idToDelete) return;
        if (!sdtToDelete) return;
        try {
            //song song
            await Promise.all([
                taikhoanApi.delete(sdtToDelete),
                customerApi.delete(idToDelete)
            ]);
            toast.success("Xóa khách hàng thành công!");
            setIsDeleteModalOpen(false);
            fetchData(); // Load lại bảng
        } catch (error) {
            console.error("Lỗi xóa:", error);
            toast.error("Xóa thất bại!");
        }
    };
    //Định nghĩa cột cho DataTable theo api trả về
    const customerColumns: Column<Customer>[] = [
        { tieude: "ID", cotnhandulieu: "makh" },
        { tieude: "Họ tên", cotnhandulieu: "hoten", render: (row) => row.hoten },
        { tieude: "SĐT", cotnhandulieu: "sdt" },
        { tieude: "Tài khoản", cotnhandulieu: "matk" },
        {
            tieude: "Hành động", cotnhandulieu: "makh", render: (row) => (
                <>
                    <button className="btn small edit" onClick={() => handleEditClick(row)}><i className="fas fa-edit"></i></button>
                    <button
                        className="btn small delete"
                        onClick={() => handleDeleteClick(row)}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </>
            )
        },
    ];

    //HÀM RENDER FORM CHUNG CHO CẢ THÊM VÀ SỬA
    const renderFormContent = () => (
        <>
            <div hidden={modalType === 'add'} className="form-group">
                <label htmlFor="cusID">Mã khách hàng:</label>
                <input
                    type="text"
                    id="cusID"
                    placeholder="Nhập mã khách hàng..."
                    value={formData.cusID}
                    onChange={handleChange}
                    disabled={modalType === 'edit'}
                    
                />
            </div>

            <div className="form-group">
                <label htmlFor="cusName">Họ và tên:</label>
                <input
                    type="text"
                    id="cusName"
                    placeholder="Nhập họ tên..."
                    value={formData.cusName}
                    onChange={handleChange}
                />
                {formErrors.cusName && <span style={{ color: 'red', fontSize: '0.85rem' }}>{formErrors.cusName}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="cusPhone">Số điện thoại:</label>
                <input
                    type="text"
                    id="cusPhone"
                    maxLength={10}
                    placeholder="Nhập số điện thoại..."
                    value={formData.cusPhone}
                    disabled={modalType === 'edit'}
                    onChange={(e) => {

                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                        handleChange(e);
                    }}
                />
                {formErrors.cusPhone && <span style={{ color: 'red', fontSize: '0.85rem' }}>{formErrors.cusPhone}</span>}
            </div>


            <div hidden={modalType === 'add'} className="form-group">
                <label  htmlFor="cusAcc">Tài khoản:</label>
                <input
                    type="text"
                    id="cusAcc"
                    placeholder="Nhập mã tài khoản..."
                    value={formData.cusAcc}
                    disabled={modalType === 'edit'}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn primary">{modalType === 'add' ? 'Lưu mới' : 'Cập nhật'}</button>
        </>
    );

    return (
        <>
            <div id="accounts" className="section">
                <div className="panel header-actions">
                    <h2>Khách hàng</h2>
                    <button className="btn primary" onClick={handleOpenAdd}>Thêm khách hàng</button>
                </div>
                <div className="panel">
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <DataTable<Customer> columns={customerColumns} data={filteredCustomerList} isLoading={isLoading} />
                </div>
                {/* DÙNG CHUNG MODAL CHO CẢ THÊM VÀ SỬA */}
                <Modal isOpen={modalType !== 'none'} onClose={() => setModalType('none')} title={modalType === 'add' ? "Thêm mới khách hàng" : "Sửa thông tin khách hàng"}>
                    <form className="service-form" onSubmit={handleSubmitForm}>
                        {renderFormContent()}
                    </form>
                </Modal>

                {/* Modal xóa */}
                <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Xác nhận Xóa">
                    <p>Bạn có chắc chắn muốn xóa khách hàng <strong>{idToDelete}</strong> không?</p><br />
                    <button className="btn small delete" onClick={handleDeleteConfirm}><i className="fas fa-trash"></i> Xóa ngay</button>
                </Modal>
            </div>
        </>
    );
};

export default CustomerPage;