import React from "react";
import { API } from "../config";

// returns the product images
const ShowImage = ({ item, url }) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/image/${item._id}`}
            alt={item.name}
            className="border-dark"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
    </div>
);

export default ShowImage;