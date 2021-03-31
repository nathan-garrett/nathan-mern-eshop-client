import React from "react";
import Layout from "./Layout";
import {Link} from "react-router-dom";

// returns the component imports the layout component and links to other components
const Product =() => (
<Layout title="Products" description="Create update and delete">
    <br/>
    <div className="container">
        <div className="card text-white bg-dark mb-3 mb-5 p-1">
            <h3 className="card-Header">Product Management</h3>
            <ul className="list-group">
                <Link className="nav-link" to="/product/create"><button className="btn btn-secondary mt-2 mb-2">Create a new product</button></Link> 
                <Link className="nav-link" to="/product/manage"><button className="btn btn-secondary mt-2 mb-2">Update or delete products</button></Link>                         
            </ul>
        </div>   
    </div>
   
</Layout>
);

export default Product;