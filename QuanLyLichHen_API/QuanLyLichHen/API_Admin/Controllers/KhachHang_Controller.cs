using BLL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace API_QuanLy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHang_Controller : ControllerBase
    {
        KhachHang_BLL _BLL = new KhachHang_BLL();
        private List<object> ConvertToList(DataTable dt)
        {
            //tạo list chứa đối tượng
            var list = new List<object>();
            //duyệt qua các hàng có trong datatable
            foreach (DataRow row in dt.Rows)
            {
                list.Add(new
                {
                    MAKH = row["MAKH"].ToString().Trim(),
                    HOTEN = row["HOTEN"].ToString().Trim(),
                    SDT = row["SDT"].ToString().Trim(),
                    MATK = row["MATK"].ToString().Trim(),
                });
            }
            return list;
        }
        [Route("get-all-khachhang")]
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                DataTable dt = _BLL.GetAll();
                return Ok(new { success = true, message = "Lấy danh sách khách hàng thành công:", data = ConvertToList(dt) });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("get-byId-khachhang")]
        [HttpGet]
        public IActionResult GetByID(string ma)
        {
            try
            {
                DataTable dt = _BLL.GetByID(ma);
                if (dt.Rows.Count == 1)
                {
                    return Ok(new { success = true, message = "Tìm thấy khách hàng thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tìm thấy khách hàng có mã: '" + ma + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("insert-khachhang")]
        [HttpPost]
        public IActionResult Create([FromBody] Models.KhachHang model)
        {

            try
            {
                DataTable dt = _BLL.GetByID(model.MaKH.Trim());
                DataTable dtchecksdt = _BLL.CheckSDT(model.MaKH.Trim(), model.SDT.Trim());

                if (dt.Rows.Count == 0)
                {
                    if (dtchecksdt.Rows.Count != 0)//tồn tại
                    {
                        return Ok(new { message = "Đã tồn tại khách hàng có dùng số điện thoại: '" + model.SDT.Trim() + "'" });
                    }
                    else
                    {
                        DataTable data = _BLL.Create(model);
                        return Ok(new { success = true, message = "Thêm thông tin khách hàng thành công:", data = ConvertToList(dt) });
                    }
                }
                else
                {
                    return Ok(new { message = "Đã tồn tại khách hàng có mã: '" + model.MaKH.Trim() + "'" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }


        [Route("update-khachhang")]
        [HttpPut]
        public IActionResult Update([FromBody] Models.KhachHang model)
        {
            try
            {
                DataTable dt = _BLL.GetByID(model.MaKH.Trim());
                DataTable dtchecksdt = _BLL.CheckSDT(model.MaKH.Trim(), model.SDT.Trim());

                if (dt.Rows.Count == 1)
                {
                    if (dtchecksdt.Rows.Count != 0)//tồn tại
                    {
                        return Ok(new { message = "Đã tồn tại khách hàng có dùng số điện thoại: '" + model.SDT.Trim() + "'" });
                    }
                    else
                    {
                        DataTable data = _BLL.Update(model);
                        return Ok(new { success = true, message = "Thay đổi thông tin khách hàng thành công:", data = ConvertToList(dt) });
                    }
                }
                else
                {
                    return Ok(new { message = "Không tồn tại khách hàng có mã: '" + model.MaKH.Trim() + "' để thay đổi" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
        [Route("delete-khachhang")]
        [HttpDelete]
        public IActionResult Delete([FromBody] Models.KhachHang model)
        {
            try
            {
                DataTable dt = _BLL.GetByID(model.MaKH.Trim());
                if (dt.Rows.Count == 1)
                {
                    DataTable data = _BLL.Delete(model);
                    return Ok(new { success = true, message = "Xoá thông tin khách hàng thành công:", data = ConvertToList(dt) });
                }
                else
                {
                    return Ok(new { message = "Không tồn tại khách hàng có mã: '" + model.MaKH.Trim() + "' để xoá" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Lỗi: " + ex.Message });
            }
        }
    }
}
