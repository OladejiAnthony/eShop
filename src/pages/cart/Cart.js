import React, { useEffect } from "react";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_CART_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
  SAVE_URL,
} from "../../redux/slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Card from "../../components/card/Card";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  const increaseCart = (cart) => {
    //Add product to cart &
    //Increase cart count
    dispatch(ADD_TO_CART(cart));
  };
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };
  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };
  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  //calculate price subtotal & cart item total amount
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_CART_TOTAL_QUANTITY());
    dispatch(SAVE_URL("")) //on page first load, save url is empty in redux
  }, [dispatch, cartItems]); // it fires off everytime the cartItem changes

  //track url whenever user is on this page
  const url = window.location.href;
  //console.log(url)
  const navigate = useNavigate()
  const checkout = () => {
    if(isLoggedIn) {
      //on user login, redirect to checkout details page 
      navigate("/checkout-details")
    }else {
      //dispatch action to redux
      //navigate user to login
      dispatch(SAVE_URL(url))
      navigate("/login")
    }
  }


  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {selectCartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div>
              <Link to="/#products"> &larr; Continue Shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            onClick={() => decreaseCart(cart)}
                            className="--btn"
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            onClick={() => increaseCart(cart)}
                            className="--btn"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        {(price * cartQuantity).toFixed(2)}{" "}
                        {/*two decimal places */}
                      </td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => removeFromCart(cart)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearCart}>
                Clear Cart
              </button>
              {/*Checkout */}
              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Continue Shopping</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <strong>
                      Cart item(s):{" "}
                      <b
                        style={{ color: "orangered" }}
                      >{`${cartTotalQuantity}`}</b>
                    </strong>
                  </p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>{`$ ${cartTotalAmount.toFixed(2)}`}</h3>
                  </div>
                  <p>Tax and sipping calculated at checkout</p>
                  <button className="--btn --btn-primary --btn-block" onClick={checkout}>
                    Checkout
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
