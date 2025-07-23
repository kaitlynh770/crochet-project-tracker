import React, {useState} from 'react';
import Piece from './Piece';
import styles from './Project.module.scss'

//this is going to be what a project is made up of
//photo, name, pieces Piece[]
function Project({projectImg, name, pieces}){
    let [details, showDetails] = useState(false) //showing details of a project should initially be set to false
    console.log(details)
    return(
        <div className = {styles.project}>
            <img src = {projectImg} alt = "Project Image"/>
            <h2 className = {styles.projectName}>
                {name}
            </h2>
            <button className= {styles.toggleButton} onClick = {() => showDetails(!details)}>{details ? '▲': '▼' }</button>
            <div className= {styles.project_details}>
                {pieces.map((piece, index) => (
                    <Piece key = {index} name = {piece.name} rounds = {piece.rounds} quantity={piece.quantity}/>
                ))}
            </div>
        </div>
    )
}
export default Project;
