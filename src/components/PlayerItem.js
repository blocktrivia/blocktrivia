import React from 'react';
import { connect } from 'react-redux';
import RubberBand from 'react-reveal/RubberBand';


export const PlayerItem = (props) => (

    <RubberBand>
        <div className="player__items">
            <svg height="100" width="100">
                <circle cx="50" cy="50" r="35" stroke-width="3" stroke={props.stroke} fill={props.colour} />
            </svg>

            <h3 >{props.name} | {props.score}</h3>
        </div>
    </RubberBand>

)

export default PlayerItem;

/*

{
type: 'ADD_PLAYER',
player: {name:"anushan", colour:"red"}
}

*/