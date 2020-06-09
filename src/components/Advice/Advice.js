import React, { Component } from "react";
import "./Advice.css";
import { getAdvice } from "../../apiCalls";

class Advice extends Component {
  constructor() {
    super();
    this.state = {
      advice: "",
    };
  }

  handleClick = async () => {
    const advice = await getAdvice();
    this.setState({ advice });
  };

  render() {
    return (
      <div className="advice-container">
        <h2>Hermione Says...</h2>
        <img
          className="hermione-image"
          src="/images/hermione-granger.jpg"
          alt="hermione granger"
        />
        {this.state.advice && (
          <h4 className="advice">{this.state.advice.slip.advice}</h4>
        )}
        <button className="advice-button" onClick={() => this.handleClick()}>
          Get Advice
        </button>
      </div>
    );
  }
}

export default Advice;
