import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/account.css';


const Account = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    const [formData, setFormData] = useState({
        username: userInfo.username || "",
        firstName: userInfo.first_name || "",
        lastName: userInfo.last_name || "",
        phone: userInfo.phone || "",
        address: userInfo.address || "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [currentAlert, setCurrentAlert] = useState("");

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/accountUpdate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedUserInfo = await response.json();
                setSuccess("Thông tin đã được cập nhật");
                setCurrentAlert("success");
                setFormData({
                    ...formData,
                    username: updatedUserInfo.username,
                    firstName: updatedUserInfo.first_name,
                    lastName: updatedUserInfo.last_name,
                    phone: updatedUserInfo.phone,
                    address: updatedUserInfo.address,
                });
                // Lưu thông tin người dùng vào session storage
                sessionStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
                setCurrentAlert("error");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogout = () => {
        // Xóa sessionStorage khi người dùng đăng xuất
        sessionStorage.removeItem("userInfo");
        // Chuyển hướng người dùng đến trang đăng nhập hoặc trang chính
        window.location.href = "/home"; // Thay đổi đường dẫn tùy theo yêu cầu của bạn
    };
    // set active khi nhan vao
    function setActiveTab(tabId) {
        const tabLinks = document.querySelectorAll('.tablinks');
        tabLinks.forEach(link => {
            link.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    }
    return (
        <div id="content">
            <div className="wrapper">
                <div className="form_ctrl">
                    <div className="acc_ctrl m_r12">
                        <h2>Tài khoản</h2>
                        <div className="list_ctrl">
                            <ul>
                                <li className="first active">
                                    <a id="account" title="Thông tin tài khoản" href="/account" onClick={() => setActiveTab('account')}>Thông tin tài khoản</a>
                                </li>
                                <li className="first">
                                    <a id="changePassword" title="Đổi mật khẩu" href="/changePassword" onClick={() => setActiveTab('changePassword')}>Đổi mật khẩu</a>
                                </li>
                                <li className="first">
                                    <a id="reviewOrders" title="Xem lại đơn hàng" href="/reviewOrder" onClick={() => setActiveTab('reviewOrders')}>Xem lại đơn hàng</a>
                                </li>
                                <li className="first">
                                    <a id="logout" title="Đăng xuất" href="/home" onClick={handleLogout}>Đăng xuất</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col_1_1">
                        <div id="login" className="frm_content">
                            <h2>Cập nhật thông tin tài khoản</h2>
                            <form id="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                                <div className="input ">
                                    <label><span className="req">*</span>Tên đăng nhập:</label>
                                    <input name="userName" type="text" value={formData.username} onChange={handleChange} onKeyPress={handleKeyPress} maxLength="150" id="acc_email" />
                                    <small>{error}</small>
                                </div>
                                <div className="input ">
                                    <label htmlFor="acc_fname"><span className="req">*</span>Họ:</label>
                                    <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} onKeyPress={handleKeyPress} maxLength="150" id="acc_fname" />
                                    <small>{error}</small>
                                </div>
                                <div className="input ">
                                    <label htmlFor="acc_lname"><span className="req">*</span>Tên:</label>
                                    <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} onKeyPress={handleKeyPress} maxLength="150" id="acc_lname" />
                                    <small>{error}</small>
                                </div>
                                <div className="input ">
                                    <label htmlFor="acc_phoneNumber"><span className="req">*</span>Điện thoại:</label>
                                    <input name="phone" type="tel" value={formData.phone} onChange={handleChange} onKeyPress={handleKeyPress} id="acc_phoneNumber" />
                                    <small>{error}</small>
                                </div>
                                <div>
                                    <label htmlFor="acc_address"><span className="req">*</span>Địa chỉ:</label>
                                    <input name="address" type="text" value={formData.address} onChange={handleChange} onKeyPress={handleKeyPress} maxLength="250" id="acc_address" />
                                </div>
                                {currentAlert === "error" && error && <div className="alert alert-danger">{error}</div>}
                                {currentAlert === "success" && success && <div className="alert alert-success">{success}</div>}
                                <button className="button">Lưu</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
