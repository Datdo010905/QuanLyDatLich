using BLL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace API_QuanLy.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DichVu_Controller : ControllerBase
    {
        //DichVu_BLL _BLL = new DichVu_BLL();
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
                    MADV = row["MADV"].ToString().Trim(),
                    TENDV = row["TENDV"].ToString().Trim(),
                    MOTA = row["MOTA"].ToString().Trim(),
                    THOIGIAN = row["THOIGIAN"].ToString().Trim(),
                    GIADV = row["GIADV"].ToString().Trim(),
                    TRANGTHAI = row["TRANGTHAI"].ToString().Trim(),
                    ANH = row["ANH"].ToString().Trim(),
                    QUYTRINH = row["QUYTRINH"].ToString().Trim(),

                });
            }
            return list;
        }
        [Route("get-all-DichVu")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                DataTable dt = _BLL.GetAll();
                return Ok(new { success = true, message = "Lấy danh sách dịch vụ thành công:", data = ConvertToList(dt) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
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
        [Route("insert-DichVu")]
        [HttpPost]
        public IActionResult Create([FromBody] Models.DichVu model)
        {

            try
            {
                DataTable dt = _BLL.GetByID(model.MaDV.Trim());

                if (dt.Rows.Count == 0)
                {
                    DataTable data = _BLL.Create(model);
                    return Ok(new { success = true, message = "Thêm thông tin dịch vụ thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Đã tồn tại dịch vụ có mã: '" + model.MaDV.Trim() + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }


        [Route("update-DichVu")]
        [HttpPut]
        public IActionResult Update([FromBody] Models.DichVu model)
        {
            try
            {
                DataTable dt = _BLL.GetByID(model.MaDV.Trim());

                if (dt.Rows.Count == 1)
                {

                    DataTable data = _BLL.Update(model);
                    return Ok(new { success = true, message = "Thay đổi thông tin dịch vụ thành công:", data = ConvertToList(dt) });

                }
                else
                {
                    return Ok(new { message = "Không tồn tại dịch vụ có mã: '" + model.MaDV.Trim() + "' để thay đổi" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("delete-DichVu")]
        [HttpDelete]
        public IActionResult Delete([FromBody] Models.DichVu model)
        {
            try
            {
                DataTable dt = _BLL.GetByID(model.MaDV.Trim());
                if (dt.Rows.Count == 1)
                {
                    DataTable data = _BLL.Delete(model);
                    return Ok(new { success = true, message = "Xoá thông tin dịch vụ thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tồn tại dịch vụ có mã: '" + model.MaDV.Trim() + "' để xoá" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
    }
}
