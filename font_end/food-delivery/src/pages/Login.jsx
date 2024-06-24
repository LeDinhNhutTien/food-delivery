import React, { useEffect, useState } from "react";
import heroImg from "../assets/images/hero.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Custom validation script (HTML5 form validation handles basic checks)
        (function() {
            'use strict';
            window.addEventListener('load', function() {
                const forms = document.getElementsByClassName('needs-validation');
                Array.prototype.filter.call(forms, function(form) {
                    form.addEventListener('submit', function(event) {
                        if (!form.checkValidity()) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                    }, false);
                });
            }, false);
        })();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError({});  // Clear previous errors

        // Custom validation
        if (!username) {
            setError((prev) => ({ ...prev, username: "Username không được để trống" }));
            return;
        }
        if (!password) {
            setError((prev) => ({ ...prev, password: "Password không được để trống" }));
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const userInfo = await response.json(); // Read the JSON response once
                sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
                sessionStorage.setItem("accessToken", userInfo.accessToken);
                sessionStorage.setItem("refreshToken", userInfo.refreshToken);
                console.log(userInfo.id);
                // Giải mã accessToken
                const decodedToken = jwtDecode(userInfo.accessToken);
                const authorities = decodedToken.authorities || []; // authorities là một object

                // Kiểm tra quyền của người dùng
                if (authorities.some(auth => auth.authority === "ROLE_admin")) {
                    navigate('/admin');
                } else if (authorities.some(auth => auth.authority === "ROLE_user")) {
                    navigate('/home');
                } else {
                    navigate('/login'); // Điều hướng về trang đăng nhập nếu không có quyền hợp lệ
                }

            } else if (response.status === 401 || response.status === 400) {
                const errorMessage = await response.text();
                setError({ general: errorMessage });
            } else {
                console.error("Login failed with status:", response.status);
                setError({ general: "Login failed. Please try again later." });
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError({ general: "Something went wrong. Please try again later." });
        }
    };


    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="form-signin text-center needs-validation"
                style={{ marginTop: "40px" }}
                noValidate
            >
                <img className="mb-4 d-block mx-auto" src={heroImg} alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Vui lòng đăng nhập</h1>
                <label htmlFor="inputEmail" className="sr-only">Username</label>
                <input
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: "10px" }}
                    type="text"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Username"
                    required
                    autoFocus
                />
                {error.username && <div className="alert alert-danger">{error.username}</div>}
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                />
                {error.password && <div className="alert alert-danger">{error.password}</div>}
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                {error.general && <div className="alert alert-danger">{error.general}</div>}
                <button style={{ marginTop: "-15px", marginBottom: "10px" }} className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <a href="/forgetPassword" className="mb-2">Forgot Password? </a>
                <a href="/register" className="mb-2">Sign up</a>
            </form>
        </div>
    );
};

export default Login;
