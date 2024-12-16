// SearchBar.js

import React, { useState,useContext } from 'react';
import './SearchBar.css'; // Import the CSS file for styling
//import { food_list, menu_list } from '../assets/assets';
import FoodItem from '../components/FoodItem/FoodItem';
import { StoreContext } from '../Context/StoreContext'

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {food_list} = useContext(StoreContext);

  const handleSearch = () => {
    // Pass the searchQuery to the parent component via onSearch prop
    onSearch(searchQuery);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search location or food item"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      <div className='menu-list'>
        {
           food_list
              .filter((item,index)=> {
                if(searchQuery== ""){
                    return item;
                }else if(item.name.toLowerCase().includes(searchQuery.toLowerCase())){
                    return item;
                }
              })
              .map((item,index) => {
                if(searchQuery=="")
                  return ;
                else{
                  console.log(item.image);
                  return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} rating={item.rating}/>;
              }
              })
        }
      </div>
    </div>
  );
};

export default SearchBar;