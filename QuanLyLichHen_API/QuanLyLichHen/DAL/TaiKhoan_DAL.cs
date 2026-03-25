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
        private readonly DataBase_Connect db;

        public TaiKhoan_DAL(Microsoft.Extensions.Configuration.IConfiguration configuration)
        {
            db = new DataBase_Connect(configuration);
        }

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
        // Đăng nhập
        // Trả về 0 hoặc 1 bản ghi phù hợp với username/password
        public List<TaiKhoan> Login(string username, string password)
        {
            try
            {
                var list = new List<TaiKhoan>();
                string sql = @"
                    SELECT TOP 1 MATK, PASS, PHANQUYEN, TRANGTHAI
                    FROM TAIKHOAN
                    WHERE MATK = '" + username+ "' AND PASS = '"+password+"'";

                DataTable dt = db.GetDataTable(sql);
                foreach (DataRow row in dt.Rows)
                {
                    list.Add(new TaiKhoan
                    {
                        MaTK = row["MATK"].ToString().Trim(),
                        Pass = row["PASS"].ToString().Trim(),
                        PhanQuyen = row["PHANQUYEN"] == DBNull.Value ? 0 : Convert.ToInt32(row["PHANQUYEN"]),
                        TrangThai = row["TRANGTHAI"].ToString().Trim(),
                    });
                }

                return list;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi đăng nhập: " + ex.Message);
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
        public DataTable Delete(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("DELETE TAIKHOAN WHERE MATK = '" + ma + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi xoá thông tin tài khoản: " + ex.Message);
            }
        }

    }
}
