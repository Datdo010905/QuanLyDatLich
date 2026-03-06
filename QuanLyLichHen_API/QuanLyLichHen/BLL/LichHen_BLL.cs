using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class LichHen_BLL
    {
        LichHen_DAL _DAL = new DAL.LichHen_DAL();
        public DataTable GetAll()
        {
            return _DAL.GetAll();
        }
        public DataTable GetByID(string ma)
        {
            return _DAL.GetById(ma);
        }
        public DataTable GetAllByIdNV(string maNV)
        {
            return _DAL.GetAllByIdNV(maNV);
        }
        public DataTable Create(Models.LichHen model)
        {
            return _DAL.Create(model);
        }
        public DataTable Update(Models.LichHen model)
        {
            return _DAL.Update(model);
        }
        public DataTable Delete(Models.LichHen model)
        {
            return _DAL.Delete(model);
        }
    }
}
