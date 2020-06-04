import React from "react";
import { Link } from "react-router-dom";
import "./Explore.css";

const Explore = () => {

    return (
        <div className="explore-container">
            <h2>Explore The Wizarding World!</h2>
            <div className="explore-buttons-container">
                <Link to='explore/sort'><button className ="explore-button">Get Sorted</button></Link>
                <Link to="explore/spells"><button className ="explore-button">Spell Book</button></Link>
                <Link to="explore/advice"><button className ="explore-button">Advice From Hermione</button></Link>
                <Link to="explore/students"><button className ="explore-button">View Students</button></Link>
            </div>
        </div>
    )
}

export default Explore