import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector} from "react-redux";

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
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch provinces');
        }
        const data = await response.json();

        setProvinces(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  const handleProvinceChange = (event) => {
    const value = event.target.value;
    setSelectedProvince(value);
    const selectedProvinceData = provinces.find(province => province.Id === value);
    if (selectedProvinceData) {
      setDistricts(selectedProvinceData.Districts || []);
      setWards([]);
    }
  };

  const handleDistrictChange = (event) => {
    const value = event.target.value;
    setSelectedDistrict(value);
    const selectedDistrictData = districts.find(district => district.Id === value);
    if (selectedDistrictData) {
      setWards(selectedDistrictData.Wards || []);
    }
  };

  const handleWardChange = async (event) => {
    const value = event.target.value;
    setSelectedWard(value);
    const selectedWardData = wards.find(ward => ward.Id === value);
    const selectedDistrictData = districts.find(district => district.Id === selectedDistrict);
    console.log(selectedDistrictData.Name + selectedWardData.Name)
    if (selectedWardData && selectedDistrictData) {
      try {
        const encodedToDistrict = encodeURIComponent(selectedDistrictData.Name);
        const encodedToWard = encodeURIComponent(selectedWardData.Name);
        const response = await fetch(`http://localhost:8080/api/feeGHN?toDistrict=${encodedToDistrict}&toWard=${encodedToWard}`);
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();


        const total = data.total; // Lấy giá trị total từ đối tượng JSON data
        const time = data.time;

        setShippingFee(total); // Sử dụng giá trị total để cập nhật state hoặc giao diện người dùng
        setShippingTime(time);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };


// Parse totalPrice as a floating-point number
  const totalPriceNumeric = parseFloat(totalPrice);

// Parse shippingFee as a floating-point number, or set it to 0 if it's not defined
  const shippingFeeNumeric = shippingFee ? parseFloat(shippingFee) : 0;

// Add totalPriceNumeric to shippingFeeNumeric and round to 3 decimal places
  const totalPriceWithShippingTime = (totalPriceNumeric + shippingFeeNumeric).toFixed(3);





  return (
      <div style={{ maxWidth: "85%", margin: "0 auto", marginTop: "80px", marginBottom: "80px" }}>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Giỏ hàng của bạn</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group">
              {cartItems.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img src={item.imageUrl} alt={item.name} style={{width: "50px", marginRight: "10px"}}/>
                      <span>{item.name}</span>
                    </div>
                    <div>
                      <span className="badge bg-primary rounded-pill me-2">Price: ${item.price}</span>
                      <br/>
                      <span className="badge bg-secondary rounded-pill me-2">Quantity: {item.quantity}</span>
                    </div>
                  </li>
              ))}
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Total Price Food:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </li>
            </ul>

            <ul className="list-group mb-3">
              {/* Your list items */}
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Delivery charges:</span>
                <span className="badge bg-primary rounded-pill">{shippingFee}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Delivery time:</span>
                <span className="badge bg-primary rounded-pill">{shippingTime}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Total Price:</span>
                <span className="badge bg-primary rounded-pill">{totalPriceWithShippingTime}</span>
              </li>
            </ul>

            <form className="card p-2">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Promo code"/>
                <div className="input-group-append">
                <button type="submit" className="btn btn-secondary">Redeem</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate>
              <div className="cart-section-right">
                <h2 className="main-h2">Thông tin Giao hàng</h2>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="inputName" className="form-label">Tên</label>
                    <input type="text" className="form-control" id="inputName" placeholder="Tên" required/>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputPhone" className="form-label">Điện thoại</label>
                    <input type="text" className="form-control" id="inputPhone" placeholder="Điện thoại" required />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="inputEmail" placeholder="Email" required />
                </div>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label htmlFor="inputCity" className="form-label">Tỉnh/Tp</label>
                    <select value={selectedProvince} className="form-select" onChange={handleProvinceChange} required>
                      <option value="">Chọn Tỉnh/Thành phố</option>
                      {provinces && provinces.map(province => (
                          <option key={province.Id} value={province.Id}>
                            {province.Name}
                          </option>
                      ))}

                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputDistrict" className="form-label">Quận/huyện</label>
                    <select value={selectedDistrict} className="form-select" onChange={handleDistrictChange} required>
                      <option value="">Chọn Quận/Huyện</option>
                      {districts && districts.map(district => (
                          <option key={district.Id} value={district.Id}>
                            {district.Name}
                          </option>
                      ))}

                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputWard" className="form-label">Phường/xã</label>
                    <select value={selectedWard} className="form-select" onChange={handleWardChange} required>
                      <option value="">Chọn Xã/Phường</option>
                      {wards && wards.map(ward => (
                          <option key={ward.Id} value={ward.Id}>
                            {ward.Name}
                          </option>
                      ))}

                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="inputAddress" className="form-label">Địa chỉ</label>
                  <input type="text" className="form-control" id="inputAddress" placeholder="Địa chỉ" required/>
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
                  <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked required />
                  <label className="custom-control-label" htmlFor="credit">Thanh toán trực tiếp</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
                  <label className="custom-control-label" htmlFor="debit">Thẻ ngân hàng</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
                  <label className="custom-control-label" htmlFor="paypal">Momo</label>
                </div>
              </div>
              <hr className="mb-4" />
              <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Checkout;
