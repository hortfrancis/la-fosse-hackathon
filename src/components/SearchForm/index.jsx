import { useState } from "react";

export default function SearchForm({ addPokemonName }) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("in handle submit");
    console.log(inputText);
    addPokemonName(inputText);
    setInputText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        required
      />
      <button>Add</button>
    </form>
  );
}
