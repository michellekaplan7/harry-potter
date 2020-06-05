import React, { Component } from "react"
import './Advice.css'
import { getAdvice } from '../../apiCalls';

class Advice extends Component {
    constructor() {
        super()
        this.state = {
            advice: '',
            isLoading: false,
        }
    }

    handleClick = async () => {
        const advice = await getAdvice();
        this.setState({ advice });
      };

    render() {
        console.log(this.state.advice)
        return (
            <div>
                <h2>Hermione Says...</h2>
                <img className="hermione-image" src='/images/hermione-granger.jpg' alt="hermion granger" />
                {this.state.advice && <h4>{this.state.advice.slip.advice}</h4>}
                <button onClick={() => this.handleClick()}>Get Advice</button>
            </div>
        )
    }
}

export default Advice