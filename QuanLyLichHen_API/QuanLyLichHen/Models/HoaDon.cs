using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class HoaDon
    {
        public string MaHD { get; set; }
        public string MaKH { get; set; } 
        public string? MaKM { get; set; }
        public string? MaLich { get; set; } // Sẽ null nếu là khách Walk-in
        public string MaNV { get; set; } // Nhân viên thu ngân/lập hóa đơn
        public int TongTien { get; set; } 
        public string HinhThucThanhToan { get; set; }
        public string TrangThai { get; set; }
    }
}
