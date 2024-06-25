import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import heroImg from "../assets/images/hero.png";
import "../styles/hero-section.css";
import { Link } from "react-router-dom";
import Category from "../components/UI/category/Category.jsx";
import "../styles/home.css";
import featureImg01 from "../assets/images/service-01.png";
import featureImg03 from "../assets/images/service-03.png";
import payment from "../assets/images/payment.png";
import foodCategoryImg01 from "../assets/images/hamburger.png";
import foodCategoryImg02 from "../assets/images/pizza.png";
import foodCategoryImg03 from "../assets/images/bread.png";
import ProductCard from "../components/UI/product-card/ProductCard.jsx";
import whyImg from "../assets/images/location.png";
import networkImg from "../assets/images/network.png";
import TestimonialSlider from "../components/UI/slider/TestimonialSlider.jsx";
import { useTranslation } from "react-i18next";


const featureData = [
  {
    titleKey: "fast_delivery_title",
    imgUrl: featureImg01,
    descKey: "fast_delivery_desc",
  },
  {
    titleKey: "payment_methods_title",
    imgUrl: payment,
    descKey: "payment_methods_desc",
  },
  {
    titleKey: "easy_order_title",
    imgUrl: featureImg03,
    descKey: "easy_order_desc",
  },
];

const Home = () => {
  const { t } = useTranslation();
  const [productType, setProductType] = useState("ALL");
  const [allProducts, setAllProducts] = useState([]);
  const [hotPizza, setHotPizza] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setAllProducts(response.data);
        console.log("Products:", response.data); // Log products to check
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredPizza = allProducts.filter((item) => item.typeId === 2);
    const slicePizza = filteredPizza.slice(0, 4);
    console.log("Filtered Pizza Products:", filteredPizza); // Log filtered pizza products to check
    setHotPizza(slicePizza);
  }, [allProducts]);

  const handlePizzaButtonClick = () => {
    setProductType("PIZZA");
    const filteredPizza = allProducts.filter((item) => item.typeId === 2);
    const slicePizza = filteredPizza.slice(0, 4);
    console.log("Filtered Pizza Products:", filteredPizza); // Log filtered pizza products to check
    setHotPizza(slicePizza);
  };

  const filteredProducts =
      productType === "ALL"
          ? allProducts
          : allProducts.filter((item) => item.typeId === parseInt(productType));

  return (
      <Helmet title="Home">
        <section>
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="hero__content  ">
                  <h5 className="mb-3">{t("easy_order_title")}</h5>
                  <h1 className="mb-4 hero__title">
                    <span>{t("hungry_question")}</span> {t("just_wait")} <br /> {t("food_at")} <span>{t("your_door")}</span>
                  </h1>
                  <p>
                    {t("order_online_message")}
                  </p>
                  <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                    <button className="order__btn d-flex align-items-center justify-content-between">
                      {t("order_now")} <i className="ri-arrow-right-s-line"></i>
                    </button>
                    <button className="all__foods-btn">
                      <Link to="/foods">{t("view_all")}</Link>
                    </button>
                  </div>
                  <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                    <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-car-line"></i>
                    </span>{" "}
                      {t("free_shipping")}
                    </p>
                    <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-shield-check-line"></i>
                    </span>{" "}
                      {t("secure_payment")}
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="hero__img">
                  <img src={heroImg} alt="hero-img" className="w-100" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="pt-0">
          <Category />
        </section>
        <section>
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h5 className="feature__subtitle mb-4">{t("what_we_serve_title")}</h5>
                <h2 className="feature__title">{t("just_sit_at_home")}</h2>
                <h2 className="feature__title">
                  {t("we_will_serve")} <span>{t("serve")}</span>
                </h2>
              </Col>
              {featureData.map((item, index) => (
                  <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                    <div className="feature__item text-center px-5 py-3">
                      <img
                          src={item.imgUrl}
                          alt="feature-img"
                          className="w-25 mb-3"
                      />
                      <h5 className=" fw-bold mb-3">{t(item.titleKey)}</h5>
                      <p>{t(item.descKey)}</p>
                    </div>
                  </Col>
              ))}
            </Row>
          </Container>
        </section>
        <section>
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2>{t("popular_cakes")}</h2>
              </Col>
              <Col lg="12">
                <div className="food__category d-flex align-items-center justify-content-center gap-4">
                  <button
                      type="button"
                      className={`all__btn  ${
                          productType === "ALL" ? "foodBtnActive" : ""
                      } `}
                      onClick={() => setProductType("ALL")}
                  >
                    {t("all")}
                  </button>
                  <button
                      type="button"
                      className={`d-flex align-items-center gap-2 ${
                          productType === "BURGER" ? "foodBtnActive" : ""
                      } `}
                      onClick={() => setProductType(1)}
                  >
                    <img src={foodCategoryImg01} alt="" /> {t("hamburger")}
                  </button>
                  <button
                      type="button"
                      className={`d-flex align-items-center gap-2 ${
                          productType === "PIZZA" ? "foodBtnActive" : ""
                      } `}
                      onClick={() => setProductType(2)}
                  >
                    <img src={foodCategoryImg02} alt="" /> {t("pizza")}
                  </button>
                  <button
                      type="button"
                      className={`d-flex align-items-center gap-2 ${
                          productType === "BREAD" ? "foodBtnActive" : ""
                      } `}
                      onClick={() => setProductType(3)}
                  >
                    <img src={foodCategoryImg03} alt="" /> {t("drinks")}
                  </button>
                </div>
              </Col>
              {filteredProducts.map((item) => (
                  <Col
                      lg="3"
                      md="4"
                      sm="6"
                      xs="6"
                      key={item.key}
                      className="mt-5"
                  >
                    <ProductCard item={item} />
                  </Col>
              ))}
            </Row>
          </Container>
        </section>
        <section className="why__choose-us">
          <Container>
            <Row>
              <Col lg="6" md="6">
                <img src={whyImg} alt="why-tasty-treat" className="w-100" />
              </Col>
              <Col lg="6" md="6">
                <div className="why__tasty-treat">
                  <h2 className="tasty__treat-title mb-4">
                    {t("why_choose_tasty")} <span>{t("tasty_cake")}</span>
                  </h2>
                  <p className="tasty__treat-desc">
                    {t("quality_first")}
                  </p>
                  <ListGroup className="mt-4">
                    <ListGroupItem className="border-0 ps-0">
                      <p className="choose__us-title d-flex align-items-center gap-2 ">
                        <i className="ri-checkbox-circle-line"></i>{" "}
                        {t("food_safety")}
                      </p>
                      <p className="choose__us-desc">
                        {t("quality_and_safety")}
                      </p>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 ps-0">
                      <p className="choose__us-title d-flex align-items-center gap-2 ">
                        <i className="ri-checkbox-circle-line"></i>{" "}
                        {t("support")}
                      </p>
                      <p className="choose__us-desc">
                        {t("customer_support")}
                      </p>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 ps-0">
                      <p className="choose__us-title d-flex align-items-center gap-2 ">
                        <i className="ri-checkbox-circle-line"></i>{" "}
                        {t("order_anywhere")}
                      </p>
                      <p className="choose__us-desc">
                        {t("ship_to_home")}
                      </p>
                    </ListGroupItem>
                  </ListGroup>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="pt-0">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5 ">
                <h2>{t("hot_pizza")}</h2>
              </Col>
              {hotPizza.map((item, index) => (
                  <Col lg="3" md="4" sm="6" xs="6" key={index}>
                    <ProductCard item={item} />
                  </Col>
              ))}
            </Row>
          </Container>
        </section>
        <section>
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="testimonial ">
                  <h5 className="testimonial__subtitle mb-4">{t("reviews_title")}</h5>
                  <h2 className="testimonial__title mb-4">
                    <span>{t("customers_say")}</span> {t("about_us")}
                  </h2>
                  <p className="testimonial__desc">
                    {t("thank_you_message")}
                  </p>
                  <TestimonialSlider />
                </div>
              </Col>
              <Col lg="6" md="6">
                <img src={networkImg} alt="testimonial-img" className="w-100" />
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
  );
};

export default Home;
