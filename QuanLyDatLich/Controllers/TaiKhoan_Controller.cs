﻿using BLL;
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
        TaiKhoan_BLL _BLL = new TaiKhoan_BLL();

        //chuyển DataTable -> List<object>(các hàm phải để private, do swagger lấy public method)
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

        [Route("get-all")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                DataTable dt = _BLL.GetAll();
                return Ok(new { success = true, message = "Lấy danh sách tài khoản thành công:", data = ConvertToList(dt) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }

        [Route("get-byId")]
        [HttpGet]
        public IActionResult GetByID(string ma)
        {
            try
            {
                DataTable dt = _BLL.GetByID(ma);
                if (dt.Rows.Count == 1)
                {
                    return Ok(new { success = true, message = "Tìm thấy tài khoản thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tìm thấy tài khoản có mã: '" + ma + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }

        [Route("insert")]
        [HttpPost]
        public IActionResult Create([FromBody] Models.TaiKhoan model)
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


        [Route("update")]
        [HttpPost]
        public IActionResult Update([FromBody] Models.TaiKhoan model)
        {
            try
            {
                DataTable dt = _BLL.GetByID(model.MaTK.Trim());
                if (dt.Rows.Count == 1)
                {
                    DataTable data = _BLL.Update(model);
                    return Ok(new { success = true, message = "Thay đổi thông tin tài khoản thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tồn tài khoản có mã: '" + model.MaTK.Trim() + "' để thay đổi" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }


    }
}
