import React from 'react';
import './restaurant.css'

const RestaurantDetails = () => {
  // Define restaurant details
  const restaurantName = "The Bistro on Main";
  const logoUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9gSlAwnX6MNQES4DO-ClRTgRdMEz2ZwdZg&s;' // Replace with actual logo URL
  const streetAddress = "123 Main Street";
  const city = "Anytown";
  const state = "CA";
  const zipCode = "12345";
  const country = "United States";
  const googleMapsLink = "https://maps.google.com/maps?q=123+Main+Street+Anytown+CA+12345"; // Replace with actual Google Maps link

  return (
    <div className="restaurant-details">
      <h2>{restaurantName}</h2>
      <img src={logoUrl} alt={`${restaurantName} Logo`} className="logo" />
      <address>
        <p>{streetAddress}</p>
        <p>{city}, {state} {zipCode}</p>
        <p>{country}</p>
      </address>
      <p><a href={googleMapsLink} target="_blank" rel="noopener noreferrer">View on Google Maps</a></p>
    </div>
  );
};

export default RestaurantDetails;