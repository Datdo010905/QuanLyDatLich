import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/login.css";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // xử lý login ở đây
    console.log("Login submit");
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
        <h1>ĐĂNG NHẬP</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Tài khoản <span>*</span>
          </label>
          <input
            id="username"
            type="text"
            placeholder="Số điện thoại"
            required
          />

          <label htmlFor="password">
            Mật khẩu <span>*</span>
          </label>

          <div className="password-container">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              required
            />
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            ></i>
          </div>

          <button type="submit" id="btn-login">
            ĐĂNG NHẬP
          </button>

          <div className="extra-links">
            <Link to="/forgot">Quên mật khẩu?</Link> |{" "}
            <Link to="/signup">Đăng ký ngay</Link>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Login;
