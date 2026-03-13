using BLL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.Extensions.Configuration;
namespace API_ThuNgan.Controllers


{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDon_Controller : ControllerBase
    {
        //HoaDon_BLL _BLL = new HoaDon_BLL();
        private readonly HoaDon_BLL _BLL;

        public HoaDon_Controller(IConfiguration configuration)
        {
            _BLL = new HoaDon_BLL(configuration);
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
                    MAKM = row["MAKM"].ToString().Trim(),
                    TONGTIEN = row["TONGTIEN"].ToString().Trim(),
                    HINHTHUCTHANHTOAN = row["HINHTHUCTHANHTOAN"].ToString().Trim(),
                    MANV = row["MANV"].ToString().Trim(),
                    MALICH = row["MALICH"].ToString().Trim(),
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
        [Route("insert-hoadon")]
        [HttpPost]
        public IActionResult Create([FromBody] Models.HoaDon model)
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


        [Route("update-hoadon")]
        [HttpPut]
        public IActionResult Update([FromBody] Models.HoaDon model)
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
    }
}
