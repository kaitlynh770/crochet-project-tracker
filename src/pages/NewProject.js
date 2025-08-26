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
    const [editPieceId, setEditId] = useState(null);
    const [pieces, setPieces] = useState([]) //array to store pieces of a project, this information will be sent to us from the NewPiece menu

    const toggleMenu = () =>{
        setNewPieceMenuOpen(!isNewPieceMenuOpen)
    }
    const addPiece = (piece) =>{
        if(editPieceId){
            setPieces(pieces =>
                pieces.map(p => p.id === editPieceId ? { ...piece, id: editPieceId } : p)
            );
        }
        else{
            const pieceId = {...piece, id: Date.now()}
            setPieces(pieces => [...pieces, pieceId])
        }
        // console.log(pieces[0])
        setNewPieceMenuOpen(false);
        setEditId(null);
    }

    const editPiece = (id) => {
        setEditId(id);
        setNewPieceMenuOpen(true);
        //open back up the NewPiece menu and autopopulate the fields with the information currently in the piece
    }

    const deletePiece = (id) => {
        setPieces(pieces => pieces.filter(piece => piece.id !== id));
    };

    useEffect(() => { //check pieces array when it updates
        if (pieces.length > 0) {
            console.log('First piece:', pieces[0]);
        }
    }, [pieces]);
    const pieceToEdit = pieces.find(piece => piece.id === editPieceId);
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
                                        <div key = {piece.id} className = {styles.pieces}>
                                            <Piece
                                                name = {piece.pieceName}
                                                rounds = {piece.pieceRounds}
                                                quantity = {piece.pieceQuantity}
                                            />
                                            <div className = {styles.buttons}>
                                                <img src = {edit_icon} onClick = {() => editPiece(piece.id)} />
                                                <img src = {delete_icon} onClick = {() => deletePiece(piece.id)}/>
                                            </div>
                                            {index === pieces.length-1 && (
                                                <button className = {styles.fab} onClick = {toggleMenu} type= "button">+</button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                        {pieces.length > 0 ? (<button className = {styles.add_piece} type = "button">Create Project</button>) : (<button onClick = {toggleMenu} className={styles.add_piece} type = "button">Add Piece</button>)}
                </form>
                {isNewPieceMenuOpen && (
                    <NewPiece
                        initialData = {pieceToEdit}
                        onClose={() => {
                            setNewPieceMenuOpen(!isNewPieceMenuOpen);
                            setEditId(null);
                        }}
                        onSave = {addPiece}
                     />
                )}
            </div>
    )
}
export default NewProject
