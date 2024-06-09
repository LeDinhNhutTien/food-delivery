import React, {useEffect, useRef} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/review-order.css';
import {useState} from "react";


const ReviewOrder = () => {
    const [allOrders, setAllOrders] = useState([]);
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    function openCity(evt, cityName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/historyOrders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ idUser: userInfo.id_user || "" }),
                });
                if (response.ok) {
                    const data = await response.json();
                    setAllOrders(data);
                    console.error("History Success");
                }else {
                    const errorMessage = await response.text();
                    console.error("History error " + errorMessage);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        // Xóa sessionStorage khi người dùng đăng xuất
        sessionStorage.removeItem("userInfo");
        // Chuyển hướng người dùng đến trang đăng nhập hoặc trang chính
        window.location.href = "/home"; // Thay đổi đường dẫn tùy theo yêu cầu của bạn
    };

    // Function để format ngày
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
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
                                <li className="first">
                                    <a id="account" title="Thông tin tài khoản" href="/account" onClick={() => setActiveTab('account')}>Thông tin tài khoản</a>
                                </li>
                                <li className="first">
                                    <a id="changePassword" title="Đổi mật khẩu" href="/changePassword" onClick={() => setActiveTab('changePassword')}>Đổi mật khẩu</a>
                                </li>
                                <li className="first active">
                                    <a id="reviewOrders" title="Xem lại đơn hàng" href="/reviewOrder" onClick={() => setActiveTab('reviewOrders')}>Xem lại đơn hàng</a>
                                </li>
                                <li className="first">
                                    <a id="logout" title="Đăng xuất" href="/home" onClick={handleLogout}>Đăng xuất</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col_1_1">
                        <div className="order-box" style={{width: "838px"}}>
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
                                                <td style={{width: "73px", paddingTop: "20px"}}>{order.orderID}</td>
                                                <td style={{width: "63px", paddingTop: "20px"}}>
                                                    {order.name.split(', ').map((name, index) => (
                                                        <div key={index} style={{ marginBottom: "20px" }}>{name}</div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {order.url.split(', ').map((url, index) => (
                                                        <div key={index} style={{ marginBottom: "10px" }}><img style={{ height: "50px" }} src={url} alt="product" /></div>
                                                    ))}
                                                </td>
                                                <td style={{paddingTop: "20px"}}>{formatDate(order.date)}</td>
                                                <td style={{paddingTop: "20px"}}>{order.status}</td>
                                                <td style={{paddingTop: "20px"}}><a className="btn_blue" href={`/orderDetail?id=${order.orderID}`}>Chi tiết</a></td>
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
