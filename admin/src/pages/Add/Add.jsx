import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import './Add.css';

const Add = () => {
  const [image, setImage] = useState(false); 
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting product:", { ...data, image });
    // You can now send this data to your backend
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={handleSubmit}>
        <div className="add-img-upload">
          <p>Upload image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
        </div>

        <div className="add-category-price">
          <p>Product category</p>
          <select onChange={onChangeHandler} value={data.category} name="category">
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="cake">cake</option>
            <option value="pure veg">pure veg</option>
            <option value="pasta">pasta</option>
            <option value="noodles">noodles</option>
          </select>
        </div>

        <div className="add-price flex-col">
          <p>Product price</p>
          <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="Price" />
        </div>

        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
