import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import RestaurantDetails from '../../components/Restaurent/restaurant'
import SearchBar from '../../SearchBar/SearchBar'

const Home = () => {

  const [category,setCategory] = useState("All")

  return (
    <>
      <SearchBar/>
      <Header/>
      <ExploreMenu setCategory={setCategory} category={category}/>
      <FoodDisplay category={category}/>
     
      <AppDownload/>
    
    </>
  )
}

export default Home
