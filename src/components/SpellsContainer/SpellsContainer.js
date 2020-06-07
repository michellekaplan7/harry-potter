import React, { Component } from "react";
import "./SpellsContainer.css";
import { getSpells } from "../../apiCalls";
import Spell from "../Spell/Spell";

class SpellsContainer extends Component {
  constructor() {
    super();
    this.state = {
      spells: [],
      favoritesID: [],
      favorites: [],
      // useFavorited: false,
      filtered: [],
      useFavoritedData: false,
    };
  }

  componentDidMount = async () => {
    const spells = await getSpells();
    this.setState({ spells, filtered: spells });
  };

  toggleFavorites = (id) => {
    if (!this.state.favoritesID.includes(id)) {
      this.setState({ favoritesID: [...this.state.favoritesID, id] });
    } else {
      let newFavoritesID = this.state.favoritesID.filter((favorite) => {
        return favorite !== id;
      });
      let newFavorites = this.state.favorites.filter((favorite) => {
        return favorite._id !== id;
      });
      this.setState({ favoritesID: newFavoritesID, favorites: newFavorites });
    }
  };

  displayFavorites = () => {
    let matchedSpell = this.state.spells.filter(spell => {

      let found = this.state.favoritesID.find(id => {
        return spell._id === id
      })

      return found

    }) 
    console.log('MATCHED', matchedSpell)
    this.setState({favorites: matchedSpell, useFavoritedData: true})
  }

 handleChange = (e) => {
  if (e.target.value === "All") {
    return this.setState({filtered: this.state.spells, useFavoritedData: false})
  }

  if (e.target.value === "Favorites") {
    return this.displayFavorites()
      // console.log('favs', this.state.favorites)
      // return this.setState({filtered: this.state.favorites, useFilteredData: true})
  }

  // eslint-disable-next-line array-callback-return
  let filteredSpell = this.state.spells.filter(spell => {
    if (spell.type === e.target.value) {
      return spell
    } 
   
  })
  this.setState({filtered: filteredSpell, useFavoritedData: false})
}


  render() {
    console.log(this.state.favorites);
    let data;
    console.log('useFav', this.state.useFavorited)
 
    if (!this.state.useFavoritedData) {
      data = this.state.filtered
      console.log('filtered', this.state.filtered)
    } 
    else if (this.state.useFavoritedData) {
      data = this.state.favorites
    }
    let spellsCards = data.map((spell, i) => {
      let favorite = false;
      this.state.favoritesID.forEach((id) => {
        if (spell._id === id) {
          favorite = true;
        }
      });
      return (
        <Spell
          favorite={favorite}
          key={spell._id}
          id={spell._id}
          effect={spell.effect}
          spell={spell.spell}
          type={spell.type}
          toggleFavorites={this.toggleFavorites}
        />
      );
    });

    return (
      <div className="spell-page">
        <h2 className="spells-header">Harry's Spell Book</h2>
        <div className="spell-buttons-container">
        <h3 className="favorites-count">Favorites ({this.state.favoritesID.length})</h3>
          <select
          onChange={(e) => this.handleChange(e)}
          >
            <option value="">--Filter By Spell Type--</option>
            <option value="All">All Spells</option>
            <option value="Favorites">Favorites</option>
            <option value="Charm">Charm</option>
            <option value="Enchantment">Enchantment</option>
            <option value="Spell">Spell</option>
            <option value="Hex">Hex</option>
            <option value="Curse">Curse</option>
            <option value="Jinx">Jinx</option>
          </select>
        </div>
        <div className="spells-container">
        {spellsCards}
        {/* {!this.state.favorites.length && <h3>You currently have no favorite spells. Add some!</h3>} */}
        </div>
      </div>
    );
  }
}

export default SpellsContainer;