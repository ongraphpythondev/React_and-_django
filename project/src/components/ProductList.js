import React from "react";
import Product from "./Product";

export default function ProductList(props) {
  return props.products.map((product, i) => {
    return (
      <Product
        product={product}
        key={i}
        incrementQuantity={props.incrementQuantity}
        index={i}
      />
    );
  }); 
}
