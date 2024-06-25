import React, { useRef, useEffect, useState } from "react";
import { Container } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
import { useTranslation } from 'react-i18next';
import "../../styles/header.css";

const nav__links = [
    {
        display: "Trang chủ",
        path: "/home",
    },
    {
        display: "Bánh",
        path: "/foods",
    },
    {
        display: "Giỏ hàng",
        path: "/cart",
    },
    {
        display: "Liên hệ",
        path: "/contact",
    },
];

const Header = () => {
    const { t, i18n } = useTranslation(); // Initialize useTranslation hook
    const menuRef = useRef(null);
    const headerRef = useRef(null);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const dispatch = useDispatch();
    const location = useLocation();
    const [hideHeaderFooter, setHideHeaderFooter] = useState(false);
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    useEffect(() => {
        const isAdminPage = location.pathname === "/admin";
        const isUserAdminPage = location.pathname.trim() === "/userManagement";
        const isProductAdminPage = location.pathname.trim() === "/productManagement";
        const isRevenueAdminPage = location.pathname.trim() === "/revenueManagement";
        const addUser = location.pathname.trim() === "/addUser";
        const isRoot = location.pathname.trim() === "/root";
        const isDiary = location.pathname.trim() === "/root/diary";
        const isOrderAdminPage = location.pathname.trim() === "/orderManagement";
        setHideHeaderFooter(isAdminPage || isUserAdminPage || isProductAdminPage || isOrderAdminPage || isRevenueAdminPage || addUser || isRoot || isDiary);
    }, [location]);

    const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

    const toggleCart = () => {
        dispatch(cartUiActions.toggle());
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng); // Function to change language
    };

    return (
        <>
            {!hideHeaderFooter && (
                <header className="header" ref={headerRef}>
                    <Container>
                        <div className="nav__wrapper d-flex align-items-center justify-content-between">
                            <Link to="/home">
                                <div className="logo">
                                    <img src={logo} alt="logo" />
                                    <h5>{t('Tasty Cake')}</h5>
                                </div>
                            </Link>

                            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                                <div className="menu d-flex align-items-center gap-5">
                                    {nav__links.map((item, index) => (
                                        <NavLink
                                            to={item.path}
                                            key={index}
                                            activeClassName="active__menu"
                                        >
                                            {t(item.display)}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>

                            <div className="nav__right d-flex align-items-center gap-4">
                                <span className="cart__icon" onClick={toggleCart}>
                                    <i className="ri-shopping-basket-line"></i>
                                    <span className="cart__badge">{totalQuantity}</span>
                                </span>

                                <span className="user">
                                    {userInfo ? (
                                        <Link to="/account">
                                            <span>{userInfo.username}</span>
                                        </Link>
                                    ) : (
                                        <Link to="/login">
                                            <i className="ri-user-line"></i>
                                        </Link>
                                    )}
                                </span>
                                <span className="mobile__menu" onClick={toggleMenu}>
                                    <i className="ri-menu-line"></i>
                                </span>

                                {/* Language Selection */}
                                <div className="language__container">
                                    <button className="language__button" onClick={() => changeLanguage('en')}>
                                        EN
                                    </button>
                                    <button className="language__button" onClick={() => changeLanguage('vi')}>
                                        VI
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Container>
                </header>
            )}
        </>
    );
};

export default Header;
