import React, { Component } from "react";
import "./RandomHouse.css";
import { getRandomHouse } from "../../apiCalls";

class RandomHouse extends Component {
  constructor() {
    super();
    this.state = {
      house: "",
    };
  }

  handleClick = async () => {
    const house = await getRandomHouse();
    this.setState({ house });
  };

  render() {
    const houseName = this.state.house.toLowerCase();

    return (
      <div className="sorting-container">
        {this.state.house && <h3>{this.state.house.toUpperCase()}!</h3>}

        {this.state.house ? (
          <img
            className="house-logo"
            alt="house logo"
            src={`/images/${houseName}.jpg`}
          />
        ) : (
          <img
            className="harry-potter-cartoon"
            alt="harry-potter-cartoon"
            src={"/images/harry-potter-cartoon.jpg"}
          />
        )}

        {this.state.house ? (
          <audio src={`/audio/${houseName}.m4a`} autoPlay />
        ) : null}

        <button className="sort-button" onClick={() => this.handleClick()}>
          Get House
        </button>
      </div>
    );
  }
}

export default RandomHouse;
