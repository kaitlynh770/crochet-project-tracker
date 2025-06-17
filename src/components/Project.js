import React from 'react';
import Piece from './Piece';

//this is going to be what a project is made up of
//photo, name, pieces Piece[]
function Project({projectImg, name, pieces}){
    return(
        <div>
            <img src = {projectImg} alt = "Project Image"/>
            <h2>
                {name}
            </h2>
            {pieces.map((piece, index) => (
                <Piece key = {index} name = {piece.name} rounds = {piece.rounds} quantity={piece.quantity}/>
            ))}
        </div>
    )
}
export default Project;
