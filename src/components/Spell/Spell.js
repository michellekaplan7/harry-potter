import React from "react";
import "./Spell.css";
import MdStar from "react-ionicons/lib/MdStar";
import MdStarOutline from "react-ionicons/lib/MdStarOutline";

const Spell = ({ id, effect, spell, type, toggleFavorites, favorite }) => {
    console.log('fav', favorite)
  return (
    <div className="spell-container" id={id}>
      <h4>Spell: {spell}</h4>
      <h4>Effect: {effect}</h4>
      <h4>Type: {type}</h4>

      {favorite ? (
        <MdStar
          color="yellow"
          fontSize="60px"
        //   className="spell-remove-fav"
          onClick={() => toggleFavorites(id)}
        />
      ) : (
        <MdStarOutline
          color="white"
          fontSize="60px"
        //   className="spot-add-fav"
          onClick={() => toggleFavorites(id)}
        />
      )}
    </div>
  );
};

export default Spell;
