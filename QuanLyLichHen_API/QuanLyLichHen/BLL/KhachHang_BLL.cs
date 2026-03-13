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
    public class KhachHang_BLL
    {
        private readonly KhachHang_DAL _DAL;

        public KhachHang_BLL(IConfiguration configuration)
        {
            _DAL = new KhachHang_DAL(configuration);
        }
        public DataTable GetAll()
        {
            return _DAL.GetAll();
        }
        public DataTable GetByID(string ma)
        {
            return _DAL.GetById(ma);
        }
        public DataTable CheckSDT(string ma, string sdt)
        {
            return _DAL.CheckSDT(ma, sdt);
        }
        public DataTable Create(Models.KhachHang model)
        {
            return _DAL.Create(model);
        }
        public DataTable Update(Models.KhachHang model)
        {
            return _DAL.Update(model);
        }
        public DataTable Delete(Models.KhachHang model)
        {
            return _DAL.Delete(model);
        }
    }
}
