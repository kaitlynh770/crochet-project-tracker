import React from 'react'

//each project is made up of multiple pieces
//a piece should be made up of the name (arm, leg, ear) and how many rounds it is (8 rounds total, 16 rounds total, etc)
function Piece({name, rounds, quantity = 1}){
    return(
        <div>
            <span>
                <h2>{name}: {quantity > 1 ? `x${quantity}` : ''} </h2>
                <p>{rounds} rounds</p>
            </span>
        </div>
    );
}
export default Piece
