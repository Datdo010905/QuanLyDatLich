using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class DichVu
    {
        public string MaDV { get; set; }
        public string TenDV { get; set; }
        public string MoTa { get; set; }
        public int ThoiGian { get; set; } // phút
        public double GiaDV { get; set; }
        public string TrangThai { get; set; }
        public string HinhAnh { get; set; }
        public string QuyTrinh { get; set; }
    }
}
