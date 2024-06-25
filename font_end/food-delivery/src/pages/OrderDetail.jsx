import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/order-detail.css';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const OrderDetail = () => {
    const { t } = useTranslation();
    const [userInfo, setUserInfo] = useState({});
    const [orderDetail, setOrderDetail] = useState([]);
    const [orderDetailInfo, setOrderDetailInfo] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const orderId = new URLSearchParams(window.location.search).get("id");
                const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                const accessToken = sessionStorage.getItem("accessToken");
                const response = await fetch(`http://localhost:8080/api/orderDetail/${orderId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    });

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
        const fetchOrderDetail = async () => {
            try {
                const orderId = new URLSearchParams(window.location.search).get("id");
                const accessToken = sessionStorage.getItem("accessToken");
                const response = await fetch(`http://localhost:8080/api/orderDetailInfo/${orderId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    });
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

    useEffect(() => {
        const getCustomer = async () => {
            try {
                const orderId = new URLSearchParams(window.location.search).get("id");
                const accessToken = sessionStorage.getItem("accessToken");
                const response = await fetch(`http://localhost:8080/api/getCustomer/${orderId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    });
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

    // Function để format ngày
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
    };

    // Thay thế thẻ button bằng sự kiện onClick trực tiếp trên nút "Hủy đơn" và ngăn chặn hành vi mặc định của trình duyệt
    const cancelOrder = async (orderId, event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            const response = await fetch(`http://localhost:8080/api/cancelOrder/${orderId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                },
            });
            if (response.ok) {
                // Xử lý thành công, có thể cập nhật UI hoặc hiển thị thông báo
                navigate('/reviewOrder')
                console.log('Đã hủy đơn hàng thành công');
            } else {
                console.error('Error cancelling order');
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };

    return (
        <div className="container" style={{ minHeight: '600px' }}>
            <div>
                <h1 className="text-center my-4" style={{ paddingTop: '60px' }}>
                    {t('orderDetailTitle')}
                </h1>
            </div>
            {Array.isArray(orderDetail) &&
                orderDetail.map((order) => (
                    <form action="" method="post" acceptCharset="UTF-8" key={order.orderID}>
                        <div className="row">
                            <div className="col-md-6">
                                <h2 style={{ fontSize: '25px' }}>{t('customerInfoTitle')}</h2>
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <td>{t('nameLabel')}:</td>
                                        <td>{userInfo.username}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('addressLabel')}:</td>
                                        <td>{userInfo.address}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('phoneNumberLabel')}:</td>
                                        <td>{userInfo.phone}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-6">
                                <h2 style={{ fontSize: '25px' }}>{t('orderInfoTitle')}</h2>
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <td>{t('orderIdLabel')}:</td>
                                        <td>{order.orderID}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('orderDateLabel')}:</td>
                                        <td>{formatDate(order.creationDate)}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('totalValueLabel')}:</td>
                                        <td>{order.price} VNĐ</td>
                                    </tr>
                                    <tr>
                                        <td>{t('orderStatusLabel')}:</td>
                                        <td>{order.orderStatus}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <h2 style={{ fontSize: '25px' }}>{t('productListTitle')}</h2>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">{t('productName')}</th>
                                        <th scope="col">{t('image')}</th>
                                        <th scope="col">{t('quantity')}</th>
                                        <th scope="col">{t('totalPrice')}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Array.isArray(orderDetailInfo) &&
                                        orderDetailInfo.map((orderInfo) => (
                                            <tr key={orderInfo}>
                                                <td style={{ verticalAlign: 'top', paddingBottom: '10px' }}>{orderInfo.productName}</td>
                                                <td style={{ verticalAlign: 'top', paddingBottom: '10px' }}>
                                                    <img style={{ height: '50px' }} src={orderInfo.imageUrl} alt="product" />
                                                </td>
                                                <td style={{ verticalAlign: 'top', paddingBottom: '10px' }}>{orderInfo.totalAmount}</td>
                                                <td style={{ verticalAlign: 'top', paddingBottom: '10px' }}>{orderInfo.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="parent-button">
                                    <button className="centered-button" onClick={(event) => cancelOrder(order.orderID, event)}>
                                        {t('cancelOrderButton')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                ))}
        </div>
    );
};

export default OrderDetail;
