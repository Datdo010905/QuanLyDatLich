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
    public class ChiTietLichHen_BLL
    {
        private readonly ChiTietLichHen_DAL _DAL;

        public ChiTietLichHen_BLL(IConfiguration configuration)
        {
            _DAL = new ChiTietLichHen_DAL(configuration);
        }
        public DataTable GetById(string ma)
        {
            return _DAL.GetById(ma);
        }
        public DataTable Create(Models.ChiTietLichHen model)
        {
            return _DAL.Create(model);
        }
        public DataTable Delete(string ma)
        {
            return _DAL.Delete(ma);
        }
    }
}
