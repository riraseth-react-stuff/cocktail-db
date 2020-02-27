import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import CocktailsList from '../components/CocktailList';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
    )
      .then(response => response.json())
      .then(data => setCocktails(data.drinks));
  }, [searchTerm]);
  return (
    <main>
      <SearchForm setSearchTerm={searchTerm}></SearchForm>
      <CocktailsList loading={loading} cocktails={cocktails}></CocktailsList>
    </main>
  );
}
