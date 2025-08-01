import {useState} from 'react';
import ReactDOM from 'react-dom/client';
import styles from '../pages_styling/NewProject.module.scss';

function NewProject(){
    const [projectName, setProjectName] = useState("");
    const [notes, setNotes] = useState("");
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

                <button className={styles.add_piece}>Add Piece</button>
        </form>
        </div>
    )
}
export default NewProject
