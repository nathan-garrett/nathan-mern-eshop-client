import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import ShowImage from "../components/showImage";
import moment from 'moment';
import {addItem, updateItem, removeItem } from "./cartHelper";    

//returns the card component which contains  product information
const Card = ({
        product, 
        showName = true, 
        showViewProductButton = true, 
        showViewAddtoCartButton = true, 
        showDate = false,
        cartUpdate = false,
        showRemovefromCart =  false,
        setRun = f => f,
        run = undefined
    }) => {

    const [redirect, setRedirect] = useState(false); 
    const [count, setCount] = useState(product.count) 

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-secondary mt-2 me-3 mb-2">View Product</button>
                </Link>                
            )
        );
    };

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })

    };

    const shouldRedirect = (redirect) => {
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showAddToCartButton = (showViewAddtoCartButton) => {
        return (
            showViewAddtoCartButton && (
               
                <button onClick={addToCart} className="btn btn-secondary mt-2 mb-2">Add to Cart</button>
                        
            )
        );
    };

    const RemoveFromCart = (showRemovefromCart) => {
        return (
            showRemovefromCart && (
           
                <button 
                onClick={() => {
                    removeItem(product._id);
                    setRun(!run);
                    }} 
                    className="btn btn-secondary mt-2 mb-2">Remove Product</button>
                        
            )
        );
    };

    const showProductName = (showName) => {
        return (
            showName && (
                <div className="card-header">
                <h3>{product.name}</h3>
                </div>
            )
        );
    };

    const showStock = (showQuantity) => {
        return showQuantity > 0 ? (
            <p>In Stock</p>
            ) : (
            <p>Out of Stock</p>
            );
    };

    const showCreatedAt = (showDate) => {
        return (
            showDate && (
                <p>Added {moment(product.createdAt).fromNow()}</p>
            )
        );
    };

    const showCartUpdateOption = cartUpdate => {
        return (
          cartUpdate && (
            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Adjust Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
              </div>
            </div>
          )
        );
      };

      const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
          updateItem(productId, event.target.value);
        }
      };

    return (        
            <div className="card text-white bg-dark mb-3">
                    {showProductName(showName)}            
                <div className="card-body">
                    {shouldRedirect(redirect)}
                   <ShowImage item={product} url="product"/>                   
                    <h4 className="mt-3">Description</h4>
                    <p>{product.description.substring(0, 100)}</p>
                    <p>Price: £{product.price}</p>  

                    {showStock(product.qtyInStock)}
                    {showCreatedAt(showDate)}                
                    {showViewButton(showViewProductButton)}  
                    {showAddToCartButton(showViewAddtoCartButton)}  
                    {RemoveFromCart(showRemovefromCart)}     
                    {showCartUpdateOption(cartUpdate)}     
                          
                   
                </div>
            </div>
       
    );
};

export default Card;