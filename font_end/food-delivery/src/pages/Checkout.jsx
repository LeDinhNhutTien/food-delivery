import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import 'bootstrap/dist/css/bootstrap.min.css';

const Checkout = () => {
  const { t } = useTranslation();

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
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [totalPriceWithShipping, setTotalPriceWithShipping] = useState(0);
  const [namePro, setNamePro] = useState('');
  const [nameDt, setNameDt] = useState('');

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

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince) {
        try {
          const response = await fetch(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${selectedProvince}`, {
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
      }
    };

    fetchDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict) {
        try {
          const response = await fetch(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${selectedDistrict}`, {
            headers: {
              'Content-Type': 'application/json',
              'Token': '274efaf3-b96d-11ed-bcba-eac62dba9bd9'
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
        } catch (error) {
          console.error('Error fetching wards:', error);
        }
      }
    };

    fetchWards();
  }, [selectedDistrict]);

  useEffect(() => {
    const calculateTotalPriceWithShipping = () => {
      const totalPriceFloat = parseFloat(totalPrice);
      const shippingFeeFloat = parseFloat(shippingFee || 0);
      const totalPriceWithShipping = (totalPriceFloat + shippingFeeFloat).toFixed(2);
      setTotalPriceWithShipping(totalPriceWithShipping);
    };

    calculateTotalPriceWithShipping();
  }, [totalPrice, shippingFee]);

  const handleProvinceChange = (event) => {
    const value = event.target.value;
    setSelectedProvince(value);
    setSelectedDistrict('');
    setSelectedWard('');
    const province = provinces.find(province => province.ProvinceID === parseInt(value));
    setNamePro(province ? province.ProvinceName : '');
  };

  const handleDistrictChange = (event) => {
    const value = event.target.value;
    setSelectedDistrict(value);
    setSelectedWard('');
    const district = districts.find(district => district.DistrictID === parseInt(value));
    setNameDt(district ? district.DistrictName : '');
  };

  const handleWardChange = async (event) => {
    const value = event.target.value;
    setSelectedWard(value);

    try {
      const url = `http://localhost:8080/api/feeGHN?toDistrict=${selectedDistrict}&toWard=${value}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch shipping fee');
      }

      const { total, time } = await response.json();

      setShippingFee(total);
      setShippingTime(time);
    } catch (error) {
      console.error('Error fetching shipping fee:', error);
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const placeOrder = (event) => {
    event.preventDefault();

    const formData = {
      name: document.getElementById("inputName").value,
      phone: document.getElementById("inputPhone").value,
      email: document.getElementById("inputEmail").value,
      province: namePro,
      district: nameDt,
      ward: wards.find(ward => ward.WardCode === selectedWard)?.WardName || '',
      address: document.getElementById("inputAddress").value,
      note: document.getElementById("inputNote").value,
      paymentMethod: paymentMethod,
      totalPrice: totalPriceWithShipping
    };

    console.log("Form Data:", formData); // Log form data for debugging

    localStorage.setItem("shippingInfo", JSON.stringify(formData));
    setOrderPlaced(true);
    window.location.href = "/order-confirmation";
  };

  return (
      <div style={{ maxWidth: "85%", margin: "0 auto", marginTop: "80px", marginBottom: "80px" }}>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">{t('Your Cart')}</span>
              <span className="badge badge-secondary badge-pill">{cartItems.length}</span>
            </h4>
            <ul className="list-group">
              {cartItems.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img src={item.imageUrl} alt={item.name} style={{ width: "50px", marginRight: "10px" }} />
                      <span>{item.name}</span>
                    </div>
                    <div>
                      <span className="badge bg-primary rounded-pill me-2">{t('Price')}: ${item.price}</span>
                      <br />
                      <span className="badge bg-secondary rounded-pill me-2">{t('Quantity')}: {item.quantity}</span>
                    </div>
                  </li>
              ))}
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>{t('Total Price')}:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </li>
            </ul>

            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>{t('Shipping Fee')}:</span>
                <span className="badge bg-primary rounded-pill">{shippingFee}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>{t('Shipping Time')}:</span>
                <span className="badge bg-primary rounded-pill">{shippingTime}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>{t('Total Price')}:</span>
                <span className="badge bg-primary rounded-pill">{totalPriceWithShipping}</span>
              </li>
            </ul>

            <form className="card p-2">
              <div className="input-group">
                <input type="text" className="form-control" placeholder={t('Promo Code')} />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">{t('Apply')}</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">{t('Shipping Info')}</h4>
            <form className="needs-validation">
              <div className="cart-section-right">
                <h2 className="main-h2">{t('Shipping Info')}</h2>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="inputName" className="form-label">{t('Name')}</label>
                    <input type="text" className="form-control" id="inputName" placeholder={t('Name')} required />
                    <div className="invalid-feedback">
                      {t('Please enter your name.')}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputPhone" className="form-label">{t('Phone')}</label>
                    <input type="text" className="form-control" id="inputPhone" placeholder={t('Phone')} required />
                    <div className="invalid-feedback">
                      {t('Please enter your phone number.')}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label">{t('Email')}</label>
                  <input type="email" className="form-control" id="inputEmail" placeholder={t('Email')} required />
                  <div className="invalid-feedback">
                    {t('Please enter a valid email address.')}
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label htmlFor="inputCity" className="form-label">{t('Province/City')}</label>
                    <select value={selectedProvince} className="form-select" onChange={handleProvinceChange} required>
                      <option value="">{t('Select Province')}</option>
                      {provinces.map(province => (
                          <option key={province.ProvinceID} value={province.ProvinceID}>{province.ProvinceName}</option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      {t('Please select a province/city.')}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputDistrict" className="form-label">{t('District')}</label>
                    <select value={selectedDistrict} className="form-select" onChange={handleDistrictChange} required>
                      <option value="">{t('Select District')}</option>
                      {districts.map(district => (
                          <option key={district.DistrictID} value={district.DistrictID}>{district.DistrictName}</option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      {t('Please select a district.')}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputWard" className="form-label">{t('Ward')}</label>
                    <select value={selectedWard} className="form-select" onChange={handleWardChange} required>
                      <option value="">{t('Select Ward')}</option>
                      {wards.map(ward => (
                          <option key={ward.WardCode} value={ward.WardCode}>{ward.WardName}</option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      {t('Please select a ward.')}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="inputAddress" className="form-label">{t('Address')}</label>
                  <input type="text" className="form-control" id="inputAddress" placeholder={t('Address')} required />
                  <div className="invalid-feedback">
                    {t('Please enter your address.')}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="inputNote" className="form-label">{t('Note')}</label>
                  <input type="text" className="form-control" id="inputNote" placeholder={t('Note')} />
                </div>
              </div>
              <hr className="mb-4" />
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="save-info" />
                <label className="custom-control-label" htmlFor="save-info">{t('Save shipping address')}</label>
              </div>
              <hr className="mb-4" />
              <h4 className="mb-3">{t('Payment Method')}</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" value="Cash on Delivery" checked={paymentMethod === 'Cash on Delivery'} onChange={handlePaymentMethodChange} required />
                  <label className="custom-control-label" htmlFor="credit">{t('Cash on Delivery')}</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" value="VNPay" checked={paymentMethod === 'VNPay'} onChange={handlePaymentMethodChange} required />
                  <label className="custom-control-label" htmlFor="debit">{t('VNPay')}</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" value="Momo" checked={paymentMethod === 'Momo'} onChange={handlePaymentMethodChange} required />
                  <label className="custom-control-label" htmlFor="paypal">{t('Momo')}</label>
                </div>
              </div>
              <hr className="mb-4" />
              <button className="btn btn-primary btn-lg btn-block" onClick={placeOrder} type="submit"> {t('Place Order')}</button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Checkout;
