import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div>
      <Link className="landing-link" to="/explore">
        <button className="landing-button">I Solemnly Swear That I Am Up To No Good</button>
      </Link>
    </div>
  );
};

export default Landing;
