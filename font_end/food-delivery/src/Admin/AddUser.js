import React, { useState } from 'react';

const AddUserModal = ({ onClose }) => {
    const [newUser, setNewUser] = useState({
        last_name: '',
        first_name: '',
        username: '',
        password: '',
        address: '',
        phone: '',
        createDate: '',
        status: '1',
        role: 'user'
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/managementCustomerAdmin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            if (response.ok) {
                window.location.reload();
            } else {
                console.error("Lỗi khi thêm người dùng mới");
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0
        }}>
            <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999
            }}>
                <div className="container">
                    <div className="card">
                        <div className="card-header">Thêm người dùng mới</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Họ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="last_name"
                                        value={newUser.last_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="first_name"
                                        value={newUser.first_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="username"
                                        value={newUser.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mật khẩu</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={newUser.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Địa chỉ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={newUser.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={newUser.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Thêm</button>
                                    <button type="button" className="btn btn-danger ml-2" onClick={onClose}>Đóng</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;
