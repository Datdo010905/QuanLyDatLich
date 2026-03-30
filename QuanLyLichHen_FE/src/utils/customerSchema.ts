//validate khách hàng
import { z } from 'zod';

export const customerSchema = z.object({
    cusID: z.string().min(1, { message: "Mã khách hàng không được để trống" }),
    cusName: z.string().min(1, { message: "Tên khách hàng không được để trống" }),
    cusPhone: z.string().min(1, { message: "Số điện thoại không được để trống" }),
    cusAcc: z.string().min(6, { message: "Tài khoản phải là số điện thoại" }),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;