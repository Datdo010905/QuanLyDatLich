import React, { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal";
import { useSearch } from '../../context/SearchContext';
import { toast } from 'react-toastify';
import DataTable, { Column } from '../../components/ui/DataTable';
import bookingApi, { Booking } from "../../api/bookingApi";
import { BookingSchema } from "../../utils/bookingSchema";

const BookingPage = () => {
    //khởi tạo state
    //Gộp state
    const [modalType, setModalType] = useState<'add' | 'edit' | 'none'>('none');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null); // Lưu ID cần xóa

    //State dùng chung cho tìm kiếm
    const { searchTerm } = useSearch();

    //Dữ liệu
    const [bookingList, setBookingList] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    //Form data và lỗi
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        bookingID: '',
        customerID: '',
        branchID: '',
        bookingDate: '',
        bookingTime: '',
        status: ''
    });
    const filteredBookingList = bookingList.filter(lichhen =>
        lichhen.malich?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lichhen.makh?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lichhen.machinhanh?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    //up data từ api lên bảng
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const resBooking = await bookingApi.getAll();

            setBookingList(resBooking.data.data);
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
            bookingID: '',
            customerID: '',
            branchID: '',
            bookingDate: '',
            bookingTime: '',
            status: ''
        });
        setFormErrors({}); // Xóa lỗi cũ
        setModalType('add');
    };
    //click nút sửa
    const handleEditClick = (row: Booking) => {
        setFormData({
            bookingID: row.malich || '',
            customerID: row.makh || '',
            branchID: row.machinhanh || '',
            bookingTime: row.giohen || '',
            bookingDate: row.ngayhen ? row.ngayhen.split('T')[0] : '',
            status: row.trangthai || ''
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
    const handleDeleteClick = (row: Booking) => {
        setIdToDelete(row.malich || null); // Lưu ID của nhân viên cần xóa
        setIsDeleteModalOpen(true);
    };
    //HÀM SUBMIT CHO CẢ THÊM VÀ SỬA
    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        //Kiểm tra dữ liệu với Zod
        const validationResult = BookingSchema.safeParse(formData);

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
        submitData.append('MaLich', formData.bookingID);
        submitData.append('NgayHen', formData.bookingDate);
        submitData.append('GioHen', formData.bookingTime);
        submitData.append('TrangThai', formData.status);
        submitData.append('MaChiNhanh', formData.branchID);
        submitData.append('MaKH', formData.customerID);


        try {
            if (modalType === 'add') {
                const checkExist = await bookingApi.getById(formData.bookingID);
                if (checkExist && checkExist.data.data) {
                    toast.error("Lịch hẹn đã tồn tại!");
                    return;
                }
                await Promise.all([
                    bookingApi.create(submitData)
                ]);
                toast.success("Thêm lịch hẹn thành công!");
            }
            else {
                await bookingApi.update(submitData);
                toast.success("Cập nhật lịch hẹn thành công!");
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
        try {
            //song song
            await Promise.all([
                bookingApi.delete(idToDelete)
            ]);
            toast.success("Xóa lịch hẹn thành công!");
            setIsDeleteModalOpen(false);
            fetchData(); // Load lại bảng
        } catch (error) {
            console.error("Lỗi xóa:", error);
            toast.error("Xóa thất bại!");
        }
    };
    const getChiNhanhName = (branchCode: string) => {
        switch (branchCode) {
            case "CN001": return "30Shine - Nguyễn Trãi";
            case "CN002": return "30Shine - Cầu Giấy";
            case "CN003": return "30Shine - Tân Bình";
            case "CN004": return "30Shine - Đà Nẵng";
            default: return "Không xác định";
        }
    };
    const branchStyles: Record<string, React.CSSProperties> = {
        "CN001": { backgroundColor: '#fff1f0', color: '#f5222d' },
        "CN002": { backgroundColor: '#e6f7ff', color: '#1890ff' },
        "CN003": { backgroundColor: '#f6ffed', color: '#52c41a' },
        "CN004": { backgroundColor: '#fff7e6', color: '#fa8c16' },
    };
    //Định nghĩa cột cho DataTable theo api trả về
    const staffColumns: Column<Booking>[] = [
        { tieude: "ID", cotnhandulieu: "malich" },
        { tieude: "Ngày hẹn", cotnhandulieu: "ngayhen" },
        { tieude: "Giờ hẹn", cotnhandulieu: "giohen" },
        { tieude: "Trạng thái", cotnhandulieu: "trangthai" },
        {
            tieude: "Chi nhánh", cotnhandulieu: "machinhanh", render: (row) => {
                const style = branchStyles[row.machinhanh || ''] || {};
                return (
                    <span style={style}>
                        {getChiNhanhName(row.machinhanh || '')}
                    </span>
                );
            }

        },
        { tieude: "Khách hàng", cotnhandulieu: "makh" },

        {
            tieude: "Hành động", cotnhandulieu: "malich", render: (row) => (
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
            
            <button type="submit" className="btn primary">{modalType === 'add' ? 'Lưu mới' : 'Cập nhật'}</button>
        </>
    );
    return (
        <>
            
        </>
    );
};

export default BookingPage;