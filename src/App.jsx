import { useEffect } from 'react';
import { Pokedex, Pokecard } from "./components";

import "./styles.css";

const pokemon = ["pikachu", "snorlax", "metapod"];



const data = {
  pokemon: [
    {
      id: 1,
      name: "Charmander",
      type: "fire",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    },
    {
      id: 2,
      name: "Squirtle",
      type: "water",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    },
    {
      id: 3,
      name: "Butterfree",
      type: "flying",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
    },
    {
      id: 4,
      name: "Rattata",
      type: "normal",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
    },
    {
      id: 5,
      name: "Metapod",
      type: "bug",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
    },
  ],
};

// yum yum porridge is fun

export default function App() {

  const fetchData = async (pokemon) => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon);
    const data = await response.json();
    return data;
  };
  
  useEffect(() => {


    (async () => {
    console.log("data:", await fetchData('snorlax'));
    })()
  }, []);

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <Pokedex data={data} />
    </div>
  );
}
