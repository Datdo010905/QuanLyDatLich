using Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class NhanVien_DAL
    {
        DataBase_Connect db = new DataBase_Connect();
        public DataTable GetAll()
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM NHANVIEN");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh sách nhân viên: " + ex.Message);
            }
        }
        public DataTable GetById(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM NHANVIEN WHERE MANV = '" + ma + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi tìm nhân viên: " + ex.Message);
            }
        }
        public DataTable CheckAcc(string manv, string matk)
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM NHANVIEN WHERE MATK = '" + matk + "' AND MANV != '" + manv + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi kiểm tra trùng tài khoản: " + ex.Message);
            }
        }
        public DataTable CheckSDT(string manv, string sdt)
        {
            try
            {
                DataTable dt = db.GetDataTable("SELECT * FROM NHANVIEN WHERE SDT = '" + sdt + "' AND MANV != '" + manv + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi kiểm tra trùng số điện thoại: " + ex.Message);
            }
        }
        public DataTable Create(Models.NhanVien model)
        {
            string ngaysinh = model.NgaySinh.ToString("yyyy-MM-dd");

            try
            {
                DataTable dt = db.GetDataTable("INSERT INTO NHANVIEN VALUES ('" + model.MaNV.Trim() + "'," +
                                                                            "N'" + model.HoTen.Trim() + "'," +
                                                                            "N'" + model.ChucVu.Trim() + "'," +
                                                                            "'" + model.SDT.Trim() + "'," +
                                                                            "N'" + model.DiaChi.Trim() + "'," +
                                                                            "'" + model.MaChiNhanh.Trim() + "'," +
                                                                            "'" + ngaysinh + "'," +
                                                                           "'" + model.MaTK.Trim() + "')");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thêm nhân viên: " + ex.Message);
            }
        }

        public DataTable Update(Models.NhanVien model)
        {
            string ngaysinh = string.Format("{0}/{1}/{2}", model.NgaySinh.Year, model.NgaySinh.Month, model.NgaySinh.Day);
            try
            {
                DataTable dt = db.GetDataTable("UPDATE NHANVIEN SET HOTEN = N'" + model.HoTen.Trim() + "' " +
                                                                     ", CHUCVU = N'" + model.ChucVu.Trim() + "' " +
                                                                     ", SDT = '" + model.SDT.Trim() + "' " +
                                                                     ", DIACHI = N'" + model.DiaChi.Trim() + "' " +
                                                                     ", NGAYSINH = '" + ngaysinh + "' " +
                                                                     ", MATK = '" + model.MaTK.Trim() + "' " +
                                                                     ", MACHINHANH = '" + model.MaChiNhanh.Trim() + "' " +
                                                                  "WHERE MANV = '" + model.MaNV.Trim() + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi thay đổi thông tin nhân viên: " + ex.Message);
            }
        }
        public DataTable Delete(Models.NhanVien model)
        {
            try
            {
                DataTable dt = db.GetDataTable("DELETE NHANVIEN WHERE MANV = '" + model.MaNV.Trim() + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi xoá thông tin nhân viên: " + ex.Message);
            }
        }
    }
}
