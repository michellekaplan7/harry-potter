import React from "react";
import "./Spell.css";
import PropTypes from "prop-types";
import MdStar from "react-ionicons/lib/MdStar";
import MdStarOutline from "react-ionicons/lib/MdStarOutline";

const Spell = ({ id, effect, spell, type, toggleFavorites, favorite }) => {
  return (
    <div className="spell-container" id={id}>
      <h4 className="spell-info">
        <span>Spell:</span> {spell}
      </h4>
      <h4 className="spell-info">
        <span>Effect:</span> {effect}
      </h4>
      <h4 className="spell-info">
        <span>Type:</span> {type}
      </h4>

      {favorite ? (
        <div data-testid={`fullStar-${id}`}>
          <MdStar
            color="#e0b953"
            fontSize="80px"
            onClick={() => toggleFavorites(id)}
          />
        </div>
      ) : (
        <div data-testid={`emptyStar-${id}`}>
          <MdStarOutline
            color="white"
            fontSize="80px"
            onClick={() => toggleFavorites(id)}
          />
        </div>
      )}
    </div>
  );
};

Spell.propTypes = {
  id: PropTypes.string,
  effect: PropTypes.string,
  spell: PropTypes.string,
  type: PropTypes.string,
  favorite: PropTypes.bool,
  toggleFavorites: PropTypes.func,
};

export default Spell;
