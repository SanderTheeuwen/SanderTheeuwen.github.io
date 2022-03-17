import React from "react";

class Product extends React.Component 
{
    render() 
    {
        return (
            <div className="page">
                <h1>{this.props.product.name}</h1>
            </div>
        );
    }
}

export { Product };