import Pokecard from "../Pokecard";
import "./style.css";

export default function Pokedex({ data }) {
  return (
    <div className="Pokedex">
      {data.map((pokemonItem) => (
        <Pokecard key={pokemonItem.id} data={pokemonItem} />
      ))}
    </div>
  );
}
