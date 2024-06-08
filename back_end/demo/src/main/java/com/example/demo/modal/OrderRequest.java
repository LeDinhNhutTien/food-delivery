package com.example.demo.modal;

import java.util.List;

public class OrderRequest {
    private ShippingInfo shippingInfo;
    private int userId;
    private List<CartItem> storedCartItems;

    public OrderRequest() {
    }

    // Getters and setters
    public ShippingInfo getShippingInfo() {
        return shippingInfo;
    }

    public void setShippingInfo(ShippingInfo shippingInfo) {
        this.shippingInfo = shippingInfo;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public List<CartItem> getStoredCartItems() {
        return storedCartItems;
    }

    public void setStoredCartItems(List<CartItem> storedCartItems) {
        this.storedCartItems = storedCartItems;
    }
}
