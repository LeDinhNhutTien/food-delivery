import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";
import "../styles/all-foods.css";
import "../styles/pagination.css";

const AllFoods = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(0);

    const productPerPage = 12;
    const visitedPage = pageNumber * productPerPage;
    const displayPage = products.slice(visitedPage, visitedPage + productPerPage);

    const pageCount = Math.ceil(products.length / productPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const searchedProduct = products.filter((item) => {
        if (searchTerm === "") {
            return item;
        }
        if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return item;
        } else {
            return console.log("not found");
        }
    });

    return (
        <Helmet title="All-Foods">
            <CommonSection title="Tất cả bánh" />
            <section>
                <Container>
                    <Row>
                        {/* Your code for search and sorting widgets */}
                    </Row>
                    <Row>
                        {displayPage.map((item) => (
                            <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                                <ProductCard item={item} />
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <Col>
                            <ReactPaginate
                                pageCount={pageCount}
                                onPageChange={changePage}
                                previousLabel={"Trước"}
                                nextLabel={"Tiếp"}
                                containerClassName="paginationBttns"
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default AllFoods;
