using BLL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace API_Stylist.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LichHen_Controller : ControllerBase
    {
        LichHen_BLL _BLL = new LichHen_BLL();
        ChiTietLichHen_BLL CTLH_BLL = new ChiTietLichHen_BLL();
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
                    NGAYHEN = row["NGAYHEN"].ToString().Trim(),
                    GIOHEN = row["GIOHEN"].ToString().Trim(),
                    TRANGTHAI = row["TRANGTHAI"].ToString().Trim(),
                    MANV = row["MANV"].ToString().Trim(),
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
        [Route("insert-lichhen")]
        [HttpPost]
        public IActionResult Create([FromBody] Models.LichHen model)
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
        public IActionResult CreateCTLH([FromBody] Models.ChiTietLichHen model)
        {
            try
            {
                DataTable dt = CTLH_BLL.GetById(model.MaLich.Trim());
                if (dt.Rows.Count == 0)
                {
                    DataTable data = CTLH_BLL.Create(model);
                    return Ok(new { success = true, message = "Thêm thông tin chi tiết lịch hẹn thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Đã tồn tại chi tiết lịch hẹn có mã: '" + model.MaLich.Trim() + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }

        [Route("update-lichhen")]
        [HttpPut]
        public IActionResult Update([FromBody] Models.LichHen model)
        {
            try
            {
                DataTable dt = _BLL.GetByID(model.MaLich.Trim());
                if (dt.Rows.Count == 1)
                {
                    DataTable data = _BLL.Update(model);
                    return Ok(new { success = true, message = "Thay đổi trạng thái lịch hẹn thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tồn tại lịch hẹn có mã: '" + model.MaLich.Trim() + "' để thay đổi" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        } 
    }
}
