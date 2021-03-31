import React, {useState, useEffect} from "react";
import Layout from "../pages/Layout";
import {Link} from "react-router-dom";
import {getManageProducts, deleteProduct} from "./apiProduct";


//get all products from the database
const ManageProducts = () => {

    const [products, setProducts] = useState([])

    const loadProducts = () => {
        getManageProducts().then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    // delete a product from the datbase by id
    const destory = productId => {
        deleteProduct(productId).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    //returns the component
    return (
        <Layout title="Manage Products" 
        description="Update or delete products" 
        className="container-fluid"
        >
           <br/>
           <div className="row">               
                <div className="col-sm-12"> 
                <h2 className="text-center">Total {products.length} products</h2>
                <button className="btn btn-secondary"><Link className="nav-link a-style" to="/product">Back</Link></button>
                <hr/>
                <div className="container custom-width">
                <ul className="list-group">
                        {products.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content between align-items center"
                            >
                               <div className="col-sm-6 "><strong>{p.name}</strong></div>                              
                                <div className="d-grid gap-2 col-sm-6 ms-auto">                       
                                    <Link to={`/product/update/${p._id}`}>
                                        <button className="btn btn-secondary" type="button">Update</button>
                                    </Link>
                                    <a><button onClick={() => destory(p._id)} className="btn btn-secondary" type="button">Delete</button></a>
                                </div>                         
                            </li>
                        ))}
                    </ul>
                </div>
                    
                    <br />
                </div>
           </div>              
        </Layout>
    );

};

export default ManageProducts;