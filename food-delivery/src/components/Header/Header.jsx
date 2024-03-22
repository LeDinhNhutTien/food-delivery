import React, { useRef, useEffect, useState } from "react";
import { Container } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
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
    {
        display: "Admin",
        path: "/admin",
    },
];

const Header = () => {
    const menuRef = useRef(null);
    const headerRef = useRef(null);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const dispatch = useDispatch();
    const location = useLocation();
    const [isInAdminPage, setIsInAdminPage] = useState(false);

    const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

    const toggleCart = () => {
        dispatch(cartUiActions.toggle());
    };

    useEffect(() => {
        // Check if the current location is within the admin page
        setIsInAdminPage(location.pathname.startsWith("/admin"));
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                document.body.scrollTop > 80 ||
                document.documentElement.scrollTop > 80
            ) {
                headerRef.current.classList.add("header__shrink");
            } else {
                headerRef.current.classList.remove("header__shrink");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (isInAdminPage) {
        // Render nothing if in admin page
        return null;
    }

    return (
        <>
            <header className="header" ref={headerRef}>
                <Container>
                    <div className="nav__wrapper d-flex align-items-center justify-content-between">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                            <h5>Tasty Cake</h5>
                        </div>

                        {/* ======= menu ======= */}
                        <div
                            className="navigation"
                            ref={menuRef}
                            onClick={toggleMenu}
                        >
                            <div className="menu d-flex align-items-center gap-5">
                                {nav__links.map((item, index) => (
                                    <NavLink
                                        to={item.path}
                                        key={index}
                                        className={(navClass) =>
                                            navClass.isActive
                                                ? "active__menu"
                                                : ""
                                        }
                                    >
                                        {item.display}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        {/* ======== nav right icons ========= */}
                        <div className="nav__right d-flex align-items-center gap-4">
                            <span className="cart__icon" onClick={toggleCart}>
                                <i className="ri-shopping-basket-line"></i>
                                <span className="cart__badge">
                                    {totalQuantity}
                                </span>
                            </span>

                            <span className="user">
                                <Link to="/login">
                                    <i className="ri-user-line"></i>
                                </Link>
                            </span>

                            <span className="mobile__menu" onClick={toggleMenu}>
                                <i className="ri-menu-line"></i>
                            </span>
                        </div>
                    </div>
                </Container>
            </header>
            <footer className={isInAdminPage ? "hide" : ""}>
                {/* Your footer content */}
            </footer>
        </>
    );
};

export default Header;
