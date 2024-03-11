import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import spinnerImg from "../../../assets/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  DECREASE_CART,
  CALCULATE_CART_TOTAL_QUANTITY,
  selectCartItems,
} from "../../../redux/slice/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  //console.log(id);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  //read data from redux cartSlice
  const cartItems = useSelector(selectCartItems);

  //Get a single document from db
  const getProduct = async () => {
    //console.log("Getting Product")
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log(docSnap.data());
      const obj = {
        // adding id to the properties of our product
        id: id,
        ...docSnap.data(),
      };
      setProduct(obj);
    } else {
      toast.error("Product not found.");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  //cart
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_CART_TOTAL_QUANTITY());
  };
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_CART_TOTAL_QUANTITY());
  };

  const cart = cartItems.find((cart) => cart.id === id);
  //console.log(cart)
  //check whether item has been added to cart
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
    //if cart is not yet added, it returns -1,
    //if cart is added it returns 1
  });

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back to Product</Link>
        </div>

        {product === null ? (
          <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$ ${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU:</b> {product.id}
                </p>
                <p>
                  <b>Brand:</b> {product.brand}
                </p>

                <div className={styles.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>

                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
