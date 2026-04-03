using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace API_ThuNgan.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDon_Controller : ControllerBase
    {
        private readonly HoaDon_BLL _BLL;
        private readonly ChiTietHoaDon_BLL CT_BLL;
        public HoaDon_Controller(IConfiguration configuration)
        {
            _BLL = new HoaDon_BLL(configuration);
            CT_BLL = new ChiTietHoaDon_BLL(configuration);
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
                    MAHD = row["MAHD"].ToString().Trim(),
                    MAKH = row["MAKH"].ToString().Trim(),
                    MAKM = row["MAKM"].ToString().Trim(),
                    MALICH = row["MALICH"].ToString().Trim(),
                    MANV = row["MANV"].ToString().Trim(),
                    TONGTIEN = row["TONGTIEN"].ToString().Trim(),
                    HINHTHUCTHANHTOAN = row["HINHTHUCTHANHTOAN"].ToString().Trim(),
                    TRANGTHAI = row["TRANGTHAI"].ToString().Trim(),
                });
            }
            return list;
        }
        [Route("get-all-hoadon")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                DataTable dt = _BLL.GetAll();
                return Ok(new { success = true, message = "Lấy danh sách hoá đơn thành công:", data = ConvertToList(dt) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("get-all-CThoadon")]
        [HttpGet]
        public IActionResult GetAllCT()
        {
            try
            {
                DataTable dt = CT_BLL.GetAll();
                var data = dt.AsEnumerable().Select(r => new
                {
                    MAHD = r["MAHD"].ToString().Trim(),
                    MADV = r["MADV"].ToString().Trim(),
                    SOLUONG = r["SOLUONG"].ToString().Trim(),
                    DONGIA = r["DONGIA"].ToString().Trim(),
                    THANHTIEN = r["THANHTIEN"].ToString().Trim(),
                });
                return Ok(new { success = true, message = "Lấy danh sách chi tiết hoá đơn thành công:", data = data });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("get-byId-hoadon")]
        [HttpGet]
        public IActionResult GetByID(string ma)
        {
            try
            {
                DataTable dt = _BLL.GetByID(ma);
                if (dt.Rows.Count == 1)
                {
                    return Ok(new { success = true, message = "Tìm thấy hoá đơn thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tìm thấy hoá đơn có mã: '" + ma + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("get-byId-CThoadon")]
        [HttpGet]
        public IActionResult GetByIdCT(string ma)
        {
            try
            {
                DataTable dt = CT_BLL.GetByID(ma);
                var data = dt.AsEnumerable().Select(r => new
                {
                    MAHD = r["MAHD"].ToString().Trim(),
                    MADV = r["MADV"].ToString().Trim(),
                    SOLUONG = r["SOLUONG"].ToString().Trim(),
                    DONGIA = r["DONGIA"].ToString().Trim(),
                    THANHTIEN = r["THANHTIEN"].ToString().Trim(),
                });
                return Ok(new { success = true, message = "Lấy danh sách chi tiết hoá đơn thành công:", data = data });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("insert-hoadon")]
        [HttpPost]
        public IActionResult Create([FromForm] Models.HoaDon model)
        {
            try
            {
                DataTable dt = _BLL.GetByID(model.MaHD.Trim());
                if (dt.Rows.Count == 0)
                {
                    DataTable data = _BLL.Create(model);
                    return Ok(new { success = true, message = "Thêm thông tin hoá đơn thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Đã tồn tại hoá đơn có mã: '" + model.MaHD.Trim() + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("insert-CThoadon")]
        [HttpPost]
        public IActionResult CreateCThd([FromForm] Models.ChiTietHoaDon model)
        {
            try
            {
                DataTable data = CT_BLL.Create(model);
                return Ok(new { success = true, message = "Thêm thông tin chi tiết hoá đơn thành công:" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }

        [Route("update-hoadon")]
        [HttpPut]
        public IActionResult Update([FromForm] Models.HoaDon model)
        {
            try
            {
                DataTable dt = _BLL.GetByID(model.MaHD.Trim());
                if (dt.Rows.Count == 1)
                {
                    DataTable data = _BLL.Update(model);
                    return Ok(new { success = true, message = "Thay đổi trạng thái hoá đơn thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tồn tại hoá đơn có mã: '" + model.MaHD.Trim() + "' để thay đổi" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("delete-hoadon")]
        [HttpDelete]
        public IActionResult Delete(string ma)
        {
            try
            {
                DataTable dt = _BLL.GetByID(ma);
                if (dt.Rows.Count == 1)
                {
                    DataTable data = _BLL.Delete(ma);
                    return Ok(new { success = true, message = "Xoá thông tin hoá đơn thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tồn tại hoá đơn có mã: '" + ma + "' để xoá" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("delete-CThoadon")]
        [HttpDelete]
        public IActionResult DeleteCT(string ma)
        {
            try
            {
                DataTable dt = CT_BLL.GetByID(ma.Trim());
                if (dt.Rows.Count >= 1)
                {
                    DataTable data = CT_BLL.Delete(ma.Trim());
                    return Ok(new { success = true, message = "Xoá thông tin chi tiết hoá đơn thành công:" });
                }
                else
                {
                    return Ok(new { message = "Không tồn tại chi tiết hoá đơn có mã: '" + ma.Trim() + "' để xoá" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
    }
}
