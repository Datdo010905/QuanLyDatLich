using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DichVu_DAL
    {
        private readonly DataBase_Connect db;

        public DichVu_DAL(Microsoft.Extensions.Configuration.IConfiguration configuration)
        {
            db = new DataBase_Connect(configuration);
        }
        public DataTable GetAllToc()
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM DICHVU WHERE LOAI = 'CT'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách dịch vụ: " + ex.Message);
            }
        }
        public DataTable GetAllCSD()
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM DICHVU WHERE LOAI = 'CSD'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách dịch vụ: " + ex.Message);
            }
        }
        public DataTable GetAllTocCungCap()
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM DICHVU WHERE LOAI = 'CT' AND TRANGTHAI = N'Đang cung cấp'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách dịch vụ: " + ex.Message);
            }
        }
        public DataTable GetAllCSDCungCap()
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM DICHVU WHERE LOAI = 'CSD' AND TRANGTHAI = N'Đang cung cấp'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách dịch vụ: " + ex.Message);
            }
        }
        public DataTable GetById(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM DICHVU WHERE MADV = '" + ma + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi tìm dịch vụ: " + ex.Message);
            }
        }
       
        public DataTable Create(Models.DichVu model)
        {
            try
            {
                DataTable dt = db.GetDataTable("INSERT INTO DICHVU VALUES ('" + model.MaDV.Trim() + "'," +
                                                                            "N'" + model.Loai.Trim() + "'," +
                                                                            "N'" + model.TenDV.Trim() + "'," +
                                                                            "N'" + model.MoTa.Trim() + "'," +
                                                                           "'" + model.ThoiGian + "'," +
                                                                           "'" + model.GiaDV + "'," +
                                                                           "N'" + model.TrangThai.Trim() + "'," +
                                                                           "'" + model.HinhAnh.Trim() + "'," +
                                                                           "N'" + model.QuyTrinh.Trim() + "'" +
                                                                           ")");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thêm dịch vụ: " + ex.Message);
            }
        }

        public DataTable Update(Models.DichVu model)
        {
            try
            {
                DataTable dt = db.GetDataTable("UPDATE DICHVU SET TENDV = N'" + model.TenDV.Trim() + "' " +
                                                                     ", LOAI = N'" + model.Loai.Trim() + "' " +
                                                                     ", MOTA = N'" + model.MoTa.Trim() + "' " +
                                                                     ", THOIGIAN = '" + model.ThoiGian + "' " +
                                                                     ", GIADV = '" + model.GiaDV+ "' " +
                                                                     ", TRANGTHAI = N'" + model.TrangThai.Trim() + "' " +
                                                                     ", HINH = N'" + model.HinhAnh.Trim() + "' " +
                                                                     ", QUYTRINH = N'" + model.QuyTrinh.Trim() + "' " +
                                                                  "WHERE MADV = '" + model.MaDV.Trim() + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thay đổi thông tin dịch vụ: " + ex.Message);
            }
        }
        public DataTable Delete(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("DELETE DICHVU WHERE MADV = '" + ma + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi xoá thông tin dịch vụ: " + ex.Message);
            }
        }
    }
}
