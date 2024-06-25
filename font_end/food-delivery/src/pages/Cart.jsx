import React, { useEffect } from "react";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Cart = () => {
    const { t } = useTranslation();
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    useEffect(() => {
        if (!userInfo) {
            window.location.href = "/login";
        }
    }, [userInfo]);

    const deleteItem = (id) => {
        dispatch(cartActions.removeItem(id));
    };

    const increaseQuantity = (item) => {
        dispatch(cartActions.addItem(item));
    };

    const decreaseQuantity = (id) => {
        dispatch(cartActions.removeItem(id));
    };

    return (
        <Helmet title={t("Your Cart")}>
            <CommonSection title={t("Your Cart")} />
            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            {cartItems.length === 0 ? (
                                <h5 className="text-center">{t("Your cart is empty")}</h5>
                            ) : (
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>{t("Image")}</th>
                                        <th>{t("Product Name")}</th>
                                        <th>{t("Price")}</th>
                                        <th>{t("Quantity")}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartItems.map((item) => (
                                        <CartItemRow
                                            key={item.id}
                                            item={item}
                                            increaseQuantity={increaseQuantity}
                                            decreaseQuantity={decreaseQuantity}
                                        />
                                    ))}
                                    </tbody>
                                </table>
                            )}

                            <div className="mt-4">
                                <h6>
                                    {t("Total")}: $
                                    <span className="cart__subtotal">{totalAmount}</span>
                                </h6>
                                <p>{t("Taxes and shipping will be calculated at checkout")}</p>
                                <div className="cart__page-btn">
                                    <button className="addTOCart__btn me-4">
                                        <Link to="/foods">{t("Continue Shopping")}</Link>
                                    </button>
                                    {cartItems.length > 0 ? (
                                        <button className="addTOCart__btn">
                                            <Link to="/checkout">{t("Proceed to Checkout")}</Link>
                                        </button>
                                    ) : (
                                        <button className="addTOCart__btn" disabled>
                                            {t("Proceed to Checkout")}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

const CartItemRow = ({ item, increaseQuantity, decreaseQuantity }) => {
    const { id, imageUrl, name, price, quantity } = item;

    return (
        <tr>
            <td className="text-center cart__img-box">
                <img src={imageUrl} alt={name} />
            </td>
            <td className="text-center">{name}</td>
            <td className="text-center">${price}</td>
            <td className="text-center">
                <div className="d-flex align-items-center justify-content-center">
                    <button className="btn btn-sm btn-secondary" onClick={() => decreaseQuantity(id)}>-</button>
                    <span className="mx-2">{quantity}</span>
                    <button className="btn btn-sm btn-secondary" onClick={() => increaseQuantity(item)}>+</button>
                </div>
            </td>
        </tr>
    );
};

export default Cart;
