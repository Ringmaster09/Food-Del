import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food`);
      console.log("Fetched data:", response.data);

      if (response.data.success) {
        setList(response.data.foods);
      } else {
        console.error("Fetch failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list">
      <h2>Food List</h2>
      {list.length === 0 ? (
        <p>No food items available.</p>
      ) : (
        <div className="food-grid">
          {list.map((item) => (
            <div className="food-card" key={item._id}>
              <img
                src={`${url}/uploads/${item.image}`}
                alt={item.description}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />
              <h3>{item.description}</h3>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
