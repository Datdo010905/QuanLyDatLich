using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class ChiTietLichHen
    {
        public string MaLich { get; set; }
        public string MaDV { get; set; }
        public string MaNV { get; set; } // Nhân viên thực hiện dịch vụ này
        public int SoLuong { get; set; } = 1;
        public int GiaDuKien { get; set; } // Đổi tiền tệ sang int
        public string GhiChu { get; set; }
    }
}
