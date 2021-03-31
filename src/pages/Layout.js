import React from "react";
import "../styles.css";

// banner component
const Layout =({title = "Title", description ="Description", className, children}) => (
    <div>
        <div className="">
            <div className="banner">
                <h2 className="ms-3">{title}</h2>
                <p className="lead ms-3">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
    </div>
        
);

export default Layout;