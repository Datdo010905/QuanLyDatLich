using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ChiTietHoaDon_DAL
    {
        private readonly DataBase_Connect db;

        public ChiTietHoaDon_DAL(Microsoft.Extensions.Configuration.IConfiguration configuration)
        {
            db = new DataBase_Connect(configuration);
        }
        public DataTable GetAll()
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM CHITIETHOADON");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách chi tiết hoá đơn: " + ex.Message);
            }
        }
        public DataTable GetById(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM CHITIETHOADON WHERE MAHD = '" + ma + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi tìm chi tiết hoá đơn: " + ex.Message);
            }
        }
        public DataTable Create(Models.ChiTietHoaDon model)
        {
            try
            {
                DataTable dt = db.GetDataTable("INSERT INTO CHITIETHOADON VALUES ('" + model.MaHD.Trim() + "'," +
                                                                            "'" + model.MaDV.Trim() + "'," +
                                                                            "'" + model.SoLuong + "'," +
                                                                            "'" + model.DonGia+ "'," +
                                                                          "N'" + model.ThanhTien + "')" +
                                                                           "");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thêm hoá đơn: " + ex.Message);
            }
        }
        public DataTable Delete(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("DELETE CHITIETHOADON WHERE MAHD = '" + ma + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi xoá thông tin hoá đơn: " + ex.Message);
            }
        }
    }
}
