using Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class HoaDon_DAL
    {
        //DataBase_Connect db = new DataBase_Connect();
        private readonly DataBase_Connect db;

        public HoaDon_DAL(Microsoft.Extensions.Configuration.IConfiguration configuration)
        {
            db = new DataBase_Connect(configuration);
        }
        public DataTable GetAll()
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM HOADON");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách hoá đơn: " + ex.Message);
            }
        }
        public DataTable GetById(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM HOADON WHERE MAHD = '" + ma + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi tìm hoá đơn: " + ex.Message);
            }
        }
        public DataTable Create(Models.HoaDon model)
        {
            try
            {
                DataTable dt = db.GetDataTable("INSERT INTO HOADON VALUES ('" + model.MaHD.Trim() + "'," +
                                                                            "'" + model.MaKM.Trim() + "'," +
                                                                            "'" + model.TongTien + "'," +
                                                                            "N'" + model.HinhThucThanhToan.Trim() + "'," +
                                                                            "'" + model.MaNV.Trim() + "'," +
                                                                            "'" + model.MaLich.Trim() + "'," +
                                                                           "N'" + model.TrangThai.Trim() + "')");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thêm hoá đơn: " + ex.Message);
            }
        }

        public DataTable Update(Models.HoaDon model)
        {
            try
            {
                DataTable dt = db.GetDataTable("UPDATE HOADON SET TRANGTHAI = N'" + model.TrangThai.Trim() + "' " +
                                                                  "WHERE MAHD = '" + model.MaHD.Trim() + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thay đổi trạng thái hoá đơn: " + ex.Message);
            }
        }
        public DataTable Delete(Models.HoaDon model)
        {
            try
            {
                DataTable dt = db.GetDataTable("DELETE HOADON WHERE MAHD = '" + model.MaHD.Trim() + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi xoá thông tin hoá đơn: " + ex.Message);
            }
        }
    }
}
