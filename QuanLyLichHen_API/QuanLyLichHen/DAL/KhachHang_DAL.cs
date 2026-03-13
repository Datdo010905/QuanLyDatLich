using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class KhachHang_DAL
    {
        private readonly DataBase_Connect db;

        public KhachHang_DAL(Microsoft.Extensions.Configuration.IConfiguration configuration)
        {
            db = new DataBase_Connect(configuration);
        }
        public DataTable GetAll()
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM KHACHHANG");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách khách hàng: " + ex.Message);
            }
        }
        public DataTable GetById(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM KHACHHANG WHERE MAKH = '" + ma + "' OR SDT = '" + ma + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi tìm khách hàng: " + ex.Message);
            }
        }
        public DataTable CheckSDT(string ma, string sdt)
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM KHACHHANG WHERE SDT = '" + sdt + "' AND MAKH != '" + ma + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi kiểm tra trùng số điện thoại: " + ex.Message);
            }
        }
        public DataTable Create(Models.KhachHang model)
        {
            try
            {
                DataTable dt = db.GetDataTable("INSERT INTO KHACHHANG VALUES ('" + model.MaKH.Trim() + "'," +
                                                                            "N'" + model.HoTen.Trim() + "'," +
                                                                            "'" + model.SDT.Trim() + "'," +
                                                                           "'" + model.MaTK.Trim() + "')");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thêm khách hàng: " + ex.Message);
            }
        }

        public DataTable Update(Models.KhachHang model)
        {
            try
            {
                DataTable dt = db.GetDataTable("UPDATE KHACHHANG SET HOTEN = N'" + model.HoTen.Trim() + "' " +
                                                                     ", SDT = '" + model.SDT.Trim() + "' " +
                                                                  "WHERE MAKH = '" + model.MaKH.Trim() + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thay đổi thông tin khách hàng: " + ex.Message);
            }
        }
        public DataTable Delete(Models.KhachHang model)
        {
            try
            {
                DataTable dt = db.GetDataTable("DELETE KHACHHANG WHERE MAKH = '" + model.MaKH.Trim() + "' OR SDT = '" + model.SDT.Trim() + "' ");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi xoá thông tin khách hàng: " + ex.Message);
            }
        }
    }
}
