using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ChiTietLichHen_DAL
    {
        private readonly DataBase_Connect db;

        public ChiTietLichHen_DAL(Microsoft.Extensions.Configuration.IConfiguration configuration)
        {
            db = new DataBase_Connect(configuration);
        }
        public DataTable GetAll()
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM CHITIETLICHHEN ");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy chi tiết lịch hẹn: " + ex.Message);
            }
        }
        public DataTable GetById(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM CHITIETLICHHEN WHERE MALICH = '" + ma.Trim() + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi tìm lịch hẹn: " + ex.Message);
            }
        }
        public DataTable Create(Models.ChiTietLichHen model)
        {
            try
            {
                DataTable dt = db.GetDataTable("INSERT INTO CHITIETLICHHEN VALUES ('" + model.MaLich.Trim() + "'," +
                                                                            "'" + model.MaDV.Trim() + "'," +
                                                                            "'" + model.SoLuong + "'," +
                                                                            "N'" + model.GhiChu.Trim() + "'," +
                                                                            "N'" + model.MaNV.Trim() + "'," +
                                                                            "N'" + model.GiaDuKien + "')");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thêm chi tiết lịch hẹn: " + ex.Message);
            }
        }
        public DataTable Update(string ma, string ghichu)
        {
            try
            {
                DataTable dt = db.GetDataTable("UPDATE CHITIETLICHHEN SET GHICHU = N'" + ghichu.Trim() + "' " +
                                                                  "WHERE MALICH = '" + ma.Trim() + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thay đổi ghi chú chi tiết lịch hẹn: " + ex.Message);
            }
        }
        public DataTable Delete(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("DELETE CHITIETLICHHEN WHERE MALICH = '" + ma.Trim() + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi xoá thông tin chi tiết lịch hẹn: " + ex.Message);
            }
        }
    }
}
