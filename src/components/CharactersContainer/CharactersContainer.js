import React, { Component } from "react";
import "./CharactersContainer.css";
import Character from "../Character/Character";
import { getCharacters } from "../../apiCalls";

class CharactersContainer extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      favoritesID: [],
      favorites: [],
      filtered: [],
      useFavoritedData: false,
    };
  }

  componentDidMount = async () => {
    const characters = await getCharacters();
    this.setState({ characters, filtered: characters });
  };

  toggleFavorites = (id) => {
    if (!this.state.favoritesID.includes(id)) {
      this.setState({ favoritesID: [...this.state.favoritesID, id] });
    } else {
      let newFavoritesID = this.state.favoritesID.filter((favorite) => {
        return favorite !== id;
      });
      let newFavorites = this.state.favorites.filter((favorite) => {
        return favorite.id !== id;
      });
      this.setState({ favoritesID: newFavoritesID, favorites: newFavorites });
    }
  };

  displayFavorites = () => {
    let matchedCharacter = this.state.characters.filter(character => {
      let found = this.state.favoritesID.find(id => {
        return character.id === id
      })
      return found
    }) 
    this.setState({favorites: matchedCharacter, useFavoritedData: true})
  }

  handleChange = (e) => {
    if (e.target.value === "All") {
      return this.setState({filtered: this.state.characters, useFavoritedData: false})
    }
    if (e.target.value === "Favorites") {
      return this.displayFavorites()
    }
    // eslint-disable-next-line array-callback-return
    let filteredCharacter = this.state.characters.filter(character => {
      if (character.house === e.target.value) {
        return character
      }
    })
    this.setState({filtered: filteredCharacter, useFavoritedData: false})

    // let filterOrderOfThePhoenix = this.state.characters.filter(character => {
    //     if (character[e.target.value] === true) {
    //         return character
    //     }
    //   })
    //   this.setState({filtered: filterOrderOfThePhoenix, useFavoritedData: false})
  }

  render() {
    let data;
 
    if (!this.state.useFavoritedData) {
      data = this.state.filtered
    } 

    else if (this.state.useFavoritedData) {
      data = this.state.favorites
    }

    let characterCards = data.map((character) => {
        let favorite = false;
        this.state.favoritesID.forEach((id) => {
            if (character.id === id) {
                favorite = true;
            }
        })

      return (
        <Character
            id={character.id}
            key={character.id} 
            name={character.name} 
            role={character.role}
            house={character.house}
            ministryOfMagic={character.ministryOfMagic}
            orderOfThePhoenix={character.orderOfThePhoenix}
            dumbledoresArmy={character.dumbledoresArmy}
            deathEater={character.deathEater}
            bloodStatus={character.bloodStatus}
            species={character.species}
            favorite={favorite}
            toggleFavorites={this.toggleFavorites}
        />);
    });

    return (
      <div className="characters-page">
        <h2 className="characters-header">Characters</h2>
        <div className="character-buttons-container">
          <h3 className="favorites-count">Favorites ({this.state.favoritesID.length})</h3>
          <select onChange={(e) => this.handleChange(e)}>
            <option value="">--Filter By--</option>
            <option value="All">All Characters</option>
            <option value="Favorites">Favorites</option>
            <option value="Gryffindor">Gryffindor</option>
            <option value="Hufflepuff">Hufflepuff</option>
            <option value="Ravenclaw">Ravenclaw</option>
            <option value="Slytherin">Slytherin</option>
            {/* <option value="orderOfThePhoenix">Order Of The Phoenix</option>
            <option value="dumbledoresArmy">Dumbledores Army</option> */}
          </select>
        </div>
        <div className="characters-container">{characterCards}</div>
      </div>
    );
  }
}

export default CharactersContainer;
