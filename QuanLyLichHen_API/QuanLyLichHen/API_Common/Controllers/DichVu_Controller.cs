using BLL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.AspNetCore.Authorization;

namespace API_QuanLy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DichVu_Controller : ControllerBase
    {
        private readonly DichVu_BLL _BLL;

        public DichVu_Controller(IConfiguration configuration)
        {
            _BLL = new DichVu_BLL(configuration);
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
                    TENDV = row["TENDV"].ToString().Trim(),
                    MADV = row["MADV"].ToString().Trim(),
                    LOAI = row["LOAI"].ToString().Trim(),
                    MOTA = row["MOTA"].ToString().Trim(),
                    THOIGIAN = row["THOIGIAN"].ToString().Trim(),
                    GIADV = row["GIADV"].ToString().Trim(),
                    TRANGTHAI = row["TRANGTHAI"].ToString().Trim(),
                    HINH = row["HINH"].ToString().Trim(),
                    QUYTRINH = row["QUYTRINH"].ToString().Trim(),

                });
            }
            return list;
        }
        [Route("get-byId-DichVu")]
        [HttpGet]
        public IActionResult GetByID(string ma)
        {
            try
            {
                DataTable dt = _BLL.GetByID(ma);
                if (dt.Rows.Count == 1)
                {
                    return Ok(new { success = true, message = "Tìm thấy dịch vụ thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tìm thấy dịch vụ có mã: '" + ma + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("get-all-DichVu")]
        [HttpGet]
        public IActionResult GetAllCungCap()
        {
            try
            {
                DataTable dt = _BLL.GetAllCungCap();
                return Ok(new { success = true, message = "Lấy danh sách dịch vụ thành công:", data = ConvertToList(dt) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("get-all-DichVuToc")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                DataTable dt = _BLL.GetAllTocCungCap();
                return Ok(new { success = true, message = "Lấy danh sách dịch vụ thành công:", data = ConvertToList(dt) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("get-all-DichVuCSD")]
        [HttpGet]
        public IActionResult GetAllCSD()
        {
            try
            {
                DataTable dt = _BLL.GetAllCSDCungCap();
                return Ok(new { success = true, message = "Lấy danh sách dịch vụ thành công:", data = ConvertToList(dt) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }            
    }
}
