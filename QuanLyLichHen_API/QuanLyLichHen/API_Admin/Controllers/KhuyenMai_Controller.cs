using BLL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace API_Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhuyenMai_Controller : ControllerBase
    {
        private readonly KhuyenMai_BLL _BLL;

        public KhuyenMai_Controller(IConfiguration configuration)
        {
            _BLL = new KhuyenMai_BLL(configuration);
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
                    MAKM = row["MAKM"].ToString().Trim(),
                    TENKM = row["TENKM"].ToString().Trim(),
                    MOTA = row["MOTA"].ToString().Trim(),
                    NGAYBD = row["NGAYBD"],
                    NGAYKT = row["NGAYKT"],
                    GIATRI = row["GIATRI"].ToString().Trim(),
                    TRANGTHAI = row["TRANGTHAI"].ToString().Trim(),
                });
            }
            return list;
        }
        [Route("get-all-KhuyenMai")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                DataTable dt = _BLL.GetAll();
                return Ok(new { success = true, message = "Lấy danh sách khuyến mại thành công:", data = ConvertToList(dt) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("get-byId-KhuyenMai")]
        [HttpGet]
        public IActionResult GetByID(string ma)
        {
            try
            {
                DataTable dt = _BLL.GetByID(ma);
                if (dt.Rows.Count == 1)
                {
                    return Ok(new { success = true, message = "Tìm thấy khuyến mại thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tìm thấy khuyến mại có mã: '" + ma + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("insert-KhuyenMai")]
        [HttpPost]
        public IActionResult Create([FromBody] Models.KhuyenMai model)
        {

            try
            {
                DataTable dt = _BLL.GetByID(model.MaKM.Trim());

                if (dt.Rows.Count == 0)
                {

                        DataTable data = _BLL.Create(model);
                        return Ok(new { success = true, message = "Thêm thông tin khuyến mại thành công:", data = ConvertToList(dt) });
                    
                }
                else
                {
                    return Ok(new { message = "Đã tồn tại khuyến mại có mã: '" + model.MaKM.Trim() + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }


        [Route("update-KhuyenMai")]
        [HttpPut]
        public IActionResult Update([FromBody] Models.KhuyenMai model)
        {
            try
            {
                DataTable dt = _BLL.GetByID(model.MaKM.Trim());

                if (dt.Rows.Count == 1)
                {

                        DataTable data = _BLL.Update(model);
                        return Ok(new { success = true, message = "Thay đổi thông tin khuyến mại thành công:", data = ConvertToList(dt) });

                }
                else
                {
                    return Ok(new { message = "Không tồn tại khuyến mại có mã: '" + model.MaKM.Trim() + "' để thay đổi" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("delete-KhuyenMai")]
        [HttpDelete]
        public IActionResult Delete([FromBody] Models.KhuyenMai model)
        {
            try
            {
                DataTable dt = _BLL.GetByID(model.MaKM.Trim());
                if (dt.Rows.Count == 1)
                {
                    DataTable data = _BLL.Delete(model);
                    return Ok(new { success = true, message = "Xoá thông tin khuyến mại thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tồn tại khuyến mại có mã: '" + model.MaKM.Trim() + "' để xoá" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
    }
}
