// import React, { Component } from "react";
// import "./RandomHouse.css";
// import { getRandomHouse } from "../../apiCalls";

// class RandomHouse extends Component {
//   constructor() {
//     super();
//     this.state = {
//       house: "",
//       images: ['test']
//     };
//   }


//   handleClick = async () => {
//     const house = await getRandomHouse();
//     this.setState({ house });
//   };

//   render() {
//     return (
//       <div className="sorting-container">
//         {/* <img className="house-logo" alt="house logo" src={this.state.house === "gryffindor" ? this.state.images[0]: null}  /> */}
//         <button className="sort-button" onClick={() => this.handleClick()}>Get House</button>
//       </div>
//     );
//   }
// }

// export default RandomHouse;

import React from "react";
import "./RandomHouse.css";

const Home = (props) => {

    const pictures = [
        "/images/gryffindor.jpg",
        "/images/hufflepuff.jpg",
        "/images/ravenclaw.jpg",
        "/images/slytherin.jpg",
        "/images/sorting_hat.jpg"
	    ];

    return (
        <div className="sorting-container">
            <h2 className="sorting-message">Let the sorting begin!</h2>
            <img className="house-logo" alt="house logo" src={props.randomHouse === "gryffindor" ? pictures[0]: props.randomHouse === "hufflepuff" ? pictures[1]: props.randomHouse === "ravenclaw" ? pictures[2] : props.randomHouse === "slytherin" ? pictures[3] : pictures[4]}  />
            <audio src={props.randomHouse === "gryffindor" ? "/audio/gryffindor.m4a" : props.randomHouse === "hufflepuff" ? "/audio/hufflepuff.m4a" : props.randomHouse === "ravenclaw" ? "/audio/ravenclaw.m4a" : props.randomHouse === "slytherin" ? "/audio/slytherin.m4a" : null } autoPlay  />
            <button className="sort-button" onClick={() => props.getRandomHouse()}>Get sorted!</button>
        </div>
    )
}

export default Home;