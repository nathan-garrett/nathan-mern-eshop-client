import React, {useState, useEffect} from "react";
import Layout from "../pages/Layout";
import {Link} from "react-router-dom";
import {getManageProduct, updateExistingProduct} from "./apiProduct";

const UpdateProduct =({match}) =>  {
    const [values, setValues] = useState({
        name: "", 
        description: "",
        price: "",
        qtyInStock: "",
        loading: false,
        error: "",
        createdProduct: "",
        formData: "" 
    })

    const {
    name, 
    description,
    price,
    qtyInStock,
    loading,
    error,
    createdProduct,
    formData } = values

    // uses the product id and populates the state with the product information
    const init = productId => {
        getManageProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,                    
                    qtyInStock: data.qtyInStock,
                    formData: new FormData()
                });               
            }
        });
    };


    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value = name === "image" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value});
    };

    // on click event to submit the form data to update an existing product
    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: "", loading: true});

        updateExistingProduct(match.params.productId, formData).then(data => {
            if(data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, name: "", description: "", image: "", price: "", qtyInStock: "", loading: false, createdProduct: data.name});
            }
        });
        
    };

    //update product form
    const newPostForm = () => (
        <div className="container">
            <form className="mb-3" onSubmit={clickSubmit}>
            <label className="text-muted">Update Image</label>
            <div className="form-group">
                <label className="btn btn-outline-secondary">
                    <input onChange={handleChange("image")} type="file" name="image" accept="image/*"/>
                </label>                
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange("name")} type="text" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange("description")} className="form-control" value={description} />
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange("price")} type="number" className="form-control" value={price} />
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange("qtyInStock")} type="number" className="form-control" value={qtyInStock} />
            </div>
            <button className="btn btn-secondary mt-2">Update Product</button>
        </form>
        <button className="btn btn-secondary"><Link className="nav-link a-style" to="/product/manage">Back</Link></button>
        </div>
        
    );
       
    // show message on successful update
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    // show message on an error
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );   

    // show message when component is loading
    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );
    
    //return, render the component to the page when called
    return (
        <Layout title="Update Product Information"
        description="Update an existing product"
        >
            <br/>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;