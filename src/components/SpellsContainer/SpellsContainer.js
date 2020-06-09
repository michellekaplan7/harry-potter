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
      filtered: [],
      useFavoritedData: false,
      isLoading: false,
    };
  }

  componentDidMount = () => {
    let spells = []
    this.setState({ isLoading: true }, async () => {
      spells = await getSpells()
      this.setState({ spells, filtered: spells, isLoading: false }, () => {
        this.getLocalStorage()
      });
    })
  };

  toggleFavorites = (id) => {
    if (!this.state.favoritesID.includes(id)) {
      this.setState({ favoritesID: [...this.state.favoritesID, id] }, () => {
        this.updateLocalStorage()
      });
    } else {
      let newFavoritesID = this.state.favoritesID.filter((favorite) => {
        return favorite !== id;
      });
      let newFavorites = this.state.favorites.filter((favorite) => {
        return favorite._id !== id;
      });
      this.setState({ favoritesID: newFavoritesID, favorites: newFavorites }, () => {
        this.updateLocalStorage()
      });
    }
  };

  updateLocalStorage = () => {
    window.localStorage.setItem("favoritesID", JSON.stringify(this.state.favoritesID));
  }

  getLocalStorage = () => {
    const favoritesID = window.localStorage.getItem("favoritesID")
    if (!favoritesID) {
      return;
    }
    const savedFavoritesID = JSON.parse(favoritesID)
    this.setState({ favoritesID: savedFavoritesID })
  }

  displayFavorites = () => {
    let matchedSpell = this.state.spells.filter(spell => {
      let found = this.state.favoritesID.find(id => {
        return spell._id === id
      })
      return found
    }) 
    this.setState({favorites: matchedSpell, useFavoritedData: true})
  }

 handleChange = (e) => {
  if (e.target.value === "All") {
    return this.setState({filtered: this.state.spells, useFavoritedData: false})
  }

  if (e.target.value === "Favorites") {
    return this.displayFavorites()
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
    if (this.state.isLoading) {
      return <h3 className="loading-message">Loading...</h3>
    }

    let data;
    let spellsCards = null;
 
    if (!this.state.useFavoritedData) {
      data = this.state.filtered
    } 
    else if (this.state.useFavoritedData) {
      data = this.state.favorites
    }
    if (data.length === 0) {
      spellsCards = <h3 className="no-favorites-message">You currently have no favorite spells. Add some!</h3>;
    } else {
      spellsCards = data.map((spell, i) => {
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
    }

    return (
      <div className="spell-page">
        <h2 className="spells-header">Harry's Spell Book</h2>
        <div className="spell-buttons-container">
        <h3 className="favorites-count">Favorites ({this.state.favoritesID.length})</h3>
          <select
          onChange={(e) => this.handleChange(e)}
          >
            <option value="">Filter By Spell Type</option>
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
        </div>
      </div>
    );
  }
}

export default SpellsContainer;