import { useState, useEffect } from "react";
import { Pokedex, Pokecard } from "./components";

import "./styles.css";

const pokemonNames = [
  "pikachu",
  "snorlax",
  "metapod",
  "jigglypuFF",
  "buLbasaur",
  "LUCARIO",
];

export default function App() {
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

  useEffect(() => {
    (async () => {
      const fetchAllPokemonData = async () => {
        const promises = pokemonNames.map((name) => getPokemonData(name));
        const results = await Promise.all(promises);
        setpokeData(results);
      };

      fetchAllPokemonData();

      console.log(pokeData);
    })();
  }, []);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <Pokedex data={pokeData} />
    </div>
  );
}
