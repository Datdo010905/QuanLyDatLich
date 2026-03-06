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
    }
}
