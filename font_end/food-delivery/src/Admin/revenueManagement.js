import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios library
import Chart from "chart.js/auto"; // Import Chart.js library

function RevenueManagement() {
    const [revenueData, setRevenueData] = useState([]);

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    useEffect(() => {
        fetchRevenueData();
    }, []);

    useEffect(() => {
        drawChart();
    }, [revenueData]);

    const fetchRevenueData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/revenue');
            setRevenueData(response.data);
        } catch (error) {
            console.error('Error fetching revenue data:', error);
        }
    };

    const drawChart = () => {
        const months = revenueData.map(item => item.month);
        const revenues = revenueData.map(item => item.totalRevenue);

        const ctx = document.getElementById('revenueChart').getContext('2d');

        // Check if a chart instance exists, if yes, destroy it
        if (window.myChart instanceof Chart) {
            window.myChart.destroy();
        }

        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Monthly Revenue',
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
    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    return  (
        <div>
        <div id="wrapper">
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                </a>

                <hr className="sidebar-divider my-0"/>

                <li className="nav-item active">
                    <a className="nav-link" href="index.html">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse"
                       data-target="#collapsePages"
                       aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Pages</span>
                    </a>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages"
                         data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Login Screens:</h6>
                            <a className="collapse-item" href="login.html">Login</a>
                            <a className="collapse-item" href="register.html">Register</a>
                            <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                            <div className="collapse-divider"></div>
                            <h6 className="collapse-header">Other Pages:</h6>
                            <a className="collapse-item" href="404.html">404 Page</a>
                            <a className="collapse-item" href="blank.html">Blank Page</a>
                        </div>
                    </div>
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
                    <a className="nav-link" href="/revenueManagement">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Biểu đồ doanh thu</span></a>
                </li>


                <hr className="sidebar-divider d-none d-md-block"/>


                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
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
                                       placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
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
                                                       aria-describedby="basic-addon2"/>
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
                                                Spending Alert: We've noticed unusually high spending for your account.
                                            </div>
                                        </a>
                                    </li>
                                    <li><a className="dropdown-item text-center small text-gray-500" href="#">Show All
                                        Alerts</a></li>
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
                                    </li>
                                    <li>
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
                                    </li>
                                    <li>
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
                                    </li>
                                    <li>
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
                                    </li>
                                    <li><a className="dropdown-item text-center small text-gray-500" href="#">Read More
                                        Messages</a></li>
                                </ul>
                            </li>

                            <div className="topbar-divider d-none d-sm-block"></div>

                            <li className="nav-item dropdown no-arrow">
                                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                                    <img className="img-profile rounded-circle" src="img/undraw_profile.svg"/>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end shadow animated--grow-in"
                                    aria-labelledby="userDropdown">
                                    <li><a className="dropdown-item" href="#"><i
                                        className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>Profile</a></li>
                                    <li><a className="dropdown-item" href="#"><i
                                        className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>Settings</a></li>
                                    <li><a className="dropdown-item" href="#"><i
                                        className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>Activity Log</a></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><a className="dropdown-item" href="#" data-bs-toggle="modal"
                                           data-bs-target="#logoutModal"><i
                                        className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>Logout</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <h2>Revenue Data</h2>
                    <div>
                        <select id="yearFilter" value={selectedYear} onChange={handleYearChange}>
                            <option value={2023}>2023</option>
                            <option value={2024}>2024</option>
                            <option value={2025}>2025</option>
                            {/* Add other years as options */}
                        </select>
                    </div>
                    <div style={{

                        width: '100%',
                        justifyContent: 'space-between',
                        display: 'flex',
                        flexDirection: 'column',
                        marginRight: '16px',
                        marginLeft: '16px'

                    }}>

                        <div style={{display: 'flex',  marginRight: '16px', marginLeft: '16px',flexDirection: 'row',justifyContent: 'space-between'}}>
                            <div style={{width: '20%'}}>
                                <table style={{width: '100%'}} className="table">
                                    <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th>Total Revenue</th>
                                    </tr>
                                    </thead>
                                    <tbody style={{maxHeight: '50px', overflowY: 'auto'}}>
                                    {revenueData.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{fontSize: '12px'}}>{item.month}</td>
                                            <td style={{fontSize: '12px'}}>{item.totalRevenue}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div style={{width: '60%'}}>
                                <canvas style={{width: '40%'}} id="revenueChart"></canvas>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>


        </div>
    )
        ;
}

export default RevenueManagement;