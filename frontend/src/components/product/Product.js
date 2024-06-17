import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../actions/cartActions";
import { useAlert } from "react-alert";
import "bootstrap-icons/font/bootstrap-icons.css";

const Product = ({ product, col }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const addToCart = () => {
    dispatch(addItemToCart(product._id, 1));
    alert.success("Item Added to Cart");
  };

  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={product.images[0].url}
          alt="Images Product"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">${product.price}</p>
          <div>
            <Link
              to={`/product/${product._id}`}
              id="view_btn"
              className="btn btn-block"
              style={{ display: "inline-block" }}
            >
              View Details{" "}
            </Link>

            {/* <button
            type="button"
            id="view_btn"
            className="btn btn-block"
            disabled={product.stock === 0}
            onClick={addToCart}
          >
            Add to Cart
          </button> */}
            <i
              className="fa-light fa-cart-shopping"
              style={{ color: "#FFD43B" }}
              disabled={product.stock === 0}
              onClick={addToCart}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
