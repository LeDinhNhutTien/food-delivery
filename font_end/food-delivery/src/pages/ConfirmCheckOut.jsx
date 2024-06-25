import React, { useEffect, useState } from "react";
import axios from 'axios';
const ConfirmCheckOut = () => {

    const [shippingInfo, setShippingInfo] = useState({});
    const [orderDetails, setOrderDetails] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    console.log(shippingInfo);
    const userLogin = JSON.parse(sessionStorage.getItem("userInfo"));

    useEffect(() => {
        if (!userLogin) {
            window.location.href = "/login";
        }
    }, [userLogin]);
    useEffect(() => {
        const storedShippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};
        const storedOrderDetails = JSON.parse(localStorage.getItem("orderDetails")) || [];
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const storedUserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        setUserInfo(storedUserInfo);

        setShippingInfo(storedShippingInfo);
        setOrderDetails(storedOrderDetails);
        setCartItems(storedCartItems);
    }, []);

    const handleConfirm = () => {

        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        const userId = userInfo ? userInfo.id : 0;
        console.log(userId);

        axios.post('/api/confirmOrder', {
            shippingInfo,
            userId,
            storedCartItems // Thêm trường này
        })
            .then(response => {
                localStorage.removeItem("shippingInfo");
                localStorage.removeItem("orderDetails");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("totalAmount");
                localStorage.removeItem("totalQuantity");
                window.location.href = "/reviewOrder";
            })
            .catch(error => {
                 window.location.href = "/checkout";
            });
    };


    const handleReturn = () => {

        console.log("Returned to previous page!");
    };

    return (
        <div style={{ maxWidth: "70%", margin: "0 auto", marginTop: "80px", marginBottom: "80px" }}>
            <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Giỏ hàng của bạn</span>
                        <span className="badge badge-secondary badge-pill">{cartItems.length}</span>
                    </h4>
                    <ul className="list-group">
                        {cartItems.map((item, index) => (
                            <li key={index} style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "10px",
                                borderBottom: "1px solid #ccc"
                            }}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <img src={item.imageUrl} alt={item.name}
                                         style={{width: "50px", marginRight: "10px"}}/>
                                    <span>{item.name}</span>
                                </div>
                                <div>
                                    <span className="badge bg-primary rounded-pill me-2">Giá: ${item.price}</span>
                                    <br/>
                                    <span
                                        className="badge bg-secondary rounded-pill me-2">Số lượng: {item.quantity}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Xác nhận đơn hàng</h4>

                    {/* Display shipping information */}
                    <div style={{marginTop: "20px", border: "1px solid #ccc", padding: "15px", borderRadius: "5px"}}>
                        <h5>Thông tin vận chuyển</h5>
                        <p><strong>Tên:</strong> {shippingInfo.name}</p>
                        <p><strong>Số điện thoại:</strong> {shippingInfo.phone}</p>
                        <p><strong>Email:</strong> {shippingInfo.email}</p>
                        <p>
                            <strong>Địa chỉ:</strong> {shippingInfo.address}, {shippingInfo.ward}, {shippingInfo.district}, {shippingInfo.province}
                        </p>
                        <p><strong>Ghi chú:</strong> {shippingInfo.note}</p>
                        <p><strong>Phương thức thanh toán:</strong> {shippingInfo.paymentMethod}</p>
                        <p><strong>Tổng tiền:</strong> ${shippingInfo.totalPrice}</p>
                    </div>

                    {/* Buttons for confirmation and returning */}
                    <div style={{ marginTop: "20px" }}>
                        <button style={{ backgroundColor: "#007bff", color: "#fff", borderRadius: "5px", padding: "10px", marginRight: "10px", cursor: "pointer" }} onClick={handleConfirm}>Xác nhận đơn hàng</button>
                        <button style={{ backgroundColor: "#6c757d", color: "#fff", borderRadius: "5px", padding: "10px", cursor: "pointer" }} onClick={handleReturn}>Trở về</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmCheckOut;
