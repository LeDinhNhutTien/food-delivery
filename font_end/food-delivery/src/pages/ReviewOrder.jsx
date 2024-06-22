import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/review-order.css';
import { Link } from "react-router-dom";

const ReviewOrder = () => {
    const [allOrders, setAllOrders] = useState([]);
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || '{}');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/historyOrders?id_user=${userInfo.id_user || ""}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (response.ok) {
                    const rawData = await response.text();
                    try {
                        const trimmedData = rawData.trim();
                        const data = JSON.parse(trimmedData);
                        setAllOrders(data);
                        console.log("History Success", data);
                    } catch (jsonError) {
                        console.error("JSON parsing error:", jsonError);
                    }
                } else if (response.status === 404) {
                    setAllOrders([]);
                } else {
                    console.error("History error", response.status, await response.text());
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (userInfo.id_user) {
            fetchData();
        } else {
            console.error("User info is not available.");
        }
    }, [userInfo.id_user]); // Depend on userInfo.id_user for fetching when it changes

    const handleLogout = () => {
        // Assuming you want to redirect to home on logout
        window.location.href = "/home";
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
    };

    const setActiveTab = (tabId) => {
        const tabLinks = document.querySelectorAll('.tablinks');
        tabLinks.forEach(link => {
            link.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
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
                                    <Link id="account" to="/account" className="tablinks" onClick={() => setActiveTab('account')}>Thông tin tài khoản</Link>
                                </li>
                                <li className="first">
                                    <Link id="changePassword" to="/changePassword" className="tablinks" onClick={() => setActiveTab('changePassword')}>Đổi mật khẩu</Link>
                                </li>
                                <li className="first active">
                                    <Link id="reviewOrders" to="/reviewOrder" className="tablinks" onClick={() => setActiveTab('reviewOrders')}>Xem lại đơn hàng</Link>
                                </li>
                                <li className="first">
                                    <Link id="logout" to="/home" onClick={handleLogout}>Đăng xuất</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col_1_1">
                        <div className="order-box" style={{ width: "838px" }}>
                            <div className="order-box-header">
                                <div className="order-box-header-left">
                                    Thông tin đơn hàng
                                </div>
                            </div>
                            <div className="paging">
                                <div className="tab">
                                </div>
                                <div id="ChoXacNhan" className="tabcontent">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">Mã đơn</th>
                                            <th scope="col">Tên sản phẩm</th>
                                            <th scope="col">Ảnh</th>
                                            <th scope="col">Ngày</th>
                                            <th scope="col">Tình trạng</th>
                                            <th scope="col">Chi tiết</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {allOrders.map(order => (
                                            <tr key={order.orderID}>
                                                <td style={{ width: "73px", paddingTop: "20px" }}>{order.orderID}</td>
                                                <td style={{ width: "63px", paddingTop: "20px" }}>
                                                    {order.productName.split(', ').map((name, index) => (
                                                        <div key={index} style={{ marginBottom: "20px" }}>{name}</div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {order.imageUrl.split(', ').map((url, index) => (
                                                        <div key={index} style={{ marginBottom: "10px" }}><img style={{ height: "50px" }} src={url} alt="product" /></div>
                                                    ))}
                                                </td>
                                                <td style={{ paddingTop: "20px" }}>{formatDate(order.creationDate)}</td>
                                                <td style={{ paddingTop: "20px" }}>{order.orderStatus}</td>
                                                <td style={{ paddingTop: "20px" }}>
                                                    <Link className="btn_blue" to={`/orderDetail?id=${order.orderID}`}>Chi tiết</Link>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewOrder;
