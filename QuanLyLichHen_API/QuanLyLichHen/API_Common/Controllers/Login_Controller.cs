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
        private readonly IConfiguration _config;

        public Login_Controller(IConfiguration configuration)
        {
            _BLL = new TaiKhoan_BLL(configuration);
            _config = configuration;
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
    }
}
