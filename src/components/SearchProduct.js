import React, {useState} from "react";
import {list} from "./apiProduct";
import Card from "../pages/Productcard";


const Search = () => {
    const [data, setData] = useState({
        search: "",
        results: [],
        searched: false
    });

    const {search, results, searched} = data; 

    // uses the input to search the database for data meeting the search requirements
    const searchData = () =>{
        if(search) {
            list({search: search || undefined})
            .then (response => {
                if(response.error) {
                    console.log(response.error);
                } else {
                    setData({...data, results: response, searched: true});
                }
            });
        }
    };
    // submits the data from the form and run the searchData function
    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    };

    
    const handleChange = (name) => event => {
        setData({...data, [name]: event.target.value, searched: false});
    };

    //returns the searched products and adds them to the card component
    const searchedProducts = (results = []) => {
        return (
            <div className="row">
                {results.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
            </div>
        )
        
    };
// Search form
    const searchForm = () => (
        <form className="form-shadow" onSubmit={searchSubmit}>
            <span className="input-group-text search">
                <div className="input-group input-group-lg">
                    <input type="search" className="form-control" onChange={handleChange("search")} placeholder="Search by Name" /> 
                </div>
                <div className="btn input-group-append" style={{border: "none"}}>
                    <button className="input-group-text search-btn-style">Search</button>
                </div>
            </span>
        </form>
    );
// returns the component with the form
    return (
        <div className="row">
            <div className="container pt-3 pb-3">
                {searchForm()}
                
            </div>
            <div className="container-fluid pt-3 pb-3">
                {searchedProducts(results)}                
            </div>
        </div>
    )
};

export default Search;