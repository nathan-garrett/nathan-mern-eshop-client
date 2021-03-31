import React from "react";
import {Link, withRouter} from "react-router-dom";
import {itemTotal} from "./cartHelper";

// Colour for active and non-active navbar item
const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: "#ff9900"}; // colour for active menu 
    } else {
        return {color: "#ffffff"}; // colour for non active menu 
    }
};

//Navbar component 
const Menu = ({history}) => (
  
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav-shadow">
  <div className="container-fluid">
    <a className="navbar-brand">E-shop</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a><Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link></a>
        </li>
        <li className="nav-item">
          <a><Link className="nav-link" style={isActive(history, "/product")} to="/product">Products</Link></a>
        </li>   
        <li className="nav-item">
          <a><Link className="nav-link" style={isActive(history, "/cart")} to="/cart">Cart<sup><small className="cart-badge">{itemTotal()}</small></sup></Link></a>
        </li>       
      </ul>
    </div>
  </div>
</nav>
   
);

export default withRouter(Menu);

