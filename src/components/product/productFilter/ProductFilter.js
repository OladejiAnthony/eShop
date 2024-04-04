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
  //console.log(products)
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

  const [category, setCategory] = useState("All"); //initial state set to "All"
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(4000);

  //Category Filter logic
  const filterProducts = (cat) => {
    setCategory(cat);
    //dispatch all the products data + the single category you choose in jsx 
    dispatch(
      FILTER_BY_CATEGORY({
        products,
        category: cat,
      })
    );
  };

  //Brand Filter logic
  useEffect(() => {
    //dispatch all the products data + the single brand you choose in jsx 
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
    //dispatch all the products data + the single price you choose in jsx 
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



//JS Set Object:
//The Set object in JavaScript represents a collection of unique values, meaning that each value 
//can only occur once within a Set. The Set object provides methods for adding, removing, and 
//checking for the existence of elements efficiently.
//The Set constructor allows you to create a new Set object with an optional iterable parameter, 
//such as an array. When you use the spread operator (...) with the new Set() constructor, 
//it allows you to create a Set object by passing an array (or any iterable) and spreading its 
//elements into the Set. 
//This operation automatically eliminates duplicate elements, ensuring that 
//only unique values are stored in the Set.

