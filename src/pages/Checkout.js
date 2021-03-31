import React, {useState, useEffect} from "react";
import {getProducts} from "../components/apiProduct";


const Checkout = ({products}) => {

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

const showCheckout = () => {
    return (
        <button className="btn btn-secondary">Checkout</button>
    );
};

    return <div>
            <h2>Total: £{getTotal()}</h2>
            {showCheckout()}
        </div>
};

export default Checkout;