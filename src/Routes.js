import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Menu from "./pages/Menu";
import CreateProduct from "./components/CreateProduct";
import ManageProducts from "./components/ManageProducts";
import UpdateProduct from "./components/UpdateProduct";
import ViewProduct from "./pages/ViewProduct";
import Cart from "./pages/Cart";

//Routes contain the links to import components for the application
const Routes =() => {
    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route path="/" exact component={Home}/> 
                <Route path="/shop" exact component={Shop}/> 
                <Route path="/product" exact component={Product}/>
                <Route path="/product/create" exact component={CreateProduct} /> 
                <Route path="/product/manage" exact component={ManageProducts} />
                <Route path="/product/update/:productId" exact component={UpdateProduct} />    
                <Route path="/product/:productId" exact component={ViewProduct}/> 
                <Route path="/cart" exact component={Cart}/>                  
            </Switch>
             
        </BrowserRouter>
    );
};

export default Routes;