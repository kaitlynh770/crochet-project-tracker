import React, {useState} from 'react';
import Piece from './Piece';
import styles from './Project.module.scss'

//this is going to be what a project is made up of
//photo, name, pieces Piece[], notes
function Project({projectImg, name, pieces, notes = ""}){
    let [details, showDetails] = useState(false) //showing details of a project should initially be set to false
    // console.log(`${name} details state:`, details)
    //     console.log(`=== ${name} ===`)
    // console.log(`Current details state: ${details}`)

    const handleButtonClick = () => {
        // console.log(`🔴 BUTTON CLICKED for: ${name}`)
        // console.log(`🔴 Before toggle - ${name} state: ${details}`)
        showDetails(!details)
    }
    return(
        <div className = {styles.project}>
            <img src = {projectImg} alt = "Project Image"/>
            <h2 className = {styles.projectName}>
                {name}
            </h2>
            <button className= {styles.toggleButton} onClick = {handleButtonClick}>{details ? '▲': '▼' }</button>
            <div className= {styles.project_details}
                style={{
                    maxHeight: details ? '1000px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                }}>
                 {details && pieces.map((piece, index) => (
                    <Piece key = {index} name = {piece.name} rounds = {piece.rounds} quantity={piece.quantity}/>
                ))}
            </div>
        </div>
    )
}
export default Project;
