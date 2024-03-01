import "./style.css";

export default function Pokecard({ data }) {
  return (
    <div className={`Pokecard type-${data.type}`}>
      <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} />
      <div className="type-data">
        <span className="type-flag">type: </span>
        <span className={`type type--${data.type}`}>{data.type}</span>
      </div>
    </div>
  );
}
