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

    const [errors, setErrors] = useState({});
    const [usernameError, setUsernameError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const validateForm = () => {
        const errors = {};

        if (!newUser.last_name) {
            errors.last_name = 'Họ là bắt buộc';
        }

        if (!newUser.first_name) {
            errors.first_name = 'Tên là bắt buộc';
        }

        if (!newUser.username) {
            errors.username = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(newUser.username)) {
            errors.username = 'Email không hợp lệ';
        }

        if (!newUser.password) {
            errors.password = 'Mật khẩu là bắt buộc';
        } else if (newUser.password.length < 6) {
            errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        if (!newUser.address) {
            errors.address = 'Địa chỉ là bắt buộc';
        }

        if (!newUser.phone) {
            errors.phone = 'Số điện thoại là bắt buộc';
        } else if (!/^\d{10}$/.test(newUser.phone)) {
            errors.phone = 'Số điện thoại không hợp lệ';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const checkUsername = async (username) => {
        try {
            const response = await fetch(`http://localhost:8080/api/checkUsername/${username}`);
            const data = await response.text();
            if (response.ok) {
                setUsernameError(data ? 'Email đã tồn tại' : '');
            } else {
                setUsernameError('');
            }
        } catch (error) {
            console.error("Error checking username:", error);
            setUsernameError('Lỗi kiểm tra email');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!await validateForm() || usernameError) {
            return;
        }

        try {
            const accessToken = sessionStorage.getItem("accessToken");
            const response = await fetch("http://localhost:8080/api/managementCustomerAdmin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
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

    const handleUsernameBlur = (event) => {
        checkUsername(event.target.value);
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
                                    {errors.last_name && <small className="text-danger">{errors.last_name}</small>}
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
                                    {errors.first_name && <small className="text-danger">{errors.first_name}</small>}
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="username"
                                        value={newUser.username}
                                        onChange={handleInputChange}
                                        onBlur={handleUsernameBlur} // Trigger check on blur
                                        required
                                    />
                                    {errors.username && <small className="text-danger">{errors.username}</small>}
                                    {usernameError && <small className="text-danger">{usernameError}</small>}
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
                                    {errors.password && <small className="text-danger">{errors.password}</small>}
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
                                    {errors.address && <small className="text-danger">{errors.address}</small>}
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
                                    {errors.phone && <small className="text-danger">{errors.phone}</small>}
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
