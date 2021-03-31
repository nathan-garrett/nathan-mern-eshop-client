import React, {useState, useEffect} from "react";
import Layout from "../pages/Layout";
import {Link} from "react-router-dom";
import {addProduct} from "./apiProduct";

const CreateProduct =() =>  {
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

    useEffect (() => {
        setValues({...values, formData: new FormData()})
    }, []);

    const handleChange = name => event => {
        const value = name === "image" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value});
    };

    // on click event to submit the form data
    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: "", loading: true});

        addProduct(formData)
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, name: "", description: "", image: "", price: "", qtyInStock: "", loading: false, createdProduct: data.name});
            }
        });
    };

//create a new product form
    const newPostForm = () => (
        <div className="container">
            <form className="mb-3" onSubmit={clickSubmit}>
            <label className="text-muted">Upload Image</label>
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
            <button className="btn btn-secondary mt-2">Create Product</button>
        </form>
        <button className="btn btn-secondary"><Link className="nav-link a-style" to="/product">Back</Link></button>
        </div>
        
        
    );
    
    //display message when there is an error
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );
    
    //display message when successful
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is Created!</h2>
        </div>
    );

    //display message when component is loading
    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    //return, render the component to the page when called
    return (
        <Layout title="Product Creation"
        description="Create a new product"
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

export default CreateProduct;