import { useState } from "react";

const useFavoritesCities = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const addFavorite = (newFavorite) => {
    const isAlreadyFavorite = favorites.some(
      (city) => city.name === newFavorite.name
    );

    if (!isAlreadyFavorite) {
      setFavorites((prevFavorites) => {
        const newFavorites = [...prevFavorites, newFavorite];
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        return newFavorites;
      });
    }
  };

  const removeFavorite = (cityName) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter(
        (city) => city.name !== cityName
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return { favorites, addFavorite, removeFavorite };
};

export default useFavoritesCities;
