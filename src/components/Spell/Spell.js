import React from 'react';
import './Spell.css';

const Spell = ({ id, effect, spell, type }) => {

    return (
        <div className="spell-container" data-testid={id} >
            <h4>Spell: {spell}</h4>
            <h4>Effect: {effect}</h4>
            <h4>Type: {type}</h4>
        </div>
    )
}

export default Spell