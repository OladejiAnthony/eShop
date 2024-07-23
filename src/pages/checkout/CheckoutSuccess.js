import { Link } from "react-router-dom";
import styles from "./CheckoutSuccess.module.scss";

const CheckoutSuccess = () => {
  return (
    <div className={styles.checkoutSuccess}>
      <h2>Checkout Successful</h2>
      <p>Thank you for your purchase</p>
      <br />

      <button className="--btn --btn-danger">
        <Link to="/order-history">View Order Status</Link>
      </button>
    </div>
  );
};

export default CheckoutSuccess;
