using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class LichHen
    {
        public string MaLich { get; set; }
        public DateOnly NgayHen { get; set; }
        public TimeSpan GioHen { get; set; }
        public string TrangThai { get; set; }
        public string MaChiNhanh { get; set; }
        public string MaKH { get; set; }
    }
}
