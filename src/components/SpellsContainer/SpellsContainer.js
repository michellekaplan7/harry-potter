import React, { Component } from "react";
import "./SpellsContainer.css";
import { getSpells } from "../../apiCalls";
import Spell from "../Spell/Spell";

class SpellsContainer extends Component {
  constructor() {
    super();
    this.state = {
      spells: [],
    };
  }

  componentDidMount = async () => {
    const spells = await getSpells();
    this.setState({ spells });
  };

  render() {
    let spellsCards = this.state.spells.map((spell) => {
      return (
        <Spell
          key={spell.id}
          id={spell.id}
          effect={spell.effect}
          spell={spell.spell}
          type={spell.type}
        />
      );
    });

    return (
      <div className="spell-page">
        <div class="spell-buttons-container">
          <button className="fav-spell-button">View Favorites</button>
          <button className="sort-spell-button">Sort By Type</button>
        </div>
        <div className="spells-container">
        {spellsCards}
        </div>
      </div>
    );
  }
}

export default SpellsContainer;
