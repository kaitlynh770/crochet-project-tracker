import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import styles from '../pages_styling/NewProject.module.scss';
import NewPiece from '../components/NewPiece';
import pompomplaceholder from '../assets/placeholder-pompompurin-theme.png';
import Piece from '../components/Piece';
import edit_icon from '../assets/edit-button.png';
import delete_icon from '../assets/delete-button.png';
import { useNavigate } from 'react-router-dom';

function NewProject({ user, onProjectAdded }) {
    const [projectName, setProjectName] = useState("");
    const [notes, setNotes] = useState("");
    const [isNewPieceMenuOpen, setNewPieceMenuOpen] = useState(false);
    const [editPieceId, setEditId] = useState(null); //store the piece that will be edited
    const [pieces, setPieces] = useState([]) //array to store pieces of a project, this information will be sent to us from the NewPiece menu
    const [projectImage, setProjectImage] = useState(null);
    const notesRef = useRef(null); //create a reference to the notes textarea
    const navigate = useNavigate();

    const keyDownBulletPoints = (e) => { //function to have every new line start with a bullet point when user hits enter
        if (e.key === 'Enter') {
            e.preventDefault(); //this will prevent the default new line behavior
            const { selectionStart, selectionEnd, value } = e.target; //destructuring properties from the textarea input
            //here we're splitting value into 2 parts: before and after the cursor
            const before = value.substring(0, selectionStart);
            const after = value.substring(selectionEnd);
            const newValue = before + '\n• ' + after; //insert a new line with a bullet point at the cursor's position
            setNotes(newValue); //make sure to update notes with this value
            setTimeout(() => { //timeout is used to position the cursor after notes is updated
                const position = before.length + 3
                if (notesRef.current) {
                    notesRef.current.selectionStart = notesRef.current.selectionEnd = position;
                }
            }, 0) //run this piece of code as soon as the DOM updates

        }
    };

    const handleNotesFocus = () => { //when the user hasn't typed anything yet, make sure it automatically starts with a •
        if (!notes.startsWith('• ')) {
            setNotes('• ' + notes);
        }
    }

    const toggleMenu = () => {
        setNewPieceMenuOpen(!isNewPieceMenuOpen)
    }
    const addOrEditPiece = (piece) => {
        if (editPieceId) { //if there is something within editPieceId,
            setPieces(pieces => //map through the pieces array create a new one to update the state
                pieces.map(p => p.id === editPieceId ? { ...piece, id: editPieceId } : p) //iterate over each piece in the array and if the iterated id is the same as the editPieceId, update the newly change piece to have the same id as the editPieceId
                //{...piece, id:editPieceId} creates a new object that has all the properties from piece but the id property is set to the editPieceId.
                //esssentially we're replacing the piece with updated data but keeping the id the same
                //second half of the statement just keeps the piece object the way it is if it is the one not currently being updated
            );
        }
        else { //adding a new piece
            const pieceId = { ...piece, id: Date.now() } //create a unique ID based off of the current date
            setPieces(pieces => [...pieces, pieceId]) //create a shallow copy of the array with the new piece
        }
        setNewPieceMenuOpen(false);
        setEditId(null); //clear editPieceId to get ready for the next piece that wants to be updated
    }

    const editPiece = (id) => {
        setEditId(id);
        setNewPieceMenuOpen(true);
        //open back up the NewPiece menu and autopopulate the fields with the information currently in the piece
    }

    const deletePiece = (id) => {
        setPieces(pieces => pieces.filter(piece => piece.id !== id));
    };
    const handleImage = (e) => { //handle the image upload
        const file = e.target.files[0]; //files is always an array like object so just grab the first one in the array
        if (!file) return; //if there is nothing in the files then return

        const reader = new FileReader(); //built in browser API that lets us read the contents of a File object
        reader.onloadend = () => { //function that fires when reading operation is done (can either succeed or fail)
            setProjectImage(reader.result); // Base64 string, Firestore Database doesn't allow for uploading the file image unless we the storage as well (not included in spark plan) so I opted for converting the image to Base64 to be stored into my existing database easily
        };
        reader.readAsDataURL(file); //method that tells the FileReader how to actually read the file (so we're telling reader to read this as a Data URL). This is actually the step that converts the file (originally a jpeg or png, etc.) into a Base64 data url
    };

    const saveProject = async () => { //async function because we're working with promises (database stuff)
        if (!projectName) { //don't let the user proceed unless they've put in a name for th eproject
            alert('Please fill out project name!');
            return
        }
        const newProjectObject = { projectImg: projectImage || pompomplaceholder, name: projectName, pieces: pieces, notes: notes, createdAt: new Date() }; //if there's something stored in projectImage then we set projectImg equal to the file a user uploaded (and converted to the Base64 data url of course) but if not, it'll just use the placeholder image (pompompurin)
        try {
            await addDoc( //adding newProjectObject to the projects subcollection (users/{user.uid}/projects)
                collection(db, "users", user.uid, "projects"), //find the correct collection and add the newProjectObject to it
                newProjectObject
            );
            alert('Project saved!');
            //reset everything for the next project
            setProjectName('')
            setNotes('')
            setPieces([])
            setProjectImage(null);
            if (onProjectAdded) onProjectAdded(); // we call again to trigger a refetch, wanna make sure the UI is fully updated
            navigate(`/projects`)
        }
        catch (err) {
            alert("Error saving project" + err.message);
        };
    }

    useEffect(() => { //check pieces array when it updates
        if (pieces.length > 0) {
            console.log('First piece:', pieces[0]);
        }
    }, [pieces]);
    const pieceToEdit = pieces.find(piece => piece.id === editPieceId); //checker for correct piece when a user chooses to edit
    return (
        <div className={styles.form}>
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
                        ref={notesRef}
                        className={styles.notes}
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        onKeyDown={keyDownBulletPoints}
                        onFocus={handleNotesFocus}
                    />
                </div>
                <div className={styles["field-container"]}>
                    <label>Project Image (Optional)</label>
                    <input type="file" accept="image/*" onChange={handleImage} />
                </div>
                {pieces.length > 0 &&
                    <div className={styles["field-container"]}>
                        <label>Pieces</label>
                        <div className={styles.pieces_container}>
                            {pieces.map((piece, index) => (
                                <div key={piece.id} className={styles.pieces}>
                                    <Piece
                                        name={piece.pieceName}
                                        rounds={piece.pieceRounds}
                                        quantity={piece.pieceQuantity}
                                    />
                                    <div className={styles.buttons}>
                                        <img src={edit_icon} onClick={() => editPiece(piece.id)} alt="Edit" />
                                        <img src={delete_icon} onClick={() => deletePiece(piece.id)} alt="Delete" />
                                    </div>
                                    {index === pieces.length - 1 && (
                                        <button className={styles.fab} onClick={toggleMenu} type="button">+</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                }
                {pieces.length > 0 ? (<button className={styles.add_piece} type="button" onClick={saveProject}>Create Project</button>) : (<button onClick={toggleMenu} className={styles.add_piece} type="button">Add Piece</button>)}
            </form>
            {isNewPieceMenuOpen && (
                <NewPiece
                    initialData={pieceToEdit}
                    onClose={() => {
                        setNewPieceMenuOpen(!isNewPieceMenuOpen);
                        setEditId(null);
                    }}
                    onSave={addOrEditPiece}
                />
            )}
        </div>
    )
}
export default NewProject
