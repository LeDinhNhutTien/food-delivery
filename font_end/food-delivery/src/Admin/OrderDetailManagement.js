import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/order-detail.css';
import { useNavigate } from "react-router-dom";

const OrderDetailManagement = () => {
    const [orderDetail, setOrderDetail] = useState([]);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [selectedStatuses, setSelectedStatuses] = useState({});
    const userLogin = JSON.parse(sessionStorage.getItem("userInfo"));
    const [orderDetailInfo, setOrderDetailInfo] = useState([]);


    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const orderId = new URLSearchParams(window.location.search).get("id");
                const response = await fetch(`http://localhost:8080/api/managementOrderAdmin/getOrder/${orderId}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrderDetail(data);
                } else {
                    console.error("Error fetching order detail");
                }
            } catch (error) {
                console.error("Error fetching order detail:", error);
            }
        };

        fetchOrderDetail();
    }, []);

    useEffect(() => {
        const getCustomer = async () => {
            try {
                const orderId = new URLSearchParams(window.location.search).get("id");
                const response = await fetch(`http://localhost:8080/api/managementOrderAdmin/getCustomer/${orderId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                } else {
                    console.error("Error fetching customer detail");
                }
            } catch (error) {
                console.error("Error fetching customer detail:", error);
            }
        };

        getCustomer();
    }, []);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const orderId = new URLSearchParams(window.location.search).get("id");
                const response = await fetch(`http://localhost:8080/api/managementOrderAdmin/orderDetailInfo/${orderId}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrderDetailInfo(data);
                } else {
                    console.error("Error fetching order detail");
                }
            } catch (error) {
                console.error("Error fetching order detail:", error);
            }
        };
        fetchOrderDetail();
    }, []);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const updateOrder = async (orderId, event) => {
        event.preventDefault();
        const state = selectedStatuses[orderId];
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            const response = await fetch(`http://localhost:8080/api/managementOrderAdmin/updateOrder/${orderId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({ state }),
            });
            if (response.ok) {
                navigate('/orderManagement');
                console.log('Đã cập nhật đơn hàng thành công');

                // Update the order status in orderDetail
                setOrderDetail(prevDetails => prevDetails.map(order =>
                    order.orderID === orderId ? { ...order, orderStatus: state } : order
                ));
            } else {
                console.error('Error updating order');
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleStatusChange = (orderID, event) => {
        const newStatus = event.target.value;
        setSelectedStatuses({
            ...selectedStatuses,
            [orderID]: newStatus,
        });
        console.log(`Status for order ${orderID} changed to ${newStatus}`);
    };

    return (
        <div className="container" style={{ minHeight: "600px" }}>
            <div>
                <h1 className="text-center my-4" style={{ paddingTop: "60px" }}>Chi tiết đơn hàng</h1>
            </div>
            {Array.isArray(orderDetail) && orderDetail.map(order => (
                <form acceptCharset="UTF-8" key={order.orderID} onSubmit={(event) => updateOrder(order.orderID, event)}>
                    <div className="row">
                        <div className="col-md-6">
                            <h2 style={{fontSize: "25px"}}>Thông tin khách hàng</h2>
                            <table className="table">
                                <tbody>
                                <tr>
                                    <td>Tên:</td>
                                    <td>{userInfo.username}</td>
                                </tr>
                                <tr>
                                    <td>Địa chỉ:</td>
                                    <td>{userInfo.address}</td>
                                </tr>
                                <tr>
                                    <td>Số điện thoại:</td>
                                    <td>{userInfo.phone}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6">
                            <h2 style={{fontSize: "25px"}}>Thông tin đơn hàng</h2>
                            <table className="table">
                                <tbody>
                                <tr>
                                    <td>Mã đơn hàng:</td>
                                    <td>{order.orderID}</td>
                                </tr>
                                <tr>
                                    <td>Ngày đặt hàng:</td>
                                    <td>{formatDate(order.creationDate)}</td>
                                </tr>
                                <tr>
                                    <td>Tổng giá trị:</td>
                                    <td>{order.price} VNĐ</td>
                                </tr>
                                <tr>
                                    <td>Tình trạng:</td>
                                    <td>
                                        <select style={{background: "#ededb4", border: "#e1baba"}}
                                            value={selectedStatuses[order.orderID] || order.orderStatus}
                                            onChange={(event) => handleStatusChange(order.orderID, event)}
                                        >
                                            <option value="Chờ xử lý" selected={order.orderStatus === "Chờ xử lý"}>Chờ xử lý</option>
                                            <option value="Đang giao" selected={order.orderStatus === "Đang giao"}>Đang giao</option>
                                            <option value="Đã giao" selected={order.orderStatus === "Đã giao"}>Đã giao</option>
                                            <option value="Hủy đơn" selected={order.orderStatus === "Hủy đơn"}>Hủy đơn</option>
                                        </select>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h2 style={{fontSize: "25px"}}>Danh sách sản phẩm</h2>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Tên sản phẩm</th>
                                    <th scope="col">Ảnh</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Tổng tiền</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Array.isArray(orderDetailInfo) && orderDetailInfo.map(orderInfo => (
                                    <tr key={orderInfo}>
                                        <td style={{ verticalAlign: "top", paddingBottom: "10px" }}>{orderInfo.productName}</td>
                                        <td style={{ verticalAlign: "top", paddingBottom: "10px" }}>
                                            <img style={{ height: "50px" }} src={orderInfo.imageUrl} alt="product" />
                                        </td>
                                        <td style={{ verticalAlign: "top", paddingBottom: "10px" }}>{orderInfo.totalAmount}</td>
                                        <td style={{ verticalAlign: "top", paddingBottom: "10px" }}>{orderInfo.price}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="parent-button">
                                <button className="centered-button" type="submit">Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </form>
            ))}
        </div>
    );
};

export default OrderDetailManagement;
