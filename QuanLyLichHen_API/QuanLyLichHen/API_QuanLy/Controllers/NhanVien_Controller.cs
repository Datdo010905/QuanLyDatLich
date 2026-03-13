using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.ComponentModel;
using System.Data;

namespace API_QuanLy.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NhanVien_Controller : ControllerBase
    {
        private readonly NhanVien_BLL _BLL;

        public NhanVien_Controller(IConfiguration configuration)
        {
            _BLL = new NhanVien_BLL(configuration);
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
                    MANV = row["MANV"].ToString().Trim(),
                    HOTEN = row["HOTEN"].ToString().Trim(),
                    CHUCVU = row["CHUCVU"].ToString().Trim(),
                    SDT = row["SDT"].ToString().Trim(),
                    DIACHI = row["DIACHI"].ToString().Trim(),
                    NGAYSINH = row["NGAYSINH"],
                    MATK = row["MATK"].ToString().Trim(),
                    MACHINHANH = row["MACHINHANH"].ToString().Trim(),
                });
            }
            return list;
        }
        [Route("get-all-nhanvien")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                DataTable dt = _BLL.GetAll();
                return Ok(new { success = true, message = "Lấy danh sách nhân viên thành công:", data = ConvertToList(dt) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("get-byId-nhanvien")]
        [HttpGet]
        public IActionResult GetByID(string ma)
        {
            try
            {
                DataTable dt = _BLL.GetByID(ma);
                if (dt.Rows.Count == 1)
                {
                    return Ok(new { success = true, message = "Tìm thấy nhân viên thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tìm thấy nhân viên có mã: '" + ma + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("insert-nhanvien")]
        [HttpPost]
        public IActionResult Create([FromBody] Models.NhanVien model)
        {
            
            try
            {
                DataTable dt = _BLL.GetByID(model.MaNV.Trim());
                DataTable dtcheck = _BLL.CheckAcc(model.MaNV.Trim(), model.MaTK.Trim());
                DataTable dtchecksdt = _BLL.CheckSDT(model.MaNV.Trim(), model.SDT.Trim());

                if (dt.Rows.Count == 0)
                {
                    if (dtcheck.Rows.Count != 0)//tồn tại
                    {
                        return Ok(new { message = "Đã tồn tại nhân viên có dùng tài khoản: '" + model.MaTK.Trim() + "'" });
                    }
                    if (dtchecksdt.Rows.Count != 0)//tồn tại
                    {
                        return Ok(new { message = "Đã tồn tại nhân viên có dùng số điện thoại: '" + model.SDT.Trim() + "'" });
                    }
                    else
                    {
                        DataTable data = _BLL.Create(model);
                        return Ok(new { success = true, message = "Thêm thông tin nhân viên thành công:", data = ConvertToList(dt) });
                    }
                }
                else
                {
                    return Ok(new { message = "Đã tồn tại nhân viên có mã: '" + model.MaNV.Trim() + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }


        [Route("update-nhanvien")]
        [HttpPut]
        public IActionResult Update([FromBody] Models.NhanVien model)
        {
            try
            {
                DataTable dt = _BLL.GetByID(model.MaNV.Trim());
                DataTable dtcheck = _BLL.CheckAcc(model.MaNV.Trim(), model.MaTK.Trim());
                DataTable dtchecksdt = _BLL.CheckSDT(model.MaNV.Trim(), model.SDT.Trim());

                if (dt.Rows.Count == 1)
                {
                    if (dtcheck.Rows.Count != 0)//tồn tại
                    {
                        return Ok(new { message = "Đã tồn tại nhân viên có dùng tài khoản: '" + model.MaTK.Trim() + "'" });
                    }
                    if (dtchecksdt.Rows.Count != 0)//tồn tại
                    {
                        return Ok(new { message = "Đã tồn tại nhân viên có dùng số điện thoại: '" + model.SDT.Trim() + "'" });
                    }
                    else
                    {
                        DataTable data = _BLL.Update(model);
                        return Ok(new { success = true, message = "Thay đổi thông tin nhân viên thành công:", data = ConvertToList(dt) });
                    }
                }
                else
                {
                    return Ok(new { message = "Không tồn tại nhân viên có mã: '" + model.MaNV.Trim() + "' để thay đổi" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("delete-nhanvien")]
        [HttpDelete]
        public IActionResult Delete([FromBody] Models.NhanVien model)
        {
            try
            {
                DataTable dt = _BLL.GetByID(model.MaNV.Trim());
                if (dt.Rows.Count == 1)
                {
                    DataTable data = _BLL.Delete(model);
                    return Ok(new { success = true, message = "Xoá thông tin nhân viên thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tồn tại nhân viên có mã: '" + model.MaNV.Trim() + "' để xoá" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
    }
}
