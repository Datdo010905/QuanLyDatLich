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
    public class ChiTietHoaDon_BLL
    {
        private readonly ChiTietHoaDon_DAL _DAL;

        public ChiTietHoaDon_BLL(IConfiguration configuration)
        {
            _DAL = new ChiTietHoaDon_DAL(configuration);
        }
        public DataTable GetAll()
        {
            return _DAL.GetAll();
        }
        public DataTable GetByID(string ma)
        {
            return _DAL.GetById(ma);
        }
        public DataTable Create(Models.ChiTietHoaDon model)
        {
            return _DAL.Create(model);
        }
        public DataTable Delete(string ma)
        {
            return _DAL.Delete(ma);
        }
    }
}
