import { z } from 'zod';

export const HoadonSchema = z.object({
    hoadonID: z.string().min(1, { message: "Mã hóa đơn không được để trống" }),
    khachhangID: z.string().min(1, { message: "Khách hàng không được để trống" }),
    khuyenmaiID: z.string().optional(),
    bookingID: z.string().min(1, { message: "Mã lịch không được để trống" }),
    nhanvienID: z.string().min(1, { message: "Thu ngân không được để trống" }),
    sum: z.string().min(1, { message: "Tổng tiền không được để trống" }),
    methodPayment: z.string().min(1, { message: "Phương thức thanh toán không được để trống" }),
    status: z.string().min(1, { message: "Trạng thái không được để trống" }),
    branchID: z.string().min(1, {message: "Hãy chọn chi nhánh khách vãng lai dùng dịch vụ"})
});

export type HoadonFormValue = z.infer<typeof HoadonSchema>;