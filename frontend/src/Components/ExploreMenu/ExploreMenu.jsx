import React from 'react';
import './ExploreMenu.css';
import { assets, menu_list } from '../../assets/assets';

const ExploreMenu = () => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our Menu</h1>
      <p className="explore-menu-text">
        From sizzling street food to gourmet specialties, our menu is crafted to satisfy every craving. Whether you're in the mood for something quick and tasty or a full-course delight, we've got you covered.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div className="explore-menu-item" key={index}>
            {/* Render menu item content here, for example: */}
            <img src={item.menu_image} alt={item.menu_name} />
<p>{item.menu_name}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
