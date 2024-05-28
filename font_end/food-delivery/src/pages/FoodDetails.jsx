import React, {useState, useEffect} from "react";

import products from "../assets/fake-data/products";
import {useParams} from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import {Container, Row, Col} from "reactstrap";

import {useDispatch} from "react-redux";
import {cartActions} from "../store/shopping-cart/cartSlice";

import "../styles/product-details.css";

import ProductCard from "../components/UI/product-card/ProductCard";

const FoodDetails = () => {
    const [tab, setTab] = useState("desc");
    const [enteredName, setEnteredName] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [reviewMsg, setReviewMsg] = useState("");
    const dispatch = useDispatch();
    const [productDetail, setProductDetail] = useState();

    // const product = products.find((product) => product.id === id);
    // // const [previewImg, setPreviewImg] = useState(product.image01);


    const relatedProduct = productDetail.filter((item) => category === item.category);
    const { id, name, price, category, imageUrl } = productDetail || {};

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const id = new URLSearchParams(window.location.search).get("id");
                const response = await fetch(`http://localhost:8080/api/products/detailProduct/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProductDetail(data);
                } else {
                    console.error("Error fetching product detail");
                }
            } catch (error) {
                console.error("Error fetching product detail:", error);
            }
        };
        fetchProductDetail();
    }, []);

    const addItem = () => {
        if (!productDetail) return;
        dispatch(
            cartActions.addItem({
                id,
                name,
                price,
                imageUrl,
            })
        );
    };

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(enteredName, enteredEmail, reviewMsg);
    };

    // useEffect(() => {
    //     setPreviewImg(product.image01);
    // }, [product]);

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [product]);



    return (
        <Helmet title="Product-details">
            {/*<CommonSection title={title}/>*/}
            {Array.isArray(productDetail) && productDetail.map(product => (
            <section>
                <Container>
                    <Row>
                        <Col lg="2" md="2">
                            <div className="product__images ">
                                {product.imageUrls && product.imageUrls.length > 0 && (
                                    <div className="img__item mb-3">
                                        <img src={product.imageUrls[0]} alt="" className="w-50" />
                                    </div>
                                )}
                                {/*{product.imageUrls.map((image, index) => (*/}
                                {/*    <div className="img__item mb-3" key={index}>*/}
                                {/*        <img src={image} alt="" className="w-50" />*/}
                                {/*    </div>*/}
                                {/*))}*/}
                            </div>
                        </Col>

                        <Col lg="4" md="4">
                            <div className="product__main-img">
                                {/*<img src={previewImg} alt="" className="w-100" />*/}
                            </div>
                        </Col>

                        <Col lg="6" md="6">
                            <div className="single__product-content">
                                <h2 className="product__title mb-3">{product.name}</h2>
                                <p className="product__price">
                                    {" "}
                                    Giá: <span>${product.price}</span>
                                </p>
                                {/*<p className="category mb-5">*/}
                                {/*    Danh mục: <span>{category}</span>*/}
                                {/*</p>*/}

                                <button onClick={addItem} className="addTOCart__btn">
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </Col>

                        <Col lg="12">
                            <div className="tabs d-flex align-items-center gap-5 py-3">
                                <h6 className={` ${tab === "desc" ? "tab__active" : ""}`} onClick={() => setTab("desc")}>
                                    Mô tả
                                </h6>
                                <h6 className={` ${tab === "rev" ? "tab__active" : ""}`} onClick={() => setTab("rev")}>
                                    Đánh giá
                                </h6>
                            </div>

                            {tab === "desc" ? (
                                <div className="tab__content">
                                    <p>{product.description}</p>
                                </div>
                            ) : (
                                <div className="tab__form mb-3">
                                    <div className="review pt-5">
                                        <p className="user__name mb-0">Jhon Doe</p>
                                        <p className="user__email">jhon1@gmail.com</p>
                                        <p className="feedback__text">great product</p>
                                    </div>

                                    <div className="review">
                                        <p className="user__name mb-0">Jhon Doe</p>
                                        <p className="user__email">jhon1@gmail.com</p>
                                        <p className="feedback__text">great product</p>
                                    </div>

                                    <div className="review">
                                        <p className="user__name mb-0">Jhon Doe</p>
                                        <p className="user__email">jhon1@gmail.com</p>
                                        <p className="feedback__text">great product</p>
                                    </div>
                                    <form className="form" onSubmit={submitHandler}>
                                        <div className="form__group">
                                            <input
                                                type="text"
                                                placeholder="Enter your name"
                                                onChange={(e) => setEnteredName(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form__group">
                                            <input
                                                type="text"
                                                placeholder="Enter your email"
                                                onChange={(e) => setEnteredEmail(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form__group">
                      <textarea
                          rows={5}
                          type="text"
                          placeholder="Write your review"
                          onChange={(e) => setReviewMsg(e.target.value)}
                          required
                      />
                                        </div>

                                        <button type="submit" className="addTOCart__btn">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            )}
                        </Col>

                        <Col lg="12" className="mb-5 mt-4">
                            <h2 className="related__Product-title">Những loại bánh liên quan</h2>
                        </Col>

                        {relatedProduct.map((item) => (
                            <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                                <ProductCard item={item}/>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            ))}
        </Helmet>
    );
};

export default FoodDetails;