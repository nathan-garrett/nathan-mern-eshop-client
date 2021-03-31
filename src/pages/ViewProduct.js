import React, {useState, useEffect} from "react";
import {read} from "../components/apiProduct";
import Layout from "./Layout";
import Card from "./Productcard";

const ViewProduct = (props) => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);

    const loadOneProduct = productId => {
        read(productId).then(data => {
            if(data.error) {
                setError(data.error);
            } else {
                setProduct(data);
            }
        });
    };

    // grab the product id from the URL
    useEffect(() => {
        const productId = props.match.params.productId
        loadOneProduct(productId)
    }, [props]);

    return (
        <Layout 
            title={ product && 
                    product.name} 
            description=" " 
            className="container-fluid">
            <div className="row">
                {   product && 
                    product.description && 
                    <Card product={product} showName={false} showViewProductButton={false} showDate={true} showStock={true}/>
                }
               
            </div> 
        </Layout>
    );

};

export default ViewProduct;