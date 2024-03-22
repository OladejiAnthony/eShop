import React, { useEffect, useState } from "react";
import styles from "./ProductFilter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../../redux/slice/productSlice";


const ProductFilter = () => {
  const products = useSelector(selectProducts); //read products data from redux
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const dispatch = useDispatch();

  const allCategories = [
    "All", //added "ALL" property to the existing categories
    ...new Set(products.map((product) => product.category)), //map through the products data from redux
  ]; //console.log(allCategories)
  const allBrands = [
    "All", //added "ALL" to the existing categories
    ...new Set(products.map((product) => product.brand)),
  ]; //console.log(allBrands)

  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(4000);

  //Category Filter logic
  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(
      FILTER_BY_CATEGORY({
        products,
        category: cat,
      })
    );
  };

  //Brand Filter logic
  useEffect(() => {
    dispatch(
      FILTER_BY_BRAND({
        products,
        brand,
      })
    );
  }, [products, brand, dispatch]);

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  //Price Filter logic
  useEffect(() => {
    dispatch(
      FILTER_BY_PRICE({
        products,
        price,
      })
    );
  }, [products, price, dispatch]);
  

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterProducts(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>

      <h4>Brand</h4>
      <div className={styles.brand}>
        <select
          name="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>

      <h4>Price</h4>
      <p>{`$ ${price}`}</p>
      <div className={styles.price}>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <br />
      <button className="--btn --btn-danger" onClick={clearFilters}>
        Clear Filter
      </button>
      <div>
        
      </div>
    </div>
  );
};

export default ProductFilter;
