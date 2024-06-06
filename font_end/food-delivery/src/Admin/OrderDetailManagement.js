import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/order-detail.css';
import { useNavigate } from "react-router-dom";

const OrderDetailManagement = () => {
    const [orderDetail, setOrderDetail] = useState([]);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState({});

    const statuses = [
        {
            label: "Đang xử lý",
            options: ["Đang xử lý"]
        },
        {
            label: "Đang giao hàng",
            options: ["Đang giao hàng"]
        },
        {
            label: "Đã hoàn thành",
            options: ["Đã giao"]
        },
        {
            label: "Đã hủy",
            options: ["Hủy"]
        }
    ];


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
                    console.error("Error fetching order detail");
                }
            } catch (error) {
                console.error("Error fetching order detail:", error);
            }
        };

        getCustomer();
    }, []);

    // Function để format ngày
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
    };

    const updateOrder = async (orderId, event) => {
        event.preventDefault();
        const state = selectedStatuses[orderId];
        try {
            const response = await fetch(`http://localhost:8080/api/managementOrderAdmin/updateOrder/${orderId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ state }),
            });
            if (response.ok) {
                navigate('/orderManagement');
                console.log('Đã cập nhật đơn hàng thành công');
            } else {
                console.error('Error updating order');
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };


    const handleStatusChange = (orderID, event) => {
        const { options } = event.target;
        const selectedOptions = [];
        for (const option of options) {
            if (option.selected) {
                selectedOptions.push(option.value);
            }
        }
        setSelectedStatuses({
            ...selectedStatuses,
            [orderID]: selectedOptions,
        });
    };

    return (
        <div className="container" style={{ minHeight: "600px" }}>
            <div>
                <h1 className="text-center my-4" style={{ paddingTop: "60px" }}>Chi tiết đơn hàng</h1>
            </div>
            {Array.isArray(orderDetail) && orderDetail.map(order => (
                <form action="" method="post" acceptCharset="UTF-8" key={order.orderID}>
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
                                    <td>{formatDate(order.date)}</td>
                                </tr>
                                <tr>
                                    <td>Tổng giá trị:</td>
                                    <td>{order.totalPrice} VNĐ</td>
                                </tr>
                                <tr>
                                    <td>Tình trạng:</td>
                                    <td>
                                        <select
                                            value={order.OrderStatus}
                                            onChange={(e) => handleStatusChange(order.orderID, e)}
                                        >
                                            {statuses.map((statusGroup) => (
                                                <optgroup key={statusGroup.label}>
                                                    {statusGroup.options.map((status) => (
                                                        <option key={status} value={status}>{status}</option>
                                                    ))}
                                                </optgroup>
                                            ))}
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
                                <tr key={order.orderID}>
                                    <td>{order.name}</td>
                                    <td><img style={{ height: "50px" }} src={order.url} alt="product" /></td>
                                    <td>{order.quantity}</td>
                                    <td>{order.totalPrice}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="parent-button">
                                <button className="centered-button" onClick={(event) => updateOrder(order.orderID, event)}>Cập nhật</button>
                            </div>
                        </div>
                    </div>
                </form>
            ))}
        </div>
    );
};

export default OrderDetailManagement;
