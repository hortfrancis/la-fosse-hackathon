import { useState, useEffect } from "react";
import { Pokedex, Pokecard, SearchForm, ErrorMessage } from "./components";

import "./styles.css";

export default function App() {
  const [pokemonNames, setPokemonNames] = useState([]);
  const [pokeData, setpokeData] = useState([]);

  const [error, setError] = useState(false);

  const fetchData = async (pokemon) => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + pokemon.toLowerCase(),
    );

    if (!response.ok) {
      throw new Error(
        `Could not fetch pokemon: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  };

  const getPokemonData = async (pokemon) => {
    try {
      const data = await fetchData(pokemon);
      return {
        name: data.name,
        image: data.sprites.front_default,
        type: data.types[0].type.name,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Not a valid pokemon name");
    }
  };

  const addPokemonName = (name) => {
    setPokemonNames((prevState) => [...prevState, name]);
  };

  useEffect(() => {
    const fetchAllPokemonData = async () => {
      try {
        const promises = pokemonNames.map((name) => getPokemonData(name));
        const results = await Promise.all(promises);
        setpokeData(results);
      } catch (error) {
        setError(true);

        setTimeout(() => {
          setError(false);
        }, 3000);

        console.error(error);
        setPokemonNames((prevState) =>
          prevState.slice(0, prevState.length - 1),
        );
      }
    };

    fetchAllPokemonData();
  }, [pokemonNames]);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      {error && <ErrorMessage />}
      <SearchForm addPokemonName={addPokemonName} />
      <Pokedex data={pokeData} />
    </div>
  );
}
