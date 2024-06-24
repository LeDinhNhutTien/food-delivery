import React, { useState, useEffect, useCallback } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";
import "../styles/all-foods.css";
import "../styles/pagination.css";

const AllFoods = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [sortOption, setSortOption] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/products");
                const data = await response.json();
                setAllProducts(data);
                setProducts(data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };
        fetchData();
    }, []);

    const debounce = (func, delay) => {
        let timeoutId;
        return function(...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    };

    const debouncedFetchSuggestions = useCallback(
        debounce(async (query) => {
            try {
                if (query.trim() === "") {
                    setSuggestions([]);
                    setShowSuggestions(false);
                    return;
                }

                const response = await fetch(`http://localhost:3000/api/suggestions?query=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setSuggestions(data);
                setShowSuggestions(data.length > 0);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                // Handle specific error cases or set fallback state
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300),
        []
    );

    useEffect(() => {
        debouncedFetchSuggestions(searchTerm);
        if (searchTerm === " ") {
            setShowSuggestions(false);
        }
    }, [searchTerm, debouncedFetchSuggestions]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:300/api/products");
                const data = await response.json();
                setAllProducts(data);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const productPerPage = 12;
    const visitedPage = pageNumber * productPerPage;

    const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSuggestionClick = (suggestion) => {
        setProducts(allProducts);
        setSuggestions([]);
        setSearchTerm(suggestion);
        setShowSuggestions(false);

    };

    const sortedProducts = filteredProducts.sort((a, b) => {
        switch (sortOption) {
            case "name_asc":
                return a.name.localeCompare(b.name);
            case "name_desc":
                return b.name.localeCompare(a.name);
            case "price_asc":
                return a.price - b.price;
            case "price_desc":
                return b.price - a.price;
            default:
                return 0;
        }
    });

    const displayPage = sortedProducts.slice(
        visitedPage,
        visitedPage + productPerPage
    );

    const pageCount = Math.ceil(sortedProducts.length / productPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const filterProductsByType = (type) => {
        setProducts(allProducts);
        const filteredProducts = allProducts.filter(item => item.typeId === type);
        setProducts(filteredProducts);
    };

    const handleFilter = (type) => {
        filterProductsByType(type);
    };

    return (
        <Helmet title="Tất cả món ăn">
            <CommonSection title="Tất cả món ăn" />
            <section>
                <Row className="mb-3" style={{ width: '67%', marginRight: '5%', marginLeft: 'auto' }}>
                    <Col xs={3} className="d-inline-block">
                        <Button variant="outline-secondary" onClick={() => handleFilter(1)}>Hamburger</Button>
                    </Col>
                    <Col xs={3} className="d-inline-block">
                        <Button variant="outline-secondary" onClick={() => handleFilter(2)}>Pizza</Button>
                    </Col>
                    <Col xs={3} className="d-inline-block">
                        <Button variant="outline-secondary" onClick={() => handleFilter(3)}>Đồ uống</Button>
                    </Col>
                    <Col xs={3} className="d-inline-block">
                        <FormControl
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                fontSize: '16px',
                                padding: '4px',
                                border: '2px solid #ccc',
                                borderRadius: '5px',
                                resize: 'vertical'
                            }}
                        />
                        <ul style={{
                            listStyleType: 'none',
                            padding: 0,
                            margin: 0,
                            position: 'absolute',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            zIndex: 1000,
                            width: '100%',
                            display: showSuggestions ? 'block' : 'none'
                         }}>
                            {suggestions.map((suggestion, index) => (
                                <li key={index} style={{
                                    padding: '8px 12px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #ccc'
                                }} onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</li>
                            ))}
                        </ul>

                    </Col>
                </Row>
                <Container>
                    <Row>
                        <Col lg="3">
                            <div className="filter-container">
                                <InputGroup className="mb-3">
                                    <FormControl
                                        as="select"
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                    >
                                        <option value="">Sắp xếp theo...</option>
                                        <option value="name_asc">Tên (A-Z)</option>
                                        <option value="name_desc">Tên (Z-A)</option>
                                        <option value="price_asc">Giá thấp đến cao</option>
                                        <option value="price_desc">Giá cao đến thấp</option>
                                    </FormControl>
                                </InputGroup>
                            </div>
                        </Col>
                        <Col lg="9">
                            <Row>
                                {displayPage.map((item) => (
                                    <Col lg="4" md="4" sm="6" xs="12" key={item.id} className="mb-4">
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
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>

    );
};

export default AllFoods;
