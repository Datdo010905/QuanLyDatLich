import { z } from 'zod';

export const khuyenMaiSchema = z.object({
  promotionID: z.coerce.string().min(1, { message: "Mã khuyến mại không được để trống" }),
  promotionName: z.coerce.string().min(1, { message: "Tên chương trình không được để trống" }),
  
  promotionDesc: z.coerce.string().optional(), 
  
  promotionBD: z.coerce.string().min(1, { message: "Vui lòng chọn ngày bắt đầu" }),
  promotionKT: z.coerce.string().min(1, { message: "Vui lòng chọn ngày kết thúc" }),
  
  promotionValue: z.coerce.number().min(0, { message: "Khuyến mại nhỏ nhất là 0%" }),
});

export type KhuyenMaiFormValue = z.infer<typeof khuyenMaiSchema>;