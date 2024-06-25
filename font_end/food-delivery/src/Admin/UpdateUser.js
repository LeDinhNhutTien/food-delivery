import React, { useState, useEffect } from 'react';

const TextInput = ({ label, name, value, onChange, required, onBlur }) => (
    <div className="form-group">
        <label>{label}</label>
        <input
            type="text"
            className="form-control"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
        />
    </div>
);

const UpdateUser = ({ onClose, userData }) => {
    const [updatedUser, setUpdatedUser] = useState({ ...userData });
    const [errors, setErrors] = useState({});
    const [usernameError, setUsernameError] = useState('');

    useEffect(() => {
        setUpdatedUser({ ...userData });
    }, [userData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    };

    const validateForm = () => {
        const errors = {};

        if (!updatedUser.last_name) {
            errors.last_name = 'Họ là bắt buộc';
        }

        if (!updatedUser.first_name) {
            errors.first_name = 'Tên là bắt buộc';
        }

        if (!updatedUser.username) {
            errors.username = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(updatedUser.username)) {
            errors.username = 'Email không hợp lệ';
        }

        if (!updatedUser.address) {
            errors.address = 'Địa chỉ là bắt buộc';
        }

        if (!updatedUser.phone) {
            errors.phone = 'Số điện thoại là bắt buộc';
        } else if (!/^\d{10}$/.test(updatedUser.phone)) {
            errors.phone = 'Số điện thoại không hợp lệ';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const checkUsername = async (username) => {
        if (username === userData.username) {
            setUsernameError('');
            return;
        }

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

    const handleUsernameBlur = (event) => {
        checkUsername(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm() || usernameError) {
            return;
        }

        try {

            const response = await fetch(`http://localhost:8080/api/managementCustomerAdmin/${updatedUser.id_user}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(updatedUser),
            });

            const contentType = response.headers.get("content-type");
            let responseData;

            if (contentType && contentType.includes("application/json")) {
                responseData = await response.json();
            } else {
                responseData = await response.text(); // Handle non-JSON responses
            }

            console.log("Response status:", response.status);
            console.log("Response data:", responseData);

            if (response.ok) {
                console.log("User updated successfully");
                window.location.reload();
            } else {
                console.error("Error updating user:", responseData);
                alert("Lỗi khi cập nhật người dùng: " + (responseData.message || responseData));
            }
        } catch (error) {
            console.error("Error making request:", error);
            alert("Lỗi khi gửi yêu cầu: " + error.message);
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
                        <div className="card-header">Cập nhật thông tin người dùng</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <TextInput
                                    label="Họ"
                                    name="last_name"
                                    value={updatedUser.last_name}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.last_name && <small className="text-danger">{errors.last_name}</small>}
                                <TextInput
                                    label="Tên"
                                    name="first_name"
                                    value={updatedUser.first_name}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.first_name && <small className="text-danger">{errors.first_name}</small>}
                                <TextInput
                                    label="Email"
                                    name="username"
                                    value={updatedUser.username}
                                    onChange={handleInputChange}
                                    onBlur={handleUsernameBlur} // Check username on blur
                                    required
                                />
                                {errors.username && <small className="text-danger">{errors.username}</small>}
                                {usernameError && <small className="text-danger">{usernameError}</small>}

                                <TextInput
                                    label="Địa chỉ"
                                    name="address"
                                    value={updatedUser.address}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.address && <small className="text-danger">{errors.address}</small>}
                                <TextInput
                                    label="Số điện thoại"
                                    name="phone"
                                    value={updatedUser.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.phone && <small className="text-danger">{errors.phone}</small>}
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Cập nhật</button>
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

export default UpdateUser;
