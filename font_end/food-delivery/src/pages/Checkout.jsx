import React, { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

const Checkout = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [loading, setLoading] = useState(true);
  const [shippingFee, setShippingFee] = useState('');
  const [shippingTime, setShippingTime] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Thanh toán trực tiếp');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Token': '274efaf3-b96d-11ed-bcba-eac62dba9bd9'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch provinces');
        }

        const data = await response.json();
        if (data.code === 200) {
          setProvinces(data.data);
        } else {
          throw new Error('Failed to fetch provinces data');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching provinces:', error);
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  // Fetch districts when a province is selected
  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const response = await fetch(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${selectedProvince}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Token': '274efaf3-b96d-11ed-bcba-eac62dba9bd9'
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch districts');
          }

          const data = await response.json();
          if (data.code === 200) {
            setDistricts(data.data);
          } else {
            throw new Error('Failed to fetch districts data');
          }
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      };

      fetchDistricts();
    }
  }, [selectedProvince]);

  useEffect(() => {
    const fetchWards = async () => {
      try {
        if (selectedDistrict) {
          const url = `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${selectedDistrict}`;
          const response = await fetch(url, {
            method: 'GET', // GET method since we are using query parameters
            headers: {
              'Content-Type': 'application/json',
              'Token': '274efaf3-b96d-11ed-bcba-eac62dba9bd9' // Replace with your actual token
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch wards');
          }

          const data = await response.json();
          if (data.code === 200) {
            setWards(data.data);
          } else {
            throw new Error('Failed to fetch wards data');
          }
        }
      } catch (error) {
        console.error('Error fetching wards:', error);
      }
    };

    fetchWards();
  }, [selectedDistrict]);




  const handleProvinceChange = (event) => {
    const value = event.target.value;
    setSelectedProvince(value);
    setSelectedDistrict('');
    setSelectedWard('');
  };

  // Function to handle district selection change
  const handleDistrictChange = (event) => {
    const value = event.target.value;
    setSelectedDistrict(value);
    setSelectedWard('');
  };

  const handleWardChange = async (event) => {
    const value = event.target.value;
    setSelectedWard(value);
    const selectedWardData = wards.find(ward => ward.WardCode === value);

    // Ensure selectedDistrict is a valid value
    if (!selectedDistrict) {
      console.error('Selected district is invalid.');
      return;
    }



      const toWardId = selectedWardData.WardCode; // ID of the selected ward

      try {
        const url = `http://localhost:8080/api/feeGHN?toDistrict=${selectedDistrict}&toWard=${toWardId}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const { total, time } = await response.json();
        setShippingFee(total);
        setShippingTime(time);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

  };



  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const placeOrder = (event) => {
    event.preventDefault();

    // Find selected province, district, and ward objects
    const selectedProvinceData = provinces.find(province => province.Id === selectedProvince);
    const selectedDistrictData = districts.find(district => district.Id === selectedDistrict);
    const selectedWardData = wards.find(ward => ward.Id === selectedWard);

    // Retrieve names from selected objects
    const provinceName = selectedProvinceData ? selectedProvinceData.Name : '';
    const districtName = selectedDistrictData ? selectedDistrictData.Name : '';
    const wardName = selectedWardData ? selectedWardData.Name : '';

    // Save user information to localStorage
    const formData = {
      name: document.getElementById("inputName").value,
      phone: document.getElementById("inputPhone").value,
      email: document.getElementById("inputEmail").value,
      province: provinceName,
      district: districtName,
      ward: wardName,
      address: document.getElementById("inputAddress").value,
      note: document.getElementById("inputNote").value,
      paymentMethod: paymentMethod,
      totalPrice: totalPriceWithShipping
    };
    localStorage.setItem("shippingInfo", JSON.stringify(formData));

    // Logic to place the order
    setOrderPlaced(true);
    window.location.href = "/order-confirmation"; // Redirect to the order confirmation page
  };



  const totalPriceWithShipping = (totalPrice + parseFloat(shippingFee || 0)).toFixed(2);



  return (
      <div style={{ maxWidth: "85%", margin: "0 auto", marginTop: "80px", marginBottom: "80px" }}>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Giỏ hàng của bạn</span>
              <span className="badge badge-secondary badge-pill">{cartItems.length}</span>
            </h4>
            <ul className="list-group">
              {cartItems.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img src={item.imageUrl} alt={item.name} style={{width: "50px", marginRight: "10px"}}/>
                      <span>{item.name}</span>
                    </div>
                    <div>
                      <span className="badge bg-primary rounded-pill me-2">Giá: ${item.price}</span>
                      <br/>
                      <span className="badge bg-secondary rounded-pill me-2">Số lượng: {item.quantity}</span>
                    </div>
                  </li>
              ))}
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Tổng tiền sản phẩm:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </li>
            </ul>

            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Phí giao hàng:</span>
                <span className="badge bg-primary rounded-pill">{shippingFee}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Thời gian giao:</span>
                <span className="badge bg-primary rounded-pill">{shippingTime}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Tổng tiền:</span>
                <span className="badge bg-primary rounded-pill">{totalPriceWithShipping}</span>
              </li>
            </ul>

            <form className="card p-2">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Mã khuyến mại"/>
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">Áp dụng</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Địa chỉ thanh toán</h4>
            <form className="needs-validation">
              <div className="cart-section-right">
                <h2 className="main-h2">Thông tin Giao hàng</h2>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="inputName" className="form-label">Tên</label>
                    <input type="text" className="form-control" id="inputName" placeholder="Tên" required />
                    <div className="invalid-feedback">
                      Vui lòng nhập tên của bạn.
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputPhone" className="form-label">Điện thoại</label>
                    <input type="text" className="form-control" id="inputPhone" placeholder="Điện thoại" required />
                    <div className="invalid-feedback">
                      Vui lòng nhập số điện thoại của bạn.
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="inputEmail" placeholder="Email" required />
                  <div className="invalid-feedback">
                    Vui lòng nhập một địa chỉ email hợp lệ.
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label htmlFor="inputCity" className="form-label">Tỉnh/Tp</label>
                    <select value={selectedProvince} className="form-select" onChange={handleProvinceChange} required>
                      <option value="">Chọn Tỉnh/Thành phố</option>
                      {provinces && provinces.map(province => (
                          <option key={province.ProvinceID} value={province.ProvinceID}>
                            {province.ProvinceName}
                          </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      Vui lòng chọn tỉnh/thành phố.
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputDistrict" className="form-label">Quận/huyện</label>
                    <select value={selectedDistrict} className="form-select" onChange={handleDistrictChange} required>
                      <option value="">Chọn Quận/Huyện</option>
                      {districts && districts.map(district => (
                          <option key={district.DistrictID} value={district.DistrictID}>
                            {district.DistrictName}
                          </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      Vui lòng chọn quận/huyện.
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputWard" className="form-label">Phường/xã</label>
                    <select value={selectedWard} className="form-select" onChange={handleWardChange} required>
                      <option value="">Chọn Xã/Phường</option>
                      {wards && wards.map(ward => (
                          <option key={ward.WardCode} value={ward.WardCode}>
                            {ward.WardName}
                          </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      Vui lòng chọn xã/phường.
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="inputAddress" className="form-label">Địa chỉ</label>
                  <input type="text" className="form-control" id="inputAddress" placeholder="Địa chỉ" required />
                  <div className="invalid-feedback">
                    Vui lòng nhập địa chỉ của bạn.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="inputNote" className="form-label">Ghi chú</label>
                  <input type="text" className="form-control" id="inputNote" placeholder="Ghi chú" />
                </div>
              </div>
              <hr className="mb-4" />
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="save-info" />
                <label className="custom-control-label" htmlFor="save-info">Lưu địa chỉ giao hàng</label>
              </div>
              <hr className="mb-4" />
              <h4 className="mb-3">Hình thức thanh toán</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" value="Thanh toán trực tiếp" checked={paymentMethod === 'Thanh toán trực tiếp'} onChange={handlePaymentMethodChange} required />
                  <label className="custom-control-label" htmlFor="credit">Thanh toán trực tiếp</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" value="Vnpay" checked={paymentMethod === 'vnpay'} onChange={handlePaymentMethodChange} required />
                  <label className="custom-control-label" htmlFor="debit">VNPay</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" value="Momo" checked={paymentMethod === 'momo'} onChange={handlePaymentMethodChange} required />
                  <label className="custom-control-label" htmlFor="paypal">Momo</label>
                </div>
              </div>
              <hr className="mb-4" />
              <button className="btn btn-primary btn-lg btn-block"onClick={placeOrder} type="submit">Tiếp tục thanh toán</button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Checkout;
