using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class KhuyenMai_DAL
    {
        //DataBase_Connect db = new DataBase_Connect();
        private readonly DataBase_Connect db;

        public KhuyenMai_DAL(IConfiguration configuration)
        {
            db = new DataBase_Connect(configuration);
        }
        public DataTable GetAll()
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM KHUYENMAI");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách khuyến mại: " + ex.Message);
            }
        }
        public DataTable GetById(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM KHUYENMAI WHERE MAKM = '" + ma + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi tìm khuyến mại: " + ex.Message);
            }
        }

        public DataTable Create(Models.KhuyenMai model)
        {
            string ngaybd = model.NgayBD.ToString("yyyy-MM-dd");
            string ngaykt = model.NgayKT.ToString("yyyy-MM-dd");

            try
            {
                DataTable dt = db.GetDataTable("INSERT INTO KHUYENMAI VALUES ('" + model.MaKM.Trim() + "'," +
                                                                            "N'" + model.TenKM.Trim() + "'," +
                                                                            "N'" + model.MoTa.Trim() + "'," +
                                                                           "'" + ngaybd + "'," +
                                                                           "'" + ngaykt + "'," +
                                                                           "'" + model.GiaTri + "'," +
                                                                           "N'" + model.TrangThai.Trim() + "'" +
                                                                           ")");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thêm khuyến mại: " + ex.Message);
            }
        }

        public DataTable Update(Models.KhuyenMai model)
        {
            string ngaybd = model.NgayBD.ToString("yyyy-MM-dd");
            string ngaykt = model.NgayKT.ToString("yyyy-MM-dd");

            try
            {
                DataTable dt = db.GetDataTable("UPDATE KHUYENMAI SET TENKM = N'" + model.TenKM.Trim() + "' " +
                                                                     ", MOTA = N'" + model.MoTa.Trim() + "' " +
                                                                     ", NGAYBD = '" + ngaybd + "' " +
                                                                     ", NGAYKT = '" + ngaykt + "' " +
                                                                     ", GIATRI = N'" + model.GiaTri + "' " +
                                                                     ", TRANGTHAI = N'" + model.TrangThai.Trim() + "' " +
                                                                  "WHERE MAKM = '" + model.MaKM.Trim() + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thay đổi thông tin khuyến mại: " + ex.Message);
            }
        }
        public DataTable Delete(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("DELETE KHUYENMAI WHERE MAKM = '" + ma + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi xoá thông tin khuyến mại: " + ex.Message);
            }
        }
    }
}
