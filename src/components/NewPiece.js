import {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import styles from './NewPiece.module.scss'

function NewPiece({onClose}){
    const [pieceName, setPieceName] = useState("");
    const [pieceQuantity, setPieceQuantity] = useState(1);
    const quantity = [1,2,3,4,5]
    const [pieceRounds, setPieceRounds] = useState("");
    function savePiece(e){
        e.preventDefault();
        if(pieceName || pieceRounds == ""){
            alert("Please fill out all fields!")
            return;
        }
        console.log(`Name : ${pieceName} Quantity: ${pieceQuantity} Rounds: ${pieceRounds}`);
        onClose(); // close overlay after save
    }
    const menuRef = useRef(null)

    useEffect(() => {
        menuRef.current && menuRef.current.focus()
    })

    useEffect(() => {
    function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
        }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
    }, [onClose]);
    return(
        <div className = {styles.overlay}>
            <form className= {styles.new_piece}>
                <h2>
                    New Piece
                </h2>
                <div className = {styles["field-container"]}>
                    <label> Piece Name </label>
                    <input
                        ref = {menuRef}
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
