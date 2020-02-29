import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import CocktailsList from '../components/CocktailList';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function getDrinks() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        const data = await response.json();
        const { drinks } = data;
        if (drinks) {
          const newCocktails = drinks.map(drink => {
            const {
              idDrink,
              strDrink,
              strDrinkThumbnail,
              strAlcoholic,
              strGlass
            } = drink;

            return {
              id: idDrink,
              name: strDrink,
              image: strDrinkThumbnail,
              info: strAlcoholic,
              glass: strGlass
            };
          });
          setCocktails(newCocktails);
        } else {
          setCocktails([]);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getDrinks();
  }, [searchTerm]);
  return (
    <main>
      <SearchForm setSearchTerm={searchTerm}></SearchForm>
      <CocktailsList loading={loading} cocktails={cocktails}></CocktailsList>
    </main>
  );
}
