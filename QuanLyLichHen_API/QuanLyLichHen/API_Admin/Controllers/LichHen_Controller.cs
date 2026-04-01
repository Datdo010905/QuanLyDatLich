using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Text.RegularExpressions;

namespace API_Stylist.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LichHen_Controller : ControllerBase
    {
        private readonly LichHen_BLL _BLL;
        private readonly ChiTietLichHen_BLL CTLH_BLL;


        public LichHen_Controller(IConfiguration configuration)
        {
            _BLL = new LichHen_BLL(configuration);
            CTLH_BLL = new ChiTietLichHen_BLL(configuration);
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
                    MALICH = row["MALICH"].ToString().Trim(),
                    NGAYHEN = row["NGAYHEN"],
                    GIOHEN = row["GIOHEN"].ToString().Trim(),
                    TRANGTHAI = row["TRANGTHAI"].ToString().Trim(),
                    MAKH = row["MAKH"].ToString().Trim(),
                    MACHINHANH = row["MACHINHANH"].ToString().Trim(),
                });
            }
            return list;
        }
        [Route("get-all-lichhen")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                DataTable dt = _BLL.GetAll();
                return Ok(new { success = true, message = "Lấy danh sách lịch hẹn thành công:", data = ConvertToList(dt) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("get-all-CTlichhen")]
        [HttpGet]
        public IActionResult GetAllCT()
        {
            try
            {
                DataTable dt = CTLH_BLL.GetAll();

                var data = dt.AsEnumerable().Select(r => new
                {
                    MALICH = r["MALICH"].ToString().Trim(),
                    MADV = r["MADV"].ToString().Trim(),
                    MANV = r["MANV"].ToString().Trim(),
                    SOLUONG = r["SOLUONG"].ToString().Trim(),
                    GIA_DUKIEN = r["GIA_DUKIEN"].ToString().Trim(),
                    GHICHU = r["GHICHU"].ToString().Trim()
                });

                return Ok(new
                {
                    success = true,
                    message = "Lấy danh sách lịch hẹn thành công",
                    data = data
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("get-allbyIdNV-lichhen")]
        [HttpGet]
        public IActionResult GetAllByIdNV(string manv)
        {
            try
            {
                DataTable dt = _BLL.GetAllByIdNV(manv);
                return Ok(new { success = true, message = "Lấy danh sách lịch hẹn theo mã nhân viên thành công:", data = ConvertToList(dt) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("get-byId-lichhen")]
        [HttpGet]
        public IActionResult GetByID(string ma)
        {
            try
            {
                DataTable dt = _BLL.GetByID(ma);
                if (dt.Rows.Count >= 1)
                {
                    return Ok(new { success = true, message = "Tìm thấy lịch hẹn thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tìm thấy lịch hẹn: '" + ma + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("get-byId-CTlichhen")]
        [HttpGet]
        public IActionResult GetByIDCT(string ma)
        {
            try
            {
                DataTable dt = CTLH_BLL.GetById(ma);

                var data = dt.AsEnumerable().Select(r => new
                {
                    MALICH = r["MALICH"].ToString().Trim(),
                    MADV = r["MADV"].ToString().Trim(),
                    MANV = r["MANV"].ToString().Trim(),
                    SOLUONG = r["SOLUONG"].ToString().Trim(),
                    GIA_DUKIEN = r["GIA_DUKIEN"].ToString().Trim(),
                    GHICHU = r["GHICHU"].ToString().Trim()
                });

                return Ok(new
                {
                    success = true,
                    message = "Lấy chi tiết lịch hẹn thành công",
                    data = data
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("insert-lichhen")]
        [HttpPost]
        public IActionResult Create([FromForm] Models.LichHen model)
        {
            try
            {
                DataTable dt = _BLL.GetByID(model.MaLich.Trim());
                if (dt.Rows.Count == 0)
                {
                    DataTable data = _BLL.Create(model);
                    return Ok(new { success = true, message = "Thêm thông tin lịch hẹn thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Đã tồn tại lịch hẹn có mã: '" + model.MaLich.Trim() + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("insert-CTlichhen")]
        [HttpPost]
        public IActionResult CreateCTLH([FromForm] Models.ChiTietLichHen model)
        {
            try
            {
                DataTable data = CTLH_BLL.Create(model);
                return Ok(new { success = true, message = "Thêm thông tin chi tiết lịch hẹn thành công:", data = ConvertToList(data) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }

        [Route("update-lichhen")]
        [HttpPut]
        public IActionResult Update(string ma, string trangthai)
        {
            try
            {
                DataTable dt = _BLL.GetByID(ma);
                if (dt.Rows.Count == 1)
                {
                    DataTable data = _BLL.Update(ma, trangthai);
                    return Ok(new { success = true, message = "Thay đổi trạng thái lịch hẹn thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tồn tại lịch hẹn có mã: '" + ma.Trim() + "' để thay đổi" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("delete-lichhen")]
        [HttpDelete]
        public IActionResult Delete(string ma)
        {
            try
            {
                DataTable dt = _BLL.GetByID(ma);
                if (dt.Rows.Count == 1)
                {
                    DataTable data = _BLL.Delete(ma);
                    return Ok(new { success = true, message = "Xoá thông tin lịch hẹn thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tồn tại lịch hẹn có mã: '" + ma + "' để xoá" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("delete-CTlichhen")]
        [HttpDelete]
        public IActionResult DeleteCT(string ma)
        {
            try
            {
                DataTable dt = CTLH_BLL.GetById(ma.Trim());
                if (dt.Rows.Count >= 1 )
                {
                    DataTable data = CTLH_BLL.Delete(ma.Trim());
                    return Ok(new { success = true, message = "Xoá thông tin chi tiết lịch hẹn thành công:" });
                }
                else
                {
                    return Ok(new { message = "Không tồn tại chi tiết lịch hẹn có mã: '" + ma.Trim() + "' để xoá" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
    }
}
