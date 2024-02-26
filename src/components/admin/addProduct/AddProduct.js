import {useState} from 'react'
import "./AddProduct.scss"
import Card from '../../card/Card';
import {ref, uploadBytesResumable} from "firebase/storage";
import { storage } from '../../../firebase/config';

const categories = [
  {id: 1, name: "Laptop"},
  {id: 2, name: "Electronics"},
  {id: 3, name: "Fashion"},
  {id: 4, name: "Phone"},
]

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    desc: ""
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setProduct({...product, [name]: value})
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    //console.log(file);

    //firebase storage
    //const storageRef = ref(storage, `eshop/${file.name}`); 
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`); //in our firebase storage we created an eshop folder and we store the files by date & name into it
    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, file);

  }

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product)

  }

  return (
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
            <div className="progress">
              <div 
                className="progress-bar" 
                style={{width: "50%"}}
              >
                Uploading 50%
              </div>
            </div>
            <input 
              type='file'   
              accept='image/*' 
              placeholder='Product Image'  
              name='image'     
              onChange={(e) => handleImageChange(e)} 
            />
            <input 
              type='text' 
              placeholder="Image URL"
              //required     
              name='imageURL' 
              value={product.imageURL} 
              disabled  
            />
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
  )
}

export default AddProduct


//Note - Input Tag accept attribute:
//accept='file_extension | image/*'