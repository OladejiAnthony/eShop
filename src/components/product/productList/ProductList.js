import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredProducts } from "../../../redux/slice/filterSlice";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../pagination/Pagination";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();

  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  //Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    //performs slice operation on the filtered product
    indexOfFirstProduct,
    indexOfLastProduct
  );

  //Search Filter logic
  useEffect(() => {
    //console.log(search);
    dispatch(
      FILTER_BY_SEARCH({
        products,
        search,
      })
    );
  }, [search, products, dispatch]);

  //Sort Filter logic
  useEffect(() => {
    //console.log(sort);
    dispatch(
      SORT_PRODUCTS({
        products,
        sort,
      })
    );
  }, [sort, products, dispatch]);

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        {/*Grid and List view Icons */}
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color={"orangered"}
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />
          <p>
            <b>{filteredProducts.length} Products found.</b>
          </p>
        </div>
        {/*Search Input */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/*Sort Products */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>
      {/*List Product */}
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>No Product found.</p>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} product={product} />
                  {/*we passed in all the products properties to this component using spread operator */}
                </div>
              );
            })}
          </>
        )}
      </div>

      {/*Pagination */}
      <Pagination
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  );
};

export default ProductList;
