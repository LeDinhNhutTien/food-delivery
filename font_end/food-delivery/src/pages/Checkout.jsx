import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



const Checkout = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://vnprovinces.pythonanywhere.com/api/provinces/?basic=true&limit=100');
        if (!response.ok) {
          throw new Error('Failed to fetch provinces');
        }
        const data = await response.json();
        setProvinces(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  const fetchDistricts = async (provinceId) => {
    try {
      const response = await fetch(`https://vnprovinces.pythonanywhere.com/api/provinces/${provinceId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch districts');
      }
      const data = await response.json();
      setDistricts(data.districts);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const fetchWards = async (districtId) => {
    try {
      const response = await fetch(`https://vnprovinces.pythonanywhere.com/api/districts/${districtId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch wards');
      }
      const data = await response.json();
      setWards(data.wards);
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  };

  const handleProvinceChange = (event) => {
    const selectedProvinceId = event.target.value;
    setSelectedProvince(selectedProvinceId);
    setSelectedDistrict('');
    setWards([]);
    fetchDistricts(selectedProvinceId);
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    setSelectedDistrict(selectedDistrictId);
    fetchWards(selectedDistrictId);
  };


  useEffect(() => {
    // Xử lý validation của form
    (function() {
      'use strict';
      window.addEventListener('load', function() {
        const forms = document.getElementsByClassName('needs-validation');
        const validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
  }, []);
  return (



    <div style={{ maxWidth: "85%", margin: "0 auto" , marginTop: "80px", marginBottom: "80px"}}>

      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Giỏ hàng của bạn</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group" style={{textDecoration: "none"}}>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Tên sản phẩm</h6>
                <small className="text-muted">Brief description</small>
              </div>
              <span className="text-muted">$12</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Tên sản phẩm</h6>
                <small className="text-muted">Brief description</small>
              </div>
              <span className="text-muted">$8</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Tên sản phẩm</h6>
                <small className="text-muted">Brief description</small>
              </div>
              <span className="text-muted">$5</span>
            </li>
          </ul>

          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Mã giảm giá</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span className="text-success">-$5</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Phí giao hàng</h6>

              </div>
              <span className="text-muted">$12</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Thời gian giao hàng</h6>

              </div>
              <span className="text-muted">4/1/2024 - 5/1/2024</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>$20</strong>
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
              <h2 class="main-h2">Thông tin Giao hàng</h2>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputName" className="form-label">Tên</label>
                  <input type="text" className="form-control" id="inputName" placeholder="Tên" required/>
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPhone" className="form-label">Điện thoại</label>
                  <input type="text" className="form-control" id="inputPhone" placeholder="Điện thoại" required/>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="Email" required/>
              </div>
              <div className="row g-3">
                <div className="col-md-4">
                  <label htmlFor="inputCity" className="form-label">Tỉnh/Tp</label>
                  <select onChange={handleProvinceChange} value={selectedProvince} className="form-select" required>
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    {provinces.map(province => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                    ))}
                  </select>

                </div>
                <div className="col-md-4">
                  <label htmlFor="inputDistrict" className="form-label">Quận/huyện</label>
                  <select onChange={handleDistrictChange} value={selectedDistrict} className="form-select" required>
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map(district => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputWard" className="form-label">Phường/xã</label>
                  <select className="form-select" required>
                    <option value="">Chọn Xã/Phường</option>
                    {wards.map(ward => (
                        <option key={ward.id} value={ward.id}>
                          {ward.name}
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
                <input type="text" className="form-control" id="inputNote" placeholder="Ghi chú"/>
              </div>


            </div>


            <hr className="mb-4"/>

            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="save-info"/>
              <label className="custom-control-label" htmlFor="save-info">Lưu địa chỉ giao hàng</label>
            </div>
            <hr className="mb-4"/>

            <h4 className="mb-3">Hình thức thanh toán</h4>

            <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked
                       required/>
                <label className="custom-control-label" htmlFor="credit">Thanh toán trực tiếp</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required/>
                <label className="custom-control-label" htmlFor="debit">Thẻ ngân hàng</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required/>
                <label className="custom-control-label" htmlFor="paypal">Momo</label>
              </div>
            </div>

            <hr className="mb-4"/>
            <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Checkout;