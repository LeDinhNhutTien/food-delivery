import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";
import "../styles/all-foods.css";
import "../styles/pagination.css";

const AllFoods = () => {
    const [allProducts, setAllProducts] = useState([]); // State lưu trữ danh sách ban đầu của tất cả sản phẩm
    const [products, setProducts] = useState([]); // State lưu trữ danh sách sản phẩm hiện tại
    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/products");
                const data = await response.json();
                setAllProducts(data); // Lưu trữ danh sách ban đầu của tất cả sản phẩm
                setProducts(data); // Khởi tạo danh sách sản phẩm hiện tại với danh sách ban đầu
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

    // Tạo hàm mới để xử lý việc lọc dữ liệu sản phẩm dựa trên loại sản phẩm
    const filterProductsByType = (type) => {
        // Reset danh sách sản phẩm về danh sách ban đầu
        setProducts(allProducts);
        // Lọc danh sách sản phẩm dựa trên loại sản phẩm
        const filteredProducts = allProducts.filter(item => item.type === type);
        // Cập nhật danh sách sản phẩm đã lọc vào state
        setProducts(filteredProducts);
    };

    // Hàm xử lý sự kiện để nhận loại sản phẩm và gọi hàm lọc dữ liệu sản phẩm tương ứng
    const handleFilter = (type) => {
        filterProductsByType(type);
    };

    return (
        <Helmet title="All-Foods">
            <CommonSection title="Tất cả bánh" />
            <section>
                <Row className="mb-3" style={{ width: '67%', marginRight: '5%', marginLeft: 'auto' }}>
                    <Col xs={3} className="d-inline-block">
                        <Button variant="outline-secondary" onClick={() => handleFilter(1)}>Humburger</Button>
                    </Col>
                    <Col xs={3} className="d-inline-block">
                        <Button variant="outline-secondary" onClick={() => handleFilter(2)}>Pizza</Button>
                    </Col>
                    <Col xs={3} className="d-inline-block">
                        <Button variant="outline-secondary" onClick={() => handleFilter(3)}>Drink</Button>
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
                                resize: 'vertical' // Cho phép chỉnh kích thước theo chiều dọc
                            }}
                        />
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
