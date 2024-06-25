import './vendor/fontawesome-free/css/all.min.css';
import './vendor/datatables/dataTables.bootstrap4.min.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import avatar from '../assets/images/ava-1.jpg'
function ProductManagement() {
    const [products, setProducts] = useState([]);
    const userLogin = JSON.parse(sessionStorage.getItem("userInfo"));
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [typeId, setCategory] = useState('');


    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/managementProductAdmin');
            setProducts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    const addNewItem = () => {

        setShowAddForm(true);
    };

    const handleEdit = (productId) => {

    };

    const handleDelete = (productId) => {

    };
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);


    const totalPages = Math.ceil(products.length / productsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleImageUrlsChange = (event) => {

        setImageUrls([event.target.value]);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const newProduct = {
            name,
            description,
            price,
            imageUrls,
            typeId
        };
        console.log(newProduct)
        try {
            const response = await axios.post('http://localhost:8080/api/managementProductAdmin/addProduct', newProduct);
            console.log('Product added successfully:', response.data);

            // Clear form fields and reset state after successful submission
            setName('');
            setDescription('');
            setPrice('');
            setImageUrls([]);
            setCategory('');
            setShowAddForm(false); // Hide the form after submission

            // Optionally, fetch products again to update the product list
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    return (
        <div>
            <div id="wrapper">
                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/home">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">MITI FOOD <sup>2</sup></div>
                    </a>
                    <hr className="sidebar-divider my-0"/>
                    <li className="nav-item active">
                        <a className="nav-link" href="/admin">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Tổng quan</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/userManagement">
                            <i className="fas fa-fw fa-table"></i>
                            <span>Quản lý người dùng</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/productManagement">
                            <i className="fas fa-fw fa-table"></i>
                            <span>Quản lý sản phẩm</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/orderManagement">
                            <i className="fas fa-fw fa-table"></i>
                            <span>Quản lý đơn hàng</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/revenueManagement">
                            <i className="fas fa-fw fa-chart-area"></i>
                            <span>Biểu đồ doanh thu</span></a>
                    </li>
                    <hr className="sidebar-divider d-none d-md-block"/>
                    <div className="text-center d-none d-md-inline">
                        <a href="/home" className="rounded-circle border-0" id="sidebarToggle"></a>
                    </div>
                </ul>

                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            <form className="form-inline">
                                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                    <i className="fa fa-bars"></i>
                                </button>
                            </form>

                            <form
                                className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small"
                                           placeholder="Search for..." aria-label="Search"
                                           aria-describedby="basic-addon2"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown no-arrow d-sm-none">
                                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-search fa-fw"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                         aria-labelledby="searchDropdown">
                                        <form className="form-inline mr-auto w-100 navbar-search">
                                            <div className="input-group">
                                                <input type="text" className="form-control bg-light border-0 small"
                                                       placeholder="Search for..." aria-label="Search"
                                                       aria-describedby="basic-addon2"/>
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary" type="button">
                                                        <i className="fas fa-search fa-sm"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </li>
                                <li className="nav-item dropdown no-arrow mx-1">
                                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-bell fa-fw"></i>
                                        <span className="badge badge-danger badge-counter">3+</span>
                                    </a>
                                    <div
                                        className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="alertsDropdown">
                                        <h6 className="dropdown-header">Alerts Center</h6>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="mr-3">
                                                <div className="icon-circle bg-primary">
                                                    <i className="fas fa-file-alt text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">December 12, 2019</div>
                                                <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="mr-3">
                                                <div className="icon-circle bg-success">
                                                    <i className="fas fa-donate text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">December 7, 2019</div>
                                                $290.29 has been deposited into your account!
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="mr-3">
                                                <div className="icon-circle bg-warning">
                                                    <i className="fas fa-exclamation-triangle text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="small text-gray-500">December 2, 2019</div>
                                                Spending Alert: We've noticed unusually high spending for your account.
                                            </div>
                                        </a>
                                        <a className="dropdown-item text-center small text-gray-500" href="#">Show All
                                            Alerts</a>
                                    </div>
                                </li>
                                <li className="nav-item dropdown no-arrow mx-1">
                                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-envelope fa-fw"></i>
                                        <span className="badge badge-danger badge-counter">7</span>
                                    </a>
                                    <div
                                        className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="messagesDropdown">
                                        <h6 className="dropdown-header">Message Center</h6>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="img/undraw_profile_1.svg"
                                                     alt="..."/>
                                                <div className="status-indicator bg-success"></div>
                                            </div>
                                            <div className="font-weight-bold">
                                                <div className="text-truncate">Hi there! I am wondering if you can help
                                                    me with a problem I've been having.
                                                </div>
                                                <div className="small text-gray-500">Emily Fowler · 58m</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="img/undraw_profile_2.svg"
                                                     alt="..."/>
                                                <div className="status-indicator"></div>
                                            </div>
                                            <div>
                                                <div className="text-truncate">I have the photos that you ordered last
                                                    month, how would you like them sent to you?
                                                </div>
                                                <div className="small text-gray-500">Jae Chun · 1d</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="img/undraw_profile_3.svg"
                                                     alt="..."/>
                                                <div className="status-indicator bg-warning"></div>
                                            </div>
                                            <div>
                                                <div className="text-truncate">Last month's report looks great, I am
                                                    very happy with the progress so far, keep up the good work!
                                                </div>
                                                <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle"
                                                     src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="..."/>
                                                <div className="status-indicator bg-success"></div>
                                            </div>
                                            <div>
                                                <div className="text-truncate">Am I a good boy? The reason I ask is
                                                    because someone told me that people say this to all dogs, even if
                                                    they aren't good...
                                                </div>
                                                <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item text-center small text-gray-500" href="#">Read More
                                            Messages</a>
                                    </div>
                                </li>

                                <div className="topbar-divider d-none d-sm-block"></div>
                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span
                                            className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                                        <img className="img-profile rounded-circle" src={avatar}
                                             alt="..."/>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                         aria-labelledby="userDropdown">
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Profile
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Settings
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Activity Log
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#" data-toggle="modal"
                                           data-target="#logoutModal">
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <div className="container-fluid">
                            <h1 className="h3 mb-2 text-gray-800">Quản lý sản phẩm</h1>

                            <div className="card shadow mb-4">
                                <div className="card-header py-3 d-flex justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Danh sách sản phẩm</h6>
                                    <button id="addButton" type="button" className="btn btn-primary"
                                            onClick={addNewItem}>Thêm mới
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%"
                                               cellspacing="0">
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Tên</th>
                                                <th>Hình ảnh</th>
                                                <th>Mô tả</th>
                                                <th>Giá</th>
                                                <th>Hành động</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {currentProducts.map(product => (
                                                <tr key={product.id}>
                                                    <td>{product.id}</td>
                                                    <td>{product.name}</td>
                                                    <td style={{
                                                        width: '50px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        <img
                                                            src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : 'default-image.jpg'}
                                                            alt="product-img" style={{
                                                            width: '100px',
                                                            height: '100px',
                                                            objectFit: 'cover'
                                                        }}/>
                                                    </td>
                                                    <td style={{
                                                        maxWidth: '150px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'wrap'
                                                    }}>{product.description}</td>
                                                    <td>${product.price}</td>
                                                    <td>
                                                        <a href="#" className="edit-link"
                                                           onClick={() => handleEdit(product.id)}>Sửa</a>
                                                        <span> | </span>
                                                        <a href="#" className="delete-link"
                                                           onClick={() => handleDelete(product.id)}>Xóa</a>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-5">
                                                <div className="dataTables_info" id="dataTable_info" role="status"
                                                     aria-live="polite">
                                                    Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, products.length)} of {products.length} entries
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-7">
                                                <div className="dataTables_paginate paging_simple_numbers"
                                                     id="dataTable_paginate">
                                                    <ul className="pagination">
                                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                            <button className="page-link"
                                                                    onClick={() => paginate(currentPage - 1)}>Previous
                                                            </button>
                                                        </li>
                                                        {pageNumbers.map(number => (
                                                            <li key={number}
                                                                className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                                                <button className="page-link"
                                                                        onClick={() => paginate(number)}>{number}</button>
                                                            </li>
                                                        ))}
                                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                            <button className="page-link"
                                                                    onClick={() => paginate(currentPage + 1)}>Next
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showAddForm && (
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            backgroundColor: 'white',
                            zIndex: 1000,
                            padding: '20px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                            width: '400px' // Adjust width as needed
                        }}>
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Thêm mới sản phẩm</h6>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="productName">Tên sản phẩm</label>
                                            <input type="text" className="form-control" id="productName" value={name}
                                                   onChange={handleNameChange} required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="productDescription">Mô tả</label>
                                            <textarea className="form-control" id="productDescription"
                                                      value={description} onChange={handleDescriptionChange} required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="productPrice">Giá</label>
                                            <input type="number" className="form-control" id="productPrice"
                                                   value={price} onChange={handlePriceChange} required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="productImage">Hình ảnh (URL)</label>
                                            <input type="text" className="form-control" id="productImage"
                                                   value={imageUrls} onChange={handleImageUrlsChange} required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="productCategory">Danh mục</label>
                                            <select className="form-control" id="productCategory" value={typeId}
                                                    onChange={handleCategoryChange} required>
                                                <option value="">Chọn danh mục</option>
                                                <option value="1">Hamberger</option>
                                                <option value="2">Pizza</option>
                                                <option value="3">Drink</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Thêm sản phẩm</button>
                                        <button type="button" className="btn btn-secondary ml-2"
                                                onClick={() => setShowAddForm(false)}>Hủy
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Your Website 2020</span>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current
                            session.
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <a className="btn btn-primary" href="login.html">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductManagement;
