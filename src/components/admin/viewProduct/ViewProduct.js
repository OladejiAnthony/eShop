import { useEffect, useState } from "react";
import styles from "./ViewProduct.module.scss";
import { toast } from "react-toastify";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch } from "react-redux";
import { STORE_PRODUCTS } from "../../../redux/slice/productSlice";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getProducts = () => {
    setIsLoading(true);

    try {
      //get data from firebase
      const productsRef = collection(db, "products");
      //Order and limit data
      const q = query(productsRef, orderBy("createdAt", "desc")); //query or order for products from db based on the time dy were created but in descending order.
      //Listen to multiple documents in a collection
      onSnapshot(q, (snapshot) => {
        //onSnapShot helps us monitor the docs in our db
        //console.log(snapshot);
        //console.log(snapshot.docs);
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        //console.log(allProducts);
        setProducts(allProducts);
        setIsLoading(false);
        //dispatch your products to redux store
        dispatch(
          STORE_PRODUCTS({
            products: allProducts,
          })
        );
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.messsage);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //delete Dialog Box
  const confirmDelete = (id, imageURL) => {
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

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>
        {products.length === 0 ? (
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
              {products.map((product, index) => {
                const { id, name, price, imageURL, category } = product;
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
      </div>
    </>
  );
};

export default ViewProduct;
