using DAL;
using Microsoft.Extensions.Configuration;
using Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class TaiKhoan_BLL
    {
        private readonly TaiKhoan_DAL _DAL;

        public TaiKhoan_BLL(IConfiguration configuration)
        {
            _DAL = new TaiKhoan_DAL(configuration);
        }

        public DataTable GetAll()
        {
            return _DAL.GetAll();
        }
        public DataTable GetByID(string ma)
        {
            return _DAL.GetById(ma);
        }
        
        public List<TaiKhoan> Login(string username, string pass)
        {
            return _DAL.Login(username, pass);
        }
        public DataTable Create(Models.TaiKhoan model)
        {
            return _DAL.Create(model);
        }
        public DataTable Update(Models.TaiKhoan model)
        {
            return _DAL.Update(model);
        }
        public DataTable Delete(string ma)
        {
            return _DAL.Delete(ma);
        }
    }
}
