import React, {useState, useEffect} from "react";
import {getProducts} from "../components/apiProduct";
import Layout from "./Layout";
import Card from "./Productcard";
import Search from "../components/SearchProduct";

const Home =() => {
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);


    //loads the mostly resently added products by when the product database entry was created
const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
        console.log(data);
        if (data.error) {
            setError(data.error);
        } else {
            setProductsByArrival(data);
        }
    });
};

useEffect(() => {
    loadProductsByArrival();    
}, []);

// loads the component 
    return (
        <Layout title="Welcome to E-shop" description="Shop to your hearts content!" className="container-fluid">
            <Search/>
                <h2 className="mb-4">Latest Products</h2>
                <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-sm-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
              
        </Layout>
    );
};
export default Home;