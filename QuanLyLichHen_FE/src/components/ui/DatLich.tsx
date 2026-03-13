import React, {useState} from "react";
import { Link } from "react-router";
const Datlich = () => {
  const [sdt, setSDT] = useState("");
  const LuuSDT = (e: React.FormEvent) => {
    window.localStorage.setItem("sdt-kh", sdt);
  }

    return (
        <div className="datlich-container">
          <div className="datlich">
            <h2>ĐẶT LỊCH GIỮ CHỖ CHỈ 30 GIÂY</h2>
            <p>Cắt xong trả tiền, huỷ lịch không sao</p>
            <div className="form-row">
              <input
                id="input-sdt"
                maxLength={10}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.value = target.value.replace(/[^0-9]/g, "");
                }}
                type="text"
                placeholder="Nhập số điện thoại để đặt lịch"
                required
              />

              <button id="btn-datlich" onClick={LuuSDT}>  
                <Link to="/datlich">ĐẶT LỊCH NGAY</Link>
              </button>


            </div>

          </div>
          <div className="danhgia">
            <h3>MỜI BẠN ĐÁNH GIÁ CHẤT LƯỢNG PHỤC VỤ</h3>
            <p>Phản hồi của bạn sẽ giúp chúng tôi cải thiện chất lượng dịch vụ tốt hơn</p>

            <div className="stars">
              ★★★★☆
            </div>
          </div>
        </div>
    );
};

export default Datlich;