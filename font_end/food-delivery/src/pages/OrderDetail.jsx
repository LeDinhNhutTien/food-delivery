import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/order-detail.css';

const OrderDetail = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const [orderDetail, setOrderDetail] = useState([]);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const orderId = new URLSearchParams(window.location.search).get("id");
                const response = await fetch(`http://localhost:8080/api/orderDetail/${orderId}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrderDetail(data);
                    console.error("Error order detail");
                } else {
                    console.error("Error fetching order detail");
                }
            } catch (error) {
                console.error("Error fetching order detail:", error);
            }
        };

        fetchOrderDetail();
    }, []);

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
                                <td>{order.date}</td>
                            </tr>
                            <tr>
                                <td>Tổng giá trị:</td>
                                <td>{order.price} VNĐ</td>
                            </tr>
                            <tr>
                                <td>Tình trạng:</td>
                                <td>{order.status}</td>
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
                                     <td>{order.price}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="parent-button">
                            <button className="centered-button">Hủy đơn</button>
                        </div>
                    </div>
                </div>
            </form>
            ))}
        </div>
    );
};

export default OrderDetail;
