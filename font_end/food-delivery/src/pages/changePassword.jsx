import React, {useEffect, useState} from "react";
import '../styles/change-password.css';

const ChangePassword = () => {
    const [username, setUsername] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [currentAlert, setCurrentAlert] = useState(""); // Thêm state để theo dõi thông báo hiện tại
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo.username);
        }
    }, [userInfo]); // Thêm dependency userInfo vào useEffect để cập nhật username khi userInfo thay đổi

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (confirmPassword === null || confirmPassword === ""){
            setError("Xác nhận không được để trống");
        }
        if (newPass !== confirmPassword){
            setError("Mật khẩu mới nhập không khớp");
        }
    else try {
            const response = await fetch("http://localhost:8080/api/changePassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, oldPass, newPass}),
            });

            if (response.ok) {
                const successMessage = await response.text();
                setSuccess(successMessage);
                setCurrentAlert("success"); // Cập nhật thông báo hiện tại là thành công
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
                setCurrentAlert("error"); // Cập nhật thông báo hiện tại là lỗi
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div id="content">
            <div className="wrapper">
                <div className="form_ctrl">
                    <div className="acc_ctrl m_r12">
                        <h2>Tài khoản</h2>
                        <div className="list_ctrl">
                            <ul>
                                <li className="first">
                                    <a id="account" title="Thông tin tài khoản" href="/account">Thông tin tài khoản</a>
                                </li>
                                <li className="first active">
                                    <a id="changePassword" title="Đổi mật khẩu" href="/account?action=changePassword">Đổi mật khẩu</a>
                                </li>
                                <li className="first">
                                    <a id="reviewOrders" title="Xem lại đơn hàng" href="/account?action=reviewOrders">Xem lại đơn hàng</a>
                                </li>
                                <li className="first">
                                    <a id="logout" title="Đăng xuất" href="/logout?action=logout">Đăng xuất</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col_1_1">
                        <div id="login" className="frm_content">
                            <h2>Thay đổi mật khẩu</h2>
                            {/* Xử lý hiển thị thông báo nếu cần */}
                            <form onSubmit={handleSubmit}>
                                {/*<div className="input">*/}
                                {/*    <label htmlFor="acc_oldPass"><span className="req">*</span>Tên đăng nhập</label>*/}
                                {/*    <input name="username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" maxLength="20" id="acc_username" />*/}
                                {/*</div>*/}
                                <div className="input">
                                    <label htmlFor="acc_oldPass"><span className="req">*</span>Mật khẩu cũ:</label>
                                    <input name="oldPass" value={oldPass} onChange={(e) => setOldPass(e.target.value)} type="password" maxLength="20" id="acc_oldPass" />
                                </div>
                                <div className="input">
                                    <label htmlFor="acc_newPass"><span className="req">*</span>Mật khẩu mới:</label>
                                    <input name="newPass" value={newPass} onChange={(e) => setNewPass(e.target.value)} type="password" maxLength="20" id="acc_newPass" />
                                </div>
                                <div className="input">
                                    <label htmlFor="acc_confirmPass"><span className="req">*</span>Xác nhận:</label>
                                    <input name="confirmPass" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" maxLength="20" id="acc_confirmPass" />
                                    {/* Thông báo lỗi nếu cần */}
                                </div>
                                {currentAlert === "error" && error && <div className="alert alert-danger">{error}</div>}
                                {currentAlert === "success" && success && <div className="alert alert-success">{success}</div>}
                                <button id="btn-save" type="submit" className="button">Lưu</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
