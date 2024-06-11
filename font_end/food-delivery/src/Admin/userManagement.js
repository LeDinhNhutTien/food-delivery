import React, { useEffect, useState } from "react";
import './vendor/fontawesome-free/css/all.min.css';
import './vendor/datatables/dataTables.bootstrap4.min.css';
import { Link } from "react-router-dom";
import AddUserModal from './AddUser';
import UpdateUserModal from './UpdateUser';
import axios from "axios";

function UserManagement() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdown1, setShowDropdown1] = useState(false);
    const [users, setUsers] = useState([]);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const userLogin = JSON.parse(sessionStorage.getItem("userInfo"));
    console.log(userLogin);
  
    useEffect(() => {
        if (!userLogin) {
            window.location.href = "/login";
        } else {
            if(userLogin.role != "admin") {
                window.location.href = "/";
            }
        }
    }, [userLogin]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/managementCustomerAdmin");
                const data = await response.json();
                const filteredUsers = data.filter(user => user.role === 'user');
                setUsers(filteredUsers);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchData();
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleDropdown1 = () => {
        setShowDropdown1(!showDropdown1);
    };

    const handleAddUserClick = () => {
        setShowAddUserModal(true);
    };

    const handleCloseModal = () => {
        setShowAddUserModal(false);
    };

    const handleEditUserClick = (user) => {
        console.log("Selected User for Edit:", user); // Debugging log
        setSelectedUser(user);
        setShowUpdateUserModal(true);
    };

    const handleCloseUpdateUserModal = () => {
        setShowUpdateUserModal(false);
        setSelectedUser(null);
    };


    const insertDiary = async (content, id) => {
        try {
            const response = await fetch('http://localhost:8080/api/rootDiary/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content, id }),
            });

            if (!response.ok) {
                // Handle specific HTTP errors
                throw new Error(`Failed to insert diary entry: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();

            // Optionally, you might want to perform additional checks on the response data

            // Diary entry successfully inserted
            return true;
        } catch (error) {
            // Handle network errors or unexpected exceptions
            console.error('Error inserting diary entry:', error);
            return false;
        }
    };



    const handleLockUser = async (userId) => {
        try {
            const userToUpdate = users.find(user => user.id_user === userId);
            if (!userToUpdate) {
                console.error("Người dùng không tồn tại");
                return;
            }

            const response = await fetch(`http://localhost:8080/api/managementCustomerAdmin/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...userToUpdate, status: '0' }),
            });

            if (!response.ok) {
                throw new Error("Lỗi khi cập nhật trạng thái người dùng");
            }

            // Update the user status in the state
            const updatedUsers = users.map(user => {
                if (user.id_user === userId) {
                    return { ...user, status: 0 };
                }
                return user;
            });
            setUsers(updatedUsers);
            const diaryContent = `User ${userId} đã khóa.`;
            const diaryInserted = await insertDiary(diaryContent, userLogin.id_user);

            if (!diaryInserted) {
                console.error("Failed to insert diary entry");
                // Optionally, handle the failure here
            }
        } catch (error) {
            console.error("Lỗi khi khóa người dùng:", error);
        }
    };

    const handleUnLockUser = async (userId) => {
        try {
            const userToUpdate = users.find(user => user.id_user === userId);
            if (!userToUpdate) {
                console.error("Người dùng không tồn tại");
                return;
            }

            const response = await fetch(`http://localhost:8080/api/managementCustomerAdmin/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...userToUpdate, status: '1' }),
            });

            if (!response.ok) {
                throw new Error("Lỗi khi cập nhật trạng thái người dùng");
            }

            // Update the user status in the state
            const updatedUsers = users.map(user => {
                if (user.id_user === userId) {
                    return { ...user, status: 1 };
                }
                return user;
            });
            setUsers(updatedUsers);
            setUsers(updatedUsers);
            const diaryContent = `User ${userId} đã được mở khóa.`;
            const diaryInserted = await insertDiary(diaryContent, userLogin.id_user);

            if (!diaryInserted) {
                console.error("Failed to insert diary entry");
                // Optionally, handle the failure here
            }
        } catch (error) {
            console.error("Lỗi khi mở khóa người dùng:", error);
        }
    };



    const handlePrintUserList = () => {
        fetch('http://localhost:8080/api/printCustomer/excel')
            .then(response => {
                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Return the response blob
                return response.blob();
            })
            .then(blob => {
                // Create a URL for the blob
                const url = URL.createObjectURL(blob);
                // Create an <a> element to trigger download
                const a = document.createElement('a');
                a.href = url;
                a.download = 'userList.xlsx'; // Set the filename
                // Append the <a> element to the body and trigger the download
                document.body.appendChild(a);
                a.click();
                // Revoke the URL object to free up memory
                URL.revokeObjectURL(url);
                // Remove the <a> element from the DOM
                document.body.removeChild(a);
            })
            .catch(error => {
                console.error('Error downloading Excel file:', error);
            });
    };






    return (
        <div>
            <div id="wrapper">
                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
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
                            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                <i className="fa fa-bars"></i>
                            </button>
                            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown no-arrow d-sm-none">
                                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-search fa-fw"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                        <form className="form-inline mr-auto w-100 navbar-search">
                                            <div className="input-group">
                                                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
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
                                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" onClick={toggleDropdown1} aria-haspopup="true" aria-expanded={showDropdown1 ? "true" : "false"}>
                                        <i className="fas fa-bell fa-fw"></i>
                                        <span className="badge badge-danger badge-counter">3+</span>
                                    </a>
                                    <div className={`dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in ${showDropdown1 ? 'show' : ''}`} aria-labelledby="alertsDropdown">
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
                                        <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                                    </div>
                                </li>
                                <li className="nav-item dropdown no-arrow mx-1">
                                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" onClick={toggleDropdown} aria-haspopup="true" aria-expanded={showDropdown ? "true" : "false"}>
                                        <i className="fas fa-envelope fa-fw"></i>
                                        <span className="badge badge-danger badge-counter">7</span>
                                    </a>
                                    <div className={`dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in ${showDropdown ? 'show' : ''}`} aria-labelledby="messagesDropdown">
                                        <h6 className="dropdown-header">Message Center</h6>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="img/undraw_profile_1.svg" alt="..."/>
                                                <div className="status-indicator bg-success"></div>
                                            </div>
                                            <div className="font-weight-bold">
                                                <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                                                <div className="small text-gray-500">Emily Fowler · 58m</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="img/undraw_profile_2.svg" alt="..."/>
                                                <div className="status-indicator"></div>
                                            </div>
                                            <div>
                                                <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                                                <div className="small text-gray-500">Jae Chun · 1d</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="img/undraw_profile_3.svg" alt="..."/>
                                                <div className="status-indicator bg-warning"></div>
                                            </div>
                                            <div>
                                                <div className="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                                                <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="..."/>
                                                <div className="status-indicator bg-success"></div>
                                            </div>
                                            <div>
                                                <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                                                <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                                    </div>
                                </li>
                                <div className="topbar-divider d-none d-sm-block"></div>
                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>
                                        <img className="img-profile rounded-circle" src="img/undraw_profile.svg"/>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
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
                                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </nav>

                        <div className="container-fluid">
                            <h1 className="h3 mb-2 text-gray-800">Quản lý người dùng</h1>
                            <p className="mb-4">
                                <button className="btn btn-primary" onClick={handleAddUserClick}>Thêm người dùng
                                </button>
                                <button className="btn btn-success ml-2" onClick={handlePrintUserList}>In danh sách
                                </button>
                            </p>
                            <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Danh sách người dùng</h6>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                            <thead>
                                            <tr>
                                                <th>Họ</th>
                                                <th>Tên</th>
                                                <th>Email</th>
                                                <th>Địa chỉ</th>
                                                <th>Số điện thoại</th>
                                                <th>Trạng thái</th>
                                                <th>Thao tác</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {users.map((user) => (
                                                <tr key={user.id_user}>
                                                    <td>{user.last_name}</td>
                                                    <td>{user.first_name}</td>
                                                    <td>{user.username}</td>
                                                    <td>{user.address}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.status === 0 ? 'Khóa' : 'Mở khóa'}</td>
                                                    <td>
                                                        <button className="btn btn-primary" onClick={() => handleEditUserClick(user)}>Chỉnh sửa</button>
                                                        {user.status === 1 ? (
                                                            <button className="btn btn-danger ml-2" onClick={() => handleLockUser(user.id_user)}>Khóa</button>
                                                        ) : (
                                                            <button className="btn btn-success ml-2" onClick={() => handleUnLockUser(user.id_user)}>Mở khóa</button>
                                                        )}
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

                {showAddUserModal && (
                    <AddUserModal onClose={handleCloseModal} />
                )}
                {showUpdateUserModal && selectedUser && (
                    <UpdateUserModal
                        onClose={handleCloseUpdateUserModal}
                        userData={selectedUser}
                    />
                )}
            </div>
        </div>
    );
}

export default UserManagement;
