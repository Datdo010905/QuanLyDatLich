using BLL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace QuanLyDatLich.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class Login_Controller : ControllerBase
    {
        private readonly TaiKhoan_BLL _BLL;
        private readonly KhachHang_BLL KH_BLL;
        private readonly IConfiguration _config;

        public Login_Controller(IConfiguration configuration)
        {
            _BLL = new TaiKhoan_BLL(configuration);
            _config = configuration;
            KH_BLL = new KhachHang_BLL(configuration);
        }
        private List<object> ConvertToList(DataTable dt)
        {
            //tạo list chứa đối tượng
            var list = new List<object>();
            //duyệt qua các hàng có trong datatable
            foreach (DataRow row in dt.Rows)
            {
                list.Add(new
                {
                    MATK = row["MATK"].ToString().Trim(),
                    PASS = row["PASS"].ToString().Trim(),
                    PHANQUYEN = row["PHANQUYEN"].ToString().Trim(),
                    TRANGTHAI = row["TRANGTHAI"].ToString().Trim(),
                });
            }
            return list;
        }
        // Sinh JWT Token
        private string GenerateJwtToken(TaiKhoan user)
        {
            var jwtSettings = _config.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.MaTK),
                new Claim("QUYENHAN", user.PhanQuyen.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["ExpiresInMinutes"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        [Route("login-taikhoan")]
        [HttpGet]
        public IActionResult DangNhap(string username, string pass)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(pass))
                {
                    return Ok(new { success = false, message = "Thiếu username hoặc password!" });
                }

                var list = _BLL.Login(username, pass);
                if (list == null || list.Count == 0)
                {
                    return Ok(new { success = false, message = "Sai tên đăng nhập hoặc mật khẩu!" });
                }

                var user = list.First();

                // Tạo token JWT
                string token = GenerateJwtToken(user);

                return Ok(new
                {
                    success = true,
                    message = "Đăng nhập thành công!",
                    token,
                    data = new
                    {
                        MATK = user.MaTK.Trim(),
                        PASS = user.Pass.Trim(),
                        PHANQUYEN = user.PhanQuyen,
                        TRANGTHAI = user.TrangThai.Trim(),
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi hệ thống: " + ex.Message });
            }
        }
        [Route("signup-taikhoan")]
        [HttpPost]
        public IActionResult DangKy([FromForm] Models.TaiKhoan model)
        {
            try
            {
                DataTable dt = _BLL.GetByID(model.MaTK.Trim());
                if (dt.Rows.Count == 0)
                {
                    DataTable data = _BLL.Create(model);
                    return Ok(new { success = true, message = "Thêm thông tin tài khoản thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Đã tồn tài khoản có mã: '" + model.MaTK.Trim() + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("get-bySDT-khachhang")]
        [HttpGet]
        public IActionResult GetByID(string SDT)
        {
            try
            {
                DataTable dt = KH_BLL.GetByID(SDT);

                if (dt != null && dt.Rows.Count > 0)
                {
                    DataRow row = dt.Rows[0];

                    return Ok(new
                    {
                        success = true,
                        message = "Tìm thấy khách hàng thành công",
                        data = new
                        {
                            makh = row["MAKH"].ToString().Trim(),
                            hoten = row["HOTEN"].ToString().Trim(),
                            sdt = row["SDT"].ToString().Trim(),
                            //có thể check null
                            matk = row["MATK"] != DBNull.Value ? row["MATK"].ToString().Trim() : ""
                        }
                    });
                }
                else
                {
                    return Ok(new { success = false, message = "Không tìm thấy khách hàng có SDT: '" + SDT + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi hệ thống: " + ex.Message });
            }
        }
        [Route("insert-khachhang")]
        [HttpPost]
        public IActionResult Create([FromForm] Models.KhachHang model)
        {

            try
            {
                DataTable dt = _BLL.GetByID(model.MaKH.Trim());
                DataTable dtchecksdt = KH_BLL.CheckSDT(model.MaKH.Trim(), model.SDT.Trim());

                if (dt.Rows.Count == 0)
                {
                    if (dtchecksdt.Rows.Count != 0)//tồn tại
                    {
                        return Ok(new { message = "Đã tồn tại khách hàng có dùng số điện thoại: '" + model.SDT.Trim() + "'" });
                    }
                    else
                    {
                        DataTable data = KH_BLL.Create(model);
                        return Ok(new { success = true, message = "Thêm thông tin khách hàng thành công:", data = ConvertToList(dt) });
                    }
                }
                else
                {
                    return Ok(new { message = "Đã tồn tại khách hàng có mã: '" + model.MaKH.Trim() + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
    }
}
