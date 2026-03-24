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
    public class HoaDon_BLL
    {
        //HoaDon_DAL _DAL = new HoaDon_DAL();
        private readonly HoaDon_DAL _DAL;

        public HoaDon_BLL(IConfiguration configuration)
        {
            _DAL = new HoaDon_DAL(configuration);
        }
        public DataTable GetAll()
        {
            return _DAL.GetAll();
        }
        public DataTable GetByID(string ma)
        {
            return _DAL.GetById(ma);
        }
        public DataTable Create(Models.HoaDon model)
        {
            return _DAL.Create(model);
        }
        public DataTable Update(Models.HoaDon model)
        {
            return _DAL.Update(model);
        }
        public DataTable Delete(string ma)
        {
            return _DAL.Delete(ma);
        }
    }
}
