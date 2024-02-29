import {useState} from 'react'
import "./AddProduct.scss"
import Card from '../../card/Card';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import { db, storage } from '../../../firebase/config';
import { toast } from 'react-toastify';
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import Loader from '../../loader/Loader';

const categories = [
  {id: 1, name: "Laptop"},
  {id: 2, name: "Electronics"},
  {id: 3, name: "Fashion"},
  {id: 4, name: "Phone"},
]

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: ""
}

const AddProduct = () => {
  const [product, setProduct] = useState({...initialState});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setProduct({...product, [name]: value})
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];  //console.log(file);
    //const storageRef = ref(storage, `eshop/${file.name}`); 
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`); //in our firebase storage we created an eshop folder and we store the files by date & name into it
    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
      }, (error) => {
        toast.error(error.message);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //console.log(downloadURL);
          setProduct({...product, imageURL: downloadURL})
          toast.success("Image uploaded succesfully.");
        });
      }
    )

  }

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
    setIsLoading(true);

    try {
      // Add a new document with a generated id.
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate()
      });
      //console.log(docRef);
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({...initialState }) //set products field back to empty
      toast.success("Product Uploaded successfully.")
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message);
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className='product'>
        <h1>Add New Product</h1>
        <Card cardClass="card">
          <form onSubmit={addProduct}>
            <label>Product Name:</label>
            <input 
              type='text'  required
              placeholder='Product Name' 
              name='name'
              value={product.name} 
              onChange={(e) => handleInputChange(e)} 
            />

            <label>Product Image:</label>
            <Card cardClass="group">
              {
                uploadProgress === 0 
                ? null 
                : (
                    <div className="progress">
                      <div 
                        className="progress-bar" 
                        style={{width: `${uploadProgress}%`}}
                      >
                        {uploadProgress < 100 ? `uploading ${uploadProgress}` : `Upload Complete ${uploadProgress}%`}
                      </div>
                    </div>
                )
              }

              <input 
                type='file'   
                accept='image/*' 
                placeholder='Product Image'  
                name='image'     
                onChange={(e) => handleImageChange(e)} 
              />

              {
                product.imageURL === ""
                ? null
                : (
                    <input 
                      type='text' 
                      placeholder="Image URL"
                      //required     
                      name='imageURL' 
                      value={product.imageURL} 
                      disabled  
                    />
                  )
              }
            </Card>

            <label>Product Price:</label>
            <input 
              type='number' 
              placeholder='Product Price'  
              name='price' 
              value={product.price} 
              onChange={(e) => handleInputChange(e)} 
            />

            <label>Product Category:</label>
            <select  
              name="category"  
              value={product.category} required
              onChange={(e)=> handleInputChange(e)}
            >
              <option value="" disabled>
                -- Chose Products Category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                )
              })}
            </select>

            <label>Product Company/Brand:</label>
            <input 
              type='text'  
              placeholder='Product Brand' 
              name='brand' 
              value={product.brand} required
              onChange={(e) => handleInputChange(e)} 
            />

            <label>Product description:</label>
            <textarea 
              name='desc'
              value={product.desc}
              required
              onChange={(e) => handleInputChange(e)}
            ></textarea>  
              
            <button className='--btn  --btn-primary'>Save Product</button>

          </form>
        </Card>
      </div>
    </>
  )
}

export default AddProduct


//Note - Input Tag accept attribute:
//accept='file_extension | image/*'