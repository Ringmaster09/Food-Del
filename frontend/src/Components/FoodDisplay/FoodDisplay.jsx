import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    // Safe context access with fallback
    const { food_list = [] } = useContext(StoreContext) || {};
    
    return (
        <div>
            <div className='food-display' id='food-display'>
                <h2>Top dishes near you</h2>
                <div className="food-display-list">
                    {food_list.map((item, index) => (
                        <FoodItem 
                            key={index} 
                            id={item._id} 
                            name={item.name} 
                            description={item.description} 
                            price={item.price} 
                            image={item.image} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FoodDisplay;