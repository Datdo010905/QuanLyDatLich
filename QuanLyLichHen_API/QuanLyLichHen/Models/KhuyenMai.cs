using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class KhuyenMai
    {
        public string MaKM { get; set; }
        public string TenKM { get; set; }
        public string MoTa { get; set; }
        public DateTime NgayBD { get; set; }
        public DateTime NgayKT { get; set; }
        public double? GiaTri { get; set; }
        public string TrangThai { get; set; }
    }
}
