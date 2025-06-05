import React, { useState } from 'react';  // <-- Add { useState } here
import './Home.css';
import Header from '../../Components/Header/Header';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';

const Home = () => {
  const [category, setCategory] = useState('');  // Now this will work
  
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    </div>
  );
}

export default Home;