import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import heroImg from "../assets/images/hero.png";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState("");
    // const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, rePassword }),
            });

            if (response.ok) {
                // history.push("/login"); // Redirect to login page upon successful registration
                console.error("Success");
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-signin text-center" style={{marginTop: "40px"}}>
                <img className="mb-4 d-block mx-auto" src={heroImg} alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Vui lòng nhập đầy đủ thông tin</h1>
                <input style={{ marginBottom : "10px"}} type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Tên đăng nhập" required autoFocus/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Mật khẩu" required/>
                <input type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} className="form-control" placeholder="Nhập lại mật khẩu" required/>
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button style={{marginTop : "-15px", marginBottom : "10px"}} name="btnRegister" className="btn btn-lg btn-primary btn-block" type="submit">Đăng ký</button>
                <a href="#" className="mb-2">Quên mật khẩu?  </a>
                <a href="/login" className="mb-2">Đăng nhập</a>
            </form>
        </div>
    );
};

export default Register;
