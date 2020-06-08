import React from "react";
import "./Spell.css";
import MdStar from "react-ionicons/lib/MdStar";
import MdStarOutline from "react-ionicons/lib/MdStarOutline";

const Spell = ({ id, effect, spell, type, toggleFavorites, favorite }) => {
  return (
    <div className="spell-container" id={id}>
      <h4>Spell: {spell}</h4>
      <h4>Effect: {effect}</h4>
      <h4>Type: {type}</h4>

      {favorite ? (
        <div data-testid={`fullStar-${id}`}>
          <MdStar
            color="yellow"
            fontSize="60px"
            onClick={() => toggleFavorites(id)}
          />
        </div>
      ) : (
        <div data-testid={`emptyStar-${id}`}>
          <MdStarOutline
            color="white"
            fontSize="60px"
            onClick={() => toggleFavorites(id)}
          />
        </div>
      )}
    </div>
  );
};

export default Spell;
