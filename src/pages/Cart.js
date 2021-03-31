import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Layout from "./Layout";
import {getCart} from "./cartHelper";
import Card from "./Productcard";
import Checkout from "./Checkout";


const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        console.log('MAX DEPTH ...');
        setItems(getCart())
    }, [run]);

  // Displays the items currently in the cart.
    const displayItems = items => {
        return (
            <div className="mt-2">
                <h2>Your cart has {`${items.length}`} item(s)</h2>
                <hr/>
                {items.map((product, i) => (
                    <Card 
                        key={i} 
                        product={product} 
                        showViewAddtoCartButton={false} 
                        cartUpdate={true}
                        showRemovefromCart={true}
                        setRun={setRun}
                        run={run}
                    />
                    ))}
            </div>
        )
    };

    // If there are no items within the cart displays this message and link to return back to the homepage.
    const noItemsMessage = () => {
        return (
            <h2 className="mt-2">Your cart is empty. <br/> <Link to={`/`}>
            <button className="btn btn-secondary mt-2">Continue Shopping</button>
        </Link></h2>
        )
        
    };

    // Displays the cart component on screen
    return (
        <Layout title="Shopping Cart" 
                description="Manage your cart items" 
                className="container-fluid"
        >
            <div className="row">
                <div className="col-sm-6">
                    {items.length > 0 ? displayItems(items) : noItemsMessage()}  
                </div>
                <div className="col-sm-6">
                    <div className="mt-2">
                    <h2>Your Cart Summary</h2>  
                    <hr/>
                    <Checkout products={items} setRun={setRun} run={run} />
                    </div>
                    
                </div>
            </div>                    
        </Layout>
    );
};

export default Cart;