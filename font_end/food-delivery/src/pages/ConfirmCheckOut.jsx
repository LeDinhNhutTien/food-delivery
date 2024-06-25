import React, { useEffect, useState } from "react";
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import {useTranslation} from "react-i18next";
const ConfirmCheckOut = () => {

    const [shippingInfo, setShippingInfo] = useState({});
    const [orderDetails, setOrderDetails] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const userInfoLogin = JSON.parse(sessionStorage.getItem("userInfo"));
    const decodedToken = jwtDecode(userInfoLogin.accessToken);
    const id = decodedToken.id;
    const { t } = useTranslation();

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

        const userId = id;
        console.log(userId);
        const accessToken = sessionStorage.getItem("accessToken");
        axios.post('/api/confirmOrder', {
            shippingInfo,
            userId,
            storedCartItems // Thêm trường này
         },{
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
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
                        <span className="text-muted">{t('cartItems')}</span>
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
                                    <span className="badge bg-primary rounded-pill me-2">{t('price')}: ${item.price}</span>
                                    <br/>
                                    <span className="badge bg-secondary rounded-pill me-2">{t('quantity')}: {item.quantity}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">{t('confirmOrder')}</h4>

                    {/* Display shipping information */}
                    <div style={{marginTop: "20px", border: "1px solid #ccc", padding: "15px", borderRadius: "5px"}}>
                        <h5>{t('shippingInfo')}</h5>
                        <p><strong>{t('name')}:</strong> {shippingInfo.name}</p>
                        <p><strong>{t('phone')}:</strong> {shippingInfo.phone}</p>
                        <p><strong>{t('email')}:</strong> {shippingInfo.email}</p>
                        <p>
                            <strong>{t('address')}:</strong> {shippingInfo.address}, {shippingInfo.ward}, {shippingInfo.district}, {shippingInfo.province}
                        </p>
                        <p><strong>{t('note')}:</strong> {shippingInfo.note}</p>
                        <p><strong>{t('paymentMethod')}:</strong> {shippingInfo.paymentMethod}</p>
                        <p><strong>{t('totalPrice')}:</strong> ${shippingInfo.totalPrice}</p>
                    </div>

                    {/* Buttons for confirmation and returning */}
                    <div style={{ marginTop: "20px" }}>
                        <button style={{ backgroundColor: "#007bff", color: "#fff", borderRadius: "5px", padding: "10px", marginRight: "10px", cursor: "pointer" }} onClick={handleConfirm}>{t('confirmOrder')}</button>
                        <button style={{ backgroundColor: "#6c757d", color: "#fff", borderRadius: "5px", padding: "10px", cursor: "pointer" }} onClick={handleReturn}>{t('return')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ConfirmCheckOut;
