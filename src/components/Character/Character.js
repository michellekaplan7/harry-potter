import React from "react";
import "./Character.css";
import MdStar from "react-ionicons/lib/MdStar";
import MdStarOutline from "react-ionicons/lib/MdStarOutline";

const Character = (props) => {

  return (
    <div className="character-container" id={props.id}>
      <h3 className="character-info"><span>Name:</span> {props.name}</h3>
      <h3 className="character-info"><span>Role:</span> {props.role ? props.role : "N/A"}</h3>
      <h3 className="character-info"><span>House:</span> {props.house ? props.house : "N/A"}</h3>
      <h3 className="character-info"><span>Ministry Of Magic:</span> {props.ministryOfMagic ? "Yes" : "No"}</h3>
      <h3 className="character-info"><span>Order Of The Phoenix:</span> {props.orderOfThePhoenix ? "Yes" : "No"}</h3>
      <h3 className="character-info"><span>Dumbledores Army:</span> {props.dumbledoresArmy ? "Yes" : "No"}</h3>
      <h3 className="character-info"><span>Death Eater:</span> {props.deathEater ? "Yes" : "No"}</h3>
      <h3 className="character-info"><span>Blood Status:</span> {props.bloodStatus}</h3>
      <h3 className="character-info"><span>Species:</span> {props.species}</h3>
      {props.favorite ? (
        <MdStar
          color="yellow"
          fontSize="60px"
          //   className="spell-remove-fav"
          onClick={() => props.toggleFavorites(props.id)}
        />
      ) : (
        <MdStarOutline
          color="white"
          fontSize="60px"
          //   className="spot-add-fav"
          onClick={() => props.toggleFavorites(props.id)}
        />
      )}
    </div>
  );
};

export default Character;
