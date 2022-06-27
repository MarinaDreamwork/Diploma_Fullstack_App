import React, { useContext } from 'react';
import { useState } from 'react';

const FavoriteContext = React.createContext();

export const useFavorite = () => {
  return useContext(FavoriteContext);
};

export const FavoriteProvider = ({ children }) => {
  const [isFavorite, setFavorite] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const handleToggleFavorite = (id) => {
    setFavorite(prevState => !prevState);
    setFavoriteItems(prevState=> [
      ...prevState,
      
    ])
  };

  return <FavoriteContext.Provider value={{ isFavorite, handleToggleFavorite }}>
    { children }
  </FavoriteContext.Provider>
}