import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import "../../../styles/product-card.css";
import  testImage from '../../../assets/images/Product_Hamburger/western_burger_image1.jpg'
const ProductCard = (props) => {
    const { id, name, imageUrls, price } = props.item; // Assuming imageUrls is an array
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                id,
                name,
                imageUrl: imageUrls[0], // Only take the first image URL
                price,
            })
        );
    };

    return (
        <div className="product__item">
            <div className="product__img">
                <img src={imageUrls[0]} alt="product-img" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            </div>



            <div className="product__content">
                <h5>
                    <Link to={`/foods/${id}`}>{name}</Link>
                </h5>
                <div style={{ fontSize : '10px'}} className=" d-flex align-items-center justify-content-between ">
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
