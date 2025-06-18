import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './Add.css';
import axios from "axios";

const Add = () => {
  const url = "http://localhost:4000";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image);
      
      const response = await axios.post(`${url}/api/food/add`, formData);
      
      if (response.data.success) {
        // Reset form on success
        setData({
          description: "",
          price: "",
          category: "Salad"
        });
        setImage(false);
        alert("Product added successfully!");
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload">
          <p>Upload image</p>
          <label htmlFor="image">
            <img 
              src={image ? URL.createObjectURL(image) : assets.upload_area} 
              alt="Upload area" 
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
            accept="image/*"
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            type="text"
            placeholder="Type product name here"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select 
              onChange={onChangeHandler} 
              value={data.category} 
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="cake">Cake</option>
              <option value="pure veg">Pure Veg</option>
              <option value="pasta">Pasta</option>
              <option value="noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input 
              onChange={onChangeHandler} 
              value={data.price} 
              type="number" 
              name="price" 
              placeholder="usd" 
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;