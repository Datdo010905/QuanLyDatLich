using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class ChiTietLichHen_BLL
    {
        ChiTietLichHen_DAL _DAL = new DAL.ChiTietLichHen_DAL();
        public DataTable GetById(string ma)
        {
            return _DAL.GetById(ma);
        }
        public DataTable Create(Models.ChiTietLichHen model)
        {
            return _DAL.Create(model);
        }
        public DataTable Delete(Models.ChiTietLichHen model)
        {
            return _DAL.Delete(model);
        }
    }
}
