import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import avatar from '../assets/images/ava-1.jpg';
import { useParams } from "react-router-dom";
import RevenueMonthManagement from "./revenueMonthManagement";

function RevenueManagement() {
    const [revenueData, setRevenueData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2024);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const { year } = useParams(); // Using useParams to get the year from the URL

    useEffect(() => {
        fetchRevenueData(selectedYear);
    }, [selectedYear]);

    useEffect(() => {
        drawChart();
    }, [revenueData]);

    useEffect(() => {
        if (year) {
            setSelectedYear(parseInt(year)); // Convert year to integer and set selected year from URL params
        }
    }, [year]);

    const fetchRevenueData = async (year) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/revenue?year=${year}`);
            setRevenueData(response.data);
        } catch (error) {
            console.error('Error fetching revenue data:', error);

        }
    };

    const handleYearChange = (event) => {
        const year = event.target.value;
        setSelectedYear(parseInt(year));
    };

    const drawChart = () => {
        const months = revenueData.map(item => item.month);
        const revenues = revenueData.map(item => item.totalRevenue);

        const ctx = document.getElementById('revenueChart');

        // Ensure only one chart instance is active
        if (window.myChart instanceof Chart) {
            window.myChart.destroy();
        }

        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Doanh thu hàng tháng',
                    data: revenues,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const handlePrintRevenue = () => {
        fetch(`http://localhost:8080/api/printCustomer/excelRevenue?year=${selectedYear}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `revenue_report_${selectedYear}.xlsx`;
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch(error => {
                console.error('Error downloading Excel file:', error);

            });
    };

    const handleViewDetails = (month) => {
        setSelectedMonth(month);
        setShowDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
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
                    <hr className="sidebar-divider my-0" />
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
                    <hr className="sidebar-divider d-none d-md-block" />
                    <div className="text-center d-none d-md-inline">
                        <a href="/home" className="rounded-circle border-0" id="sidebarToggle"></a>
                    </div>
                </ul>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <nav className="navbar navbar-expand-lg navbar-light bg-white topbar mb-4 static-top shadow">
                            <button id="sidebarToggleTop" className="btn btn-link d-lg-none rounded-circle mr-3">
                                <i className="fa fa-bars"></i>
                            </button>
                            <form
                                className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small"
                                           placeholder="Search for..." aria-label="Search"
                                           aria-describedby="basic-addon2" />
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </form>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown no-arrow d-sm-none">
                                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fas fa-search fa-fw"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end p-3 shadow animated--grow-in"
                                        aria-labelledby="searchDropdown">
                                        <li>
                                            <form className="form-inline mr-auto w-100 navbar-search">
                                                <div className="input-group">
                                                    <input type="text" className="form-control bg-light border-0 small"
                                                           placeholder="Search for..." aria-label="Search"
                                                           aria-describedby="basic-addon2" />
                                                    <button className="btn btn-primary" type="button">
                                                        <i className="fas fa-search fa-sm"></i>
                                                    </button>
                                                </div>
                                            </form>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown no-arrow mx-1">
                                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fas fa-bell fa-fw"></i>
                                        <span className="badge badge-danger badge-counter">3+</span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end shadow animated--grow-in"
                                        aria-labelledby="alertsDropdown">
                                        <li><h6 className="dropdown-header">Alerts Center</h6></li>
                                        <li>
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
                                        </li>
                                        <li>
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
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="mr-3">
                                                    <div className="icon-circle bg-warning">
                                                        <i className="fas fa-exclamation-triangle text-white"></i>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="small text-gray-500">December 2, 2019</div>
                                                    Spending Alert: We've noticed unusually high spending for your
                                                    account.
                                                </div>
                                            </a>
                                        </li>
                                        <li><a className="dropdown-item text-center small text-gray-500" href="#">Show
                                            All Alerts</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown no-arrow mx-1">
                                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fas fa-envelope fa-fw"></i>
                                        <span className="badge badge-danger badge-counter">7</span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end shadow animated--grow-in"
                                        aria-labelledby="messagesDropdown">
                                        <li><h6 className="dropdown-header">Message Center</h6></li>
                                        <li>
                                            <a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="dropdown-list-image mr-3">
                                                    <img className="rounded-circle" src="img/undraw_profile_1.svg"
                                                         alt="..." />
                                                    <div className="status-indicator bg-success"></div>
                                                </div>
                                                <div className="font-weight-bold">
                                                    <div className="text-truncate">Hi there! I am wondering if you can
                                                        help me with a problem I've been having.
                                                    </div>
                                                    <div className="small text-gray-500">Emily Fowler · 58m</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="dropdown-list-image mr-3">
                                                    <img className="rounded-circle" src="img/undraw_profile_2.svg"
                                                         alt="..." />
                                                    <div className="status-indicator"></div>
                                                </div>
                                                <div>
                                                    <div className="text-truncate">I have the photos that you ordered
                                                        last month, how would you like them sent to you?
                                                    </div>
                                                    <div className="small text-gray-500">Jae Chun · 1d</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="dropdown-list-image mr-3">
                                                    <img className="rounded-circle" src="img/undraw_profile_3.svg"
                                                         alt="..." />
                                                    <div className="status-indicator bg-warning"></div>
                                                </div>
                                                <div>
                                                    <div className="text-truncate">Last month's report looks great, I am
                                                        very happy with the progress so far, keep up the good work!
                                                    </div>
                                                    <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex align-items-center" href="#">
                                                <div className="dropdown-list-image mr-3">
                                                    <img className="rounded-circle"
                                                         src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                                         alt="..." />
                                                    <div className="status-indicator bg-success"></div>
                                                </div>
                                                <div>
                                                    <div className="text-truncate">Am I a good boy? The reason I ask is
                                                        because someone told me that people say this to all dogs, even
                                                        if they aren't good...
                                                    </div>
                                                    <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li><a className="dropdown-item text-center small text-gray-500" href="#">Read
                                            More Messages</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        <span
                                            className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                                        <img className="img-profile rounded-circle" src={avatar} alt="Profile" />
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end shadow animated--grow-in"
                                        aria-labelledby="userDropdown">
                                        <li><a className="dropdown-item" href="#"><i
                                            className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Profile</a></li>
                                        <li><a className="dropdown-item" href="#"><i
                                            className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>Settings</a></li>
                                        <li><a className="dropdown-item" href="#"><i
                                            className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>Activity Log</a>
                                        </li>
                                        <li>
                                            <div className="dropdown-divider"></div>
                                        </li>
                                        <li><a className="dropdown-item" href="#" data-toggle="modal"
                                               data-target="#logoutModal"><i
                                            className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>Logout</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                        <div className="container-fluid">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                                <button onClick={handlePrintRevenue}
                                        className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                    <i className="fas fa-download fa-sm text-white-50"></i> Download Excel
                                </button>
                            </div>
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card shadow mb-4">
                                        <div
                                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">Doanh thu theo tháng</h6>
                                            <div className="dropdown no-arrow">
                                                <select value={selectedYear} onChange={handleYearChange}
                                                        className="form-select">
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2024">2024</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="chart-bar">
                                                <canvas id="revenueChart"></canvas>
                                            </div>
                                            <hr />
                                            <div className="table-responsive">
                                                <table className="table table-bordered" id="dataTable" width="100%"
                                                       cellSpacing="0">
                                                    <thead>
                                                    <tr>
                                                        <th>Tháng</th>
                                                        <th>Tổng doanh thu</th>
                                                        <th>Thao tác</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {revenueData.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.month}</td>
                                                            <td>${item.totalRevenue.toFixed(2)}</td> {/* Limiting to 2 decimal places */}
                                                            <td>
                                                                <button
                                                                    onClick={() => handleViewDetails(item.month)}
                                                                    className="btn btn-primary"
                                                                >
                                                                    Xem chi tiết
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Your Website 2021</span>
                            </div>
                        </div>
                    </footer>
                    {showDetailsModal && (
                        <RevenueMonthManagement
                            year={selectedYear}
                            month={selectedMonth}
                            onClose={handleCloseDetailsModal}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default RevenueManagement;
