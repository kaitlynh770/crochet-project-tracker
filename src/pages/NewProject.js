import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import styles from '../pages_styling/NewProject.module.scss';
import NewPiece  from '../components/NewPiece'
import Piece from '../components/Piece';
import edit_icon from '../assets/edit-button.png';
import delete_icon from '../assets/delete-button.png';

function NewProject(){
    const [projectName, setProjectName] = useState("");
    const [notes, setNotes] = useState("");
    const [isNewPieceMenuOpen, setNewPieceMenuOpen] = useState(false);
    const [pieces, setPieces] = useState([]) //array to store pieces of a project, this information will be sent to us from the NewPiece menu

    const toggleMenu = () =>{
        setNewPieceMenuOpen(!isNewPieceMenuOpen)
    }
    const addPiece = (piece) =>{
        setPieces(pieces => [...pieces, piece])
        // console.log(pieces[0])
        setNewPieceMenuOpen(false)
    }

    useEffect(() => { //check pieces array when it updates
        if (pieces.length > 0) {
            console.log('First piece:', pieces[0]);
        }
    }, [pieces]);
    return(
            <div className ={styles.form}>
                <form className={styles.new_project}>
                        <h2>New Project</h2>

                        <div className={styles["field-container"]}>
                            <label>Project Name</label>
                            <input
                            type="text"
                            value={projectName}
                            onChange={e => setProjectName(e.target.value)}
                            />
                        </div>

                        <div className={styles["field-container"]}>
                            <label>Overall Notes</label>
                            <textarea
                            className={styles.notes}
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            />
                        </div>
                        {pieces.length > 0 &&
                            <div className={styles["field-container"]}>
                                <label>Pieces</label>
                                <div className = {styles.pieces_container}>
                                    {pieces.map((piece, index) => (
                                        <div key = {index} className = {styles.pieces}>
                                            <Piece
                                                name = {piece.pieceName}
                                                rounds = {piece.pieceRounds}
                                                quantity = {piece.pieceQuantity}
                                            />
                                            <div className = {styles.buttons}>
                                                <img src = {edit_icon} />
                                                <img src = {delete_icon} />
                                            </div>
                                            {index === pieces.length-1 && (
                                                <button className = {styles.fab}>+</button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                        <button onClick = {toggleMenu} className={styles.add_piece} type = "button">Add Piece</button>
                </form>
                {isNewPieceMenuOpen && (
                    <NewPiece onClose={() => setNewPieceMenuOpen(!isNewPieceMenuOpen)} onSave = {addPiece} />
                )}
            </div>
    )
}
export default NewProject
