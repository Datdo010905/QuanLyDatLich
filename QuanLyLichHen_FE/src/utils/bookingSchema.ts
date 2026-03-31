import { z } from 'zod';

export const BookingSchema = z.object({
    malich: z.string().min(1, { message: "Mã lịch không được để trống" }),
    ngayhen: z.string().min(1, { message: "Ngày hẹn không được để trống" }),
    giohen: z.string().min(1, { message: "Giờ hẹn không được để trống" }),
    trangthai: z.string().min(1, { message: "Trạng thái không được để trống" }),
    machinhanh: z.string().min(1, { message: "Mã chi nhánh không được để trống" }),
    makh: z.string().min(1, { message: "Mã khách hàng không được để trống" }),
});

export type BookingFormValue = z.infer<typeof BookingSchema>;