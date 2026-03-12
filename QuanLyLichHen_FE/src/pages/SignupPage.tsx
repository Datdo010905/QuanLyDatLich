import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/login.css";
const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [showRePwd, setShowRePwd] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== rePassword) {
            alert("Mật khẩu không khớp");
            return;
        }

        // xử lý đăng ký ở đây (localStorage / API)
        console.log({ fullName, username, password });
    };

    const onlyNumber = (value: string) => value.replace(/[^0-9]/g, "");

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
                    <h1>ĐĂNG KÝ TÀI KHOẢN</h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="fullname">
                            Họ và tên <span>*</span>
                        </label>
                        <input
                            id="fullname"
                            type="text"
                            placeholder="Nhập họ và tên"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />

                        <label htmlFor="username">
                            Tài khoản <span>*</span>
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Số điện thoại"
                            value={username}
                            maxLength={10}
                            onChange={(e) => setUsername(onlyNumber(e.target.value))}
                            required
                        />

                        <label htmlFor="password">
                            Mật khẩu <span>*</span>
                        </label>
                        <div className="password-container">
                            <input
                                id="password"
                                type={showPwd ? "text" : "password"}
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <i
                                className={`fa ${showPwd ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={() => setShowPwd(!showPwd)}
                                style={{ cursor: "pointer" }}
                            ></i>
                        </div>

                        <label htmlFor="repassword">
                            Nhập lại mật khẩu <span>*</span>
                        </label>
                        <div className="password-container">
                            <input
                                id="repassword"
                                type={showRePwd ? "text" : "password"}
                                placeholder="Xác nhận mật khẩu"
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                required
                            />
                            <i
                                className={`fa ${showRePwd ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={() => setShowRePwd(!showRePwd)}
                                style={{ cursor: "pointer" }}
                            ></i>
                        </div>

                        <button type="submit" id="btn-login">
                            ĐĂNG KÝ
                        </button>

                        <div className="extra-links">
                            <Link to="/login">Đã có tài khoản? Đăng nhập ngay</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
