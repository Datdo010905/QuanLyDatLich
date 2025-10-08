using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace DAL
{
    public class TaiKhoan_DAL
    {
        DataBase_Connect db = new DataBase_Connect();

        public DataTable GetAll()
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM TAIKHOAN");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách tài khoản: " + ex.Message);
            }
        }
        public DataTable GetById(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM TAIKHOAN WHERE MATK = '"+ ma +"'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi tìm tài khoản: " + ex.Message);
            }
        }

        public DataTable Create(Models.TaiKhoan model)
        {
            try
            {
                DataTable dt = db.GetDataTable("INSERT INTO TAIKHOAN VALUES ('"+model.MaTK.Trim()+"',"+
                                                                            "'"+model.Pass.Trim()+"',"+
                                                                            "'"+model.PhanQuyen+"',"+
                                                                           "N'"+model.TrangThai.Trim()+"')");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thêm tài khoản: " + ex.Message);
            }
        }

        public DataTable Update(Models.TaiKhoan model)
        {
            try
            {
                DataTable dt = db.GetDataTable("UPDATE TAIKHOAN SET PASS = '" + model.Pass.Trim() + "'," +
                                                                  "PHANQUYEN = '" + model.PhanQuyen + "'," +
                                                                  "TRANGTHAI = N'" + model.TrangThai.Trim() + "' " +
                                                                  "WHERE MATK = '" + model.MaTK.Trim() + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thay đổi thông tin tài khoản: " + ex.Message);
            }
        }
        
    }
}
