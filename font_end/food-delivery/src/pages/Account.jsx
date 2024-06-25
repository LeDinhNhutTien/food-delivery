import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/account.css';
import { useTranslation } from "react-i18next";
import {jwtDecode} from "jwt-decode";

const Account = () => {
    const { t } = useTranslation();

    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const decodedToken = jwtDecode(userInfo.accessToken);
    const id = decodedToken.id;



    const [formData, setFormData] = useState({
        username: userInfo.username || "",
        first_name: userInfo.first_name || "",
        last_name: userInfo.last_name || "",
        phone: userInfo.phone || "",
        address: userInfo.address || "",
        id_user: id || "",
        role: userInfo.role || "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [currentAlert, setCurrentAlert] = useState("");

    // Function to fetch user data from backend on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/customer/${id}`);
                if (response.ok) {
                    const userData = await response.json();
                    console.log(userData.body);

                    // Update formData based on userData.body
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        username: userData.body.username || prevFormData.username,
                        first_name: userData.body.first_name || prevFormData.first_name,
                        last_name: userData.body.last_name || prevFormData.last_name,
                        phone: userData.body.phone || prevFormData.phone,
                        address: userData.body.address || prevFormData.address,
                        role: userData.body.role || prevFormData.role,
                    }));
                } else {
                    setError(t("fetchUserDataError"));
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError(t("fetchUserDataError"));
            }
        };

        fetchUserData();
    }, [id, t]);
    // Dependency array ensures useEffect runs only on mount and when 'id' changes

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
                setSuccess(t("updateSuccess"));
                setCurrentAlert("success");

                setError(""); // Clear any previous error on success
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || t("updateError"));
                setCurrentAlert("error");
            }
        } catch (error) {
            console.error("Error:", error);
            setError(t("updateError"));
            setCurrentAlert("error");
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
        sessionStorage.removeItem("userInfo");
        window.location.href = "/home"; // Redirect to login or homepage
    };

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
                        <h2>{t("accountTitle")}</h2>
                        <div className="list_ctrl">
                            <ul>
                                <li className="first active">
                                    <a id="account" title="Thông tin tài khoản" href="/account" onClick={() => setActiveTab('account')}>Thông tin tài khoản</a>
                                </li>
                                <li className="first ">
                                    <a id="changePassword" title="Đổi mật khẩu" href="/changePassword" onClick={() => setActiveTab('changePassword')}>Đổi mật khẩu</a>
                                </li>
                                <li className="first ">
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
                            <h2>{t("updateAccountInfo")}</h2>
                            <form id="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                                <div className="input ">
                                    <label><span className="req">*</span>{t("usernameLabel")}:</label>
                                    <input readOnly name="username" type="text" value={formData.username} onChange={handleChange} onKeyPress={handleKeyPress} maxLength="150" id="acc_email" />
                                    <small>{error}</small>
                                </div>
                                <div className="input ">
                                    <label htmlFor="acc_fname"><span className="req">*</span>{t("firstNameLabel")}:</label>
                                    <input name="first_name" type="text" value={formData.first_name} onChange={handleChange} onKeyPress={handleKeyPress} maxLength="150" id="acc_fname" />
                                    <small>{error}</small>
                                </div>
                                <div className="input ">
                                    <label htmlFor="acc_lname"><span className="req">*</span>{t("lastNameLabel")}:</label>
                                    <input name="last_name" type="text" value={formData.last_name} onChange={handleChange} onKeyPress={handleKeyPress} maxLength="150" id="acc_lname" />
                                    <small>{error}</small>
                                </div>
                                <div className="input ">
                                    <label htmlFor="acc_phoneNumber"><span className="req">*</span>{t("phoneLabel")}:</label>
                                    <input name="phone" type="tel" value={formData.phone} onChange={handleChange} onKeyPress={handleKeyPress} id="acc_phoneNumber" />
                                    <small>{error}</small>
                                </div>
                                <div>
                                    <label htmlFor="acc_address"><span className="req">*</span>{t("addressLabel")}:</label>
                                    <input name="address" type="text" value={formData.address} onChange={handleChange} onKeyPress={handleKeyPress} maxLength="250" id="acc_address" />
                                </div>
                                {currentAlert === "error" && error && <div className="alert alert-danger">{error}</div>}
                                {currentAlert === "success" && success && <div className="alert alert-success">{success}</div>}
                                <button className="button">{t("saveButton")}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
