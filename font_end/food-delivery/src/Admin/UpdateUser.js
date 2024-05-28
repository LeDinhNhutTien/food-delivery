import React, { useState } from 'react';

const TextInput = ({ label, name, value, onChange, required }) => (
    <div className="form-group">
        <label>{label}</label>
        <input
            type="text"
            className="form-control"
            name={name}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

const UpdateUser = ({ onClose, userData }) => {
    const [updatedUser, setUpdatedUser] = useState({ ...userData });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedUser({ ...updatedUser, [name]: value, status: 1 });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/managementCustomerAdmin/${updatedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
            if (response.ok) {
                window.location.reload();
            } else {
                console.error("Lỗi khi cập nhật người dùng");
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
                                <TextInput
                                    label="Tên"
                                    name="first_name"
                                    value={updatedUser.first_name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextInput
                                    label="Email"
                                    name="username"
                                    value={updatedUser.username}
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextInput
                                    label="Mật khẩu"
                                    name="password"
                                    value={updatedUser.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextInput
                                    label="Địa chỉ"
                                    name="address"
                                    value={updatedUser.address}
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextInput
                                    label="Số điện thoại"
                                    name="phone"
                                    value={updatedUser.phone}
                                    onChange={handleInputChange}
                                    required
                                />
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
