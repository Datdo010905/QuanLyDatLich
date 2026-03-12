import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/login.css";
const Forgot = () => {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // xử lý quên mật khẩu ở đây
    console.log("Phone:", phone);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // chỉ cho nhập số
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPhone(value);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <Link to="/">
            <img src="/img/logoTo.png" alt="30Shine Logo" className="logo" />
          </Link>
          <h2>30Shine - Cắt tóc theo phong cách của bạn!</h2>
        </div>

        <div className="login-right">
          <h1>QUÊN MẬT KHẨU</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="emailOrPhone">
              Số điện thoại <span>*</span>
            </label>

            <input
              id="emailOrPhone"
              type="text"
              maxLength={10}
              placeholder="Nhập số điện thoại của bạn"
              value={phone}
              onChange={handleInput}
              required
            />

            <button type="submit" id="btn-login">
              GỬI YÊU CẦU
            </button>

            <div className="extra-links">
              <Link to="/login">Quay lại đăng nhập</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
