using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class TaiKhoan
    {
        public string MaTK { get; set; }
        public string Pass { get; set; }
        public int PhanQuyen { get; set; }  // 0: Khách, 1: Nhân viên, 2: Admin
        public string TrangThai { get; set; }
    }
}
