using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Models;

namespace BLL
{
    public class TaiKhoan_BLL
    {
        TaiKhoan_DAL _DAL = new TaiKhoan_DAL();

        public DataTable GetAll()
        {
            return _DAL.GetAll();
        }
        public DataTable GetByID(string ma)
        {
            return _DAL.GetById(ma);
        }
        public DataTable DangNhap(string username, string pass)
        {
            return _DAL.DangNhap(username, pass);
        }
        public DataTable Create(Models.TaiKhoan model)
        {
            return _DAL.Create(model);
        }
        public DataTable Update(Models.TaiKhoan model)
        {
            return _DAL.Update(model);
        }
        public DataTable Delete(Models.TaiKhoan model)
        {
            return _DAL.Delete(model);
        }
    }
}
