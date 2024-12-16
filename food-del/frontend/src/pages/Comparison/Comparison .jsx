import React, { useContext } from 'react';
import './Comparison.css';
import { StoreContext } from '../../Context/StoreContext';

const Comparison = () => {
  const { App1, App2, App3, food_list, url, currency } = useContext(StoreContext);

  // Combine apps and food_list into one array for mapping
  const items = [
    { name: 'Food List', data: food_list },
    { name: 'App1', data: App1 },
    { name: 'App2', data: App2 },
    { name: 'App3', data: App3 }
  ];

  // Create a mapping of item IDs to their details across all apps
  const itemMap = new Map();
  
  items.forEach(({ name, data }) => {
    data.forEach(item => {
      if (!itemMap.has(item._id)) {
        itemMap.set(item._id, { name: item.name, image: item.image, prices: {} });
      }
      itemMap.get(item._id).prices[name] = item.price;
    });
  });

  const sortedItems = Array.from(itemMap.values());

  return (
    <div className="comparison">
      <h2>Compare Food Items</h2>

      <h2>My App</h2>
      <div className="cart-items-title">
        <p>Items</p> <p>Title</p> <p>Price</p> <p>App1</p> <p>App2</p> <p>App3</p> <p>Add</p>
      </div>
      <br />
      <hr />
      {sortedItems.map(({ name, image, prices }) => (
        <div key={name} className="cart-items-title cart-items-item">
          <img src={`${url}/images/${image}`} alt={name} />
          <p>{name}</p>
          <p>{currency}{prices['Food List'] || 'N/A'}</p> {/* Render Food List price first */}
          <p>{currency}{prices['App1'] || 'N/A'}</p> {/* Then App1 price */}
          <p>{currency}{prices['App2'] || 'N/A'}</p> {/* Then App2 price */}
          <p>{currency}{prices['App3'] || 'N/A'}</p> {/* Finally App3 price */}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Comparison;
