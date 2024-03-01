import { useState, useEffect } from "react";
import { Pokedex, Pokecard, SearchForm } from "./components";

import "./styles.css";

// const pokemonNames = [
//   //   "pikachu",
//   //   "snorlax",
//   //   "metapod",
//   //   "jigglypuFF",
//   //   "buLbasaur",
//   //   "LUCARIO",
// ];

export default function App() {
  const [pokemonNames, setPokemonNames] = useState([]);
  const [pokeData, setpokeData] = useState([]);
  const fetchData = async (pokemon) => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + pokemon.toLowerCase(),
    );
    const data = await response.json();
    return data;
  };

  const getPokemonData = async (pokemon) => {
    const data = await fetchData(pokemon);
    return {
      name: data.name,
      image: data.sprites.front_default,
      type: data.types[0].type.name,
    };
  };

  const addPokemonName = (name) => {
    setPokemonNames((prevState) => [...prevState, name]);
  };

  useEffect(() => {
    const fetchAllPokemonData = async () => {
      const promises = pokemonNames.map((name) => getPokemonData(name));
      const results = await Promise.all(promises);
      setpokeData(results);
    };

    fetchAllPokemonData();
  }, [pokemonNames]); // Dependency array ensures this runs when pokemonNames changes

  //   (async () => {
  //     const fetchAllPokemonData = async () => {
  //       console.log("pokemonNames:", pokemonNames);
  //       // const promises = pokemonNames.map((name) => getPokemonData(name));
  //       const promises = pokemonNames.map((name) => console.log("name:", name));
  //       const results = await Promise.all(promises);
  //       setpokeData(results);
  //     };

  //     fetchAllPokemonData();

  //     console.log(pokeData);
  //   })();
  // }, [pokemonNames]);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <SearchForm addPokemonName={addPokemonName} />
      <Pokedex data={pokeData} />
    </div>
  );
}
