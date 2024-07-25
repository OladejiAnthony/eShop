import { doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import styles from "./ChangeOrderStatus.module.scss";

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Order prop:", order);
  }, [order]);

  const editOrder = async (e, id) => {
    e.preventDefault();
    setIsLoading(true);

    // Log each field to identify which one is missing
    console.log("userID:", order.userID);
    console.log("orderDate:", order.orderDate);
    console.log("orderTime:", order.orderTime);
    console.log("orderAmount:", order.orderAmount);
    console.log("cartItems:", order.cartItems);
    console.log("shippingAddress:", order.shippingAddress);
    console.log("createdAt:", order.createdAt);

    //order properties from db
    const orderConfig = {
      userID: order.userID,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now(),
    };

    // Check for undefined fields
    if (
      !order.userID ||
      !order.orderDate ||
      !order.orderTime ||
      !order.orderAmount ||
      !order.cartItems ||
      !order.shippingAddress ||
      !order.createdAt
    ) {
      setIsLoading(false);
      toast.error("Order details are incomplete. Please check the order information.");
      return;
    }

    try {
      await setDoc(doc(db, "orders", id), orderConfig);

      setIsLoading(false);
      toast.success("Order status changed successfully");
      navigate("/admin/orders");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Status</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  -- Choose one --
                </option>
                <option value="Order Placed...">Order Placed...</option>
                <option value="Processing...">Processing...</option>
                <option value="Shipped...">Shipped...</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;




