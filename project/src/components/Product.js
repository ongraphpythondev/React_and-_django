import React from "react";

export default function Product(props) {
  return (
    <div className="row">
      <div className="col-5">
        <h2>{props.product.name}</h2>
      </div>

      <div className="col-3">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-secondary">
            -
          </button>
          <button type="button" className="btn btn-secondary">
            {props.product.quantity}
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              props.incrementQuantity(props.index);
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="col-4">
        {props.product.quantity * props.product.price}
      </div>
    </div>
  );
}
