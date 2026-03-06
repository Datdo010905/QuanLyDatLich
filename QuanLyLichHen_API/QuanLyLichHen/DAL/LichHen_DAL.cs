using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class LichHen_DAL
    {
        DataBase_Connect db = new DataBase_Connect();
        public DataTable GetAll()
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM LICHHEN");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách lịch hẹn: " + ex.Message);
            }
        }
        public DataTable GetAllByIdNV(string manv)
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM LICHHEN WHERE MANV = '"+manv+"'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách lịch hẹn theo mã nhân viên: " + ex.Message);
            }
        }
        public DataTable GetById(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM LICHHEN L INNER JOIN KHACHHANG K ON K.MAKH = L.MAKH WHERE MALICH = '" + ma + "' OR K.SDT = '"+ma+"'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi tìm lịch hẹn: " + ex.Message);
            }
        }
        public DataTable Create(Models.LichHen model)
        {
            try
            {
                DataTable dt = db.GetDataTable("INSERT INTO LICHHEN VALUES ('" + model.MaLich.Trim() + "'," +
                                                                            "'" + model.NgayHen + "'," +
                                                                            "'" + model.GioHen + "'," +
                                                                            "N'" + model.TrangThai.Trim() + "'," +
                                                                            "'" + model.MaNV.Trim() + "'," +
                                                                            "'" + model.MaKH.Trim() + "'," +
                                                                           "N'" + model.MaChiNhanh.Trim() + "')");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thêm lịch hẹn: " + ex.Message);
            }
        }

        public DataTable Update(Models.LichHen model)
        {
            try
            {
                DataTable dt = db.GetDataTable("UPDATE LICHHEN SET TRANGTHAI = N'" + model.TrangThai.Trim() + "' " +
                                                                  "WHERE MALICH = '" + model.MaLich.Trim() + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thay đổi trạng thái lịch hẹn: " + ex.Message);
            }
        }
        public DataTable Delete(Models.LichHen model)
        {
            try
            {
                DataTable dt = db.GetDataTable("DELETE LICHHEN WHERE MALICH = '" + model.MaLich.Trim() + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi xoá thông tin lịch hẹn: " + ex.Message);
            }
        }
    }
}
