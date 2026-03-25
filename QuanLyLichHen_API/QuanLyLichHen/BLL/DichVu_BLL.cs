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
    public class DichVu_BLL
    {
        private readonly DichVu_DAL _DAL;

        public DichVu_BLL(IConfiguration configuration)
        {
            _DAL = new DichVu_DAL(configuration);
        }
        public DataTable GetAllToc()
        {
            return _DAL.GetAllToc();
        }
        public DataTable GetAllCSD()
        {
            return _DAL.GetAllCSD();
        }
        public DataTable GetAllTocCungCap()
        {
            return _DAL.GetAllTocCungCap();
        }
        public DataTable GetAllCSDCungCap()
        {
            return _DAL.GetAllCSDCungCap();
        }
        public DataTable GetByID(string ma)
        {
            return _DAL.GetById(ma);
        }
        public DataTable Create(Models.DichVu model)
        {
            return _DAL.Create(model);
        }
        public DataTable Update(Models.DichVu model)
        {
            return _DAL.Update(model);
        }
        public DataTable Delete(string ma)
        {
            return _DAL.Delete(ma);
        }
    }
}
