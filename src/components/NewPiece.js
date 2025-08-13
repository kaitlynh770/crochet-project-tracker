import {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import styles from './NewPiece.module.scss'

function NewPiece(){
    const [pieceName, setPieceName] = useState("");
    const [pieceQuantity, setPieceQuantity] = useState(1);
    const quantity = [1,2,3,4,5]
    const [pieceRounds, setPieceRounds] = useState("");
    function savePiece(e){
        e.preventDefault();
        console.log(`Name : ${pieceName} Quantity: ${pieceQuantity} Rounds: ${pieceRounds}`);
    }
    return(
        <div className = {styles.menu}>
            <form className= {styles.new_piece}>
                <h2>
                    New Piece
                </h2>
                <div className = {styles["field-container"]}>
                    <label> Piece Name </label>
                    <input
                        type = "text"
                        value = {pieceName}
                        onChange = {e => setPieceName(e.target.value)}
                    />
                </div>
                <div className = {styles["field-container"]}>
                    <label> Quantity: </label>
                    <select id = "pieces_quantity" value = {pieceQuantity} onChange = {e=> setPieceQuantity(Number(e.target.value))}>
                        <option value = ""></option>
                            {quantity.map((number) => {
                                return (
                                    <option key={number} value={number}>
                                    {number}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className = {styles["field-container"]}>
                <label> # of Rounds: </label>
                    <input
                        type = "number"
                        value = {pieceRounds}
                        onChange={e => {
                            const val = e.target.value;
                            // Allow empty string or convert to number
                            setPieceRounds(val === "" ? "" : Number(val));
                            }
                        }
                    />
                </div>
                <button onClick = {savePiece} className = {styles.save_piece}>Save Piece</button>
            </form>
        </div>
    )
}
export default NewPiece;
