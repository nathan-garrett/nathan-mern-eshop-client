import { API } from "../config"; // api fro the database
import queryString from "query-string";

//post new product information to the database
export const addProduct = (product) => {
    return fetch(`${API}/product/create`, {
        method: "POST",
        headers: {
            Accept: "application/json"
        },
        body: product
    })
    .then(response => {
    return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};


//get all product information from the database and sort by a specific criteria aswell as order by descending and limit results displayed to 6 products
export const getProducts = sortBy => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//Another get all product information but this time theres no specific filter to the data with unlimited results
export const getManageProducts = () => {
    return fetch(`${API}/products?limit=undefined`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//delete a single product from the database
export const deleteProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//get a single product from the database
export const getManageProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//update a product currently stored in the datbase
export const updateExistingProduct = (productId, product) => {
    return fetch(`${API}/product/updateproduct/${productId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json"            
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//return a list of products by search parameters
export const list = params => {
    const query = queryString.stringify(params);

    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};