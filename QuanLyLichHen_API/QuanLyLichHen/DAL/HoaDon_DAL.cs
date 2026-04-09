using Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
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
                string maKHSql = string.IsNullOrEmpty(model.MaKH) ? "NULL" : $"'{model.MaKH.Trim()}'";
                string maLichSql = string.IsNullOrEmpty(model.MaLich) ? "NULL" : $"'{model.MaLich.Trim()}'";
                string maKMSql = string.IsNullOrEmpty(model.MaKM) ? "NULL" : $"'{model.MaKM.Trim()}'";
                string ngayTT = $"'{model.NgayTT:yyyy-MM-dd}'";

                string query = $@"INSERT INTO HOADON (MAHD, MAKH, MALICH, MAKM, MANV, TRANGTHAI, TONGTIEN, HINHTHUCTHANHTOAN, NGAYTHANHTOAN)
                          VALUES (
                            '{model.MaHD?.Trim()}',
                            {maKHSql},
                            {maLichSql},
                            {maKMSql},
                            '{model.MaNV?.Trim()}',
                            N'{model.TrangThai?.Trim()}',
                            {model.TongTien}, 
                            N'{model.HinhThucThanhToan?.Trim()}',
                            {ngayTT}
                        )";

                DataTable dt = db.GetDataTable(query);
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
                string maKHSql = string.IsNullOrEmpty(model.MaKH) ? "NULL" : $"'{model.MaKH.Trim()}'";
                string maLichSql = string.IsNullOrEmpty(model.MaLich) ? "NULL" : $"'{model.MaLich.Trim()}'";
                string maKMSql = string.IsNullOrEmpty(model.MaKM) ? "NULL" : $"'{model.MaKM.Trim()}'";
                string ngayTT = $"'{model.NgayTT:yyyy-MM-dd}'";

                string query = $@"UPDATE HOADON 
                          SET 
                              MAKH = {maKHSql},
                              MALICH = {maLichSql},
                              MAKM = {maKMSql},
                              MANV = '{model.MaNV?.Trim()}',
                              TRANGTHAI = N'{model.TrangThai?.Trim()}',
                              TONGTIEN = {model.TongTien},
                              HINHTHUCTHANHTOAN = N'{model.HinhThucThanhToan?.Trim()}',
                              NGAYTHANHTOAN = {ngayTT}
                          WHERE MAHD = '{model.MaHD?.Trim()}'";

                DataTable dt = db.GetDataTable(query);
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi cập nhật hoá đơn: " + ex.Message);
            }
        }
        public DataTable Delete(string ma)
        {
            try
            {
                DataTable dt = db.GetDataTable("DELETE HOADON WHERE MAHD = '" + ma + "'");
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi xoá thông tin hoá đơn: " + ex.Message);
            }
        }
    }
}
