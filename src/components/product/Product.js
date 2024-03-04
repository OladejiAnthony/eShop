import React, { useEffect } from 'react'
import styles from "./Product.module.scss"
import ProductFilter from './productFilter/ProductFilter'
import ProductList from './productList/ProductList'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS, selectProducts } from '../../redux/slice/productSlice'

const Product = () => {
    const {data, isLoading} = useFetchCollection("products"); //The collectionName prop value is "products"

    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    console.log(products)
  
    useEffect(() => {
      dispatch(
        STORE_PRODUCTS({
          products: data,
        })
      );
      //console.log(data)
    },[dispatch, data]) //dispatch products when data changes


    return (
        <section>
        <div className={`container ${styles.product}`}>
            <aside className={styles.filter}>
                <ProductFilter />
            </aside>

            <div className={styles.content}>
                <ProductList />
            </div>
        </div>
        </section>

    )
}

export default Product
