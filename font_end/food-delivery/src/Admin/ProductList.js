import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);
    const userLogin = JSON.parse(sessionStorage.getItem("userInfo"));
    useEffect(() => {
        if (!userLogin) {
            window.location.href = "/login";
        }
    }, [userLogin]);


    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
