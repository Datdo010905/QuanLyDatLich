using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class ChiTietHoaDon
    {
        public string MaHD { get; set; }
        public string MaDV { get; set; }
        public int SoLuong { get; set; } = 1;
        public int DonGia { get; set; }
        public int ThanhTien { get; set; }
    }
}
