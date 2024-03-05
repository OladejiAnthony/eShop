import React, { useEffect, useState } from 'react'
import styles from "./ProductFilter.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import {
  FILTER_BY_CATEGORY} from "../../../redux/slice/filterSlice"
import { selectProducts } from '../../../redux/slice/productSlice';

  

const ProductFilter = () => {
  
  const products = useSelector(selectProducts);
  const allCategories = [
    "All", //added ALL to the xisting categories
    ...new Set(products.map((product) => product.category)) 
  ]
  //console.log(allCategories)
  const [category, setCategory] = useState("ALL");

  const dispatch = useDispatch();
  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({
      products,
      category: cat
  }))
  }


  //Category Filter logic
  // useEffect(() => {
  //   //console.log(sort);
  //   dispatch(
  //     FILTER_BY_CATEGORY({
  //       products,
  //       category,
  //     })
  //   );
  // }, [category, products, dispatch]);


  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {
          allCategories.map((cat, index) => {
            return (
              <button key={index} type='button' className={`${category}` === cat ? `${styles.active}` : null } onClick={() => filterProducts(cat)}>
                &#8250; {cat}
              </button>
            )
          })
        }
      </div>

      <h4>Brand</h4>
      <div className={styles.brand}>
        <select name='brand'>
          <option value="all">All</option>
        </select>
      </div>

      <h4>Price</h4>
      <p>1500</p>
      <div className={styles.price}>
        <input type='range' name='price' min="100" max="1000"   />
      </div>
      <br />
      <button className='--btn --btn-danger'>Clear Filter</button>

    </div>
  )
}

export default ProductFilter


