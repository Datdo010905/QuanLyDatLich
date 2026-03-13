using BLL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data;
using System;

namespace QuanLyDatLich.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TaiKhoan_Controller : ControllerBase
    {
        private readonly TaiKhoan_BLL _BLL;

        public TaiKhoan_Controller(IConfiguration configuration)
        {
            _BLL = new TaiKhoan_BLL(configuration);
        }

        [Route("TaiKhoan-taikhoan")]
        [HttpGet]
        public IActionResult DangNhap(string username, string pass)
        {
            try
            {
                DataTable dt = _BLL.DangNhap(username, pass);
                if (dt.Rows.Count == 1)
                {
                    return Ok(new { success = true, message = "Đăng nhập thành công!" });
                }
                else
                {
                    return Ok(new { message = "Sai thông tin đăng nhập!" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
    }
}
