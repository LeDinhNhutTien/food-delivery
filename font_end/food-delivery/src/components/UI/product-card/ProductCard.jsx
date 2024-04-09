import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import "../../../styles/product-card.css";
import image from "../../../assets/images/Product_Hamburger/classic_hamburger.jpg"
const ProductCard = (props) => {
    const { id, name, imageUrl, price } = props.item;
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                id,
                name,
                imageUrl,
                price,
            })
        );
    };

    return (
        <div className="product__item">
            <div className="product__img">
                <img src={"../../../assets/images/Product_Hamburger/classic_hamburger.jpg"} alt="product-img" className="w-50" />
            </div>

            <div className="product__content">
                <h5>
                    <Link to={`/foods/${id}`}>{name}</Link>
                </h5>
                <div className=" d-flex align-items-center justify-content-between ">
                    <span className="product__price">${price}</span>
                    <button className="addTOCart__btn" onClick={addToCart}>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
