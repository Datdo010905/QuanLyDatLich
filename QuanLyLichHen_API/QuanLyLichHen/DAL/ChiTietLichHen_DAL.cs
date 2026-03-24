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
        public DataTable GetById(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM CHITIETLICHHEN WHERE MALICH = '" + ma + "'");
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
                                                                            "N'" + model.GhiChu.Trim() + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thêm chi tiết lịch hẹn: " + ex.Message);
            }
        }
        public DataTable Delete(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("DELETE CHITIETLICHHEN WHERE MALICH = '" + ma + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi xoá thông tin chi tiết lịch hẹn: " + ex.Message);
            }
        }
    }
}
