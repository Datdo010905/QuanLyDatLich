using DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class KhuyenMai_BLL
    {
        KhuyenMai_DAL _DAL = new KhuyenMai_DAL();
        public DataTable GetAll()
        {
            return _DAL.GetAll();
        }
        public DataTable GetByID(string ma)
        {
            return _DAL.GetById(ma);
        }
        public DataTable Create(Models.KhuyenMai model)
        {
            return _DAL.Create(model);
        }
        public DataTable Update(Models.KhuyenMai model)
        {
            return _DAL.Update(model);
        }
        public DataTable Delete(Models.KhuyenMai model)
        {
            return _DAL.Delete(model);
        }
    }
}
