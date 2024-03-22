import { useEffect, useState,  } from "react";
import styles from "./ViewProduct.module.scss";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts } from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { FILTER_BY_SEARCH, selectFilteredProducts } from "../../../redux/slice/filterSlice";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";


const ViewProduct = () => {
  //const [products, setProducts] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);
  
  // const getProducts = () => {
  //   setIsLoading(true);

  //   try {
  //     //get data from firebase
  //     const productsRef = collection(db, "products");
  //     //Order and limit data
  //     const q = query(productsRef, orderBy("createdAt", "desc")); //query or order for products from db based on the time dy were created but in descending order.
  //     //Listen to multiple documents in a collection
  //     onSnapshot(q, (snapshot) => {
  //       //onSnapShot helps us monitor the docs in our db
  //       //console.log(snapshot);
  //       //console.log(snapshot.docs);
  //       const allProducts = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       //console.log(allProducts);
  //       setProducts(allProducts);
  //       setIsLoading(false);
  //       //dispatch your products to redux store
  //       dispatch(
  //         STORE_PRODUCTS({
  //           products: allProducts,
  //         })
  //       );
  //     });
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.messsage);
  //   }
  // };

  // useEffect(() => {
  //   getProducts();
  // }, []);

  const {data, isLoading} = useFetchCollection("products"); 
  //Reading products data from db
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  //store the products data coming from db to redux
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  },[dispatch, data]) //dispatch products when data changes
  
  //read products data from redux
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);  //read the same products data from redux and display on the screen. Remember the filteredProducts contain temporary products
  //console.log(filteredProducts)
  //Note - we are reading all our products data displayed on this page from the redux filteredProducts state.


  //delete Dialog Box
  const confirmDelete = (id, imageURL) => {
    //modal open
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
        // etc...
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      //Delete documents from db
      await deleteDoc(doc(db, "products", id));
      //Delete files from Cloud Storage
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);

      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error(error.messsage);
    }
  };

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

  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  //Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    //performs slice operation on the filtered product
    indexOfFirstProduct,
    indexOfLastProduct
  );
  

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>
        {/*Search Input */}
        <div className={styles.search}>
          <p>
            <b>{filteredProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/*Note - before implementing the search filter function, we were filtering originally through the "products" state from redux */}

        {filteredProducts.length === 0 ? (
          <p>No Products found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>image</th>
                <th>Name</th>
                <th>category</th>
                <th>price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, price, imageURL, category } = product; //filteredProducts properties
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$ ${price}`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} fgcolor="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {/*Pagination */}
        <Pagination
          productsPerPage={productsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={filteredProducts.length}
        />
        </div>

    </>
  );
};

export default ViewProduct;



