import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRICE_RANGE,
  STORE_PRODUCTS,
  selectProducts,
} from "../../redux/slice/productSlice";
import spinnerImg from "../../assets/spinner.jpg";
import { FaCogs } from "react-icons/fa";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products"); //The collectionName prop value is "products"
  const [showFilter, setShowFilter] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  //console.log(products)

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
    //console.log(data)
    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]); //dispatch products when data changes

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {isLoading ? null : <ProductFilter />}
        </aside>

        <div className={styles.content}>
          {isLoading ? (
            <img
              src={spinnerImg}
              alt="Loading..."
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <ProductList products={products} />
          )}

          {/*Mobile View */}
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
