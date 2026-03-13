using DAL;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class NhanVien_BLL
    {
        private readonly NhanVien_DAL _DAL;

        public NhanVien_BLL(IConfiguration configuration)
        {
            _DAL = new NhanVien_DAL(configuration);
        }

        public DataTable GetAll()
        {
            return _DAL.GetAll();
        }
        public DataTable GetByID(string ma)
        {
            return _DAL.GetById(ma);
        }
        public DataTable CheckAcc(string ma, string matk)
        {
            return _DAL.CheckAcc(ma, matk);
        }
        public DataTable CheckSDT(string ma, string sdt)
        {
            return _DAL.CheckSDT(ma, sdt);
        }
        public DataTable Create(Models.NhanVien model)
        {
            return _DAL.Create(model);
        }
        public DataTable Update(Models.NhanVien model)
        {
            return _DAL.Update(model);
        }
        public DataTable Delete(Models.NhanVien model)
        {
            return _DAL.Delete(model);
        }
    }
}
